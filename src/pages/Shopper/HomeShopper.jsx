import React, {useEffect, useState} from 'react';
import Footer from "../../components/General/Footer";
import CategoryCarousel from "../../components/Shopper/CategoryCarousel";
import ProductCardViewLg from "../../components/Shopper/ProductCardViewLg";
import BlogCardView from "../../components/Shopper/BlogCardView";
import {useNavigate} from "react-router-dom";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";

const HomeShopper = () => {
    const navigate = useNavigate();

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

    const [recommendedProductList, setRecommendedProductList] = React.useState([]);
    const [recommendedBlogList, setRecommendedBlogList] = React.useState([]);

    const handleMoreProducts = () => {
        navigate("/shopper/recommended-products");
    }

    const handleMoreBlogs = () => {
        navigate("/shopper/recommended-blogs");
    }

    // Call API to get recommendedProductList and recommendedBlogList data and cache them in state recommendedProductList and recommendedBlogList
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                const productsResponse = await instance.get('v1/shopping-service/product/recommend?page=1&rpp=12');
                setRecommendedProductList(productsResponse.data.data.items);

                const blogsResponse = await instance.post('v1/shopping-service/post/filter?page=1&rpp=8');
                setRecommendedBlogList(blogsResponse.data.data.items);
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
                <div className="col-start-2 flex flex-col gap-4">
                    <div className="mb-4">
                        <CategoryCarousel/>
                    </div>

                    <div>
                        <div className="bg-gradient-to-b from-Blue to-Light_blue rounded-sm py-1 text-center mb-4">
                            <span className="text-White font-bold text-2xl p-4">
                                DÀNH RIÊNG CHO BẠN
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                            {recommendedProductList.map((product) => (
                                <ProductCardViewLg id={product.id} name={product.name} price={product.price} rating={product.ratingAverage.toFixed(1)} picture={product.picture[0]}/>
                            ))}
                        </div>

                        <div className="flex items-center justify-center my-4">
                            <button className="bg-White rounded-lg px-5 py-1 hover:bg-[#f9f9f9]" onClick={handleMoreProducts}>
                                <span className="text-Gray text-xl">
                                    Xem thêm
                                </span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className="bg-gradient-to-b from-Blue to-Light_blue rounded-sm py-1 text-center mb-4">
                            <span className="text-White font-bold text-2xl p-4">
                                ĐỌC GÌ HÔM NAY
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {recommendedBlogList.map((blog) => (
                                <BlogCardView id={blog.id} title={blog.title} picture={blog.thumbnail} author={blog.shop.name} date={blog.createAt} category={blog.category.name}/>
                            ))}
                        </div>

                        <div className="flex items-center justify-center my-4">
                            <button className="bg-White rounded-lg px-5 py-1 hover:bg-[#f9f9f9]" onClick={handleMoreBlogs}>
                                <span className="text-Gray text-xl">
                                    Xem thêm
                                </span>
                            </button>
                        </div>
                    </div>

                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default HomeShopper;