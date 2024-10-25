import React from 'react';
import right_arrow from '../../assets/right_arrow.svg';
import left_arrow from '../../assets/left_arrow.svg';
import CategoryCardView from "./CategoryCardView";

const CategoryCarousel = () => {
    const categories = [
        "Chăm sóc da", "Chăm sóc tóc", "Phụ kiện làm đẹp",
        "Chăm sóc da mặt", "Dụng cụ trang điểm", "Trang điểm",
        "Chăm sóc cơ thể", "Nước hoa", "Chăm sóc toàn thân",
        "Chăm sóc tóc chuyên sâu", "Sản phẩm dưỡng ẩm",
        "Trang điểm tự nhiên", "Mặt nạ", "Sản phẩm tẩy trang",
        "Sữa rửa mặt", "Kem chống nắng", "Serum",
        "Sữa tắm", "Dầu gội", "Dầu xả", "Cọ trang điểm", "Bông tẩy trang",
        "Máy massage da", "Máy rửa mặt", "Máy làm đẹp", "Máy tẩy lông", "Máy sấy tóc",
        "Máy uốn tóc", "Máy làm tóc"
    ];

    const itemsPerPage = 10;
    const totalPages = Math.ceil(categories.length / itemsPerPage);

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
    const displayedCategories = categories.slice(startIndex, startIndex + itemsPerPage);

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
                    {displayedCategories.map((category, index) => (
                        <li key={index} className="basis-[10%]">
                            <CategoryCardView category={category} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryCarousel;