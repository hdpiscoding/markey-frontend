import React, {useEffect, useState} from "react";
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";
import AdminNav from "../../components/Admin/AdminNav";
import {Pagination, Stack} from "@mui/material";
import UserListView from "../../components/Admin/UserListView";

const ManageShopper = () => {
    const [sampleShoppers, setSampleShoppers] = useState([
        { id: "1", email: "abc@gmail.com"},
        { id: "2", email: "a@gmail.com"},
        { id: "3", email: "b@gmail.com"},
        { id: "4", email: "c@gmail.com"},
        { id: "5", email: "d@gmail.com"},
        { id: "6", email: "e@gmail.com"},
    ]);

    // Store API data
    const [shoppers, setShoppers] = useState([]);

    useEffect(() => {
        // Call API to get all shoppers with isActive = true and set to shoppers

    }, []);

    const [isActive, setIsActive] = useState(true);
    const handleActiveChange = (bool) => {
        setIsActive(bool);
        if (bool) {
            // Call API to get all shoppers with isActive = true and set to shoppers
        }
        else {
            // Call API to get all shoppers with isActive = false and set to shoppers
        }
    }

    // set up pagination
    const [page, setPage] = React.useState(1);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(sampleShoppers.length / itemsPerPage);

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentShoppers = sampleShoppers.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0)
    }
    // end of set up pagination

    const handleUpdateData = () => {
        if (isActive) {
            // Call API to get all shoppers with isActive = true and set to shoppers
        }
        else {
            // Call API to get all shoppers with isActive = false and set to shoppers
        }
    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Quản trị viên"/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <AdminNav currentPage={4}/>
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[2rem] font-semibold">
                                        Quản lý tài khoản khách hàng
                                    </span>
                                </div>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <div className="grid grid-cols-[50%_50%] select-none">
                            <div className="col-start-1 flex flex-col items-center gap-1 cursor-pointer"
                                 onClick={() => handleActiveChange(true)}>
                                <span className={`font-semibold text-lg ${isActive ? "text-Blue" : "text-Black"}`}>
                                    Đang hoạt động
                                </span>

                                <div
                                    className={`border-t-[3px] w-full ${isActive ? "border-Blue" : "invisible"}`}></div>
                            </div>

                            <div className="col-start-2 flex flex-col items-center gap-1 cursor-pointer"
                                 onClick={() => handleActiveChange(false)}>
                                <span className={`font-semibold text-lg  ${isActive ? "text-Black" : "text-Blue"}`}>
                                    Đã bị khóa
                                </span>

                                <div
                                    className={`border-t-[3px] w-full ${isActive ? "invisible" : "border-Blue"}`}></div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            {currentShoppers.map((shopper) => (
                                <UserListView key={shopper.id} id={shopper.id} email={shopper.email} role="shopper" isLocked={!isActive} onUpdateData={handleUpdateData}/>
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

export default ManageShopper;