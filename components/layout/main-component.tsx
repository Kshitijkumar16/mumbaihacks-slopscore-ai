import { icons } from "@/constants";
import Image from "next/image";

const MainComponent = () => {
  return (
    <div className="">
      <div className="flex items-center gap-x-[12px] py-[16px] px-[20px] border-b border-b-white/20">
        <Image
          alt=""
          src={icons.speedometer}
          className="text-white size-[16px] translate-y-px"
        />
        <d
        <p className="font-mona text-[16px] text-white">Dashboard</p>
      </div>
    </div>
  );
};

export default MainComponent;
