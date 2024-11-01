import React, {useEffect} from 'react';
import PrimaryHeader from "../../components/General/PrimaryHeader";
import Footer from "../../components/General/Footer";
import CategoryCarousel from "../../components/Shopper/CategoryCarousel";
import ProductCardViewLg from "../../components/Shopper/ProductCardViewLg";
import BlogCardView from "../../components/Shopper/BlogCardView";
import {Outlet, useNavigate} from "react-router-dom";

const HomeShopper = () => {
    const navigate = useNavigate();
    const sampleProducts = [
        { id: 1, name: "Son môi màu đỏ quyến rũ", price: 150000, sold: 2500 },
        { id: 2, name: "Nước hoa hương chanh tươi mát", price: 800000, sold: 1800 },
        { id: 3, name: "Kem dưỡng da ban đêm chống lão hóa", price: 600000, sold: 1500 },
        { id: 4, name: "Sữa rửa mặt làm sạch sâu", price: 200000, sold: 3200 },
        { id: 5, name: "Mặt nạ cấp ẩm chiết xuất thiên nhiên", price: 75000, sold: 4800 },
        { id: 6, name: "Phấn nền trang điểm tự nhiên", price: 500000, sold: 3100 },
        { id: 7, name: "Chì kẻ mắt chống nước", price: 120000, sold: 5400 },
        { id: 8, name: "Nước tẩy trang dịu nhẹ", price: 250000, sold: 900 },
        { id: 9, name: "Son dưỡng môi SPF 15", price: 95000, sold: 2200 },
        { id: 10, name: "Kem chống nắng SPF 50", price: 400000, sold: 3600 },
        { id: 11, name: "Dầu gội phục hồi tóc hư tổn", price: 300000, sold: 1700 },
        { id: 12, name: "Sữa tắm chiết xuất dừa", price: 180000, sold: 2100 },
    ];

    const [products, setProducts] = React.useState([]);
    const [blogs, setBlogs] = React.useState([]);

    const handleMoreProducts = () => {
        navigate("/shopper/recommended-products");
    }

    const handleMoreBlogs = () => {
        navigate("/shopper/recommended-blogs");
    }

    // Call API to get products and blogs data and cache them in state products and blogs
    useEffect(() => {

    }, []);

    const sampleBlogs = [
        { id: 1, title: "5 bí quyết chăm sóc tóc khỏe mạnh", author: "Gabriel Garcia Marquez", date: "2024-01-10", category: "chăm sóc tóc" },
        { id: 2, title: "Làm thế nào để có làn da mặt rạng rỡ", author: "Virginia Woolf", date: "2024-01-15", category: "chăm sóc da mặt" },
        { id: 3, title: "Hướng dẫn trang điểm tự nhiên cho mùa hè", author: "Jane Austen", date: "2024-01-20", category: "trang điểm" },
        { id: 4, title: "Top 10 dụng cụ trang điểm cần có trong túi", author: "F. Scott Fitzgerald", date: "2024-01-25", category: "dụng cụ trang điểm" },
        { id: 5, title: "Phụ kiện làm đẹp không thể thiếu cho mỗi cô gái", author: "Mark Twain", date: "2024-02-01", category: "phụ kiện làm đẹp" },
        { id: 6, title: "Nước hoa mùa đông: Chọn mùi nào cho hợp?", author: "Ernest Hemingway", date: "2024-02-05", category: "nước hoa" },
        { id: 7, title: "Chăm sóc toàn thân: Bí quyết để làn da luôn khỏe", author: "Harper Lee", date: "2024-02-10", category: "chăm sóc toàn thân" },
        { id: 8, title: "Cách chăm sóc tóc trong mùa lạnh", author: "J.K. Rowling", date: "2024-02-15", category: "chăm sóc tóc" },
    ];

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <PrimaryHeader/>

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
                            {sampleProducts.map((product) => (
                                <ProductCardViewLg id={product.id} name={product.name} price={product.price} rating={product.rating}/>
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
                            {sampleBlogs.map((blog) => (
                                <BlogCardView id={blog.id} title={blog.title} author={blog.author} date={blog.date} category={blog.category}/>
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
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default HomeShopper;