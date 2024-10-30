import React from 'react';
import AccountNav from "./AccountNav";
import versace from "../../assets/versace_cologne.svg";
import RatingModal from "./RatingModal";

const OrderItem = (props) => {
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    const [isRating, setIsRating] = React.useState(false);

    const [open, setOpen] = React.useState(false);

    return (
        <div className="bg-White rounded-md flex flex-col gap-3 shadow">
            <div className="flex flex-col px-4 py-2 gap-1">
                <div>
                    <span
                        className="font-semibold text-xl text-Blue">{props.status ?? "CHỜ DUYỆT HÀNG"}</span>
                </div>

                <div className="border-t-2 w-full border-Dark_gray"></div>
            </div>

            <div className="grid grid-cols-[85%_15%] px-4">
                <div className="flex gap-4 col-start-1">
                    <div>
                        <img src={versace} alt="product_img" className="object-cover h-[100px] w-[100px]"/>
                    </div>

                    <div className="flex flex-col justify-around">
                        <span className="font-semibold line-clamp-2 text-pretty break-words">
                            {props.productName ?? "Versace Cologne - Đẳng cấp từ nước Ý"}
                        </span>

                        <span className="text-sm">
                            Số lượng: {props.quantity ?? 10}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <span className="font-semibold text-pretty text-lg text-Red">
                        đ {formatNumberWithDots(props.price) ?? formatNumberWithDots(1000000)}
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-end px-4">
                <div className="flex flex-row-reverse items-center gap-5">
                    <span className="text-Red text-xl font-bold">
                        đ {formatNumberWithDots((props.price * props.quantity)) ?? formatNumberWithDots(10000000)}
                    </span>

                    <span className="text-Black">
                        Thành tiền:
                    </span>
                </div>
            </div>

            <div className="flex flex-row-reverse items-end gap-8 px-4 pb-4">
                <div>
                    <button className="bg-Blue hover:bg-Dark_blue rounded-md text-center px-6 py-1.5">
                            <span className="text-White">
                                Mua lại
                            </span>
                    </button>
                </div>

                {props.status === "CHƯA THANH TOÁN"
                    ?
                    <div>
                        <button className="bg-Red hover:bg-Light_red rounded-md text-center px-6 py-1.5">
                                <span className="text-White">
                                    Thanh toán
                                </span>
                        </button>
                    </div>
                    : null}

                {props.status === "ĐÃ NHẬN HÀNG"
                    ?
                    <div>
                        <button
                            className="bg-Lighter_blue border border-Blue hover:bg-Lighterter_blue rounded-md text-center px-6 py-1.5"
                            onClick={() => {setOpen(true)}}>
                                <span className="text-Blue">
                                    {isRating ? "Đã đánh giá" : "Đánh giá"}
                                </span>
                        </button>
                    </div>
                    : null}
            </div>

            <div>
                <RatingModal open={open} onClose={() => setOpen(false)} productID={props.id} productName={props.name} isRating={isRating}/>
            </div>
        </div>
    );
}

export default OrderItem;