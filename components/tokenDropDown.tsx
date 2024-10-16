import { Icons } from "@/app/icons";
import { Tokens } from "@/constants/token";
import { useDevice } from "@/contexts/DeviceContext";
import { usePaymentLinkMerchantContext } from "@/contexts/PaymentLinkMerchantContext";
import Image from "next/image";
import { useState } from "react";
import { SkeletonLoader } from "./UI Helper/skeletonLoader";
export const TokensDropDown = ({ disabled }: any) => {
  const [dropDown, setDropDown] = useState(false);
  const { setToken, token, setIsSuccessful, setIsConfirming, loading } =
    usePaymentLinkMerchantContext();
  const { isMobile } = useDevice();
  if (isMobile) {
    return (
      <div className="relative w-fit select-none">
        {loading ? (
          <div className="border border-[#E2E3E7] text-black dark:text-white dark:bg-[#101113]  dark:border-[#242425] dark:hover:border-white px-2 py-2 flex items-center gap-2 hover:border-black cursor-pointer rounded-md">
            <SkeletonLoader classes={"w-[80px] rounded h-5"}></SkeletonLoader>
          </div>
        ) : (
          <div
            className={`border border-[#E2E3E7] text-black dark:text-white dark:bg-[#101113]  dark:border-[#242425] px-2 py-2 flex items-center gap-2  rounded-md 
              ${disabled ? "cursor-default" : "cursor-pointer hover:border-black dark:hover:border-white"}`}
            onClick={() => setDropDown(!dropDown)}
          >
            <Image
              src={token.image}
              alt={"flag"}
              width={20}
              height={20}
              priority
            />
            <span className="font-medium text-sm">{token.name}</span>
            <i>{Icons.chevron_down}</i>
          </div>
        )}
        {dropDown && !disabled && (
          <div>
            <div
              className="bg-black w-screen h-screen fixed top-0 left-0 opacity-0"
              onClick={() => setDropDown(false)}
            ></div>
            <div
              className={`absolute left-0 w-full -bottom-1 pt-1 drop-shadow-xl z-10 border dark:bg-[#101113] dark:border-[#242425] border-[#E2E3E7] translate-y-full bg-white max-h-[200px] overflow-y-auto rounded-md
              
              `}
            >
              {Tokens.sort((a, b) =>
                a.status === "available" ? -1 : b.status === "available" ? 1 : 0
              ).map((tok, index) => (
                <div
                  key={index}
                  className={`flex items-center border-b dark:text-white dark:border-[#242425] border-[#E2E3E7]
        py-2 px-2 gap-2 text-black cursor-pointer ${
          tok.status === "available"
            ? "hover:bg-[#EDEEF1] dark:hover:bg-[#2A2A2A]"
            : "opacity-30"
        } `}
                  onClick={
                    tok.status == "available"
                      ? () => {
                          setToken(tok);
                          setDropDown(false);
                          setIsConfirming(false);
                          setIsSuccessful(false);
                        }
                      : () => {}
                  }
                >
                  <Image
                    src={tok.image}
                    alt={`${tok.name} icon`}
                    width={22}
                    height={22}
                    priority
                  />
                  <span className="font-semibold text-sm">{tok.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="relative w-fit select-none">
        {loading ? (
          <div className="border border-[#E2E3E7] text-black dark:text-white dark:bg-[#101113]  dark:border-[#242425] dark:hover:border-white px-2 py-1 flex items-center gap-2 hover:border-black cursor-pointer rounded-md">
            <SkeletonLoader classes={"h-5 rounded w-[80px]"}> </SkeletonLoader>
          </div>
        ) : (
          <div
            className={`border border-[#E2E3E7] text-black dark:text-white dark:bg-[#101113]  dark:border-[#242425]  px-2 py-1 flex items-center gap-2  rounded-md ${disabled ? "cursor-default" : "cursor-pointer hover:border-black dark:hover:border-white"}`}
            onClick={() => setDropDown(!dropDown)}
          >
            <Image
              src={token.image}
              alt={"flag"}
              width={18}
              height={18}
              priority
            />
            <span className="font-medium text-[11px]">{token.name}</span>
            <i>{Icons.chevron_down}</i>
          </div>
        )}
        {dropDown && !disabled && (
          <div>
            <div
              className="bg-black w-screen h-screen fixed top-0 left-0 opacity-0"
              onClick={() => setDropDown(false)}
            ></div>
            <div className="absolute left-0 w-full -bottom-1 pt-1 drop-shadow-xl z-10 border dark:bg-[#101113] dark:border-[#242425] border-[#E2E3E7] translate-y-full bg-white max-h-[200px] overflow-y-auto rounded-md">
              {Tokens.sort((a, b) =>
                a.status === "available" ? -1 : b.status === "available" ? 1 : 0
              ).map((tok, index) => (
                <div
                  key={index}
                  className={`flex items-center border-b dark:text-white dark:border-[#242425] border-[#E2E3E7]
        py-1 px-2 gap-2 text-black cursor-pointer ${
          tok.status == "available"
            ? "hover:bg-[#EDEEF1]  dark:hover:bg-[#2A2A2A]"
            : "opacity-30 "
        } `}
                  onClick={
                    tok.status == "available"
                      ? () => {
                          setToken(tok);
                          setDropDown(false);
                          setIsConfirming(false);
                          setIsSuccessful(false);
                        }
                      : () => {}
                  }
                >
                  <Image
                    src={tok.image}
                    alt={`${tok.name} icon`}
                    width={20}
                    height={20}
                    priority
                  />
                  <span className="font-semibold text-[10px]">{tok.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
};
