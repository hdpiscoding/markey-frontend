import React from "react";
import sample from "../../assets/versace_cologne.svg";
import sample2 from "../../assets/pretty_skin.svg"

const Product = (props) => {
    return (
        <div className="bg-White border h-[300px] w-[200px] select-none cursor-pointer duration-100 ease-sharp-motion-curve hover:shadow-hover active:shadow-active hover:-translate-y-[1px] active:translate-y-0 hover:border-Blue hover:ring-Blue hover:ring-2">
            <div className="grid grid-rows-[200px_50px_50px]">
                <div className="row-start-1 flex items-center justify-center mb-1">
                    <img src={props.image ?? sample2} alt="Product" className="object-cover w-[200px] h-[200px]"/>
                </div>

                <div className="row-start-2 line-clamp-2 break-words overflow-hidden px-1.5">
                    <span>
                        {props.name ?? "Sample Product"}
                    </span>
                </div>

                <div className="row-start-3 flex justify-between items-center px-1.5">
                    <div>
                        <span className="text-Red text-lg font-sans font-semibold">
                            ₫ {props.price}700.000.000
                        </span>
                    </div>

                    <div>
                        <span className="text-[0.65rem] font-sans">
                            Đã bán {props.sold}77k
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;