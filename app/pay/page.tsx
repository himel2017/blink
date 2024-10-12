// Solana Blink Integration for localhost application

"use client";

import { useEffect } from "react";
import { PayWithModal } from "@/components/payWithModal";
import { StableCoinHome } from "@/components/stablecoin/stableCoinHome";
import { LoadingState } from "@/components/states/loadingState";
import { PaymentSuccessfulState } from "@/components/states/paymentSuccessfulState";
import { usePaymentLinkMerchantContext } from "@/contexts/PaymentLinkMerchantContext";
import { StableQRCode } from "@/components/stablecoin/stableQRCode";
import { AllCurrencyBanks, AllVendorList } from "@/constants/CurrenciesAndBanks";
import { useDevice } from "@/contexts/DeviceContext";
import { NavBar } from "@/components/navBar";
import { useRouter } from "next/navigation";
import { ExpiredState } from "@/components/states/expiredState";
import { BrokenState } from "@/components/states/brokenState";

// Import Solana Web3 and Wallet Adapter
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, SystemProgram, Connection } from "@solana/web3.js";

export default function Home() {
  // Constants
  const { isMobile, viewportHeight } = useDevice();
  const {
    paywith,
    currency,
    isConfirming,
    isSuccessful,
    stablecoinPaymentMethod,
    data,
    loading,
    error,
    setIsExpired,
    isExpired,
    isBroken,
    setIsBroken,
    trx,
    setIsConfirming,
    setIsSuccessful,
    wallet, // Assuming wallet is available from context
  } = usePaymentLinkMerchantContext();
  const router = useRouter();
  const connection = new Connection("https://api.devnet.solana.com"); // Change to mainnet-beta for production

  // Functions
  const renderContent = () => {
    if (isBroken) {
      return <BrokenState />;
    } else if (isExpired) {
      return <ExpiredState />;
    } else if (isConfirming) {
      return <LoadingState />;
    } else if (isSuccessful) {
      return <PaymentSuccessfulState />;
    } else if (paywith == "transfer") {
      let selectedVendor = AllVendorList.find(
        (vendor) => vendor.currency == currency.currency
      );
      return selectedVendor?.component;
    } else if (paywith == "bank") {
      let selectedCurrency = AllCurrencyBanks.find(
        (bankCurrency) => bankCurrency.currency == currency.currency
      );
      return selectedCurrency?.component;
    } else if (paywith == "stablecoin") {
      const screen =
        stablecoinPaymentMethod == "" || stablecoinPaymentMethod == "wallet" ? (
          <StableCoinHome />
        ) : (
          <StableQRCode />
        );
      return screen;
    }
  };

  // Handle Payment Transaction using Solana Blink & Actions
  const handlePayNow = async () => {
    if (!wallet?.connected) {
      alert("Please connect your wallet first");
      return;
    }

    if (!data) {
      alert("Transaction details not available");
      return;
    }

    try {
      setIsConfirming(true);

      // Recipient Public Key & Amount
      const recipientPublicKey = new PublicKey(data.recipient);
      const amount = data.amount * 1e9; // Assuming the amount is in SOL and converting to lamports

      // Create a transaction using Solana Web3
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: recipientPublicKey,
          lamports: amount,
        })
      );

      // Serialize the transaction for Blink
      const serializedTransaction = transaction
        .serialize({ requireAllSignatures: false })
        .toString("base64");

      // Generate the Blink URL
      const blinkUrl = `solana:${serializedTransaction}?action=approve`;

      // Log or use the Blink link to redirect
      console.log("Blink URL:", blinkUrl);

      // Redirect the user to the wallet using the Blink link
      window.location.href = blinkUrl; // This will open the wallet for approval
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
      setIsConfirming(false);
    }
  };

  // UseEffect to Handle Page Loading
  useEffect(() => {
    if (!loading) {
      if (data?.status === 403) {
        setIsBroken(true);
      }
      if (!trx) {
        setIsBroken(true);
      }
    }
    if (data?.transactions?.expired) {
      setIsExpired(true);
    }
  }, [data, error, router, loading]);

  // Rendering
  if (isMobile) {
    return (
      <div className={`w-full bg-black flex flex-grow`} style={{ height: viewportHeight }}>
        <PayWithModal>{renderContent()}</PayWithModal>
        <button onClick={handlePayNow} disabled={isConfirming || isSuccessful}>
          Pay Now
        </button>
      </div>
    );
  } else {
    return (
      <div className={`w-full h-screen bg-black flex items-center justify-center`}>
        <div className="max-w-[650px] w-2/4 min-w-[600px] max-h-[520px] h-[90%] flex">
          {/* Left Panel Pay With */}
          <NavBar />

          {/* Right Panel */}
          <PayWithModal>{renderContent()}</PayWithModal>
          <button onClick={handlePayNow} disabled={isConfirming || isSuccessful}>
            Pay Now
          </button>
        </div>
      </div>
    );
  }
}