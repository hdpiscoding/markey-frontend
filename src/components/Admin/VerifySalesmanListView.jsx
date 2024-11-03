import React, {useState} from "react";
import avatar  from "../../assets/avatar_holder.svg";
import ConfirmModal from "../General/ConfirmModal";
import {Link} from "react-router-dom";
import {instance} from "../../AxiosConfig";

const VerifySalesmanListView = (props) => {
    // set up modal
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    // end set up modal

    const handleApprove = async () => {
        // Call API to approve the salesman
        try {
            await instance.put(`v1/user-service/admin/approve-salesman/${props.id}`);
        }
        catch (error) {
            console.log(error);
        }

        props.onApprove();
        closeModal();
    }

    return (
        <div className="col-start-3 bg-White shadow flex items-center justify-between p-2 h-fit rounded-md">
            <div className="flex items-center gap-5">
                <div className="rounded-[50%]">
                    {props.img ? <img src={props.img} alt="avatar" className="object-cover"/> :
                        <img src={avatar} alt="avatar" className="object-cover w-16 h-16"/>}
                </div>

                <Link to={`/admin/verify-salesman/${props.id}`}>
                    <div className="cursor-pointer">
                        <span className="font-semibold text-lg hover:text-Blue">
                            {props.email ?? "Nguyễn Văn A"}
                        </span>
                    </div>
                </Link>

            </div>

            <div className="flex items-center justify-center gap-4">
                <button className="bg-Blue hover:bg-Dark_blue rounded-md text-center px-6 py-1.5" onClick={openModal}>
                    <span className="text-White">
                        Duyệt
                    </span>
                </button>
            </div>

            <ConfirmModal isOpen={isModalOpen} onCancel={closeModal} onConfirm={handleApprove} title="Xác nhận duyệt người bán" message="Bạn có chắc muốn duyệt người bán này?"/>
        </div>
    );
};

export default VerifySalesmanListView;