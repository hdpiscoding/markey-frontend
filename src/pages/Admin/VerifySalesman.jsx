import React, {useEffect, useState} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";
import AdminNav from "../../components/Admin/AdminNav";
import {Pagination, Stack} from "@mui/material";
import VerifySalesmanListView from "../../components/Admin/VerifySalesmanListView";

const VerifySalesman = () => {
    const [sampleSalesmans, setSampleSalesmans] = useState([
        { id: "1", email: "abc@gmail.com"},
        { id: "2", email: "a@gmail.com"},
        { id: "3", email: "b@gmail.com"},
        { id: "4", email: "c@gmail.com"},
        { id: "5", email: "d@gmail.com"},
        { id: "6", email: "e@gmail.com"},
    ]);

    const [salesmans, setSalesmans] = useState([]);

    const [selectedDate, setSelectedDate] = useState('1');

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

    useEffect(() => {
        // Call API to get all salesmans with isApproved = false and set to salesmans
    }, []);

    // Callback function to approve salesman
    const handleApprove = (id) => {
        // Delete approved salesman from salesmans
        setSampleSalesmans(sampleSalesmans.filter((salesman) => salesman.id !== id));
    }

    // Callback function to reject salesman
    const handleReject = (id) => {
        // Delete rejected salesman from salesmans
        setSampleSalesmans(sampleSalesmans.filter((salesman) => salesman.id !== id));
    }

    // set up pagination
    const [page, setPage] = React.useState(1);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(sampleSalesmans.length / itemsPerPage);

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentSalesmans = sampleSalesmans.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0)
    }
    // end of set up pagination

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Quản trị viên"/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <AdminNav currentPage={1}/>
                    </div>

                    <div className="col-start-3 flex flex-col gap-5">
                        <div className="flex flex-col">
                            <div className="bg-White flex items-center pl-4 pt-3">
                                <span className="text-[2rem] font-semibold">
                                    Duyệt người bán
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

                        {currentSalesmans.length <= 0
                            ? <div className="bg-White flex items-center justify-center p-4">
                                <span className="text-Dark_gray text-center">
                                    Hiện tại không có người bán nào cần duyệt
                                </span>
                            </div>
                            : <div className="flex flex-col gap-4">
                                {currentSalesmans.map((salesman) => (
                                    <VerifySalesmanListView key={salesman.id} id={salesman.id} email={salesman.email}
                                                            onApprove={handleApprove} onReject={handleReject}/>
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
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default VerifySalesman;