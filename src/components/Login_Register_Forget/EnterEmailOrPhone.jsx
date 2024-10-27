import React, {useEffect, useState} from "react";
import {IoArrowBack} from "react-icons/io5";


const EnterEmailOrPhone = (props) => {
    const [title, setTitle] = useState("");
    const [method, setMethod] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (props.method === "password") {
            setTitle("Đặt lại mật khẩu");
            setMethod("Số điện thoại");
        }
        if (props.method === "email") {
            setTitle("Đổi email");
            setMethod("Email");
        }
        if (props.method === "phone") {
            setTitle("Đổi số điện thoại");
            setMethod("Số điện thoại");
        }
    }, [props.method]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (props.method === "phone" || props.method === "password") {
            // Giới hạn chỉ cho phép nhập số
            const onlyNumbers = value.replace(/\D/g, "");
            setInputValue(onlyNumbers);
        } else {
            setInputValue(value);
        }
    };

    const handleNextClick = () => {
        let newError = "";

        if (inputValue.trim() === "") {
            newError = `Vui lòng nhập ${method.toLowerCase()}.`;
        } else if (props.method === "email") {
            // Kiểm tra định dạng email hợp lệ
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(inputValue)) {
                newError = "Email không hợp lệ.";
            }
        } else if (props.method === "phone" || props.method === "password") {
            // Kiểm tra số điện thoại có đúng 10 chữ số không
            if (inputValue.length !== 10) {
                newError = "Số điện thoại không hợp lệ.";
            }
        }

        setError(newError);
        if (!newError) {
            console.log("Tiến hành bước tiếp theo...");
        }
    };

    return (
        <div className="bg-White shadow rounded-l h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
            <div className="flex items-center justify-items-center ml-8 mt-4 h-auto w-full">
                <div className="cursor-pointer">
                    <IoArrowBack className="h-5 w-5 object-cover" />
                </div>

                <div className="grow text-center">
                    <span className="font-sans font-semibold text-Black text-xl">
                        {title}
                    </span>
                </div>

                <div className="w-[3.25rem]"></div>
            </div>

            <div className="flex flex-col items-center justify-items-center h-auto w-[22rem]">
                <div className="my-10">
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

                <div className="mb-4 bg-Blue hover:bg-Dark_blue rounded-sm">
                    <button
                        className="w-[22rem] rounded-sm font-sans flex flex-col items-center justify-items-center"
                        onClick={handleNextClick}
                    >
                        <span className="text-White my-1">Tiếp theo</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnterEmailOrPhone;