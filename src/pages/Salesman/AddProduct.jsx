import React, {useEffect, useState} from 'react';
import Footer from "../../components/General/Footer";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import { MdAddPhotoAlternate } from "react-icons/md";
import ConfirmModal from "../../components/General/ConfirmModal";
import LoadingModal from "../../components/General/LoadingModal";
import {instance, mediaInstance} from "../../AxiosConfig";
import {useNavigate} from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = React.useState('default');
    const [selectedImages, setSelectedImages] = React.useState([null, null, null]);
    const [fieldErrors, setFieldErrors] = React.useState({});
    const [formFields, setFormFields] = React.useState({
        productName: '',
        price: '',
        stock: '',
        description: '',
    });
    const [categories, setCategories] = React.useState([]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const positiveIntegerRegex = /^\d*$/;

        if (name === 'price' || name === 'stock') {
            if (positiveIntegerRegex.test(value) || value === '') {
                setFormFields((prevFields) => ({
                    ...prevFields,
                    [name]: value,
                }));
                setFieldErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: '',
                }));
            }
        } else {
            setFormFields((prevFields) => ({
                ...prevFields,
                [name]: value,
            }));
            setFieldErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    const handleImageChange = (index, file) => {
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        const maxSize = 2 * 1024 * 1024;

        if (file && validTypes.includes(file.type) && file.size <= maxSize) {
            const newImages = [...selectedImages];
            newImages[index] = file;
            setSelectedImages(newImages);
            setFieldErrors(prevErrors => ({
                ...prevErrors,
                [`image-${index}`]: ""
            }));
        } else {
            const newErrors = { ...fieldErrors };
            if (file && !validTypes.includes(file.type)) {
                newErrors[`image-${index}`] = "Chỉ chấp nhận file JPEG, PNG, JPG.";
            } else if (file && file.size > maxSize) {
                newErrors[`image-${index}`] = "Dung lượng file phải nhỏ hơn 2MB.";
            }
            setFieldErrors(newErrors);
        }
    };

    const handleFileInputChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            handleImageChange(index, file);
        }
    };

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

    const Validate = () => {
        let newFieldErrors = {};
        let imageErrorMessages = [];
        let isValid = true;

        if (selectedCategory === 'default') {
            newFieldErrors.category = "Vui lòng chọn danh mục.";
            isValid = false;
        }

        if (formFields.productName.trim() === '') {
            newFieldErrors.productName = "Tên sản phẩm không được để trống.";
            isValid = false;
        }
        if (formFields.price.trim() === '') {
            newFieldErrors.price = "Giá không được để trống.";
            isValid = false;
        } else if (!/^[1-9]\d*$/.test(formFields.price)) {
            newFieldErrors.price = "Giá phải là số nguyên dương.";
            isValid = false;
        }
        if (formFields.stock.trim() === '') {
            newFieldErrors.stock = "Tồn kho không được để trống.";
            isValid = false;
        } else if (!/^[1-9]\d*$/.test(formFields.stock)) {
            newFieldErrors.stock = "Tồn kho phải là số nguyên dương.";
            isValid = false;
        }
        if (formFields.description.trim() === '') {
            newFieldErrors.description = "Mô tả sản phẩm không được để trống.";
            isValid = false;
        }

        const selectedImagesCount = selectedImages.filter(img => img).length;
        if (selectedImagesCount < 3) {
            imageErrorMessages.push("Vui lòng chọn đủ 3 ảnh.");
            isValid = false;
        }

        selectedImages.forEach((img, index) => {
            if (fieldErrors[`image-${index}`]) {
                imageErrorMessages.push(fieldErrors[`image-${index}`]);
                isValid = false;
            }
        });

        if (imageErrorMessages.length > 0) {
            newFieldErrors.images = imageErrorMessages.join(" ");
            isValid = false;
        }

        setFieldErrors(newFieldErrors);
        return isValid;
    };

    const handleValidate = () => {
        const isValid = Validate();
        if (isValid) {
            openModal();
        }
    };

    const getImagesUrl = async () => {
        if (selectedImages.length > 0) {
            const imageUrls = [];
            for (let i = 0; i < selectedImages.length; i++) {
                try {
                    const fileNameResponse = await mediaInstance.get("media-url");
                    const fileName = fileNameResponse.data.data.fileName;

                    const formData = new FormData();
                    formData.append("file", selectedImages[i]);

                    const response = await mediaInstance.post(`upload-media/${fileName}`, formData);
                    imageUrls.push(response.data.data.mediaUrl);
                } catch (error) {
                    console.log(error);
                }
            }

            return imageUrls;
        }
    }

    const handleSubmit = async () => {
        closeModal();
        const imageUrls = await getImagesUrl();
        if (Object.keys(fieldErrors).length <= 0) {
            try {
                setLoading(true);
                openLoadingModal();
                let data = {
                    name: formFields.productName,
                    description: formFields.description,
                    price: parseInt(formFields.price),
                    quantity: parseInt(formFields.stock),
                    picture: imageUrls,
                    categoryId: selectedCategory
                }
                const response = await instance.post('v1/shopping-service/product', data);
            }
            catch (error) {
                setLoading(false);
                closeLoadingModal();
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
                navigate('/salesman/all-products');
            }
        }
    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={3}/>
                    </div>

                    <div className="col-start-3 flex flex-col px-4 py-3 bg-White select-none gap-5">
                        <div className="flex flex-col">
                            <div>
                                <span className="text-[2rem] font-semibold">
                                    Thêm sản phẩm
                                </span>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <table className="w-[80%]">
                            <tbody>
                            <tr>
                                <td className="py-4">*Tên sản phẩm:</td>
                                <td className="py-4 relative">
                                    <input
                                        type="text"
                                        name="productName"
                                        value={formFields.productName}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.productName ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.productName && (
                                        <p className="text-Red text-sm absolute left-0">{fieldErrors.productName}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-4">*Danh mục:</td>
                                <td className="py-4 relative">
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
                                        <p className="text-Red text-sm absolute left-0">{fieldErrors.category}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-4">*Giá:</td>
                                <td className="py-4 relative">
                                    <input
                                        type="text"
                                        name="price"
                                        value={formFields.price}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.price ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.price && (
                                        <p className="text-Red text-sm absolute left-0">{fieldErrors.price}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-4">*Tồn kho:</td>
                                <td className="py-4 relative">
                                    <input
                                        type="text"
                                        name="stock"
                                        value={formFields.stock}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.stock ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.stock && (
                                        <p className="text-Red text-sm absolute left-0">{fieldErrors.stock}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-4">*Mô tả sản phẩm:</td>
                                <td className="py-4 relative">
                                        <textarea
                                            name="description"
                                            value={formFields.description}
                                            onChange={handleInputChange}
                                            className={`w-full h-20 resize-none border ${fieldErrors.description ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                        />
                                    {fieldErrors.description && (
                                        <p className="text-Red text-sm absolute left-0">{fieldErrors.description}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-4">*Hình ảnh:</td>
                                <td className="py-4 relative">
                                    <div className="flex items-center gap-5">
                                        {[0, 1, 2].map((index) => (
                                            <div
                                                key={index}
                                                className={`flex items-center justify-center gap-2 h-[120px] w-[120px] ${selectedImages[index] ? 'border-Blue' : 'bg-Gray'} rounded-md`}
                                            >
                                                <label htmlFor={`file-${index}`} className="cursor-pointer">
                                                    {selectedImages[index] ? (
                                                        <img
                                                            src={URL.createObjectURL(selectedImages[index])}
                                                            alt={`selected-${index}`}
                                                            className="h-[120px] w-[120px] object-cover rounded-md"
                                                        />
                                                    ) : (
                                                        <MdAddPhotoAlternate
                                                            className="h-[80px] w-[80px] text-Light_gray"/>
                                                    )}
                                                </label>
                                                <input
                                                    type="file"
                                                    accept={".jpg, .jpeg, .png"}
                                                    id={`file-${index}`}
                                                    className="hidden"
                                                    onChange={(e) => handleFileInputChange(e, index)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    {fieldErrors.images && (
                                        <p className="text-Red text-sm absolute left-0">{fieldErrors.images}</p>
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
                                <span className="text-White">Đăng sản phẩm</span>
                            </button>
                        </div>
                    </div>

                    <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleSubmit} title={"Xác nhận đăng sản phẩm"} message={"Bạn có chắc muốn đăng tải sản phẩm này?"}/>
                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>
            </main>

            <Footer/>
        </div>
    );
};


export default AddProduct;