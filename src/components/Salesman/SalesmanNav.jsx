import React, {useState} from "react";
import {TiDocumentText} from "react-icons/ti";
import {MdOutlineLogout} from "react-icons/md";
import { BsBoxSeam, BsPostcard } from "react-icons/bs";
import { PiStorefrontLight } from "react-icons/pi";
import {Link, useNavigate} from "react-router-dom";
import ConfirmModal from "../General/ConfirmModal";
import useLocalStorage from "../General/useLocalStorage";


const SalesmanNav = (props) => {
    const navigate = useNavigate();
    const authStorage = useLocalStorage('auth');
    const tokenStorage = useLocalStorage('token');
    const roleStorage = useLocalStorage('role');

    const handleLogout = () => {
        // Remove token from localStorage
        tokenStorage.remove();
        roleStorage.remove();
        authStorage.remove();
        navigate("/login", { replace: true });
    }

    // set up modal
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    // end set up modal

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
                <Link to="/salesman">
                    <div className="cursor-pointer select-none">
                        <span className={`${props.currentPage === 1 ? "text-Blue" : "text-Dark_gray"}`}>
                            Tất cả đơn hàng
                        </span>
                    </div>
                </Link>

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
                <Link to="/salesman/all-products">
                    <div className="cursor-pointer select-none">
                        <span className={`${props.currentPage === 2 ? "text-Blue" : "text-Dark_gray"}`}>
                            Tất cả sản phẩm
                        </span>
                    </div>
                </Link>


                <Link to="/salesman/add-product">
                    <div className="cursor-pointer select-none">
                        <span className={`${props.currentPage === 3 ? "text-Blue" : "text-Dark_gray"}`}>
                            Thêm sản phẩm
                        </span>
                    </div>
                </Link>

            </div>

            <div className="flex gap-4 items-center">
                <BsPostcard className="w-5 h-5"/>

                <div>
                    <span className="font-semibold text-lg">
                        Quản lý bài viết
                    </span>
                </div>

            </div>

            <div className="flex flex-col ml-12 gap-2">
                <Link to="/salesman/all-blogs">
                    <div className="cursor-pointer select-none">
                        <span className={`${props.currentPage === 4 ? "text-Blue" : "text-Dark_gray"}`}>
                            Tất cả bài viết
                        </span>
                    </div>
                </Link>


                <Link to="/salesman/add-blog">
                    <div className="cursor-pointer select-none">
                        <span className={`${props.currentPage === 5 ? "text-Blue" : "text-Dark_gray"}`}>
                            Thêm bài viết
                        </span>
                    </div>
                </Link>

            </div>

            <div className="flex gap-4 items-center">
                <PiStorefrontLight className="w-5 h-5"/>

                <div>
                    <span className="font-semibold text-lg">
                        Quản lý cửa hàng
                    </span>
                </div>

            </div>

            <div className="flex flex-col ml-12 gap-2">
                <Link to="/salesman/profile">
                    <div className="cursor-pointer select-none">
                        <span className={`${props.currentPage === 6 ? "text-Blue" : "text-Dark_gray"}`}>
                            Thông tin người bán
                        </span>
                    </div>
                </Link>


                <Link to="/salesman/change-password">
                    <div className="cursor-pointer select-none">
                        <span className={`${props.currentPage === 7 ? "text-Blue" : "text-Dark_gray"}`}>
                            Đổi mật khẩu
                        </span>
                    </div>
                </Link>

            </div>

            <div className="border-t-2 w-full border-Black opacity-40"></div>

            <div className="flex gap-4 items-center mb-2">
                <MdOutlineLogout className="w-5 h-5 text-Red"/>

                <div className="select-none cursor-pointer">
                    <span className="font-semibold text-lg text-Red" onClick={openModal}>
                        Đăng xuất
                    </span>
                </div>
            </div>

            <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleLogout} title="Xác nhận đăng xuất" message="Bạn có chắc muốn đăng xuất khỏi hệ thống?"/>
        </nav>
    );
};

export default SalesmanNav;