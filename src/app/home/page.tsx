import {LeftFilter} from "@/components/LeftFilter";
import {Ads} from "@/components/Ads";
import {LeftFilterProvider} from "@/components/LeftFilterProvider";
import {ShowHIdeCategories} from "@/components/ShowHideCategories";

export default function Home() {

    return (
        <LeftFilterProvider>
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
                    <ShowHIdeCategories/>
                    <LeftFilter/>
                    <Ads/>
                </div>
            </div>
        </LeftFilterProvider>
    )
}
