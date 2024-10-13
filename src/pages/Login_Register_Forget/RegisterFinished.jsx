import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";

const RegisterFinished = () => {
    return (
        <div>
            <RFHeader title="Đăng ký"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <div className="bg-White shadow rounded-lg h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
                    <div className="my-4 h-auto w-full text-center">
                        <span className="font-sans font-semibold text-Black text-xl">
                            Chào mừng bạn đến với
                        </span>
                    </div>

                    <div>
                        <img src="/Markey_blue_vertical.png" alt="Markey" className="h-[7rem] w-[7rem] object-cover"/>
                    </div>

                    <div className="h-auto w-full text-center my-4">
                        <span className="font-sans text-Black text-sm">
                            Chúc bạn có những trải nghiệm mua sắm tuyệt vời nhất!
                        </span>
                    </div>

                    <div className="mb-4 bg-Blue hover:bg-Dark_blue rounded-sm">
                        <button className="w-[22rem] rounded-sm font-sans flex flex-col items-center justify-items-center">
                                <span className="text-White my-1">
                                    Trở về trang đăng nhập
                                </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterFinished;