import React from 'react';
import sample_blog from '../../assets/sample_blog.png';
import clock from '../../assets/clock.svg';
import {useNavigate} from "react-router-dom";

const BlogListViewMd = (props) => {
    const navigate = useNavigate();

    const handleClick = (blogId) => {
        if (props.role === "shopper") {
            navigate(`/shopper/blog/${blogId}`);
        }
        else{
            navigate(`/salesman/view-blog/${blogId}`);
        }

    }

    return (
        <article className="bg-White h-[130px] w-auto rounded-md">
            <div className="grid grid-cols-[30%_70%]">
                <div className="col-start-1 select-none">
                    <img src={sample_blog} alt="blog" className="object-cover h-[130px] rounded-l-md"/>
                </div>

                <div className="col-start-2 mx-4 py-2">
                    <div className="flex flex-col gap-2">
                        <div className="cursor-pointer">
                            <span className="font-sans font-semibold text-lg text-pretty hover:text-Blue" onClick={() => handleClick(props.id)}>
                                {props.title ?? "Nước tẩy trang Simple có tốt không? Review chi tiết từng loại conasodashjdjkdhjksdhfjksdjgfdsjhgwelhuirkfhjvxmcbvxbgjwehrtiuhfjs"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-[0.75rem]">
                                Danh mục:
                            </span>

                            <span className="text-Blue font-semibold text-[0.75rem]">
                                {props.category ?? "Tẩy trang"}
                            </span>
                        </div>

                        <div className="flex items-center gap-10">
                            <div className="flex gap-2 items-center">
                                <span className="text-[0.75rem] text-Dark_gray">
                                    Tác giả:
                                </span>

                                <span className="text-Blue font-bold text-[0.75rem]">
                                    {props.author ?? "Orchid Down"}
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <div>
                                    <img src={clock} alt="clock" className="object-cover h-2.5 w-2.5"/>
                                </div>

                                <span className="text-[0.75rem] text-Dark_gray">
                                {props.date ?? "18/04/2024"}
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default BlogListViewMd;