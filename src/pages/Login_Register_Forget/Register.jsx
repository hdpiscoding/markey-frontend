import React from "react";

const Register = () => {
    return (
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

            <div className="flex flex-col rounded-2xl bg-White w-[28rem] justify-center items-center col-start-3">
                <div className="mt-4 select-none">
                    <span className="font-sans text-Black font-semibold text-2xl">
                        Đăng ký
                    </span>
                </div>

                <div className="my-8">
                    <input className="border-2 w-[20rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 focus:border-Blue"
                           placeholder="Số điện thoại"/>
                </div>

                <div className="mb-8">
                    <input className="border-2 w-[20rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 focus:border-Blue"
                           placeholder="Email"/>
                </div>

                <div className="mb-8 h-8 bg-Blue flex flex-col items-center justify-center rounded-sm hover:bg-Dark_blue cursor-pointer">
                    <button className="rounded-sm w-[20rem]">
                        <div>
                            <span className="text-White select-none">
                                Tiếp theo
                            </span>
                        </div>
                    </button>
                </div>

                <div className="mb-4 select-none">
                    <span>
                        Bạn đã có tài khoản?
                        <a href="#" className="ml-2 text-Red underline">
                            Đăng nhập
                        </a>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Register;