import React, {useEffect, useState} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";
import BlogListViewMd from "../../components/Shopper/BlogListViewMd";
import {Pagination, Stack} from "@mui/material";
import BlogCardView from "../../components/Shopper/BlogCardView";
import {useNavigate} from "react-router-dom";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";

const HomeBlog = () => {
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

    const handleMoreBlogs = () => {
        navigate('/shopper/recommended-blogs');
    }

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('default');

    const handleCategoryChange = (event) => {
        const newCategory = event.target.value;
        setSelectedCategory(newCategory);
        navigate(`/shopper/category-blogs/${newCategory}`);
    }

    const [blogs, setBlogs] = useState([]);

    const [suggestedBlogs, setSuggestedBlogs] = useState([]);

    // set up pagination
    const [page, setPage] = React.useState(1);

    const itemsPerPage = 10;
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

                const response = await instance.get('v1/shopping-service/category');
                const data = response.data.data;
                setCategories(data);

                let filter = {
                    sort: {
                        by: "createAt",
                        order: "DESC" // DESC | ASC
                    }
                }

                const blogsResponse = await instance.post(`v1/shopping-service/post/filter?page=${page}&rpp=${itemsPerPage}`, filter);
                setBlogs(blogsResponse.data.data.items);
                setTotalPages(Math.ceil(blogsResponse.data.data.total/itemsPerPage));

                const suggestedBlogsResponse = await instance.post('v1/shopping-service/post/filter?page=1&rpp=5');
                setSuggestedBlogs(suggestedBlogsResponse.data.data.items);
            }
            catch (error){
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

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main>
                <div className="grid grid-cols-[1fr_10fr_1fr] bg-White mb-4 select-none">
                    <div className="col-start-2 flex items-center py-2">
                        <select name="category" id="category"
                                className="cursor-pointer border-none focus:outline-none"
                                value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="default" hidden disabled>TRANG CHỦ</option>
                            {categories.map((category) => (
                                <option key={category.id} id={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className="grid grid-cols-[1fr_10fr_1fr] my-4">
                    <div className="col-start-2 grid grid-cols-[71%_5.5%_23.5%]">
                        <div className="col-start-1 flex flex-col gap-6">
                            <div className="flex flex-col justify-center">
                                <div className="bg-Blue rounded-md flex items-center py-2.5 px-5 w-fit">
                                    <span className="text-White font-semibold">
                                        BÀI VIẾT MỚI NHẤT
                                    </span>
                                </div>

                                <div className="border-t-[3px] border-Blue w-full"></div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {blogs.map((blog) => (
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
                                {suggestedBlogs.map((blog) => (
                                    <BlogCardView key={blog.id} title={blog.title} picture={blog.thumbnail} author={blog.shop.name} date={blog.createAt} category={blog.category.name}/>
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
};

export default HomeBlog;