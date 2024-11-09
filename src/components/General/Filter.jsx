import React, {useState} from 'react';
import { BiFilterAlt } from "react-icons/bi";
import Rating from "@mui/material/Rating";

const Filter = (props) => {
    const [fromPrice, setFromPrice] = useState('');
    const [toPrice, setToPrice] = useState('');
    const [ratingFilter, setRatingFilter] = useState(0);
    const [checkPrice, setCheckPrice] = useState(true);

    const handleInputChange = (event, setState) => {
        const value = event.target.value;

        // Chỉ cập nhật state nếu giá trị là một số hợp lệ
        if (value === '' || /^\d+$/.test(value) && value.length <= 10) {
            setState(value === '' ? '' : parseInt(value));
        }
    };

    const checkPrices = () => {
        if (fromPrice === '' || toPrice === '') {
            setCheckPrice(false);
        }
        else if (fromPrice > toPrice) {
            setCheckPrice(false);
        }
        else {
            setCheckPrice(true);
        }
    }

    const handleApplyPrice = () => {
        checkPrices();
        if (checkPrice) {
            // Call API to filter by price
        }
    }

    const ratingFilters = [
        { id: 1, value: 5, isFiveStar: true },
        { id: 2, value: 4, isFiveStar: false },
        { id: 3, value: 3, isFiveStar: false },
        { id: 4, value: 2, isFiveStar: false },
        { id: 5, value: 1, isFiveStar: false },
    ];

    const handleRatingFilter = (id) => {
        // ratingFilter === id ? setRatingFilter(0) : setRatingFilter(id);
        setRatingFilter(id);
        // Call API to filter by rating

    }

    const handleRemoveFilter = () => {
        setFromPrice('');
        setToPrice('');
        setRatingFilter(0);
        // Call API to reset filter

    }

    return (
        <div className="grid grid-cols-[1fr_10fr_1fr]">
            <div className="col-start-2">
                <div className="col-start-1 flex flex-col justify-center gap-5">
                    <div className="flex items-center gap-2 select-none">
                        <div>
                            <BiFilterAlt className="h-5 w-5"/>
                        </div>

                        <div>
                            <span className="font-semibold text-lg">
                                BỘ LỌC TÌM KIẾM
                            </span>
                        </div>
                    </div>

                    <div>
                        <span>
                            Khoảng giá
                        </span>
                    </div>

                    <div className="flex items-center justify-between select-none">
                        <input type="text" className="border border-Black focus:outline-none px-1 w-24" value={fromPrice}
                               placeholder="đ TỪ" onChange={(event) => { handleInputChange(event, setFromPrice) }}/>

                        <div className="border-t-2 w-4 border-Black opacity-30"></div>

                        <input type="text" className="border border-Black focus:outline-none px-1 w-24" value={toPrice}
                               placeholder="đ ĐẾN" onChange={(event) => { handleInputChange(event, setToPrice) }}/>
                    </div>

                    <div className="flex flex-col gap-4">
                        {checkPrice ? null : <span className="text-Red text-sm">Vui lòng điền khoảng giá phù hợp</span>}

                        <button className="bg-Blue rounded-md w-full py-0.5 hover:bg-Dark_blue select-none" onClick={handleApplyPrice}>
                            <span className="text-White">
                                ÁP DỤNG
                            </span>
                        </button>
                    </div>

                    <div className="border-t-2 w-full border-Black opacity-30"></div>

                    <div className="flex flex-col justify-center cursor-pointer gap-4">
                        <div>
                            <span>
                                Đánh giá
                            </span>
                        </div>

                        {ratingFilters.map((rating) => (
                            <div
                                key={rating.id}
                                onClick={() => { handleRatingFilter(rating.id); }}
                                className={`py-1 flex items-center justify-around rounded-md ${rating.id === ratingFilter ? "bg-White" : ""}`}>
                                <Rating name={rating.id} value={rating.value} readOnly/>

                                {rating.isFiveStar
                                    ?
                                    <span className={`${rating.id === ratingFilter ? "text-White" : "text-Light_gray"} select-none`}>
                                        trở lên
                                    </span>
                                    :
                                    <span className="text-Dark_gray select-none">
                                        trở lên
                                    </span>}
                            </div>
                        ))}
                    </div>

                    <div className="border-t-2 w-full border-Black opacity-30"></div>

                    <div className="select-none">
                        <button className="bg-Red rounded-md w-full py-0.5 hover:bg-Dark_red" onClick={handleRemoveFilter}>
                            <span className="text-White">
                                XÓA TẤT CẢ
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Filter;