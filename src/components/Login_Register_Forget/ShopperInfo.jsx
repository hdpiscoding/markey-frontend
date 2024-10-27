import React, {useState} from "react";
import {IoArrowBack} from "react-icons/io5";

const ShopperInfo = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [errors, setErrors] = useState({ name: false, address: false });

    const handleNextClick = () => {
        // Kiểm tra xem input nào trống và cập nhật trạng thái lỗi
        const newErrors = {
            name: name.trim() === "",
            address: address.trim() === "",
        };

        setErrors(newErrors);

        // Nếu tất cả input đều hợp lệ thì chuyển sang bước tiếp theo
        const isValid = !newErrors.name && !newErrors.address;
        if (isValid) {
            // Logic tiếp theo khi tất cả input đều được nhập
            console.log("Chuyển sang bước tiếp theo");
        }
    };

    return (
        <div
            className="bg-White shadow rounded-lg h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
            <div className="flex items-center justify-items-center ml-8 mt-4 mb-6 h-auto w-full">
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
                {/* Input Họ và tên */}
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

                {/* Input Địa chỉ */}
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

export default ShopperInfo;