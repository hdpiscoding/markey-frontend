import React, {useEffect, useState} from 'react';
import Footer from "../../components/General/Footer";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import {Pagination, Stack} from "@mui/material";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";
import SalesmanOrderWrapper from "../../components/Salesman/SalesmanOrderWrapper";

const AllOrders = () => {
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

    // store API data
    const [orders, setOrders] = useState([]);

    // set up pagination
    const [page, setPage] = useState(1);

    const itemsPerPage = 5;
    const [totalPages, setTotalPages] = useState(null);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                const shopResponse = await instance.get("v1/shopping-service/shop/me");
                const shopID = shopResponse.data.data.id;

                let filter = {
                    sort: {
                        by: "createAt",
                        order: "DESC" // DESC | ASC
                    },
                    status: "PENDING",
                    shopId: shopID
                }

                // Call API to get orders with status == "PENDING"
                const response = await instance.post(`v1/order-service/order/filter?page=${page}&rpp=${itemsPerPage}`, filter);
                setTotalPages(Math.ceil(response.data.data.total/itemsPerPage));
                setOrders(await response.data.data.items);
                console.log(orders);
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

    const handleApprove = async () => {
        // Call API to re-get orders
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                const shopResponse = await instance.get("v1/shopping-service/shop/me");
                const shopID = shopResponse.data.data.id;

                let filter = {
                    sort: {
                        by: "createAt",
                        order: "DESC" // DESC | ASC
                    },
                    status: "PENDING",
                    shopId: shopID
                }

                // Call API to get orders with status == "PENDING"
                const response = await instance.post(`v1/order-service/order/filter?page=${page}&rpp=${itemsPerPage}`, filter);
                setTotalPages(Math.ceil(response.data.data.total/itemsPerPage));
                setOrders(await response.data.data.items);
                console.log(orders);
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

    }



    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={1}/>
                    </div>

                    <div className="col-start-3 bg-White flex flex-col gap-4">
                        <div className="flex flex-col px-4 py-3">
                            <div>
                                <span className="text-[2rem] font-semibold">
                                    Đơn hàng chờ duyệt
                                </span>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        {orders.length === 0
                            ?
                            <div className="flex items-center justify-center col-start-3 bg-Lighter_gray mx-4 py-2">
                                <span className="text-center text-Dark_gray">
                                    Hiện tại không có đơn hàng nào đang chờ duyệt
                                </span>
                            </div>
                            :
                            <div className="flex flex-col gap-6 px-4 col-start-3">
                                {orders.map((order) => (
                                    <SalesmanOrderWrapper key={order.id} order={order} onApprove={handleApprove}/>
                                ))}
                            </div>}


                        <div className="flex items-center justify-center mb-4">
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

export default AllOrders;