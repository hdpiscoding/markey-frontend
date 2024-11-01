import React, {useState} from "react";
import {IoArrowBack} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../General/useLocalStorage";
import axios from "axios";

const ShopperInfo = () => {
    const navigate = useNavigate();
    const emailStorage = useLocalStorage('email');
    const phoneStorage = useLocalStorage('phone');
    const roleStorage = useLocalStorage('selectedRole');
    const passwordStorage = useLocalStorage('password');

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({ name: false, address: false });

    const handleNextClick = async (e) => {
        e.preventDefault();
        // Kiểm tra xem input nào trống và cập nhật trạng thái lỗi
        const newErrors = {
            name: name.trim() === "",
            address: address.trim() === "",
        };

        setErrors(newErrors);

        // Nếu tất cả input đều hợp lệ thì chuyển sang bước tiếp theo
        const isValid = !newErrors.name && !newErrors.address;
        if (isValid) {
            const data = {
                email: emailStorage.get(),
                phoneNumber: phoneStorage.get(),
                role: roleStorage.get(),
                password: passwordStorage.get(),
                fullname: name,
                address: address
            }
            // Call API để lưu thông tin người dùng
            try {
                const response = await axios.post('http://152.42.232.101:5050/api/v1/user-service/shopper/register', data);
                if (response.data.code === 200) {
                    // Xóa các dữ liệu liên quan trong localStorage
                    emailStorage.remove();
                    phoneStorage.remove();
                    roleStorage.remove();
                    passwordStorage.remove();

                    // Chuyển hướng đến trang hoàn thành
                    navigate("/register/shopper-finish");
                }
                else {
                    console.log(response.data.message);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    const handleBackClick = () => {
        // Xóa dữ liệu trong localStorage nếu có
        navigate(-1);
    }

    return (
        <div
            className="bg-White shadow rounded-lg h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
            <div className="flex items-center justify-items-center ml-8 mt-4 mb-6 h-auto w-full">
                <div className="cursor-pointer" onClick={handleBackClick}>
                    <IoArrowBack className="h-5 w-5 object-cover"/>
                </div>

                <div className="grow text-center">
                    <span className="font-sans font-semibold text-Black text-xl">
                        Nhập thông tin
                    </span>
                </div>

                <div className="w-[3.25rem]"></div>
            </div>

            <div className="flex flex-col items-center justify-items-center h-auto w-[22rem] gap-8">
                {/* Input Họ và tên */}
                <div className="relative w-full">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`border-2 w-full rounded-sm h-8 pl-2 outline-none ${
                            errors.name
                                ? "border-Red text-Red"
                                : "focus:ring-Blue focus:ring-1 focus:border-Blue"
                        }`}
                        placeholder="Họ và tên"
                    />
                    {errors.name && (
                        <p className="absolute text-Red text-sm -bottom-5 left-0">
                            Vui lòng nhập họ và tên.
                        </p>
                    )}
                </div>

                {/* Input Địa chỉ */}
                <div className="relative w-full">
                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={`border-2 w-full rounded-sm h-8 pl-2 outline-none ${
                            errors.address
                                ? "border-Red text-Red"
                                : "focus:ring-Blue focus:ring-1 focus:border-Blue"
                        }`}
                        placeholder="Địa chỉ"
                    />
                    {errors.address && (
                        <p className="absolute text-Red text-sm -bottom-5 left-0">
                            Vui lòng nhập địa chỉ.
                        </p>
                    )}
                </div>

                <div className="mb-4 bg-Blue rounded-sm hover:bg-Dark_blue w-full">
                    <button
                        onClick={handleNextClick}
                        className="rounded-sm w-full font-sans flex flex-col items-center justify-items-center"
                    >
                        <span className="text-White my-1">Hoàn thành</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShopperInfo;