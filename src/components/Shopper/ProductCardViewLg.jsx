import React from "react";
import { IoMdStar } from "react-icons/io";
import {useNavigate} from "react-router-dom";

const ProductCardViewLg = (props) => {
    const navigate = useNavigate();
    // format number with dots
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    };

    const handleClick = (productId) => {
        navigate(`/shopper/product/${productId}`);
    }

    return (
        <div className="bg-White border h-[300px] w-[200px] select-none cursor-pointer duration-100 ease-sharp-motion-curve hover:shadow-hover active:shadow-active hover:-translate-y-[1px] active:translate-y-0 hover:border-Blue hover:ring-Blue hover:ring-2" onClick={() => handleClick((props.id))}>
            <div className="grid grid-rows-[200px_50px_50px]">
                <div className="row-start-1 flex items-center justify-center mb-1">
                    <img src={props.picture} alt="ProductCardViewLg" className="object-cover w-[200px] h-[200px]"/>
                </div>

                <div className="row-start-2 line-clamp-2 break-words overflow-hidden px-1.5">
                    <span>
                        {props.name ?? "Sample ProductCardViewLg"}
                    </span>
                </div>

                <div className="row-start-3 flex justify-between items-center px-1.5">
                    <div>
                        <span className="text-Red text-lg font-sans font-bold">
                            ₫ {formatNumberWithDots(props.price) ?? formatNumberWithDots(100000)}
                        </span>
                    </div>

                    <div className="flex items-center">
                        <span className="text-[0.75rem] font-sans text-Star font-semibold">
                            {props.rating ?? "5.0"}/5.0
                        </span>

                        <IoMdStar className="text-Star"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardViewLg;