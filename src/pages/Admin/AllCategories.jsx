import React, {useState} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";
import AdminNav from "../../components/Admin/AdminNav";
import VerifySalesmanListView from "../../components/Admin/VerifySalesmanListView";
import {Pagination, Stack} from "@mui/material";
import CategoryListView from "../../components/Admin/CategoryListView";

const AllCategories = () => {
    const [sampleCategories, setSampleCategories] = useState([
        { id: 1, name: "Chăm sóc tóc" },
        { id: 2, name: "Chăm sóc da mặt" },
        { id: 3, name: "Trang điểm" },
        { id: 4, name: "Chăm sóc cơ thể" },
        { id: 5, name: "Chăm sóc da mắt" },
        { id: 6, name: "Chăm sóc da môi" },
    ]);

    const [categories, setCategories] = useState([]);


    // set up pagination
    const [page, setPage] = useState(1);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(sampleCategories.length / itemsPerPage);

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentCategories = sampleCategories.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0)
    }
    // end of set up pagination

    const handleDelete = (id) => {
        setSampleCategories(sampleCategories.filter((category) => category.id !== id));
    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Quản trị viên"/>

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
                                    <CategoryListView key={category.id} id={category.id} name={category.name} onDelete={handleDelete}/>
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

export default AllCategories;