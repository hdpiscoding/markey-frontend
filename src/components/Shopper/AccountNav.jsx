import React, {useState} from 'react';
import { FaRegUser } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { BsBell } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import ConfirmModal from "../General/ConfirmModal";
import useLocalStorage from "../General/useLocalStorage";

const AccountNav = (props) => {
    const navigate = useNavigate();
    const tokenStorage = useLocalStorage('token');
    const roleStorage = useLocalStorage('role');
    const authStorage = useLocalStorage('auth');

    const handleLogout = () => {
        // Remove token from localStorage
        tokenStorage.remove();
        roleStorage.remove();
        authStorage.remove();
        navigate("/login",{ replace: true });
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
                <FaRegUser className="w-5 h-5"/>

                <div>
                    <span className="font-semibold text-lg">
                        Tài khoản của tôi
                    </span>
                </div>

            </div>

            <div className="flex flex-col ml-12 gap-2">
                <Link to="/shopper/profile">
                    <div className="cursor-pointer select-none">
                        <span className={`${props.currentPage === 1 ? "text-Blue" : "text-Dark_gray"}`}>
                            Hồ sơ
                        </span>
                    </div>
                </Link>

                <Link to="/shopper/address">
                    <div className="cursor-pointer select-none">
                        <span className={`${props.currentPage === 2 ? "text-Blue" : "text-Dark_gray"}`}>
                            Địa chỉ
                        </span>
                    </div>
                </Link>

                <Link to="/shopper/change-password">
                    <div className="cursor-pointer select-none">
                        <span className={`${props.currentPage === 3 ? "text-Blue" : "text-Dark_gray"}`}>
                            Đổi mật khẩu
                        </span>
                    </div>
                </Link>

            </div>

            <div className="flex gap-4 items-center mb-2">
                <TiDocumentText className={props.currentPage === 4 ? "w-5 h-5 text-Blue" : "w-5 h-5 text-Black"}/>

                <Link to="/shopper/order">
                    <div className="select-none cursor-pointer">
                        <span
                            className={`${props.currentPage === 4 ? "font-semibold text-lg text-Blue" : "font-semibold text-lg text-Black"}`}>
                            Đơn mua
                        </span>
                    </div>
                </Link>

            </div>

            <div className="flex gap-4 items-center mb-2">
                <BsBell className={props.currentPage === 5 ? "w-5 h-5 text-Blue" : "w-5 h-5 text-Black"}/>

                <Link to="/shopper/notification">
                    <div className="select-none cursor-pointer">
                        <span
                            className={`${props.currentPage === 5 ? "font-semibold text-lg text-Blue" : "font-semibold text-lg text-Black"}`}>
                            Thông báo
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

            <ConfirmModal isOpen={isModalOpen} onCancel={closeModal} onConfirm={handleLogout} title="Xác nhận đăng xuất" message="Bạn có chắc muốn đăng xuất khỏi hệ thống?"/>
        </nav>
    );
}

export default AccountNav;