import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";

const ForgetFinished = () => {
    return (
        <div>
            <RFHeader title="Đặt lại mật khẩu"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <div
                    className="bg-White shadow rounded-lg h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
                    <div className="mt-4 mb-6">
                        <span className="font-sans font-semibold text-center text-Black text-xl">
                            Bạn đã thiết lập lại mật khẩu thành công
                        </span>
                    </div>

                    <div className="mb-12">
                        <span className="font-sans text-center text-Black text-sm">
                            Hãy tiếp tục tận hưởng trải nghiệm mua sắm của bạn!
                        </span>
                    </div>

                    <div className="mb-4 bg-Blue hover:bg-Dark_blue rounded-sm">
                        <button
                            className="w-[22rem] rounded-sm font-sans flex flex-col items-center justify-items-center">
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

export default ForgetFinished;