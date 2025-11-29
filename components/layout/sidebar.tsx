import { icons } from "@/constants";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen flex flex-col justify-between">
      <p className="text-[24px] font-pixel text-white py-[16px] shrink-0">
        Slopscore.ai
      </p>
      {/* devfolio link */}
      <Link
        className="flex mt-2 justify-between gap-x-[12px] shrink-0"
        href={"/"}
      >
        <div className="flex py-[8px] px-[12px] rounded-[12px] border border-white gap-x-[12px] w-full h-[40px] items-center">
          <Image src={icons.devfolio} alt="" />
          <p className="text-white font-mona text-[14px]">
            Devfolio submission
          </p>
        </div>

        <div className="flex justify-center items-center border border-white h-[40px] w-[40px] rounded-[12px] aspect-square bg-[#272728]">
          {" "}
          <ArrowRight className="text-white stroke-1 size-[20px] -rotate-45" />
        </div>
      </Link>

      {/* links */}
      <div className="mt-[28px] shrink-0 flex flex-col gap-y-[12px]">
        <Link
          href={"/"}
          className={pathname === "/" ? "opacity-100" : "opacity-40"}
        >
          <div className="gap-x-[16px] flex items-center">
            <Image
              src={icons.speedometer}
              alt=""
              className="text-white size-[16px]"
            />
            <p className="text-white font-mona">Dashboard</p>
          </div>
        </Link>
        <Link
          href={"/mission"}
          className={pathname === "/mission" ? "opacity-100" : "opacity-40"}
        >
          <div className="gap-x-[16px] flex items-center">
            <Image src={icons.flag} alt="" className="text-white size-[16px]" />
            <p className="text-white font-mona">Our mission</p>
          </div>
        </Link>
        <Link
          href={"/agents"}
          className={pathname === "/agents" ? "opacity-100" : "opacity-40"}
        >
          <div className="gap-x-[16px] flex items-center">
            <Image
              src={icons.ninjaStar}
              alt=""
              className="text-white size-[16px]"
            />
            <p className="text-white font-mona">AI Agents</p>
          </div>
        </Link>
        <Link
          href={"/mvp-scope"}
          className={pathname === "/mvp-scope" ? "opacity-100" : "opacity-40"}
        >
          <div className="gap-x-[16px] flex items-center">
            <Image
              src={icons.target}
              alt=""
              className="text-white size-[16px]"
            />
            <p className="text-white font-mona">MVP Scope</p>
          </div>
        </Link>
      </div>
      {/* agents workflow */}
      {/* <div className="mt-[32px] h-full">
          <div className="gap-x-[16px] flex items-center pb-[12px] border-b border-b-white/20">
            <Image
              src={icons.group}
              alt=""
              className="text-white size-[20px]"
            />
            <p className="text-white font-mona">Agents workflow</p>
          </div>
        </div> */}

      <div className="h-full"></div>

      {/* See videos button */}
      <div className="mt-[32px] flex gap-x-[12px]"></div>

      {/* Team Section */}
      <div className="mt-[28px]">
        <div className="flex justify-between items-center mb-[12px]"></div>

        <div className="w-full h-[1px] bg-white/20 mb-[24px]" />

        {/* Profile Card */}
        <div className="flex items-center gap-x-[16px]"></div>

        <div className="w-full h-[1px] bg-white/20 mt-[24px] mb-[24px]" />

        <p className="text-white/60 font-mona text-[14px] leading-[160%]">
          Current goal: Get selected in Top 5.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
