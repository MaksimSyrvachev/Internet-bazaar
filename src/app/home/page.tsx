import React from "react";
import {LeftFilter} from "@/components/LeftFilter";
import {Ads} from "@/components/Ads";

export default function Home() {

  return (
      <div className="flex">
        <div className="w-1/6">
          <LeftFilter/>
        </div>
        <Ads/>
      </div>
  )
}
