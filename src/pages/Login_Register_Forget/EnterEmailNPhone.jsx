import React from 'react';
import {IoArrowBack} from "react-icons/io5";
import RFHeader from "../../components/Login_Register_Forget/RFHeader";

const EnterEmailNPhone = () => {
    return (
        <div>
            <RFHeader title="Đặt lại mật khẩu"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <div className="bg-White shadow rounded-l h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
                    <div className="flex items-center justify-items-center ml-8 mt-4 h-auto w-full">
                        <div className="cursor-pointer">
                            <IoArrowBack className="h-5 w-5 object-cover"/>
                        </div>

                        <div className="grow text-center">
                            <span className="font-sans font-semibold text-Black text-xl">
                                Đặt lại mật khẩu
                            </span>
                        </div>

                        <div className="w-[3.25rem]"></div>
                        {/* Empty <div></div> for spacing */}
                    </div>

                    <div className="flex flex-col items-center justify-items-center h-auto w-[22rem]">
                        <div className="my-10">
                            <input
                                className="border-2 w-[22rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 focus:border-Blue"
                                placeholder="Số điện thoại/Email"/>
                        </div>

                        <div className="mb-4 bg-Blue hover:bg-Dark_blue rounded-sm">
                            <button
                                className="w-[22rem] rounded-sm font-sans flex flex-col items-center justify-items-center">
                                <span className="text-White my-1">
                                    Tiếp theo
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default EnterEmailNPhone;