import React, {useEffect, useState} from 'react';
import {FiUser} from "react-icons/fi";
import Footer from "../../components/General/Footer";
import SecondaryHeader from "../../components/General/SecondaryHeader";
import AdminNav from "../../components/Admin/AdminNav";
import ConfirmModal from "../../components/General/ConfirmModal";

const BanShopperDetails = () => {
    const formatDate = (dateString) => {
        // Tạo đối tượng Date từ chuỗi ngày
        let date = new Date(dateString);

        // Kiểm tra xem chuỗi ngày có hợp lệ không
        if (isNaN(date)) {
            return "Invalid date";
        }

        // Lấy ngày, tháng, năm từ đối tượng Date
        let day = date.getDate();
        let month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
        let year = date.getFullYear();

        // Định dạng ngày theo DD/MM/YYYY
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    }

    // Store API data
    const [shopper, setShopper] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        // Call API to get shopper's data by shopper_id and set to shopper and set shopper's avatar to selectedImage

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

    const handleLock = () => {
        // Call API to lock/unlock the user to set isActice = !isActive

        closeModal();
        // Redirect to the previous page

    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <AdminNav currentPage={4}/>
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4">
                        <div className="flex flex-col justify-center gap-2">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-[2rem]">
                                    Thông tin khách hàng
                                </span>

                                <div className="flex items-center justify-center gap-10 select-none">
                                    <span className={`font-semibold ${shopper?.isActive ? "text-Red hover:text-Dark_red" : "text-Blue hover:text-Dark_blue"} cursor-pointer`}
                                          onClick={openModal}>
                                        {shopper?.isActive ? 'Khóa' : 'Mở khóa'}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t-2 w-full text-Dark_gray"></div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4">
                            <div
                                className="rounded-[50%] bg-Light_gray h-[120px] w-[120px] flex items-center justify-center">
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Selected"
                                         className="w-full h-full rounded-[50%] object-cover"/>
                                ) : (
                                    <FiUser className="text-Dark_gray h-16 w-16"/>
                                )}
                            </div>
                        </div>

                        <table className="w-[80%]">
                            <tbody>
                            <tr>
                                <td className="py-3">
                                    <label htmlFor="name">
                                        Họ và tên
                                    </label>
                                </td>

                                <td className="py-3">
                                    <span className="font-semibold">
                                        {shopper?.name ?? 'Cristiano Ronaldo'}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">
                                    <label htmlFor="gender">
                                        Giới tính
                                    </label>
                                </td>

                                <td className="py-3">
                                    <span className="font-semibold">
                                        {shopper?.gender?.toLowerCase ?? 'Nam'}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">
                                    <label htmlFor="email">
                                        Email
                                    </label>
                                </td>

                                <td className="py-3">
                                    <span className="font-semibold">
                                        {shopper?.email ?? 'cr7@gmail.com'}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">
                                    <label htmlFor="email">
                                        Số điện thoại
                                    </label>
                                </td>

                                <td className="py-3">
                                    <div className="flex items-center gap-4">
                                        <span className="font-semibold">
                                            {shopper?.phone ?? '0123456789'}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">
                                    <label htmlFor="email">
                                        Ngày sinh
                                    </label>
                                </td>

                                <td className="py-3">
                                    <span className="font-semibold">
                                        {shopper?.birthdate ?? '05/02/1985'}
                                    </span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleLock} title={`Xác nhận ${shopper?.isLocked ? "mở khóa" : "khóa"} khách hàng`} message={`Bạn có chắc muốn ${shopper?.isLocked ? "mở khóa" : "khóa"} tài khoản khách hàng này?`}/>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default BanShopperDetails;