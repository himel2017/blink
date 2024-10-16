import { Icons } from "@/app/icons";
import Image from "next/image";
import { CopyToClipboard } from "../copyToClicpboard";
import { usePaymentLinkMerchantContext } from "@/contexts/PaymentLinkMerchantContext";
import { useDevice } from "@/contexts/DeviceContext";
import { ChangePaymentMethod } from "../changePaymentMethod";

export const MethodNotAvailable = () => {
  const { setPaywith } = usePaymentLinkMerchantContext();
  const { isMobile } = useDevice();
  if (isMobile) {
    return (
      <div>
        <div className="w-full flex h-full  min-h-96 flex-col items-center justify-center gap-5 mt-10">
          <div className="flex items-center flex-col w-full gap-3">
            <div className="bg-[#F3F3F3] dark:bg-[#141415] dark:border-[#242425] border boder-[#E2E3E7] px-6 py-6 rounded-full dark:text-[#9F9F9F]  text-black">
              <i>{Icons.bankUnavilableIcon}</i>
            </div>
            <span className="font-medium  max-w-[300px] text-center text-sm text-black dark:text-[#888888]">
              This method is coming soon for this currency.
            </span>
          </div>
          <div className="mt-5">
            <ChangePaymentMethod></ChangePaymentMethod>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="w-full flex  flex-col items-center justify-center gap-5 mt-10">
          <div className="flex items-center flex-col w-full gap-3">
            <div className="bg-[#F3F3F3] dark:bg-[#141415] dark:border-[#242425] border boder-[#E2E3E7] px-6 py-6 rounded-full dark:text-[#9F9F9F]  text-black">
              <i>{Icons.bankUnavilableIcon}</i>
            </div>
            <span className="font-medium  max-w-[300px] text-center text-xs text-black dark:text-[#888888]">
              This method is coming soon for this currency.
            </span>
          </div>
          <div className="w-full flex flex-col gap-2 text-sm">
            <button
              className="w-full border border-[#E2E3E7] bg-[#F9F9F9] text-black  text-center  dark:bg-transparent py-2 dark:border-[#242425] dark:hover:border-white dark:text-[#F9F9F9] rounded-[10px] hover:border-black"
              onClick={() => setPaywith("transfer")}
            >
              Pay with Transfer
            </button>
            <button
              className="w-full border border-[#E2E3E7] text-black bg-[#F9F9F9]  text-center dark:bg-transparent  dark:border-[#242425] dark:hover:border-white dark:text-[#F9F9F9]  py-2 rounded-[10px] hover:border-black"
              onClick={() => setPaywith("stablecoin")}
            >
              Pay with Stablecoin
            </button>
          </div>
        </div>
      </div>
    );
  }
};
