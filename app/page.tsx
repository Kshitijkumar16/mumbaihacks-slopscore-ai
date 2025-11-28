import LogsComponent from "@/components/layout/logscomponent";
import MainComponent from "@/components/layout/main-component";
import React from "react";

const RootPage = () => {
  return (
    <div className="flex justify-between h-screen w-screen bg-[#161617] ">
      <div className="max-w-[310px] w-full"></div>
      <div className="w-full h-full pt-[12px]">
        <div className="bg-black rounded-[12px] h-full">
          <MainComponent/>
        </div>
      </div>
      <div className="max-w-[calc(264px+12px+12px)] h-full w-full p-[12px]">
        <div className="bg-black w-full h-full rounded-[8px]">
          <LogsComponent/>
        </div>
      </div>
    </div>
  );
};

export default RootPage;
