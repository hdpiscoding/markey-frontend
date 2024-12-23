import React, {useState} from 'react';
import {IoArrowBack} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../General/useLocalStorage";
import LoadingModal from "../General/LoadingModal";
import axios from "axios";

const SalesmanInfo = () => {
    const formatPhoneNumber = (phoneNumber) => {
        return phoneNumber.replace(/^0/, '+84');
    }

    const navigate = useNavigate();
    const emailStorage = useLocalStorage('email');
    const phoneStorage = useLocalStorage('phone');
    const passwordStorage = useLocalStorage('password');
    const nameStorage = useLocalStorage('name');
    const addressStorage = useLocalStorage('address');
    const shopNameStorage = useLocalStorage('shopName');
    const cccdStorage = useLocalStorage('cccd');
    const descriptionStorage = useLocalStorage('description');

    const [loading, setLoading] = useState(false);
    const [fullname, setFullname] = useState("");
    const [address, setAddress] = useState("");
    const [shopName, setShopName] = useState("");
    const [cccd, setCccd] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({
        name: false,
        address: false,
        shopName: false,
        cccd: false,
        cccdInvalid: false,
        description: false,
    });

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

        const newErrors = {
            name: fullname.trim() === "",
            address: address.trim() === "",
            shopName: shopName.trim() === "",
            cccd: cccd.trim() === "",
            cccdInvalid: cccd.trim() !== "" && cccd.length !== 12,
            description: description.trim() === "",
        };

        setErrors(newErrors);

        const isValid = !Object.values(newErrors).includes(true);
        if (isValid) {
            try {
                setLoading(true);
                openLoadingModal();

                // Lưu thông tin người dùng vào localStorage
                nameStorage.set(fullname);
                addressStorage.set(address);
                shopNameStorage.set(shopName);
                cccdStorage.set(cccd);
                descriptionStorage.set(description);

                let data = {
                    phoneNumber: formatPhoneNumber(phoneStorage.get()),
                    email: emailStorage.get(),
                    fullname: nameStorage.get(),
                    address: addressStorage.get(),
                    password: passwordStorage.get(),
                    cccd: cccdStorage.get(),
                    shop: {
                        name: shopNameStorage.get(),
                        description: descriptionStorage.get(),
                    }
                };

                // Call API để lưu thông tin người dùng
                const response = await axios.post('http://152.42.232.101:5050/api/v1/user-service/salesman/register', data);
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

    const handleCccdChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 12) {
            setCccd(value);
        }
    };

    const handleBackClick = () => {
        // Xóa dữ liệu trong localStorage nếu có
        nameStorage.remove();
        addressStorage.remove();
        shopNameStorage.remove();
        cccdStorage.remove();
        descriptionStorage.remove();

        navigate(-1);
    }

    return (
        <div className="bg-White shadow rounded-lg h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
            <div className="flex items-center justify-items-center ml-8 mb-6 h-auto w-full">
                <div className="cursor-pointer" onClick={handleBackClick}>
                    <IoArrowBack className="h-5 w-5 object-cover" />
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
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className={`border-2 w-full rounded-sm h-8 pl-2 outline-none ${
                            errors.name ? "border-Red text-Red" : "focus:ring-Blue focus:ring-1 focus:border-Blue"
                        }`}
                        placeholder="Họ và tên"
                    />
                    {errors.name && (
                        <p className="absolute text-Red text-sm -bottom-5 left-0">
                            Vui lòng nhập họ và tên.
                        </p>
                    )}
                </div>

                {/* Input Căn cước công dân */}
                <div className="relative w-full">
                    <input
                        value={cccd}
                        onChange={handleCccdChange}
                        className={`border-2 w-full rounded-sm h-8 pl-2 outline-none ${
                            errors.cccd || errors.cccdInvalid
                                ? "border-Red text-Red"
                                : "focus:ring-Blue focus:ring-1 focus:border-Blue"
                        }`}
                        placeholder="Căn cước công dân"
                    />
                    {errors.cccd && (
                        <p className="absolute text-Red text-sm -bottom-5 left-0">
                            Vui lòng nhập căn cước công dân.
                        </p>
                    )}
                    {errors.cccdInvalid && (
                        <p className="absolute text-Red text-sm -bottom-5 left-0">
                            Căn cước công dân không hợp lệ.
                        </p>
                    )}
                </div>

                {/* Input Tên Shop */}
                <div className="relative w-full">
                    <input
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        className={`border-2 w-full rounded-sm h-8 pl-2 outline-none ${
                            errors.shopName ? "border-Red text-Red" : "focus:ring-Blue focus:ring-1 focus:border-Blue"
                        }`}
                        placeholder="Tên Shop"
                    />
                    {errors.shopName && (
                        <p className="absolute text-Red text-sm -bottom-5 left-0">
                            Vui lòng nhập tên shop.
                        </p>
                    )}
                </div>

                {/* Input Địa chỉ */}
                <div className="relative w-full">
                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className={`border-2 w-full rounded-sm h-8 pl-2 outline-none ${
                            errors.address ? "border-Red text-Red" : "focus:ring-Blue focus:ring-1 focus:border-Blue"
                        }`}
                        placeholder="Địa chỉ"
                    />
                    {errors.address && (
                        <p className="absolute text-Red text-sm -bottom-5 left-0">
                            Vui lòng nhập địa chỉ.
                        </p>
                    )}
                </div>

                {/* Textarea Mô tả Shop */}
                <div className="relative w-full">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`border-2 w-full rounded-sm pl-2 outline-none resize-none h-20 ${
                            errors.description ? "border-Red text-Red" : "focus:ring-Blue focus:ring-1 focus:border-Blue"
                        }`}
                        placeholder="Mô tả Shop"
                    />
                    {errors.description && (
                        <p className="absolute text-Red text-sm -bottom-5 left-0">
                            Vui lòng nhập mô tả shop.
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

export default SalesmanInfo;