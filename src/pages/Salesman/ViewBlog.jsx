import React, {useEffect, useState} from 'react';
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import Footer from "../../components/General/Footer";
import {Link, useNavigate, useParams} from "react-router-dom";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";
import ConfirmModal from "../../components/General/ConfirmModal";
import {toast} from "react-toastify";

const ViewBlog = () => {
    const navigate = useNavigate();
    const {blogId} = useParams();
    const [blog, setBlog] = useState();
    const [category, setCategory] = useState();

    const [loading, setLoading] = useState(false);
    // set up loading modal
    const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);

    const openLoadingModal = () => {
        setLoadingModalOpen(true);
    };

    const closeLoadingModal = () => {
        setLoadingModalOpen(false);
    };
    // end set up loading modal

    // set up modal
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    // end set up modal

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                const response = await instance.get(`v1/shopping-service/post/${blogId}`);
                setBlog(await response.data.data);
            }
            catch (error) {
                setLoading(false);
                closeLoadingModal();
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`v1/shopping-service/category/${blog?.categoryId}`);
                setCategory(await response.data.data.name);
            }
            catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [blog]);

    const handleDelete = async () => {
        try {
            setLoading(true);
            openLoadingModal();
            await instance.delete(`v1/shopping-service/post/${blogId}`);
            toast.success("Xóa bài viết thành công!");
        }
        catch (error) {
            setLoading(false);
            closeLoadingModal();
            console.log(error);
        }
        finally {
            setLoading(false);
            closeLoadingModal();
            navigate('/salesman/all-blogs');
        }
    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={4}/>
                    </div>

                    <div className="col-start-3 flex flex-col px-4 py-3 bg-White select-none gap-5">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[2rem] font-semibold">
                                        Chi tiết bài viết
                                    </span>
                                </div>

                                <div className="flex items-center justify-center gap-10">
                                    <Link to={`/salesman/edit-blog/${blogId}`}>
                                        <span className="font-semibold text-Blue cursor-pointer hover:text-Dark_blue">
                                            Sửa
                                        </span>
                                    </Link>


                                    <span className="font-semibold text-Red cursor-pointer hover:text-Dark_red" onClick={openModal}>
                                        Xóa
                                    </span>
                                </div>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <table className="w-[80%]">
                            <tbody>
                            <tr>
                                <td className="py-3">*Tiêu đề:</td>
                                <td className="py-3">
                                    <span className="font-semibold">
                                        {blog?.title}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">*Danh mục:</td>
                                <td className="py-3">
                                    <span className="font-semibold">
                                        {category}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">*Nội dung:</td>
                                <td className="py-3 w-[80%]">
                                    <p className="whitespace-pre-line">
                                        {blog?.content}
                                    </p>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">*Ảnh bìa:</td>
                                <td className="py-3">
                                    <div className="flex items-center gap-5">
                                        <div className={`flex items-center justify-center gap-2 h-[135px] w-[276px] bg-Light_gray rounded-md`}
                                        >
                                            <img
                                                src={blog?.thumbnail}
                                                alt={`selected`}
                                                className="h-[135px] w-[276px] object-cover rounded-md"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleDelete} title={"Xác nhận xóa bài viết"} message={"Bạn có chắc muốn xóa bài viết này?"}/>
                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default ViewBlog;