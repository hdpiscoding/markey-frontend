import React, {useState} from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [showPassword, setShowPassword] = useState(true);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div>
            <div className="bg-gradient-to-b from-Blue to-Light_blue h-screen w-screen grid grid-cols-[2fr_5fr_5fr_2fr] justify-items-center items-center">
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

                <div className="rounded-2xl bg-White w-[28rem] col-start-3 flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-center items-center w-[20rem]">
                        <div className="mt-4 select-none">
                            <span className="font-sans text-Black font-semibold text-2xl">
                                Đăng nhập
                            </span>
                        </div>

                        <div className="my-8">
                            <input
                                className="border-2 w-[20rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 focus:border-Blue"
                                placeholder="Số điện thoại/Email"/>
                        </div>

                        <div className="mb-8 relative flex justify-items-center items-center">
                            {showPassword
                                ?
                                <input className="border-2 w-[20rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 pr-5 focus:border-Blue"
                                placeholder="Mật khẩu" type="password"/>
                                :
                                <input className="border-2 w-[20rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 pr-5 focus:border-Blue"
                                placeholder="Mật khẩu" type="text"/>}

                            {showPassword ? <FaEye onClick={handleShowPassword} className="h-4 w-4 absolute right-2 select-none cursor-pointer"/> :
                                <FaEyeSlash onClick={handleShowPassword} className="h-4 w-4 absolute right-2 select-none cursor-pointer"/>}
                        </div>

                        <div className="mb-1 h-8 bg-Blue flex flex-col items-center justify-center rounded-sm cursor-pointer hover:bg-Dark_blue">
                            <button className="rounded-sm w-[20rem]">
                                <div>
                                <span className="text-White select-none">
                                    Đăng nhập
                                </span>
                                </div>
                            </button>
                        </div>

                        <div className="mb-8 flex float-right self-end select-none">
                            <a href="#" className="font-semibold underline text-[0.75rem]">
                                Quên mật khẩu
                            </a>
                        </div>

                        <div className="mb-4 select-none">
                            <span>
                                Bạn chưa có tài khoản?
                                <a href="#" className="ml-2 text-Red underline">
                                    Đăng ký
                                </a>
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default Login;