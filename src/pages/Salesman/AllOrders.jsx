import React, {useEffect, useState} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import SalemansOrderItem from "../../components/Salesman/SalemansOrderItem";
import {Pagination, Stack} from "@mui/material";

const AllOrders = () => {
    const orderItems = [
        { id: 1, name: "Son môi màu đỏ quyến rũ", price: 150000, quantity: 2500, status: "CHỜ XỬ LÝ" },
        { id: 2, name: "Nước hoa hương chanh tươi mát", price: 800000, quantity: 1800, status: "ĐANG VẬN CHUYỂN" },
        { id: 3, name: "Kem dưỡng da ban đêm chống lão hóa", price: 600000, quantity: 1500, status: "ĐÃ NHẬN HÀNG" },
        { id: 4, name: "Sữa rửa mặt làm sạch sâu", price: 200000, quantity: 3200, status: "CHỜ XỬ LÝ" },
        { id: 5, name: "Mặt nạ cấp ẩm chiết xuất thiên nhiên", price: 75000, quantity: 4800, status: "ĐANG VẬN CHUYỂN" },
        { id: 6, name: "Phấn nền trang điểm tự nhiên", price: 500000, quantity: 3100, status: "ĐÃ NHẬN HÀNG" },
        { id: 7, name: "Chì kẻ mắt chống nước", price: 120000, quantity: 5400, status: "CHỜ XỬ LÝ" },
        { id: 8, name: "Nước tẩy trang dịu nhẹ", price: 250000, quantity: 900, status: "ĐANG VẬN CHUYỂN" },
        { id: 9, name: "Son dưỡng môi SPF 15", price: 95000, quantity: 2200, status: "ĐÃ NHẬN HÀNG" },
        { id: 10, name: "Kem chống nắng SPF 50", price: 400000, quantity: 3600, status: "CHỜ XỬ LÝ" },
    ];

    // store API data
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        // Call API to get orders
    }, []);

    const handleApprove = () => {
        // Call API to re-get orders


    }

    // set up pagination
    const [page, setPage] = useState(1);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(orderItems.length / itemsPerPage);

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = orderItems.filter((item) => item.status !== "CHỜ XỬ LÝ").slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Kênh người bán"/>

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

                        <div className="flex flex-col gap-4 px-4 col-start-3">
                            {currentItems.map((item) => (
                                <SalemansOrderItem key={item.id} productName={item.name} price={item.price}
                                                   quantity={item.quantity} status={item.status} onApprove={handleApprove}/>
                            ))}
                        </div>

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
                </div>

            </main>

            <Footer/>
        </div>
    );
};

export default AllOrders;