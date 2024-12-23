import React, {useEffect, useState} from 'react';
import Footer from "../../components/General/Footer";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import {Pagination, Stack} from "@mui/material";
import BlogListViewLg from "../../components/Shopper/BlogListViewLg";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";

const AllBlogs = () => {
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

    const [selectedDate, setSelectedDate] = useState('1');
    const [author, setAuthor] = useState("");
    const [shopId, setShopId] = useState("");

    const handleSelectedDateChange = async (event) => {
        setSelectedDate(event.target.value);

        setPage(1);
        if(event.target.value === '1') {
            // Call API to sort by newest date
            let filter = {
                sort: {
                    by: "createAt",
                    order: "DESC" // DESC | ASC
                },
                shopId: shopId
            }
            const response = await instance.post(`v1/shopping-service/post/filter?page=${page}&rpp=${itemsPerPage}`, filter);
            setTotalPages(Math.ceil(response.data.data.total/itemsPerPage));
            setBlogLists(await response.data.data.items);
        }
        else if(event.target.value === '2') {
            // Call API to sort by oldest date
            let filter = {
                sort: {
                    by: "createAt",
                    order: "ASC" // DESC | ASC
                },
                shopId: shopId
            }
            const response = await instance.post(`v1/shopping-service/post/filter?page=${page}&rpp=${itemsPerPage}`, filter);
            setTotalPages(Math.ceil(response.data.data.total/itemsPerPage));
            setBlogLists(await response.data.data.items);
        }
    };

    const [blogList, setBlogLists] = useState([]);

    // set up pagination
    const [page, setPage] = React.useState(1);

    const itemsPerPage = 5;
    const [totalPages, setTotalPages] = useState(null);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    }
    // end of set up pagination

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
                    shopId: shopId
                }

                // Call API to get all blogs
                const response = await instance.post(`v1/shopping-service/post/filter?page=${page}&rpp=${itemsPerPage}`, filter);
                setTotalPages(Math.ceil(response.data.data.total/itemsPerPage));
                setBlogLists(await response.data.data.items);
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
        };

        fetchData();
    }, [page]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                setPage(1);
                const shopResponse = await instance.get('v1/shopping-service/shop/me');
                const shopID = shopResponse.data.data.id;
                let filter = {
                    sort: {
                        by: "createAt",
                        order: "DESC" // DESC | ASC
                    },
                    shopId: shopID
                }
                setShopId(shopResponse.data.data.id);
                setAuthor(shopResponse.data.data.name);

                // Call API to get all blogs
                const response = await instance.post(`v1/shopping-service/post/filter?page=${page}&rpp=${itemsPerPage}`, filter);
                setTotalPages(Math.ceil(response.data.data.total/itemsPerPage));
                setBlogLists(await response.data.data.items);
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
        };

        fetchData();
    }, []);

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={4}/>
                    </div>

                    <div className="col-start-3 flex flex-col gap-5">
                        <div className="flex flex-col">
                            <div className="bg-White flex items-center pl-4 pt-3">
                                <span className="text-[2rem] font-semibold">
                                    Tất cả bài viết
                                </span>
                            </div>

                            <div className="bg-[#E1E1E1] flex pl-4 py-3 items-center gap-10">
                                <span>
                                    Sắp xếp theo:
                                </span>

                                <select
                                    className={`rounded-sm px-5 py-1 cursor-pointer border border-Blue outline-none ring-2 ring-Blue text-Blue`}
                                    value={selectedDate} onChange={handleSelectedDateChange}>
                                    <option value="default" disabled hidden>Ngày tạo:</option>
                                    <option value="1">Ngày tạo: Mới nhất</option>
                                    <option value="2">Ngày tạo: Cũ nhất</option>
                                </select>
                            </div>
                        </div>

                        {blogList.length <= 0
                            ?
                            <div className="flex items-center justify-center text-center w-full bg-Lighter_gray py-4">
                                <span className="text-Gray">
                                    Hiện tại bạn chưa có sản phẩm nào! Hãy thêm sản phẩm mới!
                                </span>
                            </div>
                            :
                            <div className="flex flex-col gap-4">
                                {blogList.map((blog) => (
                                    <BlogListViewLg key={blog.id} id={blog.id} title={blog.title} author={author}
                                                    picture={blog.thumbnail}
                                                    date={blog.createAt} category={blog.category.name} role="salesman"/>
                                ))}
                            </div>}

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

                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default AllBlogs;