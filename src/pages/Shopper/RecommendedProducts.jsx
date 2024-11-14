import React, {useEffect, useState} from 'react';
import Footer from "../../components/General/Footer";
import ProductCardViewLg from "../../components/Shopper/ProductCardViewLg";
import {Pagination, Stack} from "@mui/material";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";

const RecommendedProducts = () => {
    const [products, setProducts] = useState([]);

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

    // set up pagination
    const [page, setPage] = React.useState(1);

    const [itemsPerPage, setItemsPerPage] = useState(24);
    const [totalPages, setTotalPages] = useState(null);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0)
    }
    // end of set up pagination

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                const productsResponse = await instance.get(`v1/shopping-service/product/recommend?page=${page}&rpp=${itemsPerPage}`);
                setProducts(productsResponse.data.data.items);
                setTotalPages(Math.ceil(productsResponse.data.data.total / itemsPerPage));
            }
            catch (error){
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
    }, [page]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                setPage(1);
                setItemsPerPage(24);
                const productsResponse = await instance.get(`v1/shopping-service/product/recommend?page=${page}&rpp=${itemsPerPage}`);
                setProducts(productsResponse.data.data.items);
                setTotalPages(Math.ceil(productsResponse.data.data.total / itemsPerPage));
            }
            catch (error){
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
                <div className="col-start-2 flex flex-col gap-6">
                    <div className="bg-gradient-to-b from-Blue to-Light_blue rounded-sm py-1 text-center mb-4">
                        <span className="text-White font-bold text-2xl p-4">
                            DÀNH RIÊNG CHO BẠN
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                        {products.map((product) => (
                            <ProductCardViewLg id={product.id} name={product.name} price={product.price} picture={product.picture[0]}
                                               rating={product.ratingAverage.toFixed(1)}/>
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

                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default RecommendedProducts;