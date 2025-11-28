import { icons } from "@/constants";
import { List } from "lucide-react";
import Image from "next/image";
import React from "react";

const LogsComponent = () => {
  return (
    <div className="w-full h-full">
      <div className="flex items-center gap-x-[12px] py-[16px] px-[20px] border-b border-b-white/20">
        <Image alt="" src={icons.logslist} className="text-white size-[18px] translate-y-px" />
        <p className="font-mona text-[16px] text-white">Logs</p>
      </div>
    </div>
  );
};

export default LogsComponent;
