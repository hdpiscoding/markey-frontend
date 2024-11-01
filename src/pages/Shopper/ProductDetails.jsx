import React, {useEffect, useState} from 'react';
import PrimaryHeader from "../../components/General/PrimaryHeader";
import Footer from "../../components/General/Footer";
import product_1 from '../../assets/product_1.png';
import product_2 from '../../assets/product_2.png';
import product_3 from '../../assets/product_3.png';
import Rating from "@mui/material/Rating";
import {FaMinus, FaPlus} from "react-icons/fa6";
import { MdAddShoppingCart } from "react-icons/md";
import avatar from "../../assets/avatar_holder.svg";
import { PiStorefrontLight } from "react-icons/pi";
import RatingListItem from "../../components/Shopper/RatingListItem";
import { Pagination, Stack } from "@mui/material";
import {useNavigate} from "react-router-dom";


const ProductDetails = (props) => {
    const navigate = useNavigate();
    // calculate time difference
    const calculateTimeDifference = (inputDate) => {
        const currentDate = new Date();
        const targetDate = new Date(inputDate);

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

    // convert number (k, m, b)
    const convertNumber = (number) => {
        if (number >= 1e9) {
            return (number / 1e9).toFixed(1).replace(/\.0$/, '') + 'T';
        } else if (number >= 1e6) {
            return (number / 1e6).toFixed(1).replace(/\.0$/, '') + 'Tr';
        } else if (number >= 1e3) {
            return (number / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
        } else {
            return number.toString();
        }
    }

    const rateFilterList = [
        { id: 1, text: 'Tất cả' },
        { id: 2, text: `5 sao (${props.fiveStar ?? convertNumber(0)})` },
        { id: 3, text: `4 sao (${props.fourStar ?? convertNumber(0)})` },
        { id: 4, text: `3 sao (${props.threeStar ?? convertNumber(0)})` },
        { id: 5, text: `2 sao (${props.twoStar ?? convertNumber(0)})` },
        { id: 6, text: `1 sao (${props.oneStar ?? convertNumber(0)})` },
    ];

    const rateList = [
        { id: 1, name: 'Lionel Messi', rating: 5.0, date: '2024-10-01' },
        { id: 2, name: 'Cristiano Ronaldo', rating: 5.0, date: '2024-10-02' },
        { id: 3, name: 'Neymar Jr.', rating: 4.0, date: '2024-10-03' },
        { id: 4, name: 'Kylian Mbappé', rating: 4.0, date: '2024-10-04' },
        { id: 5, name: 'Kevin De Bruyne', rating: 3.0, date: '2024-10-05' },
        { id: 6, name: 'Mohamed Salah', rating: 4.0, date: '2024-10-06' },
        { id: 7, name: 'Robert Lewandowski', rating: 4.0, date: '2024-10-07' },
        { id: 8, name: 'Virgil van Dijk', rating: 3.0, date: '2024-10-08' },
        { id: 9, name: 'Sadio Mané', rating: 4.0, date: '2024-10-09' },
        { id: 10, name: 'Karim Benzema', rating: 4.0, date: '2024-10-10' },
        { id: 11, name: 'Gareth Bale', rating: 3.0, date: '2024-10-11' },
        { id: 12, name: 'Kaká', rating: 5.0, date: '2024-10-12' },
        { id: 13, name: 'Zinedine Zidane', rating: 4.0, date: '2024-10-13' },
        { id: 14, name: 'Ronaldinho', rating: 5.0, date: '2024-10-14' },
        { id: 15, name: 'Pele', rating: 5.0, date: '2024-10-15' },
        { id: 16, name: 'Diego Maradona', rating: 4.0, date: '2024-10-16' },
        { id: 17, name: 'Andrés Iniesta', rating: 4.0, date: '2024-10-17' },
        { id: 18, name: 'Xavi Hernandez', rating: 4.0, date: '2024-10-18' },
        { id: 19, name: 'Frank Lampard', rating: 3.0, date: '2024-10-19' },
        { id: 20, name: 'Thierry Henry', rating: 4.0, date: '2024-10-20' },
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
                if(value >= (props.max_quantity ?? 7777)){
                    setQuantity(props.max_quantity ?? 7777);
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
        let numberStr = number.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    // state for image
    const [imgURL, setImgURL] = useState(product_1);

    const [imgIndex, setImgIndex] = useState(1);

    const handleImage1 = () => {
        setImgIndex(1);
        setImgURL(product_1);
    }

    const handleImage2 = () => {
        setImgIndex(2);
        setImgURL(product_2);
    }

    const handleImage3 = () => {
        setImgIndex(3);
        setImgURL(product_3);
    }

    const [selectedRate, setSelectedRate] = useState(1);

    const handleRate = (id) => {
        setSelectedRate(id);
    }

    const [page, setPage] = useState(1);
    const itemsPerPage = 3;

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem- itemsPerPage;
    const currentItems = rateList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(rateList.length / itemsPerPage);

    const handleChange = (event, value) => {
        setPage(value);
    }

    // Sample date

    const handleAddToCart = () => {
        // Call API to add product to cart
    }

    const handleViewShop = (shopId) => {
        // Navigate to shop page
        navigate(`/shopper/shop/${shopId}`);
    }

    // Call API to get product details data,
    useEffect(() => {

    }, [handleAddToCart]);



    return (
        <div className="bg-Light_gray w-screen">
            <PrimaryHeader/>

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
                                        <img src={props.images ?? product_1} alt="img"
                                             className="object-cover w-[9rem] h-[9rem]" onClick={handleImage1}/>
                                    </div>
                                    :
                                    <div
                                        className="border flex flex-shrink-0 cursor-pointer">
                                        <img src={props.images ?? product_1} alt="img"
                                             className="object-cover w-[9rem] h-[9rem]" onClick={handleImage1}/>
                                    </div>}

                                {imgIndex === 2
                                    ?
                                    <div
                                        className="border border-Blue ring-2 ring-Blue flex flex-shrink-0 cursor-pointer">
                                        <img src={props.images ?? product_2} alt="img"
                                             className="object-cover w-[9rem] h-[9rem]" onClick={handleImage2}/>
                                    </div>
                                    :
                                    <div
                                        className="border flex flex-shrink-0 cursor-pointer">
                                        <img src={props.images ?? product_2} alt="img"
                                             className="object-cover w-[9rem] h-[9rem]" onClick={handleImage2}/>
                                    </div>}

                                {imgIndex === 3
                                    ?
                                    <div
                                        className="border border-Blue ring-2 ring-Blue flex flex-shrink-0 cursor-pointer">
                                        <img src={props.images ?? product_3} alt="img"
                                             className="object-cover w-[9rem] h-[9rem]" onClick={handleImage3}/>
                                    </div>
                                    :
                                    <div
                                        className="border flex flex-shrink-0 cursor-pointer">
                                        <img src={props.images ?? product_3} alt="img"
                                             className="object-cover w-[9rem] h-[9rem]" onClick={handleImage3}/>
                                    </div>}
                            </div>
                        </div>

                        <div className="col-start-2 my-2 flex flex-col gap-2">
                            <div>
                                <span className="text-[2rem] font-semibold text-pretty">
                                    {props.name ?? "Mặt nạ giấy trắng da Vedette Nha Đam 22ml"}
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div>
                                    <span className="text-Star font-semibold text-xl">
                                        {props.rating ?? "5.0"}
                                    </span>
                                </div>

                                <Rating name="product_rating" value={props.rating ?? 5} readOnly sx={{
                                    '& .MuiRating-iconFilled': {
                                        color: '#FABC3F',
                                    }, '& .MuiRating-iconHover': {
                                        color: '#FABC3F',
                                    },
                                }}/>

                                <div className="border-l-2 border-Gray h-5 mt-0.5"></div>

                                <div className="flex items-center justify-center gap-1">
                                    <span className="ttext-Black font-semibold text-md">
                                        {props.reviews ?? convertNumber(777777)}
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
                                    {props.price ?? formatNumberWithDots(777777)}
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
                                            {props.address ?? "Đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh"}
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

                                            {quantity >= (props.max_quantity ?? 7777)
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
                                                Còn {props.max_quantity ?? 7777} sản phẩm
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <button
                                    className="border border-Blue rounded-sm bg-Lighter_blue flex items-center justify-around gap-3 p-2 hover:bg-Lighterter_blue">
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
                                    <img src={avatar} alt="avatar" className="object-cover h-[5rem] w-[5rem]"/>
                                </div>

                                <div className="flex flex-col justify-center gap-2">
                                    <div>
                                        <span className="font-bold">
                                            {props.shopName ?? "Shop mỹ phẩm top 1 VN"}
                                        </span>
                                    </div>

                                    <div>
                                        <button
                                            className="flex justify-center items-center border-2 border-Blue bg-Lighter_blue rounded-md px-2.5 py-0.5 gap-2 hover:bg-Lighterter_blue" onClick={() => handleViewShop(1)}>
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
                                                {props.products ?? convertNumber(77)}
                                            </span>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-20">
                                        <span className="text-Gray text-md">
                                            Đánh giá
                                        </span>

                                        <span>
                                            <span className="text-Blue font-semibold text-md">
                                                {props.totalRating ?? convertNumber(77777)}
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
                                                {props.rating ?? "5.0"}/5.0
                                            </span>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-20">
                                        <span className="text-Gray text-md">
                                            Tham gia
                                        </span>

                                        <span>
                                            <span className="text-Blue font-semibold text-md">
                                                {props.totalRating ?? calculateTimeDifference('2024-09-24')} trước
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

                                    <div className="flex items-center">
                                        <span className="text-Gray text-md">
                                            Xuất xứ
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center gap-10">
                                    <div className="flex items-center cursor-pointer select-none">
                                        <span className="text-Blue font-semibold text-md">
                                            {props.category ?? "Chăm sóc da mặt"}
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <span className="text-Blue font-semibold text-md">
                                            {props.max_quantity ?? 7777}
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <span className="text-Blue font-semibold text-md">
                                            Nước ngoài
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
                                    {props.description ?? "Tinh chất Nha Đam, Sodium PCA và Niacinamide giúp tăng cường hàng rào bảo vệ, giữ ẩm, làm săn chắc da. Từ đó, hạn chế quá trình lão hóa, giữ cho làn da ẩm mượt, tươi khỏe từ bên trong. Tất cả đã có trong Mặt nạ giấy Trắng da Vedette Nha Đam với công thức dạng nước giúp dưỡng chất thẩm thấu nhanh, cấp ẩm ngay tức thì, làm dịu và săn chắc da.\n" +
                                        "Không chứa: Paraben, dầu khoáng, Silicone,...\n" +
                                        " \n" +
                                        "Việc thường xuyên tiếp xúc với ánh nắng mặt trời rất dễ gây nám, sạm da. Ngoài ra, làn da từ tuổi 25 trở lên cũng cần được chăm sóc để tăng cường hàng rào bảo vệ da, cân bằng độ ẩm, loại bỏ lớp Melanin bề mặt và giúp da tươi tắn, rạng ngời.\n" +
                                        "Vì vậy, nên dùng Mặt nạ giấy Trắng da Nha Đam 2-3 lần mỗi tuần, kết hợp với tinh chất và kem dưỡng trắng để duy trì làn da săn chắc, trắng sáng."}
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
                                                {props.rating ?? "5.0"}/5.0
                                            </span>
                                        </div>

                                        <Rating name="product_rating" value={props.rating ?? 5} readOnly precision={0.5} sx={{
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

                                <div className="flex flex-col gap-4 mb-4">
                                    {currentItems.map((rateItem) => (
                                        <RatingListItem key={rateItem.id} id={rateItem.id} name={rateItem.name} rating={rateItem.rating} date={rateItem.date}/>
                                    ))}
                                </div>

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
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default ProductDetails;