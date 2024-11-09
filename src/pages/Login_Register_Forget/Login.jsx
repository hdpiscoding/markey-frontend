import React, {useContext, useState} from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import InfoModal from "../../components/General/InfoModal";
import useLocalStorage from "../../components/General/useLocalStorage";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {AppContext} from "../../components/General/AppContext";
import LoadingModal from "../../components/General/LoadingModal";

const Login = () => {
    // Change phone number format from 0123456789 to +84123456789
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/^0/, '+84');
    }

    const [loading, setLoading] = useState(false);
    const { setTriggerEffect } = useContext(AppContext);

    const navigate = useNavigate();
    const tokenStorage = useLocalStorage('token');
    const roleStorage = useLocalStorage('role');
    const authStorage = useLocalStorage('auth');
    const userIdStorage = useLocalStorage('userId');

    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ emailOrPhone: false, password: false });


    const handleEmailOrPhoneChange = (e) => {
        setEmailOrPhone(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, emailOrPhone: false }));
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, password: false }));
    }

    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState('shopper');


    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const validateFields = () => {
        const newErrors = {
            emailOrPhone: emailOrPhone.trim() === '',
            password: password.trim() === '',
        };
        setErrors(newErrors);
        return !Object.values(newErrors).includes(true);
    }


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

    const handleLogin = async () => {
        if (!validateFields()) return;

        // Call API to login and get token, then store it in localStorage if login successfully
        let url = "";
        let data = {
            phoneNumberOrEmail: `${(/^\d{10}$/).test(emailOrPhone) ? formatPhoneNumber(emailOrPhone) : emailOrPhone}`,
            password: password
        };

        console.log(data.phoneNumberOrEmail);

        switch (selectedRole) {
            case "shopper":
                url = "http://152.42.232.101:5050/api/v1/user-service/shopper/login";
                break;
            case "salesman":
                url = "http://152.42.232.101:5050/api/v1/user-service/salesman/login";
                break;
            case "admin":
                url = "http://152.42.232.101:5050/api/v1/user-service/admin/login";
                if(data.hasOwnProperty('phoneNumberOrEmail')){
                    data.username = data.phoneNumberOrEmail;
                    delete data.phoneNumberOrEmail;
                }
                break;
            default:
                break;
        }

        try {
            setLoading(true);
            openLoadingModal();
            const response = await axios.post(url, data);
            // Successful login
            if (response.data.code === 200) {
                // Store token in localStorage
                console.log(response.data.message);
                tokenStorage.set(response.data.data.token);
                authStorage.set(true);
                // Extract token from localStorage and decode it to get role
                const token = tokenStorage.get();
                const decodedData = jwtDecode(token);
                roleStorage.set(decodedData.roleName);
                userIdStorage.set(decodedData.id);
                setTriggerEffect((prev) => !prev);

                // Redirect to user home page based on role
                switch (decodedData.roleName) {
                    case "shopper":
                        navigate("/shopper");
                        break;
                    case "salesman":
                        navigate("/salesman");
                        break;
                    case "admin":
                        navigate("/admin");
                        break;
                    default:
                        break;
                }
            }
        }
        catch (error) {
            setLoading(false);
            closeLoadingModal();
            openModal();
        }
        finally {
            setLoading(false);
            closeLoadingModal();// Ẩn spinner khi API hoàn tất
        }

    }
    return (
        <div>
            <div className="bg-gradient-to-b from-Blue to-Light_blue h-screen w-screen grid grid-cols-[1fr_5fr_5fr_1fr] justify-items-center items-center">
                <div className="flex flex-col items-center col-start-2 select-none">
                    <div className="w-[20rem] h-[18rem]">
                        <img src="/Markey_white_vertical.png" className="object-cover" alt="Markey"/>
                    </div>

                    <div className="flex">
                        <span className="font-sans font-semibold text-White text-xl">
                            "Mở khóa tiềm năng mua sắm của bạn"
                        </span>
                    </div>
                </div>

                <div className="rounded-2xl bg-White w-[28rem] col-start-3 flex flex-col justify-center items-center select-none">
                    <div className="flex flex-col justify-center items-center w-[20rem]">
                        <div className="mt-4 select-none">
                            <span className="font-sans text-Black font-semibold text-2xl">
                                Đăng nhập
                            </span>
                        </div>

                        <div className="my-8 relative">
                            <input
                                type="text"
                                className={`border-2 w-[20rem] rounded-sm h-8 pl-2 outline-none ${errors.emailOrPhone ? 'border-Red text-Red' : 'focus:ring-Blue focus:ring-1 focus:border-Blue'}`}
                                placeholder="Số điện thoại/Email"
                                value={emailOrPhone}
                                onChange={handleEmailOrPhoneChange}
                            />
                            {errors.emailOrPhone && (
                                <p className="text-Red text-sm absolute -bottom-5 left-0">Vui lòng nhập số điện thoại hoặc email.</p>
                            )}
                        </div>

                        <div className="mb-8 relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={`border-2 w-[20rem] rounded-sm h-8 pl-2 pr-8 outline-none ${errors.password ? 'border-Red text-Red' : 'focus:ring-Blue focus:ring-1 focus:border-Blue'}`}
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <span onClick={handleShowPassword} className="cursor-pointer absolute right-2 mt-2">
                            {showPassword ? <FaEye className="h-4 w-4" /> : <FaEyeSlash className="h-4 w-4" />}
                        </span>
                            {errors.password && (
                                <p className="text-Red text-sm absolute -bottom-5 left-0">Vui lòng nhập mật khẩu.</p>
                            )}
                        </div>

                        <div className="mb-8">
                            <select
                                className="border-2 w-[20rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 focus:border-Blue"
                                onChange={handleRoleChange}>
                                <option value="shopper">Khách hàng</option>
                                <option value="salesman">Người bán</option>
                                <option value="admin">Quản trị viên</option>
                            </select>
                        </div>

                        <div
                            className="mb-1 h-8 bg-Blue flex flex-col items-center justify-center rounded-sm cursor-pointer hover:bg-Dark_blue">
                            <button className="rounded-sm w-[20rem]" onClick={handleLogin}>
                                <div>
                                    <span className="text-White select-none">
                                        Đăng nhập
                                    </span>
                                </div>
                            </button>
                        </div>

                        <div className="mb-8 flex float-right self-end select-none">
                            <Link to="/forget-password">
                                <span className="font-semibold underline text-[0.75rem]">
                                    Quên mật khẩu
                                </span>
                            </Link>
                        </div>

                        <div className="mb-4 select-none">
                            <span>
                                Bạn chưa có tài khoản?
                                <Link to="/register">
                                    <span className="ml-2 text-Red">
                                        Đăng ký
                                    </span>
                                </Link>
                            </span>
                        </div>

                        <InfoModal isOpen={isModalOpen} onClose={closeModal} title="Đăng nhập thất bại"
                                   message="Thông tin đăng nhập không chính xác. Vui lòng đăng nhập lại!"/>
                        {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;