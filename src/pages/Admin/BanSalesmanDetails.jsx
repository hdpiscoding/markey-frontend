import React, {useEffect, useState} from 'react';
import ConfirmModal from "../../components/General/ConfirmModal";
import Footer from "../../components/General/Footer";
import AdminNav from "../../components/Admin/AdminNav";
import {FiUser} from "react-icons/fi";
import {useNavigate, useParams} from "react-router-dom";
import {instance} from "../../AxiosConfig";
import LoadingModal from "../../components/General/LoadingModal";

const BanSalesmanDetails = () => {
    const navigate = useNavigate();
    const { salesmanId } = useParams();
    const [loading, setLoading] = useState(false);

    // store image API data
    const [image, setImage] = useState(null);
    const [salesman, setSalesman] = useState({});
    const [shop, setShop] = useState({});

    // set up loading modal
    const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);

    const openLoadingModal = () => {
        setLoadingModalOpen(true);
    };

    const closeLoadingModal = () => {
        setLoadingModalOpen(false);
    };
    // end set up loading modal

    useEffect(() => {
        // Call API to get salesman data by salesman_id and set to salesman and set salesman's avatar to image
        const fetchSalesmanData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                const [salesmanResponse, shopResponse] = await Promise.all([
                    await instance.get(`v1/user-service/salesman/${salesmanId}`),
                    await instance.get(`v1/shopping-service/shop/by-salesman/${salesmanId}`)
                ]);
                setSalesman(await salesmanResponse.data.data);
                setShop(await shopResponse.data.data);
                setImage(shop.profilePicture);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
            }
        }

        fetchSalesmanData();
    }, []);

    // set up modal
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    // end set up modal

    const handleLock = async () => {
        //Call API to update salesman isActive = !isActive
        try {
            await instance.put(`v1/user-service/admin/block-salesman/${salesmanId}`);
        }
        catch (error) {
            console.log(error);
        }

        closeModal();
        // Redirect to the previous page
        navigate(-1);
    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <AdminNav currentPage={5}/>
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[2rem] font-semibold">
                                        Thông tin người bán
                                    </span>
                                </div>

                                <div className="flex items-center justify-center gap-10 select-none">
                                    <span
                                        className={`font-semibold ${!salesman?.isBlocked ? "text-Red hover:text-Dark_red" : "text-Blue hover:text-Dark_blue"} cursor-pointer`}
                                        onClick={openModal}>
                                        {!salesman?.isBlocked ? 'Khóa' : 'Mở khóa'}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4">
                            <div
                                className="rounded-[50%] bg-Light_gray h-[120px] w-[120px] flex items-center justify-center">
                                {image ? <img src={image} alt="img"
                                              className="w-full h-full border rounded-[50%] object-cover"/> : <FiUser className="text-Dark_gray h-16 w-16"/>
                                }
                            </div>
                        </div>

                        <table className="w-[100%]">
                            <tbody>
                            <tr>
                                <td className="py-5">*Họ và tên:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.fullname}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Căn cước công dân:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.cccd}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Email:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.email}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Số điện thoại:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.phoneNumber}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Tên cửa hàng:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {shop?.name}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Địa chỉ:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.address}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Mô tả của hàng:</td>
                                <td className="py-5 w-[80%]">
                                    <p className="whitespace-pre-line font-semibold">
                                        {shop?.description}
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleLock}
                                  title={`Xác nhận ${salesman?.isLocked ? "mở khóa" : "khóa"} người bán`}
                                  message={`Bạn có chắc muốn ${salesman?.isLocked ? "mở khóa" : "khóa"} tài khoản người bán này?`}/>
                    {loading && <LoadingModal isOpen={isLoadingModalOpen}/>}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default BanSalesmanDetails;