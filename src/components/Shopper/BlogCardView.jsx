import React from 'react';
import sample_blog from '../../assets/sample_blog.png';
import clock from '../../assets/clock.svg';
import {useNavigate} from "react-router-dom";

const BlogCardView = (props) => {
    const navigate = useNavigate();

    const handleClick = (blogId) => {
        navigate(`/shopper/blog/${blogId}`);
    }
    return (
        <div className="bg-White rounded-md border h-[250px] w-[300px] select-none cursor-pointer duration-100 ease-sharp-motion-curve hover:shadow-hover active:shadow-active hover:-translate-y-[1px] active:translate-y-0 hover:border-Blue hover:ring-Blue hover:ring-2" onClick={() => handleClick(props.id)}>
            <div className="grid grid-rows-[150px_50px_50px]">
                <div className="row-start-1 flex relative">
                    <img src={sample_blog} alt="BlogCardView" className="object-cover rounded-t-md"/>

                    <div className="absolute right-1 bg-Green_blue mt-1 flex items-center justify-center rounded-md">
                        <span className="text-White text-[0.75rem] font-sans font-semibold px-2 py-[0.2rem]">
                            {props.category ?? "Sample Category"}
                        </span>
                    </div>
                </div>

                <div className="px-1.5 mt-1">
                    <div className="row-start-2 line-clamp-2 break-words overflow-hidden">
                        <span className="font-sans font-semibold">
                            {props.title ?? "Nước tẩy trang Simple có tốt không? Review chi tiết từng loại"}
                        </span>
                    </div>
                </div>

                <div className="px-1.5 mt-1 flex items-center gap-3">
                    <div className="flex items-center justify-center">
                        <span className="font-sans text-[0.75rem] text-Dark_gray">
                            Tác giả:
                            <span className="text-Blue font-bold"> {props.author ?? "Orchid Down"}</span>
                        </span>
                    </div>

                    <div className="flex items-center justify-center gap-0.5">
                        <div>
                            <img src={clock} alt="clock" className="object-cover h-3 w-3"/>
                        </div>

                        <div className="flex items-center justify-center">
                            <span className="text-Dark_gray text-[0.75rem]">
                                {props.date ?? "18/04/2024"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCardView;