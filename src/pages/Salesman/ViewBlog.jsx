import React from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import product_1 from "../../assets/product_1.png";
import Footer from "../../components/General/Footer";
import {Link} from "react-router-dom";

const ViewBlog = () => {
    const blog = { id: 1, title: "5 bí quyết chăm sóc tóc khỏe mạnh",  category: "Chăm sóc cơ thể", content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.\n" +
            "\n" +
            "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.\n" +
            "\n" + "Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc," };

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Kênh người bán"/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={4}/>
                    </div>

                    <div className="col-start-3 flex flex-col px-4 py-3 bg-White select-none gap-5">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[2rem] font-semibold">
                                        Chi tiết bài viết
                                    </span>
                                </div>

                                <div className="flex items-center justify-center gap-10">
                                    <Link to={`/salesman/edit-blog/${blog.id}`}>
                                        <span className="font-semibold text-Blue cursor-pointer hover:text-Dark_blue">
                                            Sửa
                                        </span>
                                    </Link>


                                    <span className="font-semibold text-Red cursor-pointer hover:text-Dark_red">
                                        Xóa
                                    </span>
                                </div>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <table className="w-[80%]">
                            <tbody>
                            <tr>
                                <td className="py-3">*Tiêu đề:</td>
                                <td className="py-3">
                                    <span className="font-semibold">
                                        {blog.title}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">*Danh mục:</td>
                                <td className="py-3">
                                    <span className="font-semibold">
                                        {blog.category}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">*Nội dung:</td>
                                <td className="py-3 w-[80%]">
                                    <p className="whitespace-pre-line">
                                        {blog.content}
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">*Ảnh bìa:</td>
                                <td className="py-3">
                                    <div className="flex items-center gap-5">
                                        <div className={`flex items-center justify-center gap-2 h-[135px] w-[276px] bg-Light_gray rounded-md`}
                                        >
                                            {/*<img*/}
                                            {/*    src={URL.createObjectURL(image)}*/}
                                            {/*    alt={`selected`}*/}
                                            {/*    className="h-[135px] w-[276px] object-cover rounded-md"*/}
                                            {/*/>*/}
                                            <img
                                                src={product_1}
                                                alt={`selected`}
                                                className="h-[135px] w-[276px] object-cover rounded-md"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default ViewBlog;