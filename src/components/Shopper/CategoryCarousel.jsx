import React, {useEffect} from 'react';
import right_arrow from '../../assets/right_arrow.svg';
import left_arrow from '../../assets/left_arrow.svg';
import CategoryCardView from "./CategoryCardView";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const CategoryCarousel = () => {
    const navigate = useNavigate();
    const sampleCategories = [
        { id: 1, name: "Chăm sóc da", picture: null },
        { id: 2, name: "Chăm sóc tóc", picture: null },
        { id: 3, name: "Phụ kiện làm đẹp", picture: null },
        { id: 4, name: "Chăm sóc da mặt", picture: null },
        { id: 5, name: "Dụng cụ trang điểm", picture: null },
        { id: 6, name: "Trang điểm", picture: null },
        { id: 7, name: "Chăm sóc cơ thể", picture: null },
        { id: 8, name: "Nước hoa", picture: null },
        { id: 9, name: "Chăm sóc toàn thân", picture: null },
        { id: 10, name: "Chăm sóc tóc chuyên sâu", picture: null },
        { id: 11, name: "Sản phẩm dưỡng ẩm", picture: null },
        { id: 12, name: "Trang điểm tự nhiên", picture: null },
        { id: 13, name: "Mặt nạ", picture: null },
        { id: 14, name: "Sản phẩm tẩy trang", picture: null },
        { id: 15, name: "Sữa rửa mặt", picture: null },
        { id: 16, name: "Kem chống nắng", picture: null },
        { id: 17, name: "Serum", picture: null },
        { id: 18, name: "Sữa tắm", picture: null },
        { id: 19, name: "Dầu gội", picture: null },
        { id: 20, name: "Dầu xả", picture: null },
        { id: 21, name: "Cọ trang điểm", picture: null },
        { id: 22, name: "Bông tẩy trang", picture: null },
        { id: 23, name: "Máy massage da", picture: null },
        { id: 24, name: "Máy rửa mặt", picture: null },
        { id: 25, name: "Máy làm đẹp", picture: null },
        { id: 26, name: "Máy tẩy lông", picture: null },
        { id: 27, name: "Máy sấy tóc", picture: null },
        { id: 28, name: "Máy uốn tóc", picture: null },
        { id: 29, name: "Máy làm tóc", picture: null }
    ];

    const [categories, setCategories] = React.useState([]);

    // Call API to get categories data and cache them in state categories
    useEffect(() => {
        //Call API here

    }, []);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(sampleCategories.length / itemsPerPage);

    const [currentPage, setCurrentPage] = React.useState(0);

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = currentPage * itemsPerPage;
    const displayedCategories = sampleCategories.slice(startIndex, startIndex + itemsPerPage);

    const handleOnClick = (categoryId) => {
        navigate(`/shopper/category-products/${categoryId}`);
    }

    return (
        <div className="bg-White h-[200px] rounded-t-md grid grid-rows-[25%_75%] border col-start-2">
            <div className="row-start-1 flex justify-between mx-2 ml-4 my-2 items-center">
                <div>
                <span className="font-semibold text-xl">
                    DANH MỤC
                </span>
                </div>

                <div className="flex gap-5 select-none">
                    <button
                        className={`rounded-[50%] bg-light_gray w-[40px] h-[40px] flex items-center justify-center ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}>
                        <img src={left_arrow} alt="arrow" className="object-cover w-5 h-5"/>
                    </button>

                    <button
                        className={`rounded-[50%] bg-light_gray w-[40px] h-[40px] flex items-center justify-center ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages - 1}>
                        <img src={right_arrow} alt="arrow" className="object-cover w-5 h-5"/>
                    </button>
                </div>
            </div>

            <div className="row-start-2">
                <ul className="flex">
                    {displayedCategories.map((category) => (
                        <li key={category.id} className="basis-[10%]" onClick={() => handleOnClick(category.id)}>
                            <CategoryCardView id={category.id} name={category.name} picture={category.picture}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryCarousel;