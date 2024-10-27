import React, {useEffect} from "react";
import SecondaryHeader from "../../components/General/SecondaryHeader";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import {MdAddPhotoAlternate} from "react-icons/md";
import Footer from "../../components/General/Footer";
import product_1 from "../../assets/product_1.png";
import product_2 from "../../assets/product_2.png";
import product_3 from "../../assets/product_3.png";

const EditProduct = () => {
    const product = {
        productName: "Mặt nạ dưỡng trắng",
        category: "Chăm sóc da mặt",
        price: "100000",
        stock: "100",
        description: "Mô tả"
    };

    const categories = [
        { id: 1, name: "Chăm sóc tóc" },
        { id: 2, name: "Chăm sóc da mặt" },
        { id: 3, name: "Trang điểm" },
        { id: 4, name: "Chăm sóc cơ thể" },
        { id: 5, name: "Chăm sóc da mắt" },
        { id: 6, name: "Chăm sóc da môi" },
    ];

    const [selectedCategory, setSelectedCategory] = React.useState('default');
    const [images, setImages] = React.useState([null, null, null]);
    const [fieldErrors, setFieldErrors] = React.useState({});
    const [formFields, setFormFields] = React.useState({
        productName: '',
        price: '',
        stock: '',
        description: '',
    });

    useEffect(() => {
        setFormFields({
            productName: product.productName || '',
            price: product.price || '',
            stock: product.stock || '',
            description: product.description || '',
        });

        setSelectedCategory(product.category || 'default');

    }, []);

    // // Lấy dữ liệu từ API khi component mount
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             // Giả sử đây là API bạn dùng để lấy dữ liệu sản phẩm
    //             const response = await fetch('/api/getProductDetails');
    //             const data = await response.json();
    //
    //             // Cập nhật state với dữ liệu từ API
    //             setFormFields({
    //                 productName: data.productName || '',
    //                 price: data.price || '',
    //                 stock: data.stock || '',
    //                 description: data.description || '',
    //             });
    //
    //             setSelectedCategory(data.category || 'default');
    //
    //             // Chuyển đổi dữ liệu ảnh từ API (giả sử nó là URL)
    //             const fetchedImages = data.images.map((imgUrl, index) => {
    //                 return imgUrl ? new File([], imgUrl, { type: 'image/jpeg' }) : null;
    //             });
    //             setImages(fetchedImages);
    //         } catch (error) {
    //             console.error("Failed to fetch product details", error);
    //         }
    //     }
    //
    //     fetchData();
    // }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

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
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);
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

    const handleSubmit = () => {
        let newFieldErrors = {};
        let imageErrorMessages = [];

        if (selectedCategory === 'default') {
            newFieldErrors.category = "Vui lòng chọn danh mục.";
        }

        if (formFields.productName.trim() === '') {
            newFieldErrors.productName = "Tên sản phẩm không được để trống.";
        }
        if (formFields.price.trim() === '') {
            newFieldErrors.price = "Giá không được để trống.";
        } else if (!/^[1-9]\d*$/.test(formFields.price)) {
            newFieldErrors.price = "Giá phải là số nguyên dương.";
        }
        if (formFields.stock.trim() === '') {
            newFieldErrors.stock = "Tồn kho không được để trống.";
        } else if (!/^[1-9]\d*$/.test(formFields.stock)) {
            newFieldErrors.stock = "Tồn kho phải là số nguyên dương.";
        }
        if (formFields.description.trim() === '') {
            newFieldErrors.description = "Mô tả sản phẩm không được để trống.";
        }

        const selectedImagesCount = images.filter(img => img).length;
        if (selectedImagesCount < 3) {
            imageErrorMessages.push("Vui lòng chọn đủ 3 ảnh.");
        }

        images.forEach((img, index) => {
            if (fieldErrors[`image-${index}`]) {
                imageErrorMessages.push(fieldErrors[`image-${index}`]);
            }
        });

        if (imageErrorMessages.length > 0) {
            newFieldErrors.images = imageErrorMessages.join(" ");
        }

        setFieldErrors(newFieldErrors);

        if (Object.keys(newFieldErrors).length === 0) {
            console.log("Đăng sản phẩm thành công với hình ảnh:", images);
        }
    };

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Kênh người bán"/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={2}/>
                    </div>

                    <div className="col-start-3 flex flex-col px-4 py-3 bg-White select-none gap-5">
                        <div className="flex flex-col">
                            <div>
                                <span className="text-[2rem] font-semibold">
                                    Chỉnh sửa sản phẩm
                                </span>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <table className="w-[80%]">
                            <tbody>
                            <tr>
                                <td className="py-3">*Tên sản phẩm:</td>
                                <td className="py-3">
                                    <input
                                        type="text"
                                        name="productName"
                                        value={formFields.productName}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.productName ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.productName && (
                                        <p className="text-Red text-sm">{fieldErrors.productName}</p>
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
                                <td className="py-3">*Giá:</td>
                                <td className="py-3">
                                    <input
                                        type="text"
                                        name="price"
                                        value={formFields.price}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.price ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.price && (
                                        <p className="text-Red text-sm">{fieldErrors.price}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">*Tồn kho:</td>
                                <td className="py-3">
                                    <input
                                        type="text"
                                        name="stock"
                                        value={formFields.stock}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.stock ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.stock && (
                                        <p className="text-Red text-sm">{fieldErrors.stock}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">*Mô tả sản phẩm:</td>
                                <td className="py-3">
                                        <textarea
                                            name="description"
                                            value={formFields.description}
                                            onChange={handleInputChange}
                                            className={`w-full h-20 resize-none border ${fieldErrors.description ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                        />
                                    {fieldErrors.description && (
                                        <p className="text-Red text-sm">{fieldErrors.description}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">*Hình ảnh:</td>
                                <td className="py-3">
                                    <div className="flex items-center gap-5">
                                        {[0, 1, 2].map((index) => (
                                            <div
                                                key={index}
                                                className={`flex items-center justify-center gap-2 h-[120px] w-[120px] ${images[index] ? 'border-Blue' : 'bg-Gray'} rounded-md`}
                                            >
                                                <label htmlFor={`file-${index}`} className="cursor-pointer">
                                                    {images[index] ? (
                                                        <img
                                                            src={URL.createObjectURL(images[index])}
                                                            alt={`selected-${index}`}
                                                            className="h-[120px] w-[120px] object-cover rounded-md"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={product_1}
                                                            alt={`selected-${index}`}
                                                            className="h-[120px] w-[120px] object-cover rounded-md"
                                                        />
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

export default EditProduct;