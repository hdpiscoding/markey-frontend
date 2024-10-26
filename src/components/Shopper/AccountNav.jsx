import React from 'react';
import { FaRegUser } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { BsBell } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";

const AccountNav = (props) => {
    return (
        <nav className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
                <FaRegUser className="w-5 h-5"/>

                <div>
                    <span className="font-semibold text-lg">
                        Tài khoản của tôi
                    </span>
                </div>

            </div>

            <div className="flex flex-col ml-12 gap-2">
                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 1 ? "text-Blue" : "text-Dark_gray"}`}>
                        Hồ sơ
                    </span>
                </div>

                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 2 ? "text-Blue" : "text-Dark_gray"}`}>
                        Địa chỉ
                    </span>
                </div>

                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 3 ? "text-Blue" : "text-Dark_gray"}`}>
                        Đổi mật khẩu
                    </span>
                </div>
            </div>

            <div className="flex gap-4 items-center mb-2">
                <TiDocumentText className={props.currentPage === 4 ? "w-5 h-5 text-Blue" : "w-5 h-5 text-Black"}/>

                <div className="select-none cursor-pointer">
                    <span className={`${props.currentPage === 4 ? "font-semibold text-lg text-Blue" : "font-semibold text-lg text-Black"}`}>
                        Đơn mua
                    </span>
                </div>
            </div>

            <div className="flex gap-4 items-center mb-2">
                <BsBell className={props.currentPage === 5 ? "w-5 h-5 text-Blue" : "w-5 h-5 text-Black"}/>

                <div className="select-none cursor-pointer">
                    <span className={`${props.currentPage === 5 ? "font-semibold text-lg text-Blue" : "font-semibold text-lg text-Black"}`}>
                        Thông báo
                    </span>
                </div>
            </div>

            <div className="border-t-2 w-full border-Black opacity-40"></div>

            <div className="flex gap-4 items-center mb-2">
                <MdOutlineLogout className="w-5 h-5 text-Red"/>

                <div className="select-none cursor-pointer">
                    <span className="font-semibold text-lg text-Red">
                        Đăng xuất
                    </span>
                </div>
            </div>
        </nav>
    );
}

export default AccountNav;