import React from "react";
import {TiDocumentText} from "react-icons/ti";
import {MdOutlineLogout} from "react-icons/md";
import { BsBoxSeam, BsPostcard } from "react-icons/bs";
import { PiStorefrontLight } from "react-icons/pi";
import { IoAnalytics } from "react-icons/io5";


const SalesmanNav = (props) => {
    return (
        <nav className="flex flex-col gap-2">
            <div className="flex gap-4 items-center">
                <TiDocumentText className="w-5 h-5"/>

                <div>
                    <span className="font-semibold text-lg">
                        Quản lý đơn hàng
                    </span>
                </div>

            </div>

            <div className="flex flex-col ml-12 gap-2">
                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 1 ? "text-Blue" : "text-Dark_gray"}`}>
                        Tất cả đơn hàng
                    </span>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <BsBoxSeam className="w-5 h-5"/>

                <div>
                    <span className="font-semibold text-lg">
                        Quản lý sản phẩm
                    </span>
                </div>

            </div>

            <div className="flex flex-col ml-12 gap-2">
                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 2 ? "text-Blue" : "text-Dark_gray"}`}>
                        Tất cả sản phẩm
                    </span>
                </div>

                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 3 ? "text-Blue" : "text-Dark_gray"}`}>
                        Thêm sản phẩm
                    </span>
                </div>

                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 4 ? "text-Blue" : "text-Dark_gray"}`}>
                        Voucher
                    </span>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <BsPostcard className="w-5 h-5"/>

                <div>
                    <span className="font-semibold text-lg">
                        Quản lý blog
                    </span>
                </div>

            </div>

            <div className="flex flex-col ml-12 gap-2">
                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 5 ? "text-Blue" : "text-Dark_gray"}`}>
                        Tất cả blog
                    </span>
                </div>

                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 6 ? "text-Blue" : "text-Dark_gray"}`}>
                        Thêm blog
                    </span>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <PiStorefrontLight className="w-5 h-5"/>

                <div>
                    <span className="font-semibold text-lg">
                        Quản lý Shop
                    </span>
                </div>

            </div>

            <div className="flex flex-col ml-12 gap-2">
                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 7 ? "text-Blue" : "text-Dark_gray"}`}>
                        Thông tin Shop
                    </span>
                </div>

                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 8 ? "text-Blue" : "text-Dark_gray"}`}>
                        Đổi mật khẩu
                    </span>
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <IoAnalytics className="w-5 h-5"/>

                <div>
                    <span className="font-semibold text-lg">
                        Thống kê
                    </span>
                </div>

            </div>

            <div className="flex flex-col ml-12 gap-2">
                <div className="cursor-pointer select-none">
                    <span className={`${props.currentPage === 9 ? "text-Blue" : "text-Dark_gray"}`}>
                        Thống kê doanh thu
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

export default SalesmanNav;