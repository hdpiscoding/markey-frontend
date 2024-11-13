import React, {useEffect, useState} from 'react';
import Footer from "../../components/General/Footer";
import AccountNav from "../../components/Shopper/AccountNav";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";
import {Pagination, Stack} from "@mui/material";
import OrderWrapper from "../../components/Shopper/OrderWrapper";
import useLocalStorage from "../../components/General/useLocalStorage";

const ShopperOrder = () => {
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
    const [status, setStatus] = useState("NOT_PAID"); // NOT_PAID: chưa thanh toán, PENDING: đang chờ xử lý, DELIVERING: đang giao hàng, COMPLETED: hoàn thành

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    }

    // Tải dữ liệu ban đầu
    useEffect(() => {
        // Call API để lấy dữ liệu
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
                    status: "NOT_PAID",
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                let filter = {
                    sort: {
                        "by": "createAt",
                        "order": "DESC" // DESC | ASC
                    },
                    status: status,
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
    }, [status, page]);

    const handlePayment = async () => {
        try {
            setLoading(true);
            openLoadingModal();
            let filter = {
                sort: {
                    "by": "createAt",
                    "order": "DESC" // DESC | ASC
                },
                status: status,
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

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <AccountNav currentPage={4}/>
                    </div>

                    <div className="flex flex-col gap-5 col-start-3">
                        <div className="col-start-3 bg-White round-sm pt-4 flex flex-col gap-4 h-fit">
                            <div className="grid grid-cols-[25%_25%_25%_25%]">
                                <div className="flex flex-col text-center gap-2 select-none">
                                    <span
                                        className={`cursor-pointer font-semibold text-xl ${status === "NOT_PAID" ? "text-Blue" : "text-Black"}`}
                                        onClick={() => handleStatusChange("NOT_PAID")}>
                                        CHƯA THANH TOÁN
                                    </span>

                                    {status === "NOT_PAID" && <div className="border-t-2 w-full border-Blue"></div>}

                                </div>

                                <div className="select-none flex flex-col text-center gap-2">
                                    <span
                                        className={`cursor-pointer font-semibold text-xl ${status === "PENDING" ? "text-Blue" : "text-Black"}`}
                                        onClick={() => handleStatusChange("PENDING")}>
                                        CHỜ XỬ LÝ
                                    </span>

                                    {status === "PENDING" && <div className="border-t-2 w-full border-Blue"></div>}
                                </div>

                                <div className="flex flex-col text-center gap-2 select-none">
                                <span
                                    className={`cursor-pointer font-semibold text-xl ${status === "DELIVERING" ? "text-Blue" : "text-Black"}`}
                                    onClick={() => handleStatusChange("DELIVERING")}>
                                    ĐANG GIAO HÀNG
                                </span>

                                    {status === "DELIVERING" &&
                                        <div className="border-t-2 w-full border-Blue"></div>}
                                </div>

                                <div className="flex flex-col text-center gap-2 select-none">
                                <span
                                    className={`cursor-pointer font-semibold text-xl ${status === "COMPLETED" ? "text-Blue" : "text-Black"}`}
                                    onClick={() => handleStatusChange("COMPLETED")}>
                                    ĐÃ NHẬN HÀNG
                                </span>

                                    {status === "COMPLETED" && <div className="border-t-2 w-full border-Blue"></div>}
                                </div>
                            </div>
                        </div>

                        {orderItems.length === 0
                            ?
                            <div className="flex bg-Lighter_gray items-center justify-center py-2">
                                <span className="text-Dark_gray">
                                    Hiện tại bạn chưa có đơn hàng nào!
                                </span>
                            </div>
                            :
                            <div className="flex flex-col gap-4 px-4 col-start-3">
                            {orderItems.map((item) => (
                                <OrderWrapper
                                    key={item.id}
                                    orderId={item.id}
                                    order={item}
                                    status={item.status}
                                    onPayment={handlePayment}
                                />
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

                    {loading && <LoadingModal isOpen={isLoadingModalOpen}/>}

                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default ShopperOrder;