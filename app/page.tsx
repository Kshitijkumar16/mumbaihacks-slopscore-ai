"use client";

import LogsComponent from "@/components/layout/logscomponent";
import MainComponent from "@/components/layout/main-component";
import { icons } from "@/constants";
import { ArrowRight, ArrowDown, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RootPage = () => {
  return (
    <div className="flex justify-between h-screen w-screen bg-[#161617] overflow-hidden">
      <div className="max-w-[310px] w-full pl-[28px] pr-[24px] pt-[12px] flex flex-col pb-[24px]">
        <p className="text-[20px] font-pixel text-white py-[16px] shrink-0">
          Slopscore.ai
        </p>

        <Link
          className="flex mt-4 justify-between gap-x-[12px] shrink-0"
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
          <Link href={"/"} className="">
            <div className="gap-x-[16px] flex items-center">
              <Image
                src={icons.speedometer}
                alt=""
                className="text-white size-[16px]"
              />
              <p className="text-white font-mona">Dashboard</p>
            </div>
          </Link>
          <Link href={"/mission"} className="">
            <div className="gap-x-[16px] flex items-center">
              <Image
                src={icons.flag}
                alt=""
                className="text-white size-[16px]"
              />
              <p className="text-white font-mona">Our mission</p>
            </div>
          </Link>
          <Link href={"/agents"} className="">
            <div className="gap-x-[16px] flex items-center">
              <Image
                src={icons.ninjaStar}
                alt=""
                className="text-white size-[16px]"
              />
              <p className="text-white font-mona">AI Agents</p>
            </div>
          </Link>
          <div className="gap-x-[16px] flex items-center">
            <Image
              src={icons.target}
              alt=""
              className="text-white size-[16px]"
            />
            <p className="text-white font-mona">MVP Scope</p>
          </div>
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
        <div className="mt-[32px] flex gap-x-[12px]">
          <button className="h-[36px] px-[12px] bg-white rounded-[12px] flex items-center justify-center w-full">
            <p className="text-black font-mona text-[13px] font-medium whitespace-nowrap">
              See videos we've tested so far
            </p>
          </button>
          <div className="h-[36px] w-[36px] rounded-[12px] border border-white/20 flex items-center justify-center shrink-0">
            <ArrowDown className="text-white size-[20px] stroke-1" />
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-[28px]">
          <div className="flex justify-between items-center mb-[12px]">
            <div className="flex items-center gap-x-[12px]">
              <Image
                src={icons.group}
                alt=""
                className="text-white size-[20px]"
              />
              <p className="text-[16px] text-white font-mona">Team</p>
            </div>
            <div className="flex gap-x-[16px]">
              <ArrowLeft className="text-white/40 size-[20px]" />
              <ArrowRight className="text-white/40 size-[20px]" />
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/20 mb-[24px]" />

          {/* Profile Card */}
          <div className="flex items-center gap-x-[16px]">
            <div className="h-[40px] w-[40px] rounded-full overflow-hidden bg-gray-500 shrink-0 relative">
              {/* Placeholder for profile image */}
              <Image
                src={icons.devfolio}
                alt="Rayna Mayya"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-white font-mona text-[15px]">Anish Tilloo</p>
              <p className="whitespace-nowrap text-white/60 font-mona text-[14px]">
                Full stack dev at Claim Genius
              </p>
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/20 mt-[24px] mb-[24px]" />

          <p className="text-white/60 font-mona text-[14px] leading-[160%]">
            Design tailored to showcase our MVP. <br />
            Current goal: Get selected in Top 5.
          </p>
        </div>
      </div>

      <div className="w-full h-full pt-[12px]">
        <div className="bg-black rounded-[12px] h-full">
          <MainComponent />
        </div>
      </div>
      <div className="max-w-[calc(264px+12px+12px)] h-full w-full p-[12px]">
        <div className="bg-black w-full h-full rounded-[8px]">
          <LogsComponent />
        </div>
      </div>
    </div>
  );
};

export default RootPage;
