import React, {useEffect} from 'react';
import right_arrow from '../../assets/right_arrow.svg';
import left_arrow from '../../assets/left_arrow.svg';
import CategoryCardView from "./CategoryCardView";
import {useNavigate} from "react-router-dom";
import {instance} from "../../AxiosConfig";

const CategoryCarousel = () => {
    const navigate = useNavigate();

    const [categoryList, setCategoryList] = React.useState([]);

    // Call API to get categoryList data and cache them in state categoryList
    useEffect(() => {
        //Call API here
        const fetchData = async () => {
            try {
                const response = await instance.get('v1/shopping-service/category');
                const data = response.data.data;
                setCategoryList(data);
            }
            catch (error){
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(categoryList.length / itemsPerPage);

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
    const displayedCategories = categoryList.slice(startIndex, startIndex + itemsPerPage);

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