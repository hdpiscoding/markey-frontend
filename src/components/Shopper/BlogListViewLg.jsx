import React from 'react';
import sample_blog from '../../assets/sample_blog.png';
import clock from '../../assets/clock.svg';
import {useNavigate} from "react-router-dom";

const BlogListViewLg = (props) => {
    const formatDateTime = (inputDateTime) => {
        // Tách chuỗi ngày và thời gian
        const [date, time] = inputDateTime.split(' ');
        // Tách chuỗi ngày thành các phần tử năm, tháng, ngày
        const [year, month, day] = date.split('-');
        // Trả về chuỗi ngày theo định dạng DD/MM/YYYY HH:MM:SS
        return `${day}/${month}/${year} ${time}`;
    }

    const navigate = useNavigate();

    const handleClick = (blogId) => {
        if (props.role === "shopper") {
            navigate(`/shopper/blog/${blogId}`);
        }
        else {
            navigate(`/salesman/view-blog/${blogId}`);
        }

    }
    return (
        <article className="bg-White h-[200px] w-auto rounded-md">
            <div className="grid grid-cols-[30%_70%]">
                <div className="col-start-1 select-none">
                    <img src={props.picture} alt="blog" className="object-cover h-[200px] w-full rounded-l-md"/>
                </div>

                <div className="col-start-2 mx-4">
                    <div className="flex flex-col gap-4 py-2">
                        <div className="cursor-pointer">
                            <span className="font-sans font-semibold text-2xl text-pretty hover:text-Blue" onClick={() => handleClick(props.id)}>
                                {props.title ?? "Nước tẩy trang Simple có tốt không? Review chi tiết từng loại conasodashjdjkdhjksdhfjksdjgfdsjhgwelhuirkfhjvxmcbvxbgjwehrtiuhfjs"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span>
                                Danh mục:
                            </span>

                            <span className="text-Blue font-semibold">
                                {props.category ?? "Tẩy trang"}
                            </span>
                        </div>

                        <div className="flex items-center gap-10">
                            <div className="flex gap-2 items-center">
                                <span className="text-[0.875rem] text-Dark_gray">
                                    Tác giả:
                                </span>

                                <span className="text-Blue font-bold">
                                    {props.author ?? "Orchid Down"}
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <div>
                                    <img src={clock} alt="clock" className="object-cover h-3 w-3"/>
                                </div>

                                <span className="text-[0.875rem] text-Dark_gray">
                                    {formatDateTime(props.date) ?? "18/04/2024"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogListViewLg;