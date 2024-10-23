import React from 'react';
import right_arrow from '../../assets/right_arrow.svg';
import left_arrow from '../../assets/left_arrow.svg';
import CategoryCardView from "./CategoryCardView";

const CategoryCarousel = () => {
    return (
        <div className="grid grid-cols-[1fr_10fr_1fr]">
            <div className="h-[200px] rounded-t-md grid grid-rows-[25%_75%] border col-start-2">
                <div className="row-start-1 flex justify-between mx-2 ml-4 my-2 items-center">
                    <div>
                    <span className="font-semibold text-xl">
                        DANH MỤC
                    </span>
                    </div>

                    <div className="flex gap-5 select-none">
                        <button
                            className="rounded-[50%] bg-Light_gray w-[40px] h-[40px] flex items-center justify-center hover:border-Blue hover:ring-2 hover:ring-Blue">
                            <img src={left_arrow} alt="arrow" className="object-cover w-5 h-5"/>
                        </button>

                        <button
                            className="rounded-[50%] bg-Light_gray w-[40px] h-[40px] flex items-center justify-center hover:border-Blue hover:ring-2 hover:ring-Blue">
                            <img src={right_arrow} alt="arrow" className="object-cover w-5 h-5"/>
                        </button>
                    </div>
                </div>

                <div className="row-start-2">
                    <ul className="flex flex-row">
                        <li className="basis-[10%]">
                            <CategoryCardView/>
                        </li>
                        <li className="basis-[10%]">
                            <CategoryCardView category="Chăm sóc da"/>
                        </li>
                        <li className="basis-[10%]">
                            <CategoryCardView category="Chăm sóc da"/>
                        </li>
                        <li className="basis-[10%]">
                            <CategoryCardView category="Chăm sóc da"/>
                        </li>
                        <li className="basis-[10%]">
                            <CategoryCardView category="Chăm sóc da"/>
                        </li>
                        <li className="basis-[10%]">
                            <CategoryCardView category="Chăm sóc tóc"/>
                        </li>
                        <li className="basis-[10%]">
                            <CategoryCardView category="Phụ kiện làm đẹp"/>
                        </li>
                        <li className="basis-[10%]">
                            <CategoryCardView category="Chăm sóc da mặt"/>
                        </li>
                        <li className="basis-[10%]">
                            <CategoryCardView category="Dụng cụ trang điểm"/>
                        </li>
                        <li className="basis-[10%]">
                            <CategoryCardView category="Trang điểm"/>
                        </li>
                        <li className="basis-[10%]">
                            <CategoryCardView category="Chăm sóc cơ thể"/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default CategoryCarousel;