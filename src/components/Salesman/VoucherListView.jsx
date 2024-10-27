import React from 'react';
import SalesmanNav from "./SalesmanNav";

const VoucherListView = (props) => {
    return (
        <div className="bg-White w-[320px] h-[90px] border cursor-pointer duration-100 ease-sharp-motion-curve hover:shadow-hover active:shadow-active hover:-translate-y-[1px] active:translate-y-0 hover:border-Blue hover:ring-Blue hover:ring-2">
            <div className="grid grid-cols-[30%_70%] w-full h-full">
                <div className="col-start-1 bg-Blue flex items-center justify-center">
                    <span className="text-White font-semibold">
                        {props.discount ?? "30"}% OFF
                    </span>
                </div>

                <div className="col-start-2 px-2 flex flex-col justify-around">
                    <span className="font-semibold line-clamp-1 break-words">
                        {props.name ?? "Voucher mùa xuân"}
                    </span>

                    <span className="text-sm line-clamp-1 break-words">
                        Code: {props.code ?? "GPMN-1975"}
                    </span>

                    <span className="text-sm line-clamp-1 break-words">
                        Số lượng: {props.quantity ?? "10"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default VoucherListView;