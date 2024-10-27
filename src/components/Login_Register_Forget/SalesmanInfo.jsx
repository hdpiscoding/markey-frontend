import React, {useState} from 'react';
import {IoArrowBack} from "react-icons/io5";

const SalesmanInfo = () => {
    const [name, setName] = useState("");
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

    const handleNextClick = () => {
        // Kiểm tra xem input nào trống và cập nhật trạng thái lỗi
        const newErrors = {
            name: name.trim() === "",
            address: address.trim() === "",
            shopName: shopName.trim() === "",
            cccd: cccd.trim() === "",
            cccdInvalid: cccd.trim() !== "" && cccd.length !== 12,
            description: description.trim() === "",
        };

        setErrors(newErrors);

        // Nếu tất cả input đều hợp lệ thì chuyển sang bước tiếp theo
        const isValid = !Object.values(newErrors).includes(true);
        if (isValid) {
            console.log("Chuyển sang bước tiếp theo");
        }
    };

    const handleCccdChange = (e) => {
        const value = e.target.value;
        // Chỉ cho phép nhập số và tối đa 12 chữ số
        if (/^\d*$/.test(value) && value.length <= 12) {
            setCccd(value);
        }
    };

    return (
        <div
            className="bg-White shadow rounded-lg h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
            <div className="flex items-center justify-items-center ml-8 mb-6 h-auto w-full">
                <div className="cursor-pointer">
                    <IoArrowBack className="h-5 w-5 object-cover"/>
                </div>

                <div className="grow text-center">
                    <span className="font-sans font-semibold text-Black text-xl">
                        Nhập thông tin
                    </span>
                </div>

                <div className="w-[3.25rem]"></div>
            </div>

            <div className="flex flex-col items-center justify-items-center h-auto w-[22rem] gap-6">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`border-2 w-[22rem] rounded-sm h-8 pl-2 outline-none ${
                        errors.name
                            ? "border-Red text-Red"
                            : "focus:ring-Blue focus:ring-1 focus:border-Blue"
                    }`}
                    placeholder="Họ và tên"
                />
                {errors.name && (
                    <p className="text-Red text-sm w-full mt-[-12px]">
                        Vui lòng nhập họ và tên.
                    </p>
                )}

                <input
                    value={cccd}
                    onChange={handleCccdChange}
                    className={`border-2 w-[22rem] rounded-sm h-8 pl-2 outline-none ${
                        errors.cccd || errors.cccdInvalid
                            ? "border-Red text-Red"
                            : "focus:ring-Blue focus:ring-1 focus:border-Blue"
                    }`}
                    placeholder="Căn cước công dân"
                />
                {errors.cccd && (
                    <p className="text-Red text-sm w-full mt-[-12px]">
                        Vui lòng nhập căn cước công dân.
                    </p>
                )}
                {errors.cccdInvalid && (
                    <p className="text-Red text-sm w-full mt-[-12px]">
                        Căn cước công dân không hợp lệ.
                    </p>
                )}

                <input
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className={`border-2 w-[22rem] rounded-sm h-8 pl-2 outline-none ${
                        errors.shopName
                            ? "border-Red text-Red"
                            : "focus:ring-Blue focus:ring-1 focus:border-Blue"
                    }`}
                    placeholder="Tên Shop"
                />
                {errors.shopName && (
                    <p className="text-Red text-sm w-full mt-[-12px]">
                        Vui lòng nhập tên shop.
                    </p>
                )}

                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`border-2 w-[22rem] rounded-sm h-8 pl-2 outline-none ${
                        errors.address
                            ? "border-Red text-Red"
                            : "focus:ring-Blue focus:ring-1 focus:border-Blue"
                    }`}
                    placeholder="Địa chỉ"
                />
                {errors.address && (
                    <p className="text-Red text-sm w-full mt-[-12px]">
                        Vui lòng nhập địa chỉ.
                    </p>
                )}

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`border-2 w-[22rem] rounded-sm pl-2 outline-none resize-none h-20 ${
                        errors.description
                            ? "border-Red text-Red"
                            : "focus:ring-Blue focus:ring-1 focus:border-Blue"
                    }`}
                    placeholder="Mô tả Shop"
                />
                {errors.description && (
                    <p className="text-Red text-sm w-full mt-[-12px]">
                        Vui lòng nhập mô tả shop.
                    </p>
                )}

                <div className="mb-4 bg-Blue rounded-sm hover:bg-Dark_blue">
                    <button
                        onClick={handleNextClick}
                        className="rounded-sm w-[22rem] font-sans flex flex-col items-center justify-items-center"
                    >
                        <span className="text-White my-1">Hoàn thành</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SalesmanInfo;