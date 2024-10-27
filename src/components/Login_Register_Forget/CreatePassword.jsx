import React from 'react';
import {IoArrowBack} from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const CreatePassword = (props) => {
    const [showPassword_new, setShowPassword_new] = React.useState(false);
    const [showPassword_confirm, setShowPassword_confirm] = React.useState(false);

    const handleShowPassword_new = () => {
        setShowPassword_new(!showPassword_new);
    }

    const handleShowPassword_confirm = () => {
        setShowPassword_confirm(!showPassword_confirm);
    }

    return (
        <div className="bg-White shadow rounded-lg h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
            <div className="flex items-center justify-items-center ml-8 mt-4 mb-6 h-auto w-full">
                <div className="cursor-pointer">
                    <IoArrowBack className="h-5 w-5 object-cover"/>
                </div>

                <div className="grow text-center">
                    <span className="font-sans font-semibold text-Black text-xl">
                        Nhập mật khẩu
                    </span>
                </div>

                <div className="w-[3.25rem]"></div> {/* Empty <div></div> for spacing */}
            </div>

            <div className="flex flex-col items-center justify-items-center h-auto w-[22rem]">
                <div className="mb-8 flex items-center justify-items-center relative">
                    {showPassword_new
                        ?
                        <input
                            className="border-2 w-[22rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 focus:border-Blue"
                            placeholder="Mật khẩu mới"/>
                        :
                        <input
                            className="border-2 w-[22rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 focus:border-Blue"
                            placeholder="Mật khẩu mới" type="password"/>}

                    {showPassword_new
                        ?
                        <FaEye onClick={handleShowPassword_new} className="h-4 w-4 absolute right-2 select-none cursor-pointer"/>
                        :
                        <FaEyeSlash onClick={handleShowPassword_new} className="h-4 w-4 absolute right-2 select-none cursor-pointer"/>}
                </div>

                <div className="mb-8 flex items-center justify-items-center relative">
                    {showPassword_confirm
                        ?
                        <input
                            className="border-2 w-[22rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 focus:border-Blue"
                            placeholder="Xác nhận mật khẩu"/>
                        :
                        <input
                            className="border-2 w-[22rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 focus:border-Blue"
                            placeholder="Xác nhận mật khẩu" type="password"/>}

                    {showPassword_confirm
                        ?
                        <FaEye onClick={handleShowPassword_confirm} className="h-4 w-4 absolute right-2 select-none cursor-pointer"/>
                        :
                        <FaEyeSlash onClick={handleShowPassword_confirm} className="h-4 w-4 absolute right-2 select-none cursor-pointer"/>}
                </div>

                <div className="mb-4 bg-Blue rounded-sm hover:bg-Dark_blue">
                    <button
                        className="rounded-sm w-[22rem] font-sans flex flex-col items-center justify-items-center">
                        <span className="text-White my-1">
                            Tiếp theo
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreatePassword;