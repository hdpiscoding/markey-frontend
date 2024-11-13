import React, {useEffect, useState} from "react";
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";
import AdminNav from "../../components/Admin/AdminNav";
import {Pagination, Stack} from "@mui/material";
import UserListView from "../../components/Admin/UserListView";
import {instance} from "../../AxiosConfig";
import LoadingModal from "../../components/General/LoadingModal";

const ManageShopper = () => {
    const [loading, setLoading] = useState(false);

    // Cache shoppers
    const [activeShopper, setActiveShopper] = useState([]);
    const [blockedShopper, setBlockedShopper] = useState([]);

    const [isActive, setIsActive] = useState(true);

    // set up pagination
    const [activePage, setActivePage] = React.useState(1);
    const [blockedPage, setBlockedPage] = React.useState(1);

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalActivePages, setTotalActivePages] = useState(0);
    const [totalBlockedPages, setTotalBlockedPages] = useState(0);

    const indexOfLastActiveItem = activePage * itemsPerPage;
    const indexOfFirstActiveItem = indexOfLastActiveItem - itemsPerPage;
    const currentActiveItems = activeShopper.slice(indexOfFirstActiveItem, indexOfLastActiveItem);

    const indexOfLastBlockedItem = blockedPage * itemsPerPage;
    const indexOfFirstBlockedItem = indexOfLastBlockedItem - itemsPerPage;
    const currentBlockedItems = blockedShopper.slice(indexOfFirstBlockedItem, indexOfLastBlockedItem);
    // end set up pagination

    const fetchShopperData = async () => {
        try {
            const response = await instance.get("v1/user-service/shopper/");
            const items = response.data.data;

            setActiveShopper(items.filter((item) => item.isBlocked === false));
            setBlockedShopper(items.filter((item) => item.isBlocked === true));
        } catch (error) {
            console.error(error);
        }
    };

    // Update page counts in useEffect
    useEffect(() => {
        setTotalActivePages(Math.ceil(activeShopper.length / itemsPerPage));
        setTotalBlockedPages(Math.ceil(blockedShopper.length / itemsPerPage));
    }, [activeShopper, blockedShopper, itemsPerPage]);

    // Fetch initial data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                await fetchShopperData();
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
            }
        }

        fetchData();
    }, []);

    // Handling active/blocked toggle
    const handleActiveChange = (bool) => {
        setIsActive(bool);
        setActivePage(1);
        setBlockedPage(1);
        window.scrollTo(0, 0);  // Optional: Scroll to top on tab change
    };

    // Page change handler
    const handlePageChange = (event, value) => {
        if (isActive) {
            setActivePage(value);
        } else {
            setBlockedPage(value);
        }
    };


    const handleUpdateData = async () => {
        try {
            setLoading(true);
            openLoadingModal();
            await fetchShopperData();
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
            closeLoadingModal();
        }
    }

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
                            {(isActive ? currentActiveItems : currentBlockedItems).map((shopper) => (
                                <UserListView key={shopper.id} id={shopper.id} email={shopper.email} role="shopper" isLocked={!isActive} onUpdateData={handleUpdateData}/>
                            ))}
                        </div>

                        <div className="flex items-center justify-center">
                            <Stack>
                                <Pagination
                                    count={isActive ? totalActivePages : totalBlockedPages}
                                    page={isActive ? activePage : blockedPage}
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

export default ManageShopper;