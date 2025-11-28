import { icons } from "@/constants";
import Image from "next/image";

const MainComponent = () => {
  return (
    <div className="">
      <div className="flex w-full justify-between">
        {/* left */}
        <div className="flex items-center gap-x-[8px] py-[16px] px-[20px] border-b border-b-white/20 w-full">
          <Image
            alt=""
            src={icons.speedometer}
            className="text-white size-[16px] translate-y-px"
          />
          <div className="h-[22px] w-[2px] ml-[20px] mr-[16px] bg-white/20" />
          <p className="font-mona text-[16px] text-white">Dashboard</p>
        </div>

        {/* right */}
        <div>
          <p className=""></p>
        </div>
      </div>

      <div className="mt-[48px]">
        <div className="flex flex-col justify-center items-center">
          <p className="font-pixel whitespace-nowrap text-[40px] text-white">
            LOOK BEFORE YOU LEAP
          </p>
          <p className="font-mona whitespace-nowrap text-[16px] text-white/40">
            Know if the content's correct & trustworthy before consuming it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
