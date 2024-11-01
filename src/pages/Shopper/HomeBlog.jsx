import React, {useState} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";
import BlogListViewMd from "../../components/Shopper/BlogListViewMd";
import {Pagination, Stack} from "@mui/material";
import BlogCardView from "../../components/Shopper/BlogCardView";
import {useNavigate} from "react-router-dom";

const HomeBlog = () => {
    const navigate = useNavigate();
    const handleMoreBlogs = () => {
        navigate('/shopper/recommended-blogs');
    }
    const handleCategoryChange = (event) => {
        const categoryId = event.target.value;
        navigate(`/shopper/category-blogs/${categoryId}`);
    }

    const categories = [
        { id: 1, name: "Chăm sóc tóc" },
        { id: 2, name: "Chăm sóc da mặt" },
        { id: 3, name: "Trang điểm" },
        { id: 4, name: "Dụng cụ trang điểm" },
        { id: 5, name: "Phụ kiện làm đẹp" },
        { id: 6, name: "Nước hoa" },
        { id: 7, name: "Chăm sóc toàn thân" },
    ];

    const blogs = [
        { id: 1, title: "5 bí quyết chăm sóc tóc khỏe mạnh", author: "Gabriel Garcia Marquez", date: "2024-01-10", category: "chăm sóc tóc" },
        { id: 2, title: "Làm thế nào để có làn da mặt rạng rỡ", author: "Virginia Woolf", date: "2024-01-15", category: "chăm sóc da mặt" },
        { id: 3, title: "Hướng dẫn trang điểm tự nhiên cho mùa hè", author: "Jane Austen", date: "2024-01-20", category: "trang điểm" },
        { id: 4, title: "Top 10 dụng cụ trang điểm cần có trong túi", author: "F. Scott Fitzgerald", date: "2024-01-25", category: "dụng cụ trang điểm" },
        { id: 5, title: "Phụ kiện làm đẹp không thể thiếu cho mỗi cô gái", author: "Mark Twain", date: "2024-02-01", category: "phụ kiện làm đẹp" },
        { id: 6, title: "Nước hoa mùa đông: Chọn mùi nào cho hợp?", author: "Ernest Hemingway", date: "2024-02-05", category: "nước hoa" },
        { id: 7, title: "Chăm sóc toàn thân: Bí quyết để làn da luôn khỏe", author: "Harper Lee", date: "2024-02-10", category: "chăm sóc toàn thân" },
        { id: 8, title: "Cách chăm sóc tóc trong mùa lạnh", author: "J.K. Rowling", date: "2024-02-15", category: "chăm sóc tóc" },
        { id: 9, title: "7 bước chăm sóc da mặt hiệu quả", author: "Leo Tolstoy", date: "2024-02-20", category: "chăm sóc da mặt" },
        { id: 10, title: "Lưu ý khi trang điểm cho da nhạy cảm", author: "Charles Dickens", date: "2024-02-25", category: "trang điểm" },
        { id: 11, title: "Bí quyết chọn nước hoa cho từng mùa", author: "Emily Dickinson", date: "2024-03-01", category: "nước hoa" },
        { id: 12, title: "Những sản phẩm chăm sóc tóc tốt nhất 2024", author: "George Orwell", date: "2024-03-05", category: "chăm sóc tóc" },
        { id: 13, title: "Chăm sóc da mặt sau khi trang điểm", author: "Toni Morrison", date: "2024-03-10", category: "chăm sóc da mặt" },
        { id: 14, title: "Mẹo trang điểm mắt cho cô nàng bận rộn", author: "Gabriel Garcia Marquez", date: "2024-03-15", category: "trang điểm" },
        { id: 15, title: "Các dụng cụ trang điểm nên có trong túi xách", author: "Zadie Smith", date: "2024-03-20", category: "dụng cụ trang điểm" },
        { id: 16, title: "Nước hoa tự chế: Sáng tạo mùi hương riêng", author: "Margaret Atwood", date: "2024-03-25", category: "nước hoa" },
        { id: 17, title: "Chăm sóc da mặt: Chọn sản phẩm phù hợp", author: "Kurt Vonnegut", date: "2024-03-30", category: "chăm sóc da mặt" },
        { id: 18, title: "Cách giữ tóc mềm mượt mùa đông", author: "F. Scott Fitzgerald", date: "2024-04-05", category: "chăm sóc tóc" },
        { id: 19, title: "Làm thế nào để tạo kiểu tóc dễ dàng", author: "Gabriel Garcia Marquez", date: "2024-04-10", category: "chăm sóc tóc" },
        { id: 20, title: "Đánh giá các sản phẩm dưỡng da mặt", author: "Virginia Woolf", date: "2024-04-15", category: "chăm sóc da mặt" },
        { id: 21, title: "Top 5 mẹo trang điểm cho người mới bắt đầu", author: "Jane Austen", date: "2024-04-20", category: "trang điểm" },
        { id: 22, title: "Cách chọn dụng cụ trang điểm phù hợp", author: "Mark Twain", date: "2024-04-25", category: "dụng cụ trang điểm" },
        { id: 23, title: "Những sai lầm khi sử dụng nước hoa", author: "Ernest Hemingway", date: "2024-04-30", category: "nước hoa" },
        { id: 24, title: "Chăm sóc toàn thân: Làm thế nào để làn da mịn màng", author: "Harper Lee", date: "2024-05-05", category: "chăm sóc toàn thân" },
        { id: 25, title: "Nước hoa cho phái mạnh: Top lựa chọn tốt nhất", author: "J.K. Rowling", date: "2024-05-10", category: "nước hoa" },
        { id: 26, title: "Chăm sóc tóc trong thời tiết nóng", author: "Leo Tolstoy", date: "2024-05-15", category: "chăm sóc tóc" },
        { id: 27, title: "Sản phẩm chăm sóc da cho từng loại da", author: "Charles Dickens", date: "2024-05-20", category: "chăm sóc da mặt" },
        { id: 28, title: "Mẹo giữ lớp trang điểm lâu trôi", author: "Emily Dickinson", date: "2024-05-25", category: "trang điểm" },
        { id: 29, title: "Cách chọn màu sắc cho dụng cụ trang điểm", author: "George Orwell", date: "2024-06-01", category: "dụng cụ trang điểm" },
        { id: 30, title: "Nước hoa cho mùa hè: Sự lựa chọn hoàn hảo", author: "Toni Morrison", date: "2024-06-05", category: "nước hoa" },
        { id: 31, title: "Chăm sóc tóc sau khi nhuộm", author: "Kurt Vonnegut", date: "2024-06-10", category: "chăm sóc tóc" },
        { id: 32, title: "Bí quyết dưỡng ẩm cho da mặt", author: "Zadie Smith", date: "2024-06-15", category: "chăm sóc da mặt" },
        { id: 33, title: "Hướng dẫn trang điểm cho da nhờn", author: "Gabriel Garcia Marquez", date: "2024-06-20", category: "trang điểm" },
        { id: 34, title: "Những dụng cụ trang điểm nên có cho mùa hè", author: "Virginia Woolf", date: "2024-06-25", category: "dụng cụ trang điểm" },
        { id: 35, title: "Phụ kiện làm đẹp: Những gì bạn cần biết", author: "Jane Austen", date: "2024-06-30", category: "phụ kiện làm đẹp" },
        { id: 36, title: "Nước hoa chiết xuất tự nhiên: Lợi ích và cách sử dụng", author: "F. Scott Fitzgerald", date: "2024-07-05", category: "nước hoa" },
        { id: 37, title: "Làm gì để da mặt không bị khô vào mùa đông", author: "Mark Twain", date: "2024-07-10", category: "chăm sóc da mặt" },
        { id: 38, title: "Tóc xoăn: Cách chăm sóc và tạo kiểu", author: "Ernest Hemingway", date: "2024-07-15", category: "chăm sóc tóc" },
        { id: 39, title: "Các sản phẩm trang điểm không gây hại cho da", author: "Harper Lee", date: "2024-07-20", category: "trang điểm" },
        { id: 40, title: "Bí quyết chọn nước hoa cho phái đẹp", author: "J.K. Rowling", date: "2024-07-25", category: "nước hoa" },
        { id: 41, title: "Làm thế nào để tóc không bị rối", author: "Leo Tolstoy", date: "2024-07-30", category: "chăm sóc tóc" },
        { id: 42, title: "Chăm sóc da mặt hàng ngày: Lợi ích và thói quen", author: "Charles Dickens", date: "2024-08-05", category: "chăm sóc da mặt" },
        { id: 43, title: "Mẹo trang điểm cho da ngăm", author: "Emily Dickinson", date: "2024-08-10", category: "trang điểm" },
        { id: 44, title: "Dụng cụ trang điểm: Hướng dẫn sử dụng và bảo quản", author: "George Orwell", date: "2024-08-15", category: "dụng cụ trang điểm" },
        { id: 45, title: "Nước hoa: Những điều cần tránh khi sử dụng", author: "Toni Morrison", date: "2024-08-20", category: "nước hoa" },
        { id: 46, title: "Chăm sóc tóc cho trẻ em", author: "Kurt Vonnegut", date: "2024-08-25", category: "chăm sóc tóc" },
        { id: 47, title: "Chăm sóc da mặt cho người lớn tuổi", author: "Zadie Smith", date: "2024-09-01", category: "chăm sóc da mặt" },
        { id: 48, title: "Hướng dẫn trang điểm cho bữa tiệc", author: "Gabriel Garcia Marquez", date: "2024-09-05", category: "trang điểm" },
        { id: 49, title: "Phụ kiện làm đẹp: Tại sao bạn cần chúng?", author: "Virginia Woolf", date: "2024-09-10", category: "phụ kiện làm đẹp" },
        { id: 50, title: "Làm thế nào để chọn nước hoa cho mỗi dịp", author: "Jane Austen", date: "2024-09-15", category: "nước hoa" },
    ];

    const suggestedBlogs = [
        { id: 1, title: "5 bí quyết chăm sóc tóc khỏe mạnh", author: "Gabriel Garcia Marquez", date: "2024-01-10", category: "chăm sóc tóc" },
        { id: 2, title: "Làm thế nào để có làn da mặt rạng rỡ", author: "Virginia Woolf", date: "2024-01-15", category: "chăm sóc da mặt" },
        { id: 3, title: "Hướng dẫn trang điểm tự nhiên cho mùa hè", author: "Jane Austen", date: "2024-01-20", category: "trang điểm" },
        { id: 4, title: "Top 10 dụng cụ trang điểm cần có trong túi", author: "F. Scott Fitzgerald", date: "2024-01-25", category: "dụng cụ trang điểm" },
        { id: 5, title: "Phụ kiện làm đẹp không thể thiếu cho mỗi cô gái", author: "Mark Twain", date: "2024-02-01", category: "phụ kiện làm đẹp" },
    ];

    // set up pagination
    const [page, setPage] = React.useState(1);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(blogs.length / itemsPerPage);

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentBlogs = blogs.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0)
    }
    // end of set up pagination
    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Blog" />

            <main>
                <div className="grid grid-cols-[1fr_10fr_1fr] bg-White mb-4 select-none">
                    <div className="col-start-2 flex items-center py-2">
                        <select name="category" id="category"
                                className="cursor-pointer border-none focus:outline-none"
                                defaultValue={'default'} onChange={handleCategoryChange}>
                            <option value="default" hidden disabled>TRANG CHỦ</option>
                            {categories.map((category) => (
                                <option key={category.id} id={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className="grid grid-cols-[1fr_10fr_1fr] my-4">
                    <div className="col-start-2 grid grid-cols-[71%_5.5%_23.5%]">
                        <div className="col-start-1 flex flex-col gap-6">
                            <div className="flex flex-col justify-center">
                                <div className="bg-Blue rounded-md flex items-center py-2.5 px-5 w-fit">
                                    <span className="text-White font-semibold">
                                        BÀI VIẾT MỚI NHẤT
                                    </span>
                                </div>

                                <div className="border-t-[3px] border-Blue w-full"></div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {currentBlogs.map((blog) => (
                                    <BlogListViewMd key={blog.id} title={blog.title} author={blog.author}
                                                    date={blog.date} category={blog.category} role="shopper"/>
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

                        <div className="col-start-3 flex flex-col gap-6">
                            <div className="flex flex-col justify-center">
                                <div className="bg-Blue rounded-md flex items-center py-2.5 px-5 w-fit">
                                    <span className="text-White font-semibold">
                                        ĐỌC GÌ HÔM NAY
                                    </span>
                                </div>

                                <div className="border-t-[3px] border-Blue w-full"></div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {suggestedBlogs.map((blog) => (
                                    <BlogCardView key={blog.id} title={blog.title} author={blog.author} date={blog.date} category={blog.category}/>
                                ))}
                            </div>

                            <div className="flex items-center justify-center">
                                <button className="bg-White rounded-lg px-5 py-1 hover:bg-[#f9f9f9]" onClick={handleMoreBlogs}>
                                    <span className="text-Gray text-xl">
                                        Xem thêm
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <Footer/>
        </div>
    );
};

export default HomeBlog;