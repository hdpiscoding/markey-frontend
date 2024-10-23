import React from 'react';
import sample_blog from '../../assets/sample_blog.png';
import clock from '../../assets/clock.svg';

const BlogListViewLg = (props) => {
    return (
        <article className="bg-White h-[200px] w-auto">
            <div className="grid grid-cols-[30%_70%]">
                <div className="col-start-1 select-none">
                    <a href="#">
                        <img src={sample_blog} alt="blog" className="object-cover h-[200px]"/>
                    </a>
                </div>

                <div className="col-start-2 mx-4">
                    <div className="flex flex-col gap-4">
                        <div>
                            <a href="#" className="hover:text-Blue">
                                <span className="font-sans font-semibold text-2xl text-pretty">
                                    {props.title ?? "Nước tẩy trang Simple có tốt không? Review chi tiết từng loại conasodashjdjkdhjksdhfjksdjgfdsjhgwelhuirkfhjvxmcbvxbgjwehrtiuhfjs"}
                                </span>
                            </a>
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
                                    {props.date ?? "18/04/2024"}
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