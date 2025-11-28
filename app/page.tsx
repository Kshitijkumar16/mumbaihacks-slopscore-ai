"use client";

import LogsComponent from "@/components/layout/logscomponent";
import MainComponent from "@/components/layout/main-component";
import Sidebar from "@/components/layout/sidebar";
import { icons } from "@/constants";
import { ArrowRight, ArrowDown, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const RootPage = () => {
  return (
    <div className="flex justify-between h-screen w-screen bg-[#161617] overflow-hidden">
      <div className="max-w-[310px] w-full pl-[28px] pr-[24px] pt-[12px] flex flex-col pb-[24px]">
        <Sidebar />
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
