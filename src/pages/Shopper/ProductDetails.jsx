import React, {useEffect, useState} from 'react';
import Footer from "../../components/General/Footer";
import Rating from "@mui/material/Rating";
import {FaMinus, FaPlus} from "react-icons/fa6";
import { MdAddShoppingCart } from "react-icons/md";
import { PiStorefrontLight } from "react-icons/pi";
import RatingListItem from "../../components/Shopper/RatingListItem";
import { Pagination, Stack } from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";
import {FiUser} from "react-icons/fi";
import {toast} from "react-toastify";

const ProductDetails = (props) => {
    const { productId } = useParams();

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

    const [product, setProduct] = useState({});
    const [address, setAddress] = useState('');
    const [shopProducts, setShopProducts] = useState([]);

    const navigate = useNavigate();
    // calculate time difference
    const calculateTimeDifference = (inputDate) => {
        if (inputDate) {
            const [date, time] = inputDate.split(' ');

            const currentDate = new Date();
            const targetDate = new Date(date);

            if(targetDate === currentDate) {
                return "0 ngày";
            }

            const diffInMilliseconds = currentDate - targetDate;
            const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

            if (diffInDays <= 30) {
                return `${diffInDays} ngày`;
            }

            const diffInMonths = Math.floor(diffInDays / 30);
            if (diffInMonths <= 11) {
                return `${diffInMonths} tháng`;
            }

            const diffInYears = Math.floor(diffInMonths / 12);
            return `${diffInYears} năm`;
        }
    }

    // convert number (k, m, b)
    const convertNumber = (number) => {
        if (number >= 1e9) {
            return (number / 1e9).toFixed(1).replace(/\.0$/, '') + 'T';
        } else if (number >= 1e6) {
            return (number / 1e6).toFixed(1).replace(/\.0$/, '') + 'Tr';
        } else if (number >= 1e3) {
            return (number / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
        } else {
            return number?.toString();
        }
    }

    const [hoRateList, setHORateList] = useState([]);

    const rateFilterList = [
        { id: 1, text: 'Tất cả' },
        { id: 2, text: `5 sao (${convertNumber(hoRateList.totalRating5) ?? convertNumber(0)})` },
        { id: 3, text: `4 sao (${convertNumber(hoRateList.totalRating4) ?? convertNumber(0)})` },
        { id: 4, text: `3 sao (${convertNumber(hoRateList.totalRating3) ?? convertNumber(0)})` },
        { id: 5, text: `2 sao (${convertNumber(hoRateList.totalRating2) ?? convertNumber(0)})` },
        { id: 6, text: `1 sao (${convertNumber(hoRateList.totalRating1) ?? convertNumber(0)})` },
    ];


    // state for quantity
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        quantity === '' ? setQuantity(1) : setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;

        if (value === '0') {
            setQuantity(1);
            return;
        }

        // Chỉ cập nhật state nếu giá trị là một số hợp lệ
        if (value === '' || /^\d+$/.test(value)) {
            if (value !== '') {
                if(value >= (product.quantity)){
                    setQuantity(product.quantity);
                }
                else {
                    setQuantity(parseInt(value));
                }
            }
            else {
                setQuantity('');
            }
        }
    };

    // format number with dots
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number?.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    // state for image
    const [imgURL, setImgURL] = useState("");

    const [imgIndex, setImgIndex] = useState(1);

    const [images, setImages] = useState([]);

    const handleImage1 = () => {
        setImgIndex(1);
        setImgURL(images[0]);
    }

    const handleImage2 = () => {
        setImgIndex(2);
        setImgURL(images[1]);
    }

    const handleImage3 = () => {
        setImgIndex(3);
        setImgURL(images[2]);
    }

    const [selectedRate, setSelectedRate] = useState(1);

    const handleRate = (id) => {
        setSelectedRate(id);
    }

    const [page, setPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem- itemsPerPage;
    const [currentRateList, setCurrentRateList] = useState((hoRateList.ratings)?.slice(indexOfFirstItem, indexOfLastItem));

    const [totalPages, setTotalPages] = useState(Math.ceil((hoRateList.ratings)?.length / itemsPerPage));

    const handleChange = (event, value) => {
        setPage(value);
    }

    useEffect(() => {
        switch (selectedRate) {
            case 1:{
                try {
                    setLoading(true);
                    openLoadingModal();
                    setCurrentRateList((hoRateList.ratings)?.filter((rateItem) => rateItem.rating >= 0).slice(indexOfFirstItem, indexOfLastItem));
                    setPage(1);
                    setTotalPages(Math.ceil((hoRateList.ratings)?.filter((rateItem) => rateItem.rating >= 0).length / itemsPerPage));
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
            }break;

            case 2:{
                try {
                    setLoading(true);
                    openLoadingModal();
                    setCurrentRateList((hoRateList.ratings)?.filter((rateItem) => rateItem.rating === 5).slice(indexOfFirstItem, indexOfLastItem));
                    setPage(1);
                    setTotalPages(Math.ceil((hoRateList.ratings)?.filter((rateItem) => rateItem.rating === 5).length / itemsPerPage));
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
            }break;

            case 3:{
                try {
                    setLoading(true);
                    openLoadingModal();
                    setCurrentRateList((hoRateList.ratings)?.filter((rateItem) => rateItem.rating === 4).slice(indexOfFirstItem, indexOfLastItem));
                    setPage(1);
                    setTotalPages(Math.ceil((hoRateList.ratings)?.filter((rateItem) => rateItem.rating === 4).length / itemsPerPage));
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
            }break;

            case 4:{
                try {
                    setLoading(true);
                    openLoadingModal();
                    setCurrentRateList((hoRateList.ratings)?.filter((rateItem) => rateItem.rating === 3).slice(indexOfFirstItem, indexOfLastItem));
                    setPage(1);
                    setTotalPages(Math.ceil((hoRateList.ratings)?.filter((rateItem) => rateItem.rating === 3).length / itemsPerPage));
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
            }break;

            case 5:{
                try {
                    setLoading(true);
                    openLoadingModal();
                    setCurrentRateList((hoRateList.ratings)?.filter((rateItem) => rateItem.rating === 2).slice(indexOfFirstItem, indexOfLastItem));
                    setPage(1);
                    setTotalPages(Math.ceil((hoRateList.ratings)?.filter((rateItem) => rateItem.rating === 2).length / itemsPerPage));
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
            }break;

            case 6:{
                try {
                    setLoading(true);
                    openLoadingModal();
                    setCurrentRateList((hoRateList.ratings)?.filter((rateItem) => rateItem.rating === 1).slice(indexOfFirstItem, indexOfLastItem));
                    setPage(1);
                    setTotalPages(Math.ceil((hoRateList.ratings)?.filter((rateItem) => rateItem.rating === 1).length / itemsPerPage));
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
            }break;

            default: break;
        }
    }, [selectedRate, page]);

    const handleAddToCart = async () => {
        // Call API to add product to cart
        try {
            setLoading(true);
            openLoadingModal();
            let data = {
                productId: productId,
                amount: quantity
            }
            await instance.post('v1/shopping-service/cart/add', data);
            toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
        }
        catch (error) {
            setLoading(false);
            closeLoadingModal();
            toast.error("Thêm sản phẩm vào giỏ hàng thất bại!");
            console.log(error);
        }
        finally {
            setLoading(false);
            closeLoadingModal();
            setQuantity(1);
        }
    }

    const handleViewShop = (shopId) => {
        // Navigate to shop page
        navigate(`/shopper/shop/${shopId}`);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                const getMeResponse = await instance.get('v1/user-service/shopper/me');
                setAddress(getMeResponse.data.data.address);

                // Call API to get product details data
                const response = await instance.get(`v1/shopping-service/product/${productId}`);
                setProduct( await response.data.data);
                setImages(response.data.data.picture);
                setImgURL(response.data.data.picture[0]);

                // Call API to get rate list
                const rateResponse = await instance.get(`v1/shopping-service/product-rating/by-product/${productId}`);
                setHORateList(rateResponse.data.data);
                setSelectedRate(1);
                setPage(1);
                setTotalPages(Math.ceil(rateResponse.data.data.ratings?.length / itemsPerPage));
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
                const response = await instance.get(`v1/shopping-service/product/by-shop/${product?.shopId}?rpp=100&page=1`)
                setShopProducts(response.data.data.items);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [product]);

    return (
        <div className="bg-Light_gray w-screen">
            <main className="grid grid-cols-[1fr_10fr_1fr]">
                <div className="col-start-2">
                    <div className="bg-White rounded-sm grid grid-cols-[37%_63%] my-2 gap-4">
                        <div className="col-start-1 mx-3 select-none flex flex-col flex-shrink-0 gap-2 my-5">
                            <div className="w-full flex flex-shrink-0">
                                <img src={imgURL} alt="img" className="object-cover w-[29rem] h-[29rem]"/>
                            </div>

                            <div className="flex items-center justify-between flex-shrink-0">
                                {imgIndex === 1
                                    ?
                                    <div
                                        className="border border-Blue ring-2 ring-Blue flex flex-shrink-0 cursor-pointer">
                                        <img src={images[0]} alt="img"
                                             className="object-cover w-[9rem] h-[9rem]" onClick={handleImage1}/>
                                    </div>
                                    :
                                    <div
                                        className="border flex flex-shrink-0 cursor-pointer">
                                        <img src={images[0]} alt="img"
                                             className="object-cover w-[9rem] h-[9rem]" onClick={handleImage1}/>
                                    </div>}

                                {imgIndex === 2
                                    ?
                                    <div
                                        className="border border-Blue ring-2 ring-Blue flex flex-shrink-0 cursor-pointer">
                                        <img src={images[1]} alt="img"
                                             className="object-cover w-[9rem] h-[9rem]" onClick={handleImage2}/>
                                    </div>
                                    :
                                    <div
                                        className="border flex flex-shrink-0 cursor-pointer">
                                        <img src={images[1]} alt="img"
                                             className="object-cover w-[9rem] h-[9rem]" onClick={handleImage2}/>
                                    </div>}

                                {imgIndex === 3
                                    ?
                                    <div
                                        className="border border-Blue ring-2 ring-Blue flex flex-shrink-0 cursor-pointer">
                                        <img src={images[2]} alt="img"
                                             className="object-cover w-[9rem] h-[9rem]" onClick={handleImage3}/>
                                    </div>
                                    :
                                    <div
                                        className="border flex flex-shrink-0 cursor-pointer">
                                        <img src={images[2]} alt="img"
                                             className="object-cover w-[9rem] h-[9rem]" onClick={handleImage3}/>
                                    </div>}
                            </div>
                        </div>

                        <div className="col-start-2 my-2 flex flex-col gap-2">
                            <div>
                                <span className="text-[2rem] font-semibold text-pretty">
                                    {product.name ?? "Mặt nạ giấy trắng da Vedette Nha Đam 22ml"}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div>
                                    <span className="text-Star font-semibold text-xl">
                                        {product.ratingAverage?.toFixed(1) ?? "0.0"}
                                    </span>
                                </div>

                                <Rating name="product_rating" value={product.ratingAverage?.toFixed(1) ?? 0} precision={0.1} readOnly sx={{
                                    '& .MuiRating-iconFilled': {
                                        color: '#FABC3F',
                                    }, '& .MuiRating-iconHover': {
                                        color: '#FABC3F',
                                    },
                                }}/>

                                <div className="border-l-2 border-Gray h-5 mt-0.5"></div>

                                <div className="flex items-center justify-center gap-1">
                                    <span className="ttext-Black font-semibold text-md">
                                        {convertNumber(hoRateList.ratings?.length ?? 0)}
                                    </span>

                                    <span className="text-Gray text-md">
                                         đánh giá
                                    </span>
                                </div>
                            </div>

                            <div className="bg-Lighter_gray flex items-center gap-2 mr-8 p-4">
                                 <span className="text-Red font-bold text-2xl underline">
                                    đ
                                </span>

                                <span className="text-Red font-bold text-[2rem]">
                                    {formatNumberWithDots(product.price) ?? formatNumberWithDots(777777)}
                                </span>
                            </div>

                            <div className="grid grid-cols-[2fr_8fr]">
                                <div className="col-start-1 flex flex-col gap-10">
                                    <div>
                                        <span className="text-Gray text-md">
                                         Chính sách trả hàng
                                        </span>
                                    </div>

                                    <div>
                                        <span className="text-Gray text-md">
                                            Vận chuyển
                                        </span>
                                    </div>

                                    <div className="mt-6">
                                        <span className="text-Gray text-md">
                                            Số lượng
                                        </span>
                                    </div>
                                </div>

                                <div className="col-start-2 flex flex-col gap-10">
                                    <div>
                                        <span className="font-semibold text-Red">
                                            Trả hàng trong 7 ngày. Miễn phí đổi hàng.
                                        </span>
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <span className="text-Gray text-md">
                                            Vận chuyển đến
                                        </span>

                                        <span className="text-Black font-bold text-md">
                                            {address ?? "Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div
                                            className="max-w-[150px] border border-Black grid grid-cols-[25%_50%_25%] items-center">
                                            {quantity === 1
                                                ?
                                                <button
                                                    className="border-r h-[28px] border-r-Black flex items-center justify-center select-none cursor-not-allowed"
                                                    disabled>
                                                    <FaMinus className="object-cover text-Dark_gray"/>
                                                </button>
                                                :
                                                <button
                                                    className="border-r h-[28px] border-r-Black flex items-center justify-center select-none"
                                                    onClick={decreaseQuantity}>
                                                    <FaMinus className="object-cover"/>
                                                </button>}

                                            <div className="col-start-2">
                                                <input type="text"
                                                       className="border-none focus:outline-none w-full text-center"
                                                       value={quantity} onChange={handleInputChange}/>
                                            </div>

                                            {quantity >= (product.quantity)
                                                ?
                                                <button
                                                    className="border-l h-[28px] border-l-Black flex items-center justify-center select-none cursor-not-allowed"
                                                    disabled>
                                                    <FaPlus className="object-cover text-Dark_gray"/>
                                                </button>
                                                :
                                                <button
                                                    className="border-l h-[28px] border-l-Black flex items-center justify-center select-none"
                                                    onClick={increaseQuantity}>
                                                    <FaPlus className="object-cover"/>
                                                </button>
                                            }
                                        </div>

                                        <div>
                                            <span className="text-Gray">
                                                Còn {product.quantity} sản phẩm
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <button
                                    className="border border-Blue rounded-sm bg-Lighter_blue flex items-center justify-around gap-3 p-2 hover:bg-Lighterter_blue" onClick={handleAddToCart}>
                                    <div>
                                        <MdAddShoppingCart className="text-Blue h-6 w-6"/>
                                    </div>

                                    <span className="text-Blue font-semibold text-lg">
                                        Thêm vào giỏ hàng
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-White rounded-sm grid grid-cols-[0.25fr_11.5fr_0.25fr] my-2">
                        <div className="col-start-2 flex items-center my-4 gap-24">
                            <div className="flex items-center gap-4">
                                <div>
                                    {product.shop?.profilePicture
                                        ?
                                        <img src={product.shop?.profilePicture} alt="avatar"
                                             className="object-cover h-[5rem] w-[5rem] rounded-[50%]"/>
                                        :
                                        <div className="h-[5rem] w-[5rem] rounded-[50%] bg-Gray">
                                            <FiUser className="text-Dark_gray h-16 w-16"/>
                                        </div>
                                        }
                                </div>

                                <div className="flex flex-col justify-center gap-2">
                                    <div>
                                        <span className="font-bold">
                                            {product.shop?.name}
                                        </span>
                                    </div>

                                    <div>
                                        <button
                                            className="flex justify-center items-center border-2 border-Blue bg-Lighter_blue rounded-md px-2.5 py-0.5 gap-2 hover:bg-Lighterter_blue" onClick={() => handleViewShop(product.shopId)}>
                                            <PiStorefrontLight className="text-Blue h-4 w-4"/>

                                            <span className="text-Blue text-sm">
                                                Thông tin shop
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="border-l-2 border-Gray h-20"></div>

                            <div className="flex items-center">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-20">
                                        <span className="text-Gray text-md">
                                            Mặt hàng
                                        </span>

                                        <span>
                                            <span className="text-Blue font-semibold text-md">
                                                {convertNumber(shopProducts?.length)}
                                            </span>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-20">
                                        <span className="text-Gray text-md">
                                            Đánh giá
                                        </span>

                                        <span>
                                            <span className="text-Blue font-semibold text-md">
                                                {props.totalRating ?? convertNumber(16)}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-24">
                                        <span className="text-Gray text-md">
                                            Số sao
                                        </span>

                                        <span>
                                            <span className="text-Star font-semibold text-md">
                                                {shopProducts.reduce((total, currentValue) => {
                                                    return total + currentValue.ratingAverage/shopProducts?.length;
                                                }, 0).toFixed(1)}/5.0
                                            </span>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-20">
                                        <span className="text-Gray text-md">
                                            Tham gia
                                        </span>

                                        <span>
                                            <span className="text-Blue font-semibold text-md">
                                                {calculateTimeDifference(product.shop?.createAt)} trước
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-White rounded-sm my-2">
                        <div className="bg-gradient-to-b from-Blue to-Light_blue rounded-sm py-1 text-center">
                            <span className="text-White font-bold text-2xl p-4">
                                CHI TIẾT SẢN PHẨM
                            </span>
                        </div>

                        <div className="grid grid-cols-[0.25fr_11.5fr_0.25fr] mt-4">
                            <div className="col-start-2 flex items-center gap-28 mb-4">
                                <div className="flex flex-col justify-center gap-10">
                                    <div className="flex items-center">
                                        <span className="text-Gray text-md">
                                            Danh mục
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <span className="text-Gray text-md">
                                            Số lượng tồn kho
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center gap-10">
                                    <div className="flex items-center cursor-pointer select-none">
                                        <span className="text-Blue font-semibold text-md">
                                            {product.category?.name}
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <span className="text-Blue font-semibold text-md">
                                            {product.quantity}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-White rounded-sm my-2">
                        <div className="bg-gradient-to-b from-Blue to-Light_blue rounded-sm py-1 text-center">
                            <span className="text-White font-bold text-2xl p-4">
                                MÔ TẢ SẢN PHẨM
                            </span>
                        </div>

                        <div className="grid grid-cols-[0.25fr_11.5fr_0.25fr] mt-4">
                            <div className="col-start-2 mb-4">
                                <p className="whitespace-pre-line">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-White rounded-sm my-2">
                        <div className="bg-gradient-to-b from-Blue to-Light_blue rounded-sm py-1 text-center">
                            <span className="text-White font-bold text-2xl p-4">
                                ĐÁNH GIÁ SẢN PHẨM
                            </span>
                        </div>

                        <div className="grid grid-cols-[0.25fr_11.5fr_0.25fr] mt-4">
                            <div className="col-start-2">
                                <div className="bg-Light_gray rounded-md flex gap-28 justify-center mb-4">
                                    <div className="flex flex-col justify-center items-center my-4">
                                        <div>
                                            <span className="text-Star font-bold text-[2rem]">
                                                {product.ratingAverage?.toFixed(1) ?? "0.0"}/5.0
                                            </span>
                                        </div>

                                        <Rating name="product_rating" value={product.ratingAverage?.toFixed(1) ?? 0} readOnly precision={0.1} sx={{
                                            '& .MuiRating-iconFilled': {
                                                color: '#FABC3F',
                                            }, '& .MuiRating-iconHover': {
                                                color: '#FABC3F',
                                            },
                                        }}/>
                                    </div>

                                    <div className="flex flex-row flex-wrap gap-10 my-4 items-center justify-center select-none">
                                        {rateFilterList.map(({id, text}) => (
                                            <div
                                                key={id}
                                                onClick={() => { handleRate(id)}}
                                                className={`rounded-md h-fit bg-White px-4 py-0.5 cursor-pointer ${selectedRate === id ? "border-2 border-Blue" : "border-2"}`}>
                                                <span className={`${selectedRate === id ? "text-Blue font-semibold" : "font-semibold"}`}>
                                                    {text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {currentRateList?.length === 0
                                    ?
                                    <div className="text-center py-2 bg-Lighter_gray mb-2">
                                        <span className="text-Dark_gray">
                                            Không có đánh giá nào!
                                        </span>
                                    </div>
                                    :
                                    <div className="flex flex-col gap-4 mb-4">
                                        {currentRateList?.map((rateItem) => (
                                            <RatingListItem key={rateItem.id} id={rateItem.id} name={rateItem.shopper?.fullname} picture={rateItem.shopper?.profilePicture}
                                                            rating={rateItem.rating} date={rateItem.date}
                                                            comment={rateItem.comment}/>
                                        ))}
                                    </div>}

                                <div className="flex items-center justify-center mb-4">
                                    <Stack>
                                        <Pagination
                                            count={totalPages}
                                            page={page}
                                            onChange={handleChange}
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

export default ProductDetails;