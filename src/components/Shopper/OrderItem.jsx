import React, {useEffect} from 'react';
import RatingModal from "./RatingModal";
import useLocalStorage from "../General/useLocalStorage";
import {instance} from "../../AxiosConfig";

const OrderItem = (props) => {
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number?.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    const userIdStorage = useLocalStorage("userId");
    const [ratingId, setRatingId] = React.useState(null);

    const [isRating, setIsRating] = React.useState(null);

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        const checkRating = async () => {
            try {
                const response = await instance.get(`v1/shopping-service/product-rating/have-rated?productId=${props.productId}&shopperId=${userIdStorage.get()}`);
                setIsRating(true);
                setRatingId(response.data.data.id);
                console.log(props.productId + " " + userIdStorage.get());
            }
            catch (error) {
                setIsRating(false);
                console.log(error);
            }
        }

        checkRating();
    }, []);

    useEffect(() => {
        //console.log(isRating + " " + rating + " " + comment);
    }, [isRating]);

    const handleRate = () => {
        const checkRating = async () => {
            try {
                const response = await instance.get(`v1/shopping-service/product-rating/have-rated?productId=${props.productId}&shopperId=${userIdStorage.get()}`);
                setIsRating(true);
                setRatingId(response.data.data.id);
            }
            catch (error) {
                setIsRating(false);
                console.log(error);
            }
        }

        checkRating();
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

            {props.status?.toLowerCase() === "hoàn thành"
                ?
                <div className="flex flex-row-reverse w-full pr-3">
                    <button className="bg-Lighter_blue border border-Blue hover:bg-Lighterter_blue rounded-md text-center px-6 py-1.5"
                            onClick={() => {
                                setOpen(true)
                            }}>
                        <span className="text-Blue">
                            {isRating ? "Xem đánh giá" : "Đánh giá"}
                        </span>
                    </button>
                </div>
                : null}

            <div>
                <RatingModal open={open} onClose={() => setOpen(false)} productId={props.productId} picture={props.picture}
                             productName={props.productName} isRating={isRating} ratingId={ratingId} onRate={handleRate}/>
            </div>
        </div>
    );
}

export default OrderItem;