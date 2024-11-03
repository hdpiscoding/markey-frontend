import React, {useEffect, useState} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";
import AdminNav from "../../components/Admin/AdminNav";
import {Pagination, Stack} from "@mui/material";
import VerifySalesmanListView from "../../components/Admin/VerifySalesmanListView";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";

const VerifySalesman = () => {
    const [loading, setLoading] = useState(false);

    const [salesmans, setSalesmans] = useState([]);

    const [selectedDate, setSelectedDate] = useState('1');

    const handleSelectedDateChange = async (event) => {
        setSelectedDate(event.target.value);

        setPage(1);
        if(event.target.value === '1') {
            // Call API to sort by newest date
            try {
                setLoading(true);
                openLoadingModal();
                const response = await instance.post(`v1/user-service/salesman/filter?page=${page}&rpp=${itemsPerPage}`,
                    {sort: {
                            "by": "createAt",
                            "order": "DESC" },
                            isApproved: false});
                const items = response.data.data.items;
                setTotalPages(Math.ceil(response.data.data.total / itemsPerPage));
                setSalesmans(items);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
            }
        }
        else if(event.target.value === '2') {
            // Call API to sort by oldest date
            try {
                setLoading(true);
                openLoadingModal();
                const response = await instance.post(`v1/user-service/salesman/filter?page=${page}&rpp=${itemsPerPage}`,
                    {sort: {
                            "by": "createAt",
                            "order": "ASC" },
                        isApproved: false});
                const items = response.data.data.items;
                setTotalPages(Math.ceil(response.data.data.total / itemsPerPage));
                setSalesmans(items);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
            }
        }
    };

    const fetchData = async () => {
        try {
            // Call API to get all salesmans with isApproved = false
            const response = await instance.post(`v1/user-service/salesman/filter?page=${page}&rpp=${itemsPerPage}`, {sort: {
                    "by": "createAt",
                    "order": "DESC" },
                isApproved: false});
            const items = response.data.data.items;
            setTotalPages(Math.ceil(response.data.data.total / itemsPerPage));
            setSalesmans(items);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // Call API to get all salesmans with isApproved = false and set to salesmans
        const fetchSalesmans = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                await fetchData();

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
                closeLoadingModal();
            }
        }

        fetchSalesmans();
    }, []);

    const handleApprove = async () => {
        // Rerender the list of salesmans
        try {
            setLoading(true);
            openLoadingModal();
            await fetchData();
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
            closeLoadingModal();
        }
    }

    // set up pagination
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);


    const handlePageChange = async (event, value) => {
        setPage(value);
        try {
            setLoading(true);
            openLoadingModal();
            const response = await instance.post(`v1/user-service/salesman/filter?page=${value}&rpp=${itemsPerPage}`, {sort: {
                    "by": "createAt",
                    "order": "DESC" },
                isApproved: false});
            const items = response.data.data.items;
            setTotalPages(Math.ceil(response.data.data.total / itemsPerPage));
            setSalesmans(items);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
            closeLoadingModal();
        }
        window.scrollTo(0, 0)
    }
    // end of set up pagination

    // set up loading modal
    const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);

    const openLoadingModal = () => {
        setLoadingModalOpen(true);
    };

    const closeLoadingModal = () => {
        setLoadingModalOpen(false);
    };
    // end set up loading modal

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

                        {salesmans.length <= 0
                            ? <div className="bg-White flex items-center justify-center p-4">
                                <span className="text-Dark_gray text-center">
                                    Hiện tại không có người bán nào cần duyệt
                                </span>
                            </div>
                            : <div className="flex flex-col gap-4">
                                {salesmans.map((salesman) => (
                                    <VerifySalesmanListView key={salesman.id} id={salesman.id} email={salesman.email}
                                                            onApprove={handleApprove}/>
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

export default VerifySalesman;