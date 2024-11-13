import React, {useEffect, useState} from 'react';
import PrimaryHeader from "../../components/General/PrimaryHeader";
import Footer from "../../components/General/Footer";
import Filter from "../../components/General/Filter";
import ProductCardViewMd from "../../components/Shopper/ProductCardViewMd";
import {Pagination, Stack} from "@mui/material";
import {useParams} from "react-router-dom";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";

const CategoryProducts = () => {
    const {categoryId} = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});

    const [selectedDiv, setSelectedDiv] = useState(1); // Default selected div (1: Phổ biến, 2: Bán chạy, 3: Giá)
    const [selectValue, setSelectValue] = useState('default');

    const handleDivClick = async (index) => {
        if ( index === 1 ){
            await handleSortByRating();
        }
        if (selectedDiv !== index) {
            setSelectedDiv(index);
            if (selectedDiv === 3) {
                setSelectValue('default');
            }
        }
    };

    const handleSelectChange = async (event) => {
        const value = event.target.value;
        setSelectValue(value);
        await handleSortByPrice(parseInt(value));
    };

    // set up pagination
    const [page, setPage] = useState(1);

    const itemsPerPage = 25;
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

    // Set up sort and filter for API request
    const [filter, setFilter] = useState({
        sort:{
            by: "ratingAverage",
            order: "DESC"
        },
        name: null,
        priceFrom: null,
        priceTo: null,
        aboveRating: null,
        categoryId: categoryId,
        shopId: null
    });

    const handleSortByRating = async () => {
        setFilter({...filter, sort: {by: "ratingAverage", order: "DESC"}});
    }

    const handleSortByPrice = async (value) => {
        if (value === 1) {
            setFilter({...filter, sort: {by: "price", order: "ASC"}});
        }
        else if (value === 2) {
            setFilter({...filter, sort: {by: "price", order: "DESC"}});
        }
    }

    const handleFilterByPrice = async (fromPrice, toPrice) => {
        setFilter({...filter, priceFrom: fromPrice, priceTo: toPrice});
    }

    const handleFilterByRating = async (rating) => {
        setFilter({...filter, aboveRating: rating});
    }

    const handleResetFilter = async () => {
        setFilter({
            sort:{
                by: "ratingAverage",
                order: "DESC"
            },
            name: null,
            priceFrom: null,
            priceTo: null,
            aboveRating: null,
            categoryId: categoryId
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                const response = await instance.post(`v1/shopping-service/product/filter?page=${page}&rpp=${itemsPerPage}`, filter);
                setTotalPages(Math.ceil(response.data.data.total / itemsPerPage));
                setProducts(response.data.data.items);
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
    }, [filter]);
    // End set up sort and filter for API request

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                const categoryResponse = await instance.get(`v1/shopping-service/category/${categoryId}`);
                setCategory(categoryResponse.data.data);

                let filter = {
                    categoryId: categoryId,
                }
                // Call API to get products data by categoryId
                const response = await instance.post(`v1/shopping-service/product/filter?page=${page}&rpp=${itemsPerPage}`, filter);
                setTotalPages(Math.ceil(response.data.data.total / itemsPerPage));
                setProducts(response.data.data.items);
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

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 flex flex-col gap-4">
                    <div className="bg-gradient-to-b from-Blue to-Light_blue rounded-sm py-1 text-center mb-4">
                        <span className="text-White font-bold text-2xl p-4">
                            {category.name?.toUpperCase()}
                        </span>
                    </div>

                    <div className="grid grid-cols-[22%_1%_77%]">
                        <Filter onFilterByPrice={handleFilterByPrice} onFilterByRating={handleFilterByRating} onResetFilter={handleResetFilter}/>

                        <div className="col-start-3 flex flex-col gap-6">
                            <div className="bg-[#e1e1e1]">
                                <div className="flex items-center gap-20 ml-8 py-2">
                                    <div>
                                        <span className="font-semibold text-lg">
                                            Sắp xếp theo
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-10 select-none">
                                        <div className={`flex text-center rounded-md px-5 py-1 cursor-pointer 
                                            ${selectedDiv === 1 ? 'bg-Blue text-white' : 'bg-White'}`}
                                             onClick={() => handleDivClick(1)}>
                                            <span>
                                                Phổ biến
                                            </span>
                                        </div>

                                        <div>
                                            <select className={`rounded-md px-5 py-1 cursor-pointer 
                                                    ${selectedDiv === 3 ? 'border border-Blue outline-none ring-2 ring-Blue text-Blue' : ''}`}
                                                    onClick={() => handleDivClick(3)}
                                                    value={selectValue} onChange={handleSelectChange}>
                                                <option value="default" disabled hidden>Giá:</option>
                                                <option value="1">Giá: Thấp đến Cao</option>
                                                <option value="2">Giá: Cao đến Thấp</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
                                {products.map((product) => (
                                    <ProductCardViewMd key={product.id} id={product.id} name={product.name} price={product.price} picture={product.picture[0]}
                                                       rating={product.ratingAverage} role="shopper"/>
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

                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default CategoryProducts;