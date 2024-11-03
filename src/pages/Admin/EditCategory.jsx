import React, {useEffect, useState} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import AdminNav from "../../components/Admin/AdminNav";
import ConfirmModal from "../../components/General/ConfirmModal";
import Footer from "../../components/General/Footer";
import {MdAddPhotoAlternate} from "react-icons/md";
import {instance} from "../../AxiosConfig";
import {useParams} from "react-router-dom";

const EditCategory = () => {
    const {categoryId} = useParams();
    // Store API data (image URL)
    const [image, setImage] = useState(null);

    // Store selected image
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];

        if (file) {
            // Kiểm tra định dạng tập tin
            if (!allowedFormats.includes(file.type)) {
                setError('Chỉ chấp nhận định dạng .JPEG, .JPG và .PNG');
                setSelectedImage(null);
                return;
            }

            // Kiểm tra dung lượng tối đa 1MB (1MB = 1024 * 1024 bytes)
            if (file.size > 1024 * 1024) {
                setError('Dung lượng tập tin tối đa là 1MB');
                setSelectedImage(null);
                return;
            }

            setError('');
            setSelectedImage(file);
        }
    };

    const [fieldErrors, setFieldErrors] = useState({});
    const [formFields, setFormFields] = useState({
        name: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get(`http://152.42.232.101:5050/api/v1/shopping-service/category/${categoryId}`);
                setFormFields({name: response.data.data.name});
                setImage(response.data.data.picture);
                console.log(response.data.data.picture);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Các trường khác
        setFormFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
        setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));

    };

    const Validate = () => {
        let newFieldErrors = {};
        let imageErrorMessages = [];
        let isValid = true;

        if (formFields.name.trim() === '') {
            newFieldErrors.name = "Vui lòng nhập tên danh mục.";
            isValid = false;
        }

        if (!selectedImage) {
            imageErrorMessages.push('Vui lòng chọn ảnh.');
            isValid = false;
        }

        setFieldErrors(newFieldErrors);
        return isValid;
    };

    // set up modal
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    // end set up modal

    const handleUpdate = () => {
        if (Object.keys(fieldErrors).length <= 0) {
            // Call API here

            closeModal();
        }
    }

    const handleValidate = () => {
        const isValid = Validate();
        if (isValid) {
            openModal();
        }
    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Quản trị viên"/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <AdminNav currentPage={2}/>
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[2rem] font-semibold">
                                        Chỉnh sửa danh mục
                                    </span>
                                </div>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4">
                            <div
                                className="rounded-[50%] bg-Gray h-[120px] w-[120px] flex items-center justify-center">
                                {selectedImage ? (
                                    <img src={URL.createObjectURL(selectedImage)} alt="Selected"
                                         className="w-full h-full rounded-[50%] object-cover"/>
                                ) : (image
                                        ?
                                        <img src={image} alt="img" className="w-full h-full rounded-[50%] object-cover"/>
                                        :
                                        <MdAddPhotoAlternate
                                            className="h-16 w-16 text-Light_gray"/>
                                )}
                            </div>

                            <div>
                            <label htmlFor="image-upload"
                                       className="mt-4 select-none cursor-pointer bg-Blue text-white py-1 px-3 rounded hover:bg-Dark_blue">
                                    Thêm Ảnh
                                </label>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>

                            <div className="flex flex-col items-center justify-center relative">
                                <span className="text-Dark_gray text-sm">
                                    Dung lượng tối đa: 1MB
                                </span>

                                <span className="text-Dark_gray text-sm">
                                    Định dạng: .JPEG, .PNG, .JPG
                                </span>

                                {error && <p className="text-red-500 mt-2">{error}</p>}
                                {fieldErrors.image && <p className="text-Red text-sm left-0 h-4 absolute">{fieldErrors.image}</p>}
                            </div>
                        </div>

                        <table className="w-[80%]">
                            <tbody>
                            <tr>
                                <td className="py-5">*Tên danh mục:</td>
                                <td className="py-5 relative">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formFields.name}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.name ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.name && (
                                        <p className="text-Red text-sm h-4 absolute left-0">{fieldErrors.name}</p>
                                    )}

                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="flex items-center justify-center select-none">
                            <button className="bg-Blue text-white py-1 px-8 rounded hover:bg-Dark_blue text-center"
                                    onClick={handleValidate}>
                                Cập nhật
                            </button>
                        </div>
                    </div>

                    <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleUpdate} title={"Xác nhận cập nhật danh mục"} message={"Bạn có chắc muốn cập nhật danh mục này?"}/>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default EditCategory;