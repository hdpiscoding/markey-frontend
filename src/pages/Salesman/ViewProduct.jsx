import React, {useEffect, useState} from "react";
import SecondaryHeader from "../../components/General/SecondaryHeader";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import product_1 from "../../assets/product_1.png";
import product_2 from "../../assets/product_2.png";
import product_3 from "../../assets/product_3.png";
import Footer from "../../components/General/Footer";
import {Link} from "react-router-dom";

const ViewProduct = () => {
    const [images, setImages] = useState([product_1, product_2, product_3]);

    const [product, setProduct] = useState({
        id: 1,
        productName: "Mặt nạ dưỡng trắng",
        category: "Chăm sóc da mặt",
        price: "100000",
        stock: "100",
        description: "Mô tả"
    });

    useEffect(() => {
        // Call API to get all shop's products and set to state
    }, []);

    // format number with dots
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Kênh người bán"/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={2}/>
                    </div>

                    <div className="col-start-3 flex flex-col px-4 py-3 bg-White select-none gap-5">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[2rem] font-semibold">
                                        Thông tin sản phẩm
                                    </span>
                                </div>

                                <div className="flex items-center justify-center gap-10">
                                    <Link to={`/salesman/edit-product/${product.id}`}>
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
                                <td className="py-3">Tên sản phẩm:</td>
                                <td className="py-3">
                                    <span className="font-semibold">
                                        {product.productName}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">Danh mục:</td>
                                <td className="py-3">
                                    <span className="font-semibold">{product.category}</span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">Giá:</td>
                                <td className="py-3">
                                    <span className="text-Red font-semibold">
                                        đ {formatNumberWithDots(product.price)}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">Tồn kho:</td>
                                <td className="py-3">
                                    <span className="font-semibold">{product.stock}</span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">Mô tả sản phẩm:</td>
                                <td className="py-3">
                                    <p className="font-semibold whitespace-pre-line">
                                        {product.description}
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">Hình ảnh:</td>
                                <td className="py-3">
                                    <div className="flex items-center gap-5">
                                        {images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt="product"
                                                className="h-[120px] w-[120px] object-cover rounded-md"
                                            />
                                        ))}
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

export default ViewProduct;