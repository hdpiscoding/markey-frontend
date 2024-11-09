import React, {useState, useEffect} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import product_1 from "../../assets/product_1.png";
import Footer from "../../components/General/Footer";
import {Link} from "react-router-dom";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";
import useLocalStorage from "../../components/General/useLocalStorage";
import {FiUser} from "react-icons/fi";

const ViewShopInfo = () => {
    //const userIdStorage = useLocalStorage('userId');
    function formatPhoneNumber(phoneNumber) {
        if (phoneNumber?.length === 11) {
            return '0' + phoneNumber?.slice(2); // Thay 3 ký tự đầu bằng '0'
        }
        // Kiểm tra nếu chuỗi có 12 ký tự
        else if (phoneNumber?.length === 12) {
            return '0' + phoneNumber?.slice(3); // Thay 2 ký tự đầu bằng '0'
        }
        // Trả về chuỗi không thay đổi nếu không thỏa mãn điều kiện trên
        else {
            return phoneNumber;
        }
    }

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

    const [salesman, setSalesman] = useState({});
    const [shop, setShop] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                // Call API to get salesman info and shop info
                const [salesmanResponse, shopResponse] = await Promise.all([
                    await instance.get('v1/user-service/salesman/me'),
                    await instance.get('v1/shopping-service/shop/me')
                ]);
                setSalesman(await salesmanResponse.data.data);
                setShop(await shopResponse.data.data);

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


    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Kênh người bán"/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={6}/>
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[2rem] font-semibold">
                                        Thông tin người bán
                                    </span>
                                </div>

                                <div className="flex items-center justify-center gap-10">
                                    <Link to="/salesman/edit-profile">
                                        <span className="font-semibold text-Blue cursor-pointer hover:text-Dark_blue">
                                            Sửa
                                        </span>
                                    </Link>

                                </div>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="rounded-[50%] bg-Light_gray h-[120px] w-[120px] flex items-center justify-center">
                                {shop.profilePicture
                                    ?
                                    <img src={shop.profilePicture} alt="Selected"
                                         className="w-full h-full border rounded-[50%] object-cover"/>
                                    :
                                    <FiUser className="text-Dark_gray h-16 w-16"/>}
                            </div>
                        </div>

                        <table className="w-[100%]">
                            <tbody>
                            <tr>
                                <td className="py-5">*Họ và tên:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.fullname ?? ""}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Căn cước công dân:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.cccd ?? ""}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Email:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.email ?? ""}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Số điện thoại:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {formatPhoneNumber(salesman.phoneNumber) ?? ""}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Tên cửa hàng:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {shop.name ?? ""}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Địa chỉ:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.address ?? ""}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Mô tả của hàng:</td>
                                <td className="py-5 w-[80%]">
                                    <p className="whitespace-pre-line">
                                        {shop.description ?? ""}
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
            </main>

            <Footer/>
        </div>
    );
};

export default ViewShopInfo;