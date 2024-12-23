import React, {useEffect, useState} from 'react';
import BlogListViewMd from "../../components/Shopper/BlogListViewMd";
import {Pagination, Stack} from "@mui/material";
import BlogCardView from "../../components/Shopper/BlogCardView";
import Footer from "../../components/General/Footer";
import {useNavigate, useParams} from "react-router-dom";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";

const CategoryBlogs = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();

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

    const handleHomeClick = () => {
        navigate("/shopper/blog");
    }

    const handleMoreBlogs = () => {
        navigate('/shopper/recommended-blogs');
    }

    const [category, setCategory] = useState("");

    const [blogList, setBlogList] = useState([]);

    const [recommendedBlogList, setRecommendedBlogList] = useState([]);

    // set up pagination
    const [page, setPage] = React.useState(1);

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(null);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0)
    }
    // end of set up pagination

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                setPage(1);
                setItemsPerPage(10);
                let filter = {
                    sort: {
                        by: "createAt",
                        order: "DESC" // DESC | ASC
                    },
                    categoryId: categoryId,
                }
                // Call API to get blogs data by categoryId
                const blogsResponse = await instance.post(`v1/shopping-service/post/filter?page=${page}&rpp=${itemsPerPage}`, filter);
                setTotalPages(Math.ceil(blogsResponse.data.data.total/itemsPerPage));
                setBlogList(blogsResponse.data.data.items);

                // Call API to get category data by categoryId
                const categoryResponse = await instance.get(`v1/shopping-service/category/${categoryId}`);
                setCategory(categoryResponse.data.data.name);

                // Call API to get suggested blogs data
                const suggestResponse = await instance.post('v1/shopping-service/post/filter?page=1&rpp=5');
                setRecommendedBlogList(suggestResponse.data.data.items);
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
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                let filter = {
                    sort: {
                        by: "createAt",
                        order: "DESC" // DESC | ASC
                    },
                    categoryId: categoryId,
                }
                // Call API to get blogs data by categoryId
                const blogsResponse = await instance.post(`v1/shopping-service/post/filter?page=${page}&rpp=${itemsPerPage}`, filter);
                setTotalPages(Math.ceil(blogsResponse.data.data.total / itemsPerPage));
                setBlogList(blogsResponse.data.data.items);
            } catch (error) {
                setLoading(false);
                closeLoadingModal();
                console.log(error);
            } finally {
                setLoading(false);
                closeLoadingModal();
            }
        }

        fetchData();
    }, [page]);

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main>
                <div className="grid grid-cols-[1fr_10fr_1fr] bg-White mb-4 select-none">
                    <div className="col-start-2 flex items-center py-2 gap-2">
                        <div>
                            <span className="text-Blue font-semibold cursor-pointer" onClick={handleHomeClick}>
                                Trang chủ
                            </span>
                        </div>

                        <div> > </div>

                        <div>
                            <span className="font-semibold">
                                {category}
                            </span>
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-[1fr_10fr_1fr] my-4">
                    <div className="col-start-2 grid grid-cols-[71%_5.5%_23.5%]">
                        <div className="col-start-1 flex flex-col gap-6">
                            <div className="flex flex-col justify-center">
                                <div className="bg-Blue rounded-md flex items-center py-2.5 px-5 w-fit">
                                    <span className="text-White font-semibold">
                                        {category?.toUpperCase()}
                                    </span>
                                </div>

                                <div className="border-t-[3px] border-Blue w-full"></div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {blogList.map((blog) => (
                                    <BlogListViewMd key={blog.id} title={blog.title} author={blog.shop.name} id={blog.id} picture={blog.thumbnail}
                                                    date={blog.createAt} category={blog.category.name} role="shopper"/>
                                ))}
                            </div>

                            <div className="flex items-center justify-center">
                                <Stack>
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={handlePageChange}
                                        variant="text"
                                        shape="rounded"
                                        sx={{
                                            "& .MuiPaginationItem-root": {
                                                color: "#AAAAAA",            // Màu văn bản mặc định
                                            },
                                            '& .MuiPaginationItem-root:hover': {
                                                // Màu khi hover
                                                backgroundColor: '#008DDA', // Màu nền khi hover
                                                color: 'white', // Màu chữ khi hover
                                            },
                                            "& .Mui-selected": {
                                                backgroundColor: "#008DDA !important", // Màu nền cho item được chọn
                                                color: "white",              // Màu chữ cho item được chọn
                                            },
                                            "& .MuiPaginationItem-ellipsis": {
                                                color: "#AAAAAA"              // Màu sắc cho dấu ba chấm (ellipsis)
                                            }
                                        }}/>
                                </Stack>
                            </div>
                        </div>

                        <div className="col-start-3 flex flex-col gap-6">
                            <div className="flex flex-col justify-center">
                                <div className="bg-Blue rounded-md flex items-center py-2.5 px-5 w-fit">
                                    <span className="text-White font-semibold">
                                        ĐỌC GÌ HÔM NAY
                                    </span>
                                </div>

                                <div className="border-t-[3px] border-Blue w-full"></div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {recommendedBlogList.map((blog) => (
                                    <BlogCardView key={blog.id} id={blog.id} picture={blog.thumbnail} title={blog.title} author={blog.shop.name} date={blog.createAt}
                                                  category={blog.category.name}/>
                                ))}
                            </div>

                            <div className="flex items-center justify-center">
                                <button className="bg-White rounded-lg px-5 py-1 hover:bg-[#f9f9f9]" onClick={handleMoreBlogs}>
                                    <span className="text-Gray text-xl">
                                        Xem thêm
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>

            </main>

            <Footer/>
        </div>
    );
}

export default CategoryBlogs;