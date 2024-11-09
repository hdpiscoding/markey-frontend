import React from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";
import { FaRegClock } from "react-icons/fa";
import sample_blog from "../../assets/sample_blog.png";
import BlogCardView from "../../components/Shopper/BlogCardView";
import {Link} from "react-router-dom";

const BlogDetails = () => {
    const suggestedBlogs = [
        { id: 1, title: "5 bí quyết chăm sóc tóc khỏe mạnh", author: "Gabriel Garcia Marquez", date: "2024-01-10", category: "chăm sóc tóc" },
        { id: 2, title: "Làm thế nào để có làn da mặt rạng rỡ", author: "Virginia Woolf", date: "2024-01-15", category: "chăm sóc da mặt" },
        { id: 3, title: "Hướng dẫn trang điểm tự nhiên cho mùa hè", author: "Jane Austen", date: "2024-01-20", category: "trang điểm" },
        { id: 4, title: "Top 10 dụng cụ trang điểm cần có trong túi", author: "F. Scott Fitzgerald", date: "2024-01-25", category: "dụng cụ trang điểm" },
        { id: 5, title: "Phụ kiện làm đẹp không thể thiếu cho mỗi cô gái", author: "Mark Twain", date: "2024-02-01", category: "phụ kiện làm đẹp" },
    ];

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Blog"/>

            <main className="grid grid-cols-[1fr_10fr_1fr]">
                <div className="col-start-2 bg-White my-5 flex flex-col pb-4">
                    <div className="flex flex-col p-4 gap-3">
                        <div className="flex">
                            <span className="font-semibold text-[2rem]">
                                Bộ trang điểm cơ bản cho người mới bắt đầu gồm những gì?
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <span>
                                Danh mục:
                            </span>

                            <span className="text-Blue font-semibold">
                                Mỹ phẩm
                            </span>
                        </div>

                        <div className="flex gap-8">
                            <div className="flex gap-2 items-center">
                                <span>
                                    Tác giả:
                                </span>

                                <span className="text-Blue font-semibold">
                                    Orchid Down
                                </span>
                            </div>

                            <div className="flex gap-2 items-center">
                                <FaRegClock className="w-3 h-3 text-Dark_gray"/>

                                <span className="text-sm text-Dark_gray">
                                20/09/2021
                            </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-start-2 grid grid-cols-[71%_3%_26%]">
                        <div className="flex flex-col pl-4">
                            <div>
                                <img src={sample_blog} alt="blog" className="object-cover w-full"/>
                            </div>

                            <div className="mt-10">
                                <p className="whitespace-pre-line">
                                    {"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.\n" +
                                        "\n" +
                                        "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.\n" +
                                        "\n" + "Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,"}
                                </p>
                            </div>
                        </div>

                        <div className="col-start-3 flex flex-col gap-6 pr-9">
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
                                    <BlogCardView key={blog.id} title={blog.title} author={blog.author} date={blog.date}
                                                  category={blog.category}/>
                                ))}
                            </div>

                            <div className="flex items-center justify-center">
                                <Link to="/shopper/recommended-blogs">
                                    <button className="bg-Lighter_gray rounded-lg px-5 py-1 hover:bg-[#f9f9f9]">
                                        <span className="text-Gray text-xl">
                                            Xem thêm
                                        </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>


                </div>

            </main>

            <Footer/>
        </div>
    );
};

export default BlogDetails;