import React, {useEffect, useState} from "react";
import SecondaryHeader from "../../components/General/SecondaryHeader";
import BlogListViewLg from "../../components/Shopper/BlogListViewLg";
import {Pagination, Stack} from "@mui/material";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";

const RecommendedBlogs = () => {
    const [blogs, setBlogs] = useState([]);

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

    // set up pagination
    const [page, setPage] = React.useState(1);

    const itemsPerPage = 5;
    const [totalPages, setTotalPages] = useState(null);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0)
    }
    // end of set up pagination

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogsResponse = await instance.post(`v1/shopping-service/post/filter?page=${page}&rpp=${itemsPerPage}`);
                setTotalPages(Math.ceil(blogsResponse.data.data.total/itemsPerPage));
                setBlogs(blogsResponse.data.data.items);
            }
            catch (error) {
                console.log(error);
            }
            finally {

            }
        }

        fetchData();
    }, []);

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 flex flex-col gap-6">
                    <div className="bg-gradient-to-b from-Blue to-Light_blue rounded-sm py-1 text-center mb-4">
                        <span className="text-White font-bold text-2xl p-4">
                            ĐỌC GÌ HÔM NAY
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        {blogs.map((blog) => (
                            <BlogListViewLg key={blog.id} id={blog.id} title={blog.title} author={blog.shop.name} date={blog.createAt} category={blog.category.name} picture={blog.thumbnail} role="shopper"/>
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
                                size={"large"}
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

                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>
            </main>
        </div>
);
};

export default RecommendedBlogs;