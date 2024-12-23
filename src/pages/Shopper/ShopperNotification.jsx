import React, {useEffect, useState} from 'react';
import Footer from "../../components/General/Footer";
import AccountNav from "../../components/Shopper/AccountNav";
import { PiBellZLight } from "react-icons/pi";
import LoadingModal from "../../components/General/LoadingModal";
import NotificationWrapper from "../../components/Shopper/NotificationWrapper";
import {Pagination, Stack} from "@mui/material";
import {instance} from "../../AxiosConfig";
import useLocalStorage from "../../components/General/useLocalStorage";

const ShopperNotification = () => {
    const userIdStorage = useLocalStorage("userId");
    // set up pagination
    const [page, setPage] = useState(1);

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(null);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0)
    }
    // end of set up pagination

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

    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        // Call API get all orders by user_id
        setPage(1);
        setItemsPerPage(5);
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                let filter = {
                    sort: {
                        "by": "createAt",
                        "order": "DESC" // DESC | ASC
                    },
                    status: "DELIVERING",
                    shopperId: userIdStorage.get()
                }
                const response = await instance.post(`v1/order-service/order/filter?page=${page}&rpp=${itemsPerPage}`, filter);
                setOrderItems(response.data.data.items);
                setTotalPages(Math.ceil(response.data.data.total / itemsPerPage));
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

    const handleReceived = () => {
        // Recall API
        // Call API get all orders by user_id
        setPage(1);
        setItemsPerPage(5);
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                let filter = {
                    sort: {
                        "by": "createAt",
                        "order": "DESC" // DESC | ASC
                    },
                    status: "DELIVERING",
                    shopperId: userIdStorage.get()
                }
                const response = await instance.post(`v1/order-service/order/filter?page=${page}&rpp=${itemsPerPage}`, filter);
                setOrderItems(response.data.data.items);
                setTotalPages(Math.ceil(response.data.data.total / itemsPerPage));
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
                        <AccountNav currentPage={5}/>
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4">
                        <div className="flex flex-col justify-center gap-2">
                            <div>
                                <span className="font-semibold text-[2rem]">Thông báo của tôi</span>
                            </div>

                            <div className="border-t-2 w-full text-Dark_gray"></div>
                        </div>

                        {orderItems.length > 0
                            ? orderItems.map((item, index) => (
                                <NotificationWrapper id={item.id} order={item} key={index} onReceived={handleReceived}/>
                            ))
                            :
                            <div className="flex flex-col items-center justify-center py-3">
                                <PiBellZLight className="text-Dark_gray h-[80px] w-[80px]"/>

                                <span className="text-Dark_gray">
                                    Hiện tại bạn không có thông báo nào
                                </span>
                            </div>
                        }

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

                    {loading && <LoadingModal isOpen={isLoadingModalOpen}/>}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default ShopperNotification;