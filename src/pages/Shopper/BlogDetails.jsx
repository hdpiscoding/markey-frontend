import React, {useEffect, useState} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";
import { FaRegClock } from "react-icons/fa";
import sample_blog from "../../assets/sample_blog.png";
import BlogCardView from "../../components/Shopper/BlogCardView";
import {Link, useParams} from "react-router-dom";
import {instance} from "../../AxiosConfig";
import LoadingModal from "../../components/General/LoadingModal";

const BlogDetails = () => {
    const formatDateTime = (inputDateTime) => {
        // Tách chuỗi ngày và thời gian
        if (inputDateTime) {
            const [date, time] = inputDateTime.split(' ');
            // Tách chuỗi ngày thành các phần tử năm, tháng, ngày
            const [year, month, day] = date.split('-');
            // Trả về chuỗi ngày theo định dạng DD/MM/YYYY HH:MM:SS
            return `${day}/${month}/${year} ${time}`;
        }
    }

    const { blogId } = useParams();

    const [loading, setLoading] = useState(false);
    // set up loading modal
    const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);

    const openLoadingModal = () => {
        setLoadingModalOpen(true);
    };

    const closeLoadingModal = () => {
        setLoadingModalOpen(false);
    };
    // end set up loading modal

    const [blog, setBlog] = useState({});
    const [suggestBlogs, setSuggestBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                // Call API to get blog data by blogId
                const response = await instance.get(`v1/shopping-service/post/${blogId}`);
                setBlog(response.data.data);

                // Call API to get suggested blogs data
                const suggestResponse = await instance.post('v1/shopping-service/post/filter?page=1&rpp=5');
                setSuggestBlogs(suggestResponse.data.data.items);
            }
            catch (error) {
                setLoading(false);
                closeLoadingModal();
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
            }
        }

        fetchData();
    }, [blogId]);

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr]">
                <div className="col-start-2 bg-White my-5 flex flex-col pb-4">
                    <div className="flex flex-col p-4 gap-3">
                        <div className="flex">
                            <span className="font-semibold text-[2rem]">
                                {blog.title}
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <span>
                                Danh mục:
                            </span>

                            <span className="text-Blue font-semibold">
                                {blog.category?.name}
                            </span>
                        </div>

                        <div className="flex gap-8">
                            <div className="flex gap-2 items-center">
                                <span>
                                    Tác giả:
                                </span>

                                <span className="text-Blue font-semibold">
                                    {blog.shop?.name}
                                </span>
                            </div>

                            <div className="flex gap-2 items-center">
                                <FaRegClock className="w-3 h-3 text-Dark_gray"/>

                                <span className="text-sm text-Dark_gray">
                                    {formatDateTime(blog.createAt)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-start-2 grid grid-cols-[71%_3%_26%]">
                        <div className="flex flex-col pl-4">
                            <div>
                                <img src={blog.thumbnail} alt="blog" className="object-cover w-full"/>
                            </div>

                            <div className="mt-10">
                                <p className="whitespace-pre-line">
                                    {blog.content}
                                </p>
                            </div>
                        </div>

                        <div className="col-start-3 flex flex-col gap-6 pr-9">
                            <div className="flex flex-col justify-center">
                                <div className="bg-Blue rounded-md flex items-center py-2.5 px-5 w-fit">
                                    <span className="text-White font-semibold">
                                        ĐỌC GÌ HÔM NAY
                                    </span>
                                </div>

                                <div className="border-t-[3px] border-Blue w-full"></div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {suggestBlogs.map((blog) => (
                                    <BlogCardView key={blog.id} title={blog.title} id={blog.id} picture={blog.thumbnail} author={blog.shop.name} date={blog.createAt}
                                                  category={blog.category.name}/>
                                ))}
                            </div>

                            <div className="flex items-center justify-center">
                                <Link to="/shopper/recommended-blogs">
                                    <button className="bg-Lighter_gray rounded-lg px-5 py-1 hover:bg-[#f9f9f9]">
                                        <span className="text-Gray text-xl">
                                            Xem thêm
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>

            </main>

            <Footer/>
        </div>
    );
};

export default BlogDetails;