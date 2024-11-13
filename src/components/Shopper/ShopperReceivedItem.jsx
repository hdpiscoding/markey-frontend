import React, {useState} from 'react';
import versace from "../../assets/versace_cologne.svg";
import ConfirmModal from "../General/ConfirmModal";

const ShopperReceivedItem = (props) => {
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    return (
        <div className="bg-White rounded-md flex flex-col gap-3 shadow">
            <div className="grid grid-cols-[85%_15%] pr-4">
                <div className="flex gap-4 col-start-1">
                    <div>
                        <img src={props.picture} alt="product_img" className="object-cover h-[100px] w-[100px] p-2"/>
                    </div>

                    <div className="flex flex-col justify-around">
                        <span className="font-semibold line-clamp-2 text-pretty break-words">
                            {props.productName ?? "Versace Cologne - Đẳng cấp từ nước Ý"}
                        </span>

                        <div className="flex items-center gap-1">
                            <span className="text-[0.8rem]">
                                Đơn giá:
                            </span>

                            <span className="text-[0.8rem] text-Red font-semibold">
                                đ {formatNumberWithDots(props.price)}
                            </span>
                        </div>

                        <span className="text-[0.8rem]">
                            Số lượng: {props.quantity}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <span className="font-semibold text-pretty text-lg text-Red">
                        đ {formatNumberWithDots(props.price * props.quantity ?? 0)}
                    </span>
                </div>
            </div>


        </div>
    );
};

export default ShopperReceivedItem;