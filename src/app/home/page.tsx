"use client"

import React, {useState} from "react";
import {LeftFilter} from "@/components/LeftFilter";
import {Ads} from "@/components/Ads";

export default function Home() {

    const [showLeftFilter, setShowLeftFilter] = useState<boolean>(false)

    return (
        <div className="w-full">
            <div className="hidden md:flex space-x-2">
                <div className="flex-grow-0 w-72 h-auto">
                    <LeftFilter/>
                </div>
                <div className="flex-grow">
                    <Ads/>
                </div>
            </div>
            <div className="flex-col md:hidden space-x-2">
                <button className="underline ms-5" onClick={() => setShowLeftFilter(!showLeftFilter)}>
                    {showLeftFilter ? "Hide categories" : "Show categories"}
                </button>
                {showLeftFilter && <LeftFilter/>}
                <Ads/>
            </div>
        </div>
    )
}
