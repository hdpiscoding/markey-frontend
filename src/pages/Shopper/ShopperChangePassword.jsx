import React, {useState} from 'react';
import Footer from "../../components/General/Footer";
import AccountNav from "../../components/Shopper/AccountNav";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {BiErrorCircle} from "react-icons/bi";
import {instance} from "../../AxiosConfig";
import ConfirmModal from "../../components/General/ConfirmModal";
import LoadingModal from "../../components/General/LoadingModal";

const ShopperChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword_old, setShowPassword_old] = useState(false);
    const [showPassword_new, setShowPassword_new] = useState(false);
    const [showPassword_confirm, setShowPassword_confirm] = useState(false);
    const [errors, setErrors] = useState({});

    const handleShowPassword_old = () => {
        setShowPassword_old(!showPassword_old);
    };

    const handleShowPassword_new = () => {
        setShowPassword_new(!showPassword_new);
    };

    const handleShowPassword_confirm = () => {
        setShowPassword_confirm(!showPassword_confirm);
    };

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

    const Validate = () => {
        const newErrors = {};
        let isValid = true;

        // Kiểm tra các trường nhập
        if (!currentPassword) {
            newErrors.currentPassword = 'Mật khẩu hiện tại không được để trống';
            isValid = false;
        }

        if (!newPassword) {
            newErrors.newPassword = 'Mật khẩu mới không được để trống';
            isValid = false;
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không được để trống';
            isValid = false;
        } else if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không chính xác';
            isValid = false;
        }

        // Nếu có lỗi thì cập nhật state errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            isValid = false;
        }

        return isValid;
    };

    const handleValidate = () => {
        const isValid = Validate();
        if (isValid) {
            openModal();
        }
    }

    const handleUpdatePassword = async () => {
        closeModal();
        if (Object.keys(errors).length <= 0) {
            try {
                setLoading(true);
                openLoadingModal();
                let data = {
                    oldPassword: currentPassword,
                    newPassword: newPassword
                }
                const response = await instance.put('v1/user-service/shopper/change-password', data)

                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setShowPassword_old(false);
                setShowPassword_new(false);
                setShowPassword_confirm(false);
                setErrors({});
            }
            catch (error) {
                setLoading(false);
                closeLoadingModal();
                if (error.response) {
                    setErrors({currentPassword: 'Mật khẩu hiện tại không chính xác'});
                }
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
            }
        }
    }

    const handleChange = (setter, field, value) => {
        setter(value);
        if (errors[field]) {
            setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
        }
    };

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <AccountNav currentPage={3} />
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4">
                        <div className="flex flex-col justify-center gap-2">
                            <div>
                                <span className="font-semibold text-[2rem]">Đổi mật khẩu</span>
                            </div>
                            <div className="border-t-2 w-full text-Dark_gray"></div>
                        </div>

                        <table>
                            <tbody>
                            <tr>
                                <td className="py-5">
                                    <label htmlFor="name">*Mật khẩu hiện tại</label>
                                </td>
                                <td className="py-5 relative">
                                    <div className="flex items-center justify-items-center relative w-fit">
                                        <input
                                            type={showPassword_old ? 'text' : 'password'}
                                            value={currentPassword}
                                            onChange={(e) => handleChange(setCurrentPassword, 'currentPassword', e.target.value)}
                                            className={`focus:outline-none border ${errors.currentPassword ? 'border-Red text-Red' : 'border-Black text-Black'} py-1 px-2 w-[25rem]`}
                                        />
                                        <div
                                            onClick={handleShowPassword_old}
                                            className={`h-5 w-5 absolute right-2 select-none cursor-pointer ${errors.currentPassword ? 'text-Red' : 'text-gray-500'}`}
                                        >
                                            {showPassword_old ? <FaEye/> : <FaEyeSlash/>}
                                        </div>
                                    </div>
                                    {errors.currentPassword && (
                                        <p className="text-Red flex text-sm items-center absolute left-0">
                                            <BiErrorCircle className="mr-1 h-3 w-3"/>
                                            {errors.currentPassword}
                                        </p>
                                    )}
                                </td>
                            </tr>

                            <tr>
                                <td className="py-5">
                                    <label htmlFor="name">*Mật khẩu mới</label>
                                </td>
                                <td className="py-5 relative">
                                    <div className="flex items-center justify-items-center relative w-fit">
                                        <input
                                            type={showPassword_new ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={(e) => handleChange(setNewPassword, 'newPassword', e.target.value)}
                                            className={`focus:outline-none border ${errors.newPassword ? 'border-Red text-Red' : 'border-Black text-Black'} py-1 px-2 w-[25rem]`}
                                        />
                                        <div
                                            onClick={handleShowPassword_new}
                                            className={`h-5 w-5 absolute right-2 select-none cursor-pointer ${errors.newPassword ? 'text-Red' : 'text-gray-500'}`}
                                        >
                                            {showPassword_new ? <FaEye/> : <FaEyeSlash/>}
                                        </div>
                                    </div>
                                    {errors.newPassword && (
                                        <p className="text-Red flex text-sm items-center absolute left-0">
                                            <BiErrorCircle className="mr-1 h-3 w-3"/>
                                            {errors.newPassword}
                                        </p>
                                    )}
                                </td>
                            </tr>

                            <tr>
                                <td className="py-5">
                                    <label htmlFor="name">*Xác nhận mật khẩu</label>
                                </td>
                                <td className="py-5 relative">
                                    <div className="flex items-center justify-items-center relative w-fit">
                                        <input
                                            type={showPassword_confirm ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => handleChange(setConfirmPassword, 'confirmPassword', e.target.value)}
                                            className={`focus:outline-none border ${errors.confirmPassword ? 'border-Red text-Red' : 'border-Black text-Black'} py-1 px-2 w-[25rem]`}
                                        />
                                        <div
                                            onClick={handleShowPassword_confirm}
                                            className={`h-5 w-5 absolute right-2 select-none cursor-pointer ${errors.confirmPassword ? 'text-Red' : 'text-gray-500'}`}
                                        >
                                            {showPassword_confirm ? <FaEye/> : <FaEyeSlash/>}
                                        </div>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-Red flex items-center text-sm absolute left-0">
                                            <BiErrorCircle className="mr-1 h-3 w-3"/>
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="flex items-center justify-center select-none">
                            <button className="bg-Blue text-white py-1 px-8 rounded hover:bg-Dark_blue text-center" onClick={handleValidate}>
                                Cập nhật
                            </button>
                        </div>
                    </div>

                    <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleUpdatePassword} title={"Xác nhận đổi mật khẩu"} message={"Bạn có chắc muốn cập nhật mật khẩu?"}/>
                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>
            </main>

            <Footer/>
        </div>
    );
};
export default ShopperChangePassword;