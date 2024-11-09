import React from 'react';
import versace from "../../assets/versace_cologne.svg";

const SalemansOrderItem = (props) => {
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    const handleApprove = () => {
        // Call API to update status of the order to "DELIVERING"

        // Callback to re-render the list of orders
        props.onApprove();
    }

    return (
        <div className="bg-White rounded-md flex flex-col gap-3 shadow">
            <div className="grid grid-cols-[85%_15%] px-4">
                <div className="flex gap-4 col-start-1">
                    <div>
                        <img src={versace} alt="product_img" className="object-cover h-[100px] w-[100px]"/>
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
                                đ {formatNumberWithDots(props.price ?? 100000)}
                            </span>
                        </div>


                        <span className="text-[0.8rem]">
                            Số lượng: {props.quantity ?? 10}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <span className="font-semibold text-pretty text-xl text-Red">
                        đ {formatNumberWithDots(props.price * props.quantity ?? 1000000)}
                    </span>
                </div>
            </div>

            <div className="flex flex-row-reverse items-end gap-8 px-4 pb-4 select-none">
                <div>
                    <button className="bg-Blue hover:bg-Dark_blue rounded-md text-center px-6 py-1.5" onClick={handleApprove}>
                        <span className="text-White">
                            Duyệt
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SalemansOrderItem;