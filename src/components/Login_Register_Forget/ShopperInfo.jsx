import React, {useState} from "react";
import {IoArrowBack} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../General/useLocalStorage";
import axios from "axios";
import LoadingModal from "../General/LoadingModal";

const ShopperInfo = () => {
    // Change phone number format from 0123456789 to +84123456789
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/^0/, '+84');
    }

    const navigate = useNavigate();

    const nameStorage = useLocalStorage('name');
    const addressStorage = useLocalStorage('address');
    const emailStorage = useLocalStorage('email');
    const phoneStorage = useLocalStorage('phone');
    const passwordStorage = useLocalStorage('password');

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({ name: false, address: false });

    // set up loading modal
    const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);

    const openLoadingModal = () => {
        setLoadingModalOpen(true);
    };

    const closeLoadingModal = () => {
        setLoadingModalOpen(false);
    };
    // end set up loading modal

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
            let data = {
                fullname: name,
                address: address,
                email: emailStorage.get(),
                phoneNumber: formatPhoneNumber(phoneStorage.get()),
                password: passwordStorage.get(),
            }
            try {
                setLoading(true);
                openLoadingModal();
                nameStorage.set(name);
                addressStorage.set(address);

                // Call API để lưu thông tin người dùng
                const response = await axios.post("http://152.42.232.101:5050/api/v1/user-service/shopper/register", data);
            }
            catch (error) {
                setLoading(false);
                closeLoadingModal();
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
                navigate("/register/phone-verification");
            }
        }
    };

    const handleBackClick = () => {
        // Xóa dữ liệu trong localStorage nếu có
        nameStorage.remove();
        addressStorage.remove();
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
                        <span className="text-White my-1">Tiếp theo</span>
                    </button>
                </div>

                {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
            </div>
        </div>
    );
};

export default ShopperInfo;