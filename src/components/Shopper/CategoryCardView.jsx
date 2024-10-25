import React from 'react';
import sample_category from '../../assets/male_fashion.png';

const CategoryCardView = (props) => {
    return (
        <div className="flex h-[150px] select-none">
            <div className="h-full min-w-full border grid grid-rows-[70%_30%] cursor-pointer duration-100 ease-sharp-motion-curve hover:shadow-hover active:shadow-active hover:-translate-y-[1px] active:translate-y-0 hover:border-Blue hover:ring-Blue hover:ring-1">
                <div className="flex items-center justify-center">
                    <img src={props.img ?? sample_category} alt="Category" className="object-cover h-[80px]"/>
                </div>

                <div className="text-center flex items-center justify-center font-semibold mx-2">
                        <span className="text-[0.8rem] text-pretty">
                            {props.category ?? "Chăm sóc toàn thân"}
                        </span>
                </div>
            </div>
        </div>
    );
};

export default CategoryCardView;