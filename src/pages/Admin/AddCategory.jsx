import React, {useState} from 'react';
import ConfirmModal from "../../components/General/ConfirmModal";
import Footer from "../../components/General/Footer";
import AdminNav from "../../components/Admin/AdminNav";
import {MdAddPhotoAlternate} from "react-icons/md";
import {instance, mediaInstance}  from "../../AxiosConfig";
import LoadingModal from "../../components/General/LoadingModal";

const AddCategory = () => {
    const [categoryPicture, setCategoryPicture] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];

        if (file) {
            // Kiểm tra định dạng tập tin
            if (!allowedFormats.includes(file.type)) {
                setError('Chỉ chấp nhận định dạng .JPEG, .JPG và .PNG');
                setCategoryPicture(null);
                return;
            }

            // Kiểm tra dung lượng tối đa 1MB (1MB = 1024 * 1024 bytes)
            if (file.size > 1024 * 1024) {
                setError('Dung lượng tập tin tối đa là 1MB');
                setCategoryPicture(null);
                return;
            }

            setError('');
            setCategoryPicture(file);
        }
    };

    const [fieldErrors, setFieldErrors] = useState({});
    const [formFields, setFormFields] = useState({
        categoryName: '',
    });

    // set up loading modal
    const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);

    const openLoadingModal = () => {
        setLoadingModalOpen(true);
    };

    const closeLoadingModal = () => {
        setLoadingModalOpen(false);
    };
    // end set up loading modal

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

        if (formFields.categoryName.trim() === '') {
            newFieldErrors.categoryName = "Vui lòng nhập tên danh mục.";
            isValid = false;
        }

        if (!categoryPicture) {
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

    const getImagesUrl = async () => {
        if (categoryPicture) {
            try {
                const fileNameResponse = await mediaInstance.get("media-url");
                const fileName = fileNameResponse.data.data.fileName;

                const formData = new FormData();
                formData.append("file", categoryPicture);

                const response = await mediaInstance.post(`upload-media/${fileName}`, formData);
                console.log(response.data.data.mediaUrl);
                return response.data.data.mediaUrl;
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const handleUpdate = async () => {
        closeModal();
        const pictureUrl = await getImagesUrl();
        if (Object.keys(fieldErrors).length <= 0) {
            // Call API here
            let data = {
                name: formFields.categoryName,
                picture: pictureUrl
            }
            try {
                setLoading(true);
                openLoadingModal();
                const response = await instance.post('v1/shopping-service/category', data)
            }
            catch (error) {
                setLoading(false);
                closeLoadingModal();
                console.log(error);
            }
            finally {
                setFormFields({categoryName: ''});
                setCategoryPicture(null);
                setLoading(false);
                closeLoadingModal();
            }
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
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <AdminNav currentPage={3}/>
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[2rem] font-semibold">
                                        Thêm danh mục
                                    </span>
                                </div>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4">
                            <div
                                className="rounded-[50%] bg-Gray h-[120px] w-[120px] flex items-center justify-center">
                                {categoryPicture ? (
                                    <img src={URL.createObjectURL(categoryPicture)} alt="Selected"
                                         className="w-full h-full rounded-[50%] object-cover"/>
                                ) : (
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
                                        value={formFields.categoryName}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.categoryName ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.categoryName && (
                                        <p className="text-Red text-sm h-4 absolute left-0">{fieldErrors.categoryName}</p>
                                    )}

                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="flex items-center justify-center select-none">
                            <button className="bg-Blue text-white py-1 px-8 rounded hover:bg-Dark_blue text-center"
                                    onClick={handleValidate}>
                                Thêm danh mục
                            </button>
                        </div>
                    </div>

                    <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleUpdate} title={"Xác nhận thêm danh mục"} message={"Bạn có chắc muốn thêm danh mục này?"}/>
                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default AddCategory;