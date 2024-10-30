import React, {useEffect, useState} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import Footer from "../../components/General/Footer";
import product_1 from "../../assets/product_1.png";

const EditBlog = () => {
    const categories = [
        { id: 1, name: "Chăm sóc tóc" },
        { id: 2, name: "Chăm sóc da mặt" },
        { id: 3, name: "Trang điểm" },
        { id: 4, name: "Chăm sóc cơ thể" },
        { id: 5, name: "Chăm sóc da mắt" },
        { id: 6, name: "Chăm sóc da môi" },
    ];

    const blog = { id: 1, title: "5 bí quyết chăm sóc tóc khỏe mạnh",  category: "Chăm sóc cơ thể", content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.\n" +
            "\n" +
            "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.\n" +
            "\n" + "Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc," };

    const [selectedCategory, setSelectedCategory] = useState('default');
    const [image, setImage] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const [formFields, setFormFields] = useState({
        title: '',
        content: '',
    });

    useEffect(() => {
        setFormFields({
            title: blog.title || '',
            content: blog.content || '',
        });

        setSelectedCategory(blog.category || 'default');

        //image
    }, []);

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
                        <SalesmanNav currentPage={4}/>
                    </div>

                    <div className="col-start-3 flex flex-col px-4 py-3 bg-White select-none gap-5">
                        <div className="flex flex-col">
                            <div>
                                <span className="text-[2rem] font-semibold">
                                    Chỉnh sửa bài viết
                                </span>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <table className="w-full ">
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
                                            <option key={category.id} value={category.name}>{category.name}</option>
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
                                                    <img
                                                        src={product_1}
                                                        alt={`selected`}
                                                        className="h-[135px] w-[276px] object-cover rounded-md"
                                                    />
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
                                <span className="text-White">Cập nhật</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default EditBlog;