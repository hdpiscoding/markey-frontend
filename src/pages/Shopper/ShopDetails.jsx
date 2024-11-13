import React, {useEffect, useState} from "react";
import PrimaryHeader from "../../components/General/PrimaryHeader";
import Filter from "../../components/General/Filter";
import ProductCardViewMd from "../../components/Shopper/ProductCardViewMd";
import {Pagination, Stack} from "@mui/material";
import Footer from "../../components/General/Footer";
import avatar from "../../assets/avatar_holder.svg";
import { IoLocationSharp } from "react-icons/io5";
import {useParams} from "react-router-dom";
import {instance} from "../../AxiosConfig";
import LoadingModal from "../../components/General/LoadingModal";

const ShopDetails = () => {
    const [products, setProducts] = useState([]);
    const { shopId } = useParams();
    const [shop, setShop] = useState({});
    const [address, setAddress] = useState('');

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
        categoryId: null,
        shopId: shopId
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
            categoryId: null,
            shopId: shopId
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
                const shopResponse = await instance.get(`v1/shopping-service/shop/${shopId}`);
                setShop(shopResponse.data.data);

                let filter = {
                    shopId: shopId,
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesmanId = shop.salesmanId;
                const response = await instance.get(`v1/user-service/salesman/${salesmanId}`);
                setAddress(response.data.data.address);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [shop]);

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="flex flex-col">
                <div className="bg-White grid grid-cols-[1fr_10fr_1fr] mb-4">
                    <div className="col-start-2 grid grid-cols-[40%_60%] py-2">
                        <div className="col-start-1 flex items-center gap-2">
                            <div>
                                <img src={shop.profilePicture} alt="avatar" className="object-cover h-20 w-20 rounded-[50%]"/>
                            </div>

                            <div className="flex flex-col">
                                <div>
                                    <div className="flex items-center">
                                        <span className="font-semibold text-lg">
                                            {shop.name}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-0.5">
                                        <IoLocationSharp className="text-Red"/>

                                        <span className="text-sm">
                                            {address}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-start-2">
                            <p className="text-sm ">
                                {shop.description}
                            </p>
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-[1fr_10fr_1fr] my-4">
                    <div className="col-start-2 flex flex-col gap-4">
                        <div className="bg-gradient-to-b from-Blue to-Light_blue rounded-sm py-1 text-center mb-4">
                            <span className="text-White font-bold text-2xl p-4">
                                SẢN PHẨM CỦA SHOP
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
                                        <ProductCardViewMd key={product.id} id={product.id} name={product.name} price={product.price}
                                                           picture={product.picture[0]} rating={product.ratingAverage} role="shopper"/>
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
                    </div>

                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default ShopDetails;