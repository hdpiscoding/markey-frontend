import React from "react";
import {IoMdStar} from "react-icons/io";
import {useNavigate} from "react-router-dom";

const ProductCardViewMd = (props) => {
    const navigate = useNavigate();
    //const [pictures, setPictures] = React.useState(props.picture);
    // format number with dots
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    };

    // convert number (k, m, b)
    const convertNumber = (number) => {
        if (number >= 1e9) {
            return (number / 1e9).toFixed(1).replace(/\.0$/, '') + 'T';
        } else if (number >= 1e6) {
            return (number / 1e6).toFixed(1).replace(/\.0$/, '') + 'Tr';
        } else if (number >= 1e3) {
            return (number / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
        } else {
            return number.toString();
        }
    };

    const handleClick = (productId) => {
        if(props.role === "shopper")
        {
            navigate(`/shopper/product/${productId}`);
        }
        else{
            navigate(`/salesman/view-product/${productId}`);
        }

    }

    return (
        <div>
            <div className="bg-White border h-[300px] w-[190px] select-none cursor-pointer duration-100 ease-sharp-motion-curve hover:shadow-hover active:shadow-active hover:-translate-y-[1px] active:translate-y-0 hover:border-Blue hover:ring-Blue hover:ring-2" onClick={() => handleClick(props.id)}>
                <div className="grid grid-rows-[200px_50px_50px]">
                    <div className="row-start-1 flex items-center justify-center mb-1">
                        <img src={props.picture} alt="ProductCardViewLg"
                             className="object-cover w-[200px] h-[200px]"/>
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
                            {(props.rating)?.toFixed(1) ?? "0.0"}/5.0
                        </span>

                            <IoMdStar className="text-Star"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCardViewMd;