import React, {useEffect, useState} from "react";
import {IoArrowBack} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../General/useLocalStorage";
import {instance} from "../../AxiosConfig";
import axios from "axios";
import LoadingModal from "../General/LoadingModal";


const EnterEmailOrPhone = (props) => {
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/^0/, '+84');
    }
    const navigate = useNavigate();

    const phoneStorage = useLocalStorage('phone');
    const emailStorage = useLocalStorage('email');
    const roleStorage = useLocalStorage('selectedRole');

    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState('shopper');
    const [title, setTitle] = useState("");
    const [method, setMethod] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");
    const [url, setUrl] = useState("");

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
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

    useEffect(() => {
        if (props.method === "forget") {
            setTitle("Đặt lại mật khẩu");
            setMethod("Số điện thoại");
            setUrl("/forget-password/phone-verification");
        }
        if (props.method === "email") {
            setTitle("Đổi email");
            setMethod("Email");
            setUrl("/change-email/phone-verification")
        }
        if (props.method === "phone") {
            setTitle("Đổi số điện thoại");
            setMethod("Số điện thoại");
            setUrl("/change-phone/phone-verification")
        }
    }, [props.method]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (props.method === "phone" || props.method === "forget") {
            // Giới hạn chỉ cho phép nhập số
            const onlyNumbers = value.replace(/\D/g, "");
            setInputValue(onlyNumbers);
        } else {
            setInputValue(value);
        }
    };

    const validateFrontend = () => {
        let newError = "";

        if (inputValue.trim() === "") {
            newError = `Vui lòng nhập ${method.toLowerCase()}.`;
        } else if (props.method === "email") {
            // Kiểm tra định dạng email hợp lệ
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(inputValue)) {
                newError = "Email không hợp lệ.";
            }
        } else if (props.method === "phone" || props.method === "forget") {
            // Kiểm tra số điện thoại có đúng 10 chữ số không
            if (inputValue.length !== 10) {
                newError = "Số điện thoại không hợp lệ.";
            }
        }

        setError(newError);
        return !newError;
    };

    const handleNextClick = async () => {
        if (validateFrontend()) {
            if (props.method === "phone" || props.method === "forget") {
                phoneStorage.set(formatPhoneNumber(inputValue));
            } else {
                emailStorage.set(inputValue);
            }

            try {
                setLoading(true);
                openLoadingModal();
                if (props.method === "forget") {
                    roleStorage.set(selectedRole);
                    await axios.post(`http://152.42.232.101:5050/api/v1/user-service/${selectedRole}/forget-password`, {phoneNumber: phoneStorage.get()})
                }
            }
            catch (error) {
                setLoading(false);
                closeLoadingModal();
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
                navigate(`${url}`);
            }

        }

    }

    const handleBackClick = () => {
        // Xóa các dữ liệu liên quan trong localStorage
        phoneStorage.remove();
        emailStorage.remove();
        roleStorage.remove();
        navigate(-1);
    }

    return (
        <div className="bg-White shadow rounded-l h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
            <div className="flex items-center justify-items-center ml-8 mt-4 h-auto w-full">
                <div className="cursor-pointer" onClick={handleBackClick}>
                    <IoArrowBack className="h-5 w-5 object-cover" />
                </div>

                <div className="grow text-center">
                    <span className="font-sans font-semibold text-Black text-xl">
                        {title}
                    </span>
                </div>

                <div className="w-[3.25rem]"></div>
            </div>

            <div className="flex flex-col items-center justify-items-center h-auto w-[22rem] gap-8">
                <div className="mt-10">
                    <input
                        className={`border-2 w-[22rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 focus:border-Blue ${
                            error ? "border-Red text-Red" : ""
                        }`}
                        placeholder={method}
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    {error && (
                        <p className="text-Red text-sm w-full mt-1">{error}</p>
                    )}
                </div>

                {props.method === "forget"
                    &&
                    <div>
                        <select
                            className="border-2 w-[22rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 focus:border-Blue"
                            onChange={handleRoleChange}>
                            <option value="shopper">Khách hàng</option>
                            <option value="salesman">Người bán</option>
                        </select>
                    </div>}

                <div className="mb-4 bg-Blue hover:bg-Dark_blue rounded-sm">
                    <button
                        className="w-[22rem] rounded-sm font-sans flex flex-col items-center justify-items-center"
                        onClick={handleNextClick}
                    >
                        <span className="text-White my-1">Tiếp theo</span>
                    </button>
                </div>

                {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
            </div>
        </div>
    );
};

export default EnterEmailOrPhone;