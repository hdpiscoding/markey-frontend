import React, {useState} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import ProductCardViewMd from "../../components/Shopper/ProductCardViewMd";
import {Pagination, Stack} from "@mui/material";
import VoucherModalListView from "../../components/Shopper/VoucherModalListView";
import VoucherListView from "../../components/Salesman/VoucherListView";

const AllVouchers = () => {
    const vouchers = [
        { id: '1', name: "Voucher mùa thu", discount: 10, code: "CMT8-1945", quantity: 10 },
        { id: '2', name: "Voucher mùa xuân", discount: 30, code: "GPMN-1975", quantity: 20 },
        { id: '3', name: "Voucher mùa hè", discount: 5, code: "ĐBP-1954", quantity: 15 },
        { id: '4', name: "Voucher mùa đông", discount: 12, code: "PNVN-2010", quantity: 30 },
        { id: '5', name: "Voucher mặt nạ", discount: 20, code: "MNĐT-2021", quantity: 25 },
        { id: '6', name: "Voucher kem chống nắng", discount: 15, code: "KCN-2021", quantity: 22 },
        { id: '7', name: "Voucher son môi", discount: 25, code: "SM-2021", quantity: 18 },
        { id: '8', name: "Voucher sữa rửa mặt", discount: 18, code: "SRM-2021", quantity: 28 },
        { id: '9', name: "Voucher nước hoa", discount: 35, code: "NH-2021", quantity: 12 },
        { id: '10', name: "Voucher kem dưỡng da", discount: 40, code: "KDD-2021", quantity: 16 },
    ]

    const [selectedDiv, setSelectedDiv] = useState(1); // Default selected div (1: Phổ biến, 2: Bán chạy, 3: Giá)
    const [selectedDate, setSelectedDate] = useState('1');
    const [selectedPrice, setSelectedPrice] = useState('default');

    const handleDivClick = (index) => {
        if (selectedDiv !== index) {
            setSelectedDiv(index);
            if (index === 1) {
                setSelectedPrice('default');
            } else if (index === 2) {
                setSelectedDate('default');}
        }
    };

    const handleSelectedDateChange = (event) => {
        setSelectedDate(event.target.value);

        setPage(1);
        if(event.target.value === '1') {
            // Call API to sort by newest date
        }
        else if(event.target.value === '2') {
            // Call API to sort by oldest date
        }
    };

    const handleSelectedPriceChange = (event) => {
        setSelectedPrice(event.target.value);

        setPage(1);
        if (event.target.value === '1') {
            // Call API to sort by low to high price
        }
        else if (event.target.value === '2') {
            // Call API to sort by high to low price
        }
    };

    // set up pagination
    const [page, setPage] = useState(1);

    const itemsPerPage = 9;
    const totalPages = Math.ceil(vouchers.length / itemsPerPage);

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentVouchers = vouchers.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0)
    }
    // end of set up pagination

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Kênh người bán"/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={4}/>
                    </div>

                    <div className="col-start-3 flex flex-col px-4 py-3 White select-none gap-5">
                        <div className="flex flex-col justify-center">
                            <div className="bg-White flex items-center justify-between px-4 pt-3">
                                <div>
                                    <span className="text-[2rem] font-semibold">
                                        Tất cả voucher
                                    </span>
                                </div>

                                <div className="flex items-center justify-center gap-10">
                                    <span className="font-semibold text-Blue cursor-pointer hover:text-Dark_blue">
                                        Thêm
                                    </span>
                                </div>
                            </div>

                            <div className="bg-[#E1E1E1] flex pl-4 py-3 items-center gap-10">
                                <span>
                                    Sắp xếp theo:
                                </span>

                                <select className={`rounded-sm px-5 py-1 cursor-pointer 
                                                    ${selectedDiv === 1 ? 'border border-Blue outline-none ring-2 ring-Blue text-Blue' : ''}`}
                                        onClick={() => handleDivClick(1)}
                                        value={selectedDate} onChange={handleSelectedDateChange}>
                                    <option value="default" disabled hidden>Ngày tạo:</option>
                                    <option value="1">Ngày tạo: Mới nhất</option>
                                    <option value="2">Ngày tạo: Cũ nhất</option>
                                </select>

                                <select className={`rounded-sm px-5 py-1 cursor-pointer 
                                                    ${selectedDiv === 2 ? 'border border-Blue outline-none ring-2 ring-Blue text-Blue' : ''}`}
                                        onClick={() => handleDivClick(2)}
                                        value={selectedPrice} onChange={handleSelectedPriceChange}>
                                    <option value="default" disabled hidden>Giảm giá:</option>
                                    <option value="1">Giảm giá: Thấp đến cao</option>
                                    <option value="2">Giảm giá: Cao đến Thấp</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentVouchers.map((voucher) => (
                                <VoucherListView key={voucher.id} name={voucher.name} discount={voucher.discount}
                                                 code={voucher.code} quantity={voucher.quantity}/>
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
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default AllVouchers;