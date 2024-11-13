import React, {useEffect, useState} from "react";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import Footer from "../../components/General/Footer";
import {Link, useNavigate, useParams} from "react-router-dom";
import {instance} from "../../AxiosConfig";
import ConfirmModal from "../../components/General/ConfirmModal";
import LoadingModal from "../../components/General/LoadingModal";

const ViewProduct = () => {
    const navigate = useNavigate();

    const {productId} = useParams();

    const [images, setImages] = useState([]);

    const [product, setProduct] = useState({});

    const [category, setCategory] = useState("");

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

    // set up modal
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    // end set up modal

    useEffect(() => {
        // Call API to get all shop's products and set to state
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                const response = await instance.get(`v1/shopping-service/product/${productId}`);
                setProduct(response.data.data);
            }
            catch (error) {
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

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await instance.get(`v1/shopping-service/category/${product.categoryId}`);
                setCategory(response.data.data.name);
                setImages(product.picture);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchCategory();
    }, [product]);

    // format number with dots
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number?.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    const handleDelete = async () => {
        try {
            await instance.delete(`v1/shopping-service/product/${productId}`);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            navigate("/salesman/all-products");
        }
    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={2}/>
                    </div>

                    <div className="col-start-3 flex flex-col px-4 py-3 bg-White gap-5">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between select-none">
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


                                    <span className="font-semibold text-Red cursor-pointer hover:text-Dark_red" onClick={openModal}>
                                        Xóa
                                    </span>
                                </div>
                            </div>


                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <table className="w-[100%]">
                        <tbody>
                            <tr>
                                <td className="py-3 w-[25%]">Tên sản phẩm:</td>
                                <td className="py-3">
                                    <span className="font-semibold">
                                        {product.name}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3 w-[25%]">Danh mục:</td>
                                <td className="py-3">
                                    <span className="font-semibold">{category}</span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3 w-[25%]">Giá:</td>
                                <td className="py-3">
                                    <span className="text-Red font-semibold">
                                        đ {formatNumberWithDots(product.price)}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3 w-[25%]">Tồn kho:</td>
                                <td className="py-3">
                                    <span className="font-semibold">{product.quantity}</span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3 w-[25%]">Mô tả sản phẩm:</td>
                                <td className="py-3">
                                    <p className="font-semibold whitespace-pre-line">
                                        {product.description}
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3 w-[25%]">Hình ảnh:</td>
                                <td className="py-3">
                                    <div className="flex items-center gap-5">
                                        {images ? images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt="product"
                                                className="h-[120px] w-[120px] object-cover rounded-md"
                                            />
                                        )) : null}
                                        {/*{images.map((image, index) => (*/}
                                        {/*    <img*/}
                                        {/*        key={index}*/}
                                        {/*        src={image}*/}
                                        {/*        alt="product"*/}
                                        {/*        className="h-[120px] w-[120px] object-cover rounded-md"*/}
                                        {/*    />*/}
                                        {/*))}*/}
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleDelete} title={"Xác nhận xóa sản phẩm"} message={"Bạn có chắc muốn xóa sản phẩm này?"}/>
                {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
            </main>

            <Footer/>

        </div>
    );
};

export default ViewProduct;