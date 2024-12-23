import React, {useState} from 'react';
import {IoArrowBack} from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../General/useLocalStorage";
import axios from "axios";
import LoadingModal from "../General/LoadingModal";

const CreatePassword = (props) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword_new, setShowPassword_new] = useState(false);
    const [showPassword_confirm, setShowPassword_confirm] = useState(false);
    const [formFields, setFormFields] = useState({
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const passwordStorage = useLocalStorage('password');
    const phoneStorage = useLocalStorage('phone');
    const codeStorage = useLocalStorage('code');
    const roleStorage = useLocalStorage('selectedRole');

    // set up loading modal
    const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);

    const openLoadingModal = () => {
        setLoadingModalOpen(true);
    };

    const closeLoadingModal = () => {
        setLoadingModalOpen(false);
    };
    // end set up loading modal

    const handleShowPassword_new = () => setShowPassword_new(!showPassword_new);
    const handleShowPassword_confirm = () => setShowPassword_confirm(!showPassword_confirm);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormFields((prevFields) => ({
            ...prevFields,
            [name]: value
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSubmit = async () => {
        const newErrors = {};

        // Kiểm tra xem có trường nào trống không
        if (formFields.password.trim() === '') newErrors.password = "Vui lòng nhập mật khẩu mới.";
        if (formFields.confirmPassword.trim() === '') newErrors.confirmPassword = "Vui lòng nhập xác nhận mật khẩu.";

        // Kiểm tra mật khẩu xác nhận khớp
        if (formFields.password && formFields.confirmPassword && formFields.password !== formFields.confirmPassword) {
            newErrors.confirmPassword = "Mật khẩu xác nhận không chính xác.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Gọi API hoặc tiếp tục quy trình
            // Lưu dữ liệu tam thời vào localStorage
            passwordStorage.set(formFields.confirmPassword);
            if (props.method === 'forget') {
                try {
                    setLoading(true);
                    openLoadingModal();
                    await handleChangePassword();
                }
                catch (error) {
                    setLoading(false);
                    closeLoadingModal();
                    console.log(error);
                }
                finally {
                    setLoading(false);
                    closeLoadingModal();
                    phoneStorage.remove();
                    codeStorage.remove();
                    roleStorage.remove();
                }
            }

            navigate(`${props.method === 'register' ? (props.role === "shopper" ? '/register/enter-shopper-info' : '/register/enter-salesman-info') : '/forget-password/finished'}`);
        }
    };

    const handleChangePassword = async () => {
        try {
            let data = {
                password: formFields.confirmPassword,
                code: codeStorage.get(),
                phoneNumber: phoneStorage.get()
            }

            await axios.post(`http://152.42.232.101:5050/api/v1/user-service/${roleStorage.get()}/reset-password`, data)
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleBackClick = () => {
        // Xóa dữ liệu trong localStorage nếu có
        passwordStorage.remove();
        navigate(-1);
    }

    return (
        <div className="bg-White shadow rounded-lg h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
            <div className="flex items-center justify-items-center ml-8 mt-4 mb-6 h-auto w-full">
                <div className="cursor-pointer" onClick={handleBackClick}>
                    <IoArrowBack className="h-5 w-5 object-cover"/>
                </div>

                <div className="grow text-center">
                    <span className="font-sans font-semibold text-Black text-xl">Nhập mật khẩu</span>
                </div>

                <div className="w-[3.25rem]"></div> {/* Empty <div></div> for spacing */}
            </div>

            <div className="flex flex-col items-center justify-items-center h-auto w-[22rem]">
                {/* Mật khẩu mới */}
                <div className="mb-8 flex items-center justify-items-center relative">
                    <input
                        name="password"
                        type={showPassword_new ? "text" : "password"}
                        value={formFields.password}
                        onChange={handleInputChange}
                        className={`border-2 w-[22rem] rounded-sm h-8 outline-none pl-2 
                            ${errors.password ? "border-Red" : "focus:border-Blue focus:ring-Blue focus:ring-1"}`}
                        placeholder={`${props.method === 'forget' ? 'Mật khẩu mới' : 'Mật khẩu'}`}
                    />
                    {showPassword_new
                        ? <FaEye onClick={handleShowPassword_new} className="h-4 w-4 absolute right-2 select-none cursor-pointer"/>
                        : <FaEyeSlash onClick={handleShowPassword_new} className="h-4 w-4 absolute right-2 select-none cursor-pointer"/>
                    }
                    {errors.password && (
                        <p className="text-Red text-sm absolute left-0 -bottom-5">{errors.password}</p>
                    )}
                </div>

                {/* Xác nhận mật khẩu */}
                <div className="mb-8 flex items-center justify-items-center relative">
                    <input
                        name="confirmPassword"
                        type={showPassword_confirm ? "text" : "password"}
                        value={formFields.confirmPassword}
                        onChange={handleInputChange}
                        className={`border-2 w-[22rem] rounded-sm h-8 outline-none pl-2 
                            ${errors.confirmPassword ? "border-Red" : "focus:ring-Blue focus:ring-1 focus:border-Blue"}`}
                        placeholder="Xác nhận mật khẩu"
                    />
                    {showPassword_confirm
                        ? <FaEye onClick={handleShowPassword_confirm} className="h-4 w-4 absolute right-2 select-none cursor-pointer"/>
                        : <FaEyeSlash onClick={handleShowPassword_confirm} className="h-4 w-4 absolute right-2 select-none cursor-pointer"/>
                    }
                    {errors.confirmPassword && (
                        <p className="text-Red text-sm absolute left-0 -bottom-5">{errors.confirmPassword}</p>
                    )}
                </div>

                {/* Nút Tiếp theo */}
                <div className="mb-4 bg-Blue rounded-sm hover:bg-Dark_blue">
                    <button
                        onClick={handleSubmit}
                        className="rounded-sm w-[22rem] font-sans flex flex-col items-center justify-items-center"
                    >
                        <span className="text-White my-1">Tiếp theo</span>
                    </button>
                </div>

                {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
            </div>
        </div>
    );
}

export default CreatePassword;