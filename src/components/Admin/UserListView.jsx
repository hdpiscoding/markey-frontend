import React, {useState} from 'react';
import ConfirmModal from "../General/ConfirmModal";
import avatar  from "../../assets/avatar_holder.svg";
import {Link} from "react-router-dom";


const UserListView = (props) => {
    // set up modal
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    // end set up modal

    const handleLock = (event) => {
        // Call API to lock/unlock the user to set isActice = !isActive


        // Callback to recall the API to get the updated list of users
        props.onUpdateData();
        closeModal();
    }

    const handleView = () => {
        if (props.role === "shopper") {
            // Redirect to the shopper's details
        }
        else {
            // Redirect to the salesman's details
        }
    }

    return (
        <div className="col-start-3 bg-White shadow flex items-center justify-between p-2 h-fit rounded-md">
            <div className="flex items-center gap-5">
                <div className="rounded-[50%]">
                    {props.img ? <img src={props.img} alt="avatar" className="object-cover"/> :
                        <img src={avatar} alt="avatar" className="object-cover w-16 h-16"/>}
                </div>

                <Link to={`/admin/${props.role}/${props.id}`}>
                    <div className="cursor-pointer" onClick={handleView}>
                        <span className="font-semibold text-lg hover:text-Blue">
                            {props.email ?? "Nguyễn Văn A"}
                        </span>
                    </div>
                </Link>

            </div>

            <div className="flex items-center justify-center gap-4">
                <button
                    className={`${props.isLocked ? "bg-Blue hover:bg-Dark_blue" : "bg-Red hover:bg-Dark_red"} rounded-md text-center px-6 py-1.5`} onClick={openModal}>
                    <span className="text-White">
                        {props.isLocked ? "Mở khóa" : "Khóa"}
                    </span>
                </button>
            </div>

            <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleLock} title={`${props.role === "shopper" ? `Xác nhận ${props.isLocked ? "mở khóa" : "khóa"} khách hàng` : `Xác nhận ${props.isLocked ? "mở khóa" : "khóa"} người bán`}`} message={`${props.role === "shopper" ? `Bạn có chắc muốn ${props.isLocked ? "mở khóa" : "khóa"} tài khoản khách hàng này?` : `Bạn có chắc muốn ${props.isLocked ? "mở khóa" : "khóa"} tài khoản người bán này?`}`}/>
        </div>
    );
};

export default UserListView;