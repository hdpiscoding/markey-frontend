import React, {useEffect, useState} from 'react';
import ConfirmModal from "../General/ConfirmModal";
import {Link} from "react-router-dom";
import {instance} from "../../AxiosConfig";
import {FiUser} from "react-icons/fi";
import {toast} from "react-toastify";


const UserListView = (props) => {
    // set up modal
    const [isModalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState(null);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    // end set up modal

    const handleLock = async () => {
        // Call API to lock/unlock the user to set isActice = !isActive
        if (!props.isLocked) {
            try {
                await instance.put(`v1/user-service/admin/block-${props.role}/${props.id}`);
                toast.success(`Khóa ${props.role === "shopper" ? "tài khoản khách hàng" : "tài khoản người bán"} thành công!`);
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                await instance.put(`v1/user-service/admin/unblock-${props.role}/${props.id}`);
                toast.success(`Mở khóa ${props.role === "shopper" ? "khách hàng" : "người bán"} thành công!`);
            }
            catch (error) {
                console.log(error);
            }
        }

        // Callback to recall the API to get the updated list of users
        props.onUpdateData();
        closeModal();
    }

    useEffect(() => {
        const fetchData = async () => {
            let url = "";
            if (props.role === "shopper") {
                url = `v1/user-service/shopper/${props.id}`;
            }
            else {
                url = `v1/shopping-service/shop/by-salesman/${props.id}`;
            }

            try {
                const response = await instance.get(url);
                setImage(response.data.data.profilePicture);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="col-start-3 bg-White shadow flex items-center justify-between p-2 h-fit rounded-md">
            <div className="flex items-center gap-5">
                <div className="rounded-[50%]">
                    {image ? <img src={image} alt="avatar" className="object-cover w-16 h-16 rounded-[50%]"/> :
                        <div className="flex items-center justify-center w-16 h-16 rounded-[50%] bg-Light_gray">
                            <FiUser className="text-Dark_gray h-9 w-9"/>
                        </div>}
                </div>

                <Link to={`/admin/${props.role}/${props.id}`}>
                    <div className="cursor-pointer">
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