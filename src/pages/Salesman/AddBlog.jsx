import React, {useState} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import {MdAddPhotoAlternate} from "react-icons/md";

const AddBlog = () => {
    const [selectedCategory, setSelectedCategory] = useState('default');
    const [image, setImage] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const [formFields, setFormFields] = useState({
        title: '',
        content: '',
    });

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
            setImage(file);
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

    const handleSubmit = () => {
        let newFieldErrors = {};
        let imageErrorMessages = [];

        if (selectedCategory === 'default') {
            newFieldErrors.category = "Vui lòng chọn danh mục.";
        }

        if (formFields.title.trim() === '') {
            newFieldErrors.title = "Tiêu đề không được để trống.";
        }

        if (formFields.content.trim() === '') {
            newFieldErrors.content = "Nội dung không được để trống.";
        }

        if (!image) {
            imageErrorMessages.push("Vui lòng chọn ảnh bìa.");
        }

        if (imageErrorMessages.length > 0) {
            newFieldErrors.images = imageErrorMessages.join(" ");
        }

        setFieldErrors(newFieldErrors);
    };

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Kênh người bán"/>

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
                                        <option value="1">Loại 1</option>
                                        <option value="2">Loại 2</option>
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
                                            <div className={`flex items-center justify-center gap-2 h-[135px] w-[276px] ${image ? 'border-Blue bg-Light_gray' : 'bg-Gray'} rounded-md`}
                                            >
                                                <label htmlFor={`file`} className="cursor-pointer">
                                                    {image ? (
                                                        <img
                                                            src={URL.createObjectURL(image)}
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
                                onClick={handleSubmit}
                            >
                                <span className="text-White">Đăng sản phẩm</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default AddBlog;