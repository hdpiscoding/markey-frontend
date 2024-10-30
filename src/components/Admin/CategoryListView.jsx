import React, {useState} from "react";
import avatar from "../../assets/avatar_holder.svg";
import ConfirmModal from "../General/ConfirmModal";

const CategoryListView = (props) => {
    // set up modal
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    // end set up modal

    const handleEdit = () => {
        // Redirect to the edit page
    }

    const handleDelete = () => {
        props.onDelete(props.id);
        closeModal();
    }

    return (
        <div className="col-start-3 bg-White shadow flex items-center justify-between p-2 h-fit rounded-md">
            <div className="flex items-center gap-5">
                <div className="rounded-[50%]">
                    {props.img ? <img src={props.img} alt="avatar" className="object-cover"/> :
                        <img src={avatar} alt="avatar" className="object-cover w-16 h-16"/>}
                </div>

                <div>
                    <span className="font-semibold text-lg">
                        {props.name ?? "Nguyễn Văn A"}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4">
                <button className="bg-Blue hover:bg-Dark_blue rounded-md text-center px-6 py-1.5" onClick={handleEdit}>
                    <span className="text-White">
                        Sửa
                    </span>
                </button>

                <button className="bg-Red hover:bg-Dark_red rounded-md text-center px-6 py-1.5" onClick={openModal}>
                    <span className="text-White">
                        Xóa
                    </span>
                </button>
            </div>

            <ConfirmModal isOpen={isModalOpen} onCancel={closeModal} onConfirm={handleDelete}
                          title="Xác nhận duyệt người bán" message="Bạn có chắc muốn duyệt người bán này?"/>
        </div>
    );
};

export default CategoryListView;