import React, {useEffect, useState} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import ProductCardViewMd from "../../components/Shopper/ProductCardViewMd";
import {Pagination, Stack} from "@mui/material";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [shopId, setShopId] = useState("");

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

    const handleSelectedPriceChange = async (event) => {
        setSelectedPrice(event.target.value);

        setPage(1);
        if (event.target.value === '1') {
            // Call API to sort by low to high price
            let filter = {
                sort: {
                    by: "price",
                    order: "ASC" // DESC | ASC
                },
                shopId: shopId
            }
            // Call API to get all products
            const response = await instance.post(`v1/shopping-service/product/filter?page=${page}&rpp=${itemsPerPage}`, filter);
            setTotalPages(Math.ceil(response.data.data.total/itemsPerPage));
            setProducts(await response.data.data.items);
        }
        else if (event.target.value === '2') {
            // Call API to sort by high to low price
            let filter = {
                sort: {
                    by: "price",
                    order: "DESC" // DESC | ASC
                },
                shopId: shopId
            }
            // Call API to get all products
            const response = await instance.post(`v1/shopping-service/product/filter?page=${page}&rpp=${itemsPerPage}`, filter);
            setTotalPages(Math.ceil(response.data.data.total/itemsPerPage));
            setProducts(await response.data.data.items);
        }
    };

    // set up pagination
    const [page, setPage] = useState(1);

    const itemsPerPage = 10;
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
                const shopResponse = await instance.get('v1/shopping-service/shop/me');
                const shopID = shopResponse.data.data.id;

                let filter = {
                    shopId: shopID
                }
                setShopId(shopID);

                // Call API to get all products
                const response = await instance.post(`v1/shopping-service/product/filter?page=${page}&rpp=${itemsPerPage}`, filter);
                setTotalPages(Math.ceil(response.data.data.total/itemsPerPage));
                setProducts(await response.data.data.items);
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
            <SecondaryHeader head="Kênh người bán"/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={2}/>
                    </div>

                    <div className="col-start-3 flex flex-col gap-5">
                        <div className="flex flex-col">
                            <div className="bg-White flex items-center pl-4 pt-3">
                            <span className="text-[2rem] font-semibold">
                                Tất cả sản phẩm
                            </span>
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
                                    <option value="default" disabled hidden>Giá:</option>
                                    <option value="1">Giá: Thấp đến cao</option>
                                    <option value="2">Giá: Cao đến Thấp</option>
                                </select>
                            </div>
                        </div>

                        {products.length <= 0
                            ?
                            <div className="flex items-center justify-center text-center w-full bg-Lighter_gray py-4">
                                <span className="text-Gray">
                                    Hiện tại bạn chưa có sản phẩm nào! Hãy thêm sản phẩm mới!
                                </span>
                            </div>
                            :
                            <div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 justify-items-center">
                                {products.map((product) => (
                                    <ProductCardViewMd key={product.id} name={product.name} price={product.price} image={product.picture} id={product.id}
                                                       rating={product.ratingAverage} role="salesman"/>
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

export default AllProducts;