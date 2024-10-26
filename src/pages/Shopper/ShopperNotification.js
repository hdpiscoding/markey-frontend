import React from 'react';
import {AiFillPrinter} from "react-icons/ai";
import PrimaryHeader from "../../components/General/PrimaryHeader";
import Footer from "../../components/General/Footer";
import AccountNav from "../../components/Shopper/AccountNav";
import { PiBellZLight } from "react-icons/pi";

const ShopperNotification = () => {
    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <PrimaryHeader/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <AccountNav currentPage={5}/>
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4">
                        <div className="flex flex-col justify-center gap-2">
                            <div>
                                <span className="font-semibold text-[2rem]">Thông báo của tôi</span>
                            </div>

                            <div className="border-t-2 w-full text-Dark_gray"></div>
                        </div>

                        <div className="flex flex-col items-center justify-center py-3">
                            <PiBellZLight className="text-Dark_gray h-[80px] w-[80px]"/>

                            <span className="text-Dark_gray">
                                Hiện tại bạn không có thông báo nào
                            </span>
                        </div>
                    </div>

                </div>

            </main>

            <Footer/>
        </div>
    );
};

export default ShopperNotification;