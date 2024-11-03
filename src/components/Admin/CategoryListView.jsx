import React, {useState} from "react";
import avatar from "../../assets/avatar_holder.svg";
import ConfirmModal from "../General/ConfirmModal";
import {Link} from "react-router-dom";
import {instance} from "../../AxiosConfig";

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

    const handleDelete = async () => {
        // Call delete API here
        try {
            const response = await instance.delete(`v1/shopping-service/category/${props.id}`);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            closeModal();
            props.onDelete();
        }
    }

    return (
        <div className="col-start-3 bg-White shadow flex items-center justify-between p-2 h-fit rounded-md">
            <div className="flex items-center gap-5">
                <div className="rounded-[50%] border border-Light_gray">
                    {props.img ? <img src={props.img} alt="avatar" className="object-cover w-16 h-16 rounded-[50%]"/> :
                        <div className="w-16 h-16 bg-Light_gray rounded-[50%]"></div>}
                </div>

                <div>
                    <span className="font-semibold text-lg">
                        {props.name ?? "Nguyễn Văn A"}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-4">
                <Link to={`/admin/edit-category/${props.id}`}>
                    <button className="bg-Blue hover:bg-Dark_blue rounded-md text-center px-6 py-1.5">
                        <span className="text-White">
                            Sửa
                        </span>
                    </button>
                </Link>


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