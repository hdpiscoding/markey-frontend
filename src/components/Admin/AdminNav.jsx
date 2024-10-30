import React from 'react';
import { TfiMenuAlt } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa";
import {BsBoxSeam, BsPostcard} from "react-icons/bs";
import {PiStorefrontLight} from "react-icons/pi";
import {MdOutlineLogout} from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";

const AdminNav = (props) => {
    return (
        <nav className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
                <AiOutlineHome className="w-5 h-5"/>

                <div>
                    <span className="font-semibold text-lg">
                        Home
                    </span>
                </div>

            </div>

            <div className="flex flex-col ml-12 gap-2">
                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 1 ? "text-Blue" : "text-Dark_gray"}`}>
                        Duyệt người bán
                    </span>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <TfiMenuAlt className="w-5 h-5"/>

                <div>
                    <span className="font-semibold text-lg">
                        Quản lý danh mục
                    </span>
                </div>

            </div>

            <div className="flex flex-col ml-12 gap-2">
                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 2 ? "text-Blue" : "text-Dark_gray"}`}>
                        Tất cả danh mục
                    </span>
                </div>

                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 3 ? "text-Blue" : "text-Dark_gray"}`}>
                        Thêm danh mục
                    </span>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <FaRegUser className="w-5 h-5"/>

                <div>
                    <span className="font-semibold text-lg">
                        Quản lý tài khoản
                    </span>
                </div>

            </div>

            <div className="flex flex-col ml-12 gap-2">
                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 4 ? "text-Blue" : "text-Dark_gray"}`}>
                        Khách hàng
                    </span>
                </div>

                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 5 ? "text-Blue" : "text-Dark_gray"}`}>
                        Người bán
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
};

export default AdminNav;