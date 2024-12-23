import React, {useEffect, useState} from 'react';
import Footer from "../../components/General/Footer";
import AdminNav from "../../components/Admin/AdminNav";
import {Pagination, Stack} from "@mui/material";
import CategoryListView from "../../components/Admin/CategoryListView";
import {instance} from "../../AxiosConfig";
import LoadingModal from "../../components/General/LoadingModal";
import {toast} from "react-toastify";

const AllCategories = () => {
    const [categoryList, setCategoryList] = useState([]);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                const response = await instance.get('v1/shopping-service/category/');
                setCategoryList(response.data.data);
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

    // set up pagination
    const [page, setPage] = useState(1);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(categoryList.length / itemsPerPage);

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentCategories = categoryList.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0)
    }
    // end of set up pagination

    const handleDelete = async () => {
        // Call API to rerender the list
        try {
            const response = await instance.get('v1/shopping-service/category/');
            setCategoryList(response.data.data);
            toast.success("Xóa danh mục thành công!");
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <AdminNav currentPage={2}/>
                    </div>

                    <div className="col-start-3 flex flex-col px-4 py-3 bg-White select-none gap-5">
                        <div className="flex flex-col">
                            <div>
                                <span className="text-[2rem] font-semibold">
                                    Tất cả danh mục
                                </span>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        {currentCategories.length <= 0
                            ? <div className="bg-Lighter_gray flex items-center justify-center p-4">
                                <span className="text-Dark_gray text-center">
                                    Hiện tại chưa có danh mục nào
                                </span>
                            </div>
                            : <div className="flex flex-col gap-4">
                                {currentCategories.map((category) => (
                                    <CategoryListView key={category.id} id={category.id} name={category.name} img={category.picture} onDelete={handleDelete}/>
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

                        {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default AllCategories;