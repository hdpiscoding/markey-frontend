import React, {useEffect, useState} from 'react';
import Footer from "../../components/General/Footer";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import {MdAddPhotoAlternate} from "react-icons/md";
import ConfirmModal from "../../components/General/ConfirmModal";
import LoadingModal from "../../components/General/LoadingModal";
import {instance, mediaInstance} from "../../AxiosConfig";

const AddBlog = () => {
    const [selectedCategory, setSelectedCategory] = useState('default');
    const [selectedImage, setSelectedImage] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const [formFields, setFormFields] = useState({
        title: '',
        content: '',
    });
    const [categories, setCategories] = useState([]);

    // set up modal
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    // end set up modal

    // set up loading modal
    const [loading, setLoading] = useState(false);
    const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);

    const openLoadingModal = () => {
        setLoadingModalOpen(true);
    };

    const closeLoadingModal = () => {
        setLoadingModalOpen(false);
    };
    // end set up loading modal

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));

        setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const handleImageChange = (file) => {
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        const maxSize = 2 * 1024 * 1024;

        if (file && validTypes.includes(file.type) && file.size <= maxSize) {
            setSelectedImage(file);
            setFieldErrors(prevErrors => ({
                ...prevErrors,
                [`image`]: ""
            }));
        } else {
            const newErrors = { ...fieldErrors };
            if (file && !validTypes.includes(file.type)) {
                newErrors[`image`] = "Chỉ chấp nhận file JPEG, PNG, JPG.";
            } else if (file && file.size > maxSize) {
                newErrors[`image`] = "Dung lượng file phải nhỏ hơn 2MB.";
            }
            setFieldErrors(newErrors);
        }
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageChange(file);
        }
    };

    const Validate = () => {
        let newFieldErrors = {};
        let imageErrorMessages = [];
        let isValid = true;

        if (selectedCategory === 'default') {
            newFieldErrors.category = "Vui lòng chọn danh mục.";
            isValid = false;
        }

        if (formFields.title.trim() === '') {
            newFieldErrors.title = "Tiêu đề không được để trống.";
            isValid = false;
        }

        if (formFields.content.trim() === '') {
            newFieldErrors.content = "Nội dung không được để trống.";
            isValid = false;
        }

        if (!selectedImage) {
            imageErrorMessages.push("Vui lòng chọn ảnh bìa.");
            isValid = false;
        }

        if (imageErrorMessages.length > 0) {
            newFieldErrors.images = imageErrorMessages.join(" ");
            isValid = false;
        }

        setFieldErrors(newFieldErrors);
        return isValid;
    };

    const getImagesUrl = async () => {
        if (selectedImage) {
            try {
                const fileNameResponse = await mediaInstance.get("media-url");
                const fileName = fileNameResponse.data.data.fileName;

                const formData = new FormData();
                formData.append("file", selectedImage);

                const response = await mediaInstance.post(`upload-media/${fileName}`, formData);
                console.log(response.data.data.mediaUrl);
                return response.data.data.mediaUrl;
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const handleValidate = () => {
        const isValid = Validate();
        if (isValid) {
            openModal();
        }
    };

    const handleSubmit = async () => {
        closeModal();
        const pictureUrl = await getImagesUrl();
        if (Object.keys(fieldErrors).length <= 0) {
            try {
                setLoading(true);
                openLoadingModal();
                let data = {
                    title: formFields.title,
                    content: formFields.content,
                    categoryId: selectedCategory,
                    thumbnail: pictureUrl,
                    lang_type: "VN"
                }
                await instance.post('v1/shopping-service/post', data);
            }
            catch (error) {
                setLoading(false);
                closeLoadingModal();
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
                setFormFields({
                    title: '',
                    content: '',
                });
                setSelectedCategory('default');
                setSelectedImage(null);
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                // Call API to get all categories
                const response = await instance.get('v1/shopping-service/category');
                setCategories(await response.data.data);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
            }
        }

        fetchData();
    }, []);

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={5}/>
                    </div>

                    <div className="col-start-3 flex flex-col px-4 py-3 bg-White select-none gap-5">
                        <div className="flex flex-col">
                            <div>
                                <span className="text-[2rem] font-semibold">
                                    Thêm bài viết
                                </span>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <table className="w-[80%]">
                            <tbody>
                            <tr>
                                <td className="py-3">*Tiêu đề:</td>
                                <td className="py-3">
                                    <input
                                        type="text"
                                        name="title"
                                        value={formFields.title}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.title ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.title && (
                                        <p className="text-Red text-sm">{fieldErrors.title}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">*Danh mục:</td>
                                <td className="py-3">
                                    <select
                                        className={`w-[50%] h-8 border ${fieldErrors.category ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                    >
                                        <option value={'default'} hidden disabled>Tên danh mục</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                    {fieldErrors.category && (
                                        <p className="text-Red text-sm">{fieldErrors.category}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">*Nội dung:</td>
                                <td className="py-3">
                                        <textarea
                                            name="content"
                                            value={formFields.content}
                                            onChange={handleInputChange}
                                            className={`w-full h-40 resize-none border ${fieldErrors.content ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                        />
                                    {fieldErrors.content && (
                                        <p className="text-Red text-sm">{fieldErrors.content}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">*Ảnh bìa:</td>
                                <td className="py-3">
                                    <div className="flex items-center gap-5">
                                            <div className={`flex items-center justify-center gap-2 h-[135px] w-[276px] ${selectedImage ? 'border-Blue bg-Light_gray' : 'bg-Gray'} rounded-md`}
                                            >
                                                <label htmlFor={`file`} className="cursor-pointer">
                                                    {selectedImage ? (
                                                        <img
                                                            src={URL.createObjectURL(selectedImage)}
                                                            alt={`selected`}
                                                            className="h-[135px] w-[276px] object-cover rounded-md"
                                                        />
                                                    ) : (
                                                        <MdAddPhotoAlternate
                                                            className="h-[80px] w-[80px] text-Light_gray"/>
                                                    )}
                                                </label>
                                                <input
                                                    type="file"
                                                    accept={".jpg, .jpeg, .png"}
                                                    id={`file`}
                                                    className="hidden"
                                                    onChange={(e) => handleFileInputChange(e)}
                                                />
                                            </div>
                                    </div>
                                    {fieldErrors.images && (
                                        <p className="text-Red text-sm">{fieldErrors.images}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="flex items-center justify-center">
                            <button
                                className="bg-Blue hover:bg-Dark_blue rounded-md py-1 px-10"
                                onClick={handleValidate}
                            >
                                <span className="text-White">Tạo bài viết</span>
                            </button>
                        </div>
                    </div>

                    <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleSubmit} title={"Xác nhận thêm bài viết"} message={"Bạn có chắc muốn thêm bài viết này?"}/>
                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default AddBlog;