import React, {useState, useEffect} from 'react';
import { IoArrowBack } from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../General/useLocalStorage";
import LoadingModal from "../General/LoadingModal";
import axios from "axios";

const Verification = (props) => {
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/^0/, '84');
    }
    const navigate = useNavigate();

    const emailStorage = useLocalStorage('email');
    const phoneStorage = useLocalStorage('phone');
    const roleStorage = useLocalStorage('selectedRole');
    const passwordStorage = useLocalStorage('password');
    const nameStorage = useLocalStorage('name');
    const addressStorage = useLocalStorage('address');
    const shopNameStorage = useLocalStorage('shopName');
    const cccdStorage = useLocalStorage('cccd');
    const descriptionStorage = useLocalStorage('description');

    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");

    // Handle resend code
    const handleResendCode = () => {
        if (!isResendDisabled) {
            setIsResendDisabled(true);
            setTimeLeft(180); // Đặt thời gian còn lại là 3 phút (180 giây)
        }
    }

    // Timer for resend code
    useEffect(() => {
        let timer;
        if (timeLeft !== null && timeLeft > 0) {
            timer = setTimeout(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsResendDisabled(false);
            setTimeLeft(null);
        }

        return () => clearTimeout(timer); // Clear the timer
    }, [timeLeft]);

    // Hàm để định dạng thời gian còn lại
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    // Hàm kiểm tra mã OTP
    const validateFrontend = () => {
        setOtpError(""); // Reset lỗi mỗi khi kiểm tra
        if (!otp) {
            setOtpError("Mã xác nhận không được để trống.");
            return false;
        }
        return true;
    };

    // set up loading modal
    const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);

    const openLoadingModal = () => {
        setLoadingModalOpen(true);
    };

    const closeLoadingModal = () => {
        setLoadingModalOpen(false);
    };
    // end set up loading modal

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateFrontend();
        if (isValid) {
            // Logic tiếp theo nếu mã OTP hợp lệ
            // Xóa dữ liệu trong localStorage nếu có
            if (props.method === "register") {
                // Gọi API để kiểm tra mã OTP (giả sử bạn có một endpoint để kiểm tra mã OTP)
                try {
                    setLoading(true);
                    openLoadingModal();
                    const response = await axios.get(`http://152.42.232.101:5050/api/v1/user-service/${props.role}/activation/phone?phoneNumber=${formatPhoneNumber(phoneStorage.get())}&code=${otp}`);
                }
                catch (error) {
                    setLoading(false);
                    closeLoadingModal();
                    if (error.response) {
                        setOtpError("Mã xác nhận không hợp lệ.");
                    }
                    else {
                        setOtpError("Có lỗi xảy ra khi kiểm tra mã xác nhận.");
                    }
                }
                finally {
                    setLoading(false);
                    closeLoadingModal();
                    emailStorage.remove();
                    phoneStorage.remove();
                    roleStorage.remove();
                    passwordStorage.remove();
                    nameStorage.remove();
                    addressStorage.remove();
                    shopNameStorage.remove();
                    cccdStorage.remove();
                    descriptionStorage.remove();
                }
            }

            // Chuyển hướng đến trang tiếp theo
            navigate(`${props.url}`);

        }
    };

    const handleBackClick = () => {
        // Xóa dữ liệu trong localStorage nếu có
        navigate(-1);
    }

    return (
        <div className="bg-White shadow rounded-lg h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
            <div className="flex items-center justify-items-center ml-8 mt-4 mb-6 h-auto w-full">
                <div className="cursor-pointer" onClick={handleBackClick}>
                    <IoArrowBack className="h-5 w-5 object-cover" />
                </div>

                <div className="grow text-center">
                    <span className="font-sans font-semibold text-Black text-xl">
                        Nhập mã xác nhận
                    </span>
                </div>

                <div className="w-[3.25rem]"></div> {/* Empty <div></div> for spacing */}
            </div>

            <div className="flex flex-col items-center justify-items-center h-auto w-[22rem]">
                <div>
                    <span className="font-sans text-Black text-sm">
                        Mã xác nhận của bạn đã được gửi đến số điện thoại
                    </span>
                </div>

                <div className="mb-6">
                    <span className="font-sans text-Black text-sm font-bold">
                        {props.value}
                    </span>
                </div>

                <div className="mb-4">
                    <input
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className={`border-2 w-[22rem] rounded-sm h-8 outline-none pl-2 ${
                            otpError ? "border-Red text-Red" : "focus:ring-Blue focus:ring-1 focus:border-Blue"
                        }`}
                        placeholder="Mã xác nhận"
                        type="text" // Có thể thay đổi thành 'text' hoặc 'phone' tùy thuộc vào mã OTP
                    />
                    {otpError && (
                        <p className="text-Red text-sm w-full mt-1">{otpError}</p>
                    )}
                </div>

                <div className="mb-4 select-none">
                    <span className="text-[0.75rem] font-sans mr-1">
                        Bạn chưa nhận được mã?
                    </span>

                    {isResendDisabled ? (
                        <span className="text-[0.75rem] font-sans text-[#E57373]" onClick={null}>
                            Gửi lại mã
                        </span>
                    ) : (
                        <span className="text-[0.75rem] font-sans text-Red font-semibold cursor-pointer" onClick={handleResendCode}>
                            Gửi lại mã
                        </span>
                    )}

                    {(timeLeft !== null && timeLeft > 0) && (
                        <span className="ml-3 text-[0.75rem] font-sans text-Black">
                            {formatTime(timeLeft)}
                        </span>
                    )}
                </div>

                <div className="mb-4 bg-Blue rounded-sm hover:bg-Dark_blue">
                    <button
                        onClick={handleSubmit}
                        className="rounded-sm w-[22rem] font-sans flex flex-col items-center justify-items-center"
                    >
                        <span className="text-White my-1">
                            Tiếp theo
                        </span>
                    </button>
                </div>

                {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
            </div>
        </div>
    );
}

export default Verification;