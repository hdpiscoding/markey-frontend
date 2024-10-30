import React, {useEffect, useState} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import {FiUser} from "react-icons/fi";
import product_1 from "../../assets/product_1.png";
import ConfirmModal from "../../components/General/ConfirmModal";

const EditShopInfo = () => {
    const salesman = { id: "1", name: "Nguyễn Văn A", cccd: "123456789012", shopName: "Cửa hàng ABC", address: "123 Đường XYZ, Quận 1, TP.HCM", description: "Cửa hàng ABC chuyên cung cấp các sản phẩm thời trang nam và nữ." };
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
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const [fieldErrors, setFieldErrors] = useState({});
    const [formFields, setFormFields] = useState({
        name: '',
        cccd: '',
        shopName: '',
        address: '',
        description: ''
    });

    useEffect(() => {
        setFormFields({
            name: salesman.name || '',
            cccd: salesman.cccd || '',
            shopName: salesman.shopName || '',
            address: salesman.address || '',
            description: salesman.description || ''
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const positiveIntegerRegex = /^\d*$/;

        // Logic riêng cho trường "cccd"
        if (name === 'cccd') {
            // Chỉ cho phép các ký tự số và không quá 12 ký tự
            if (positiveIntegerRegex.test(value) && value.length <= 12) {
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
            // Các trường khác
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

    const Validate = () => {
        let newFieldErrors = {};
        let imageErrorMessages = [];
        let isValid = true;

        if (formFields.name.trim() === '') {
            newFieldErrors.name = "Họ tên không được để trống.";
            isValid = false;
        }

        if (formFields.cccd.trim() === '') {
            newFieldErrors.cccd = "Căn cước công dân không được để trống.";
            isValid = false;
        } else if (formFields.cccd.trim().length !== 12) {
            newFieldErrors.cccd = "Căn cước công dân phải có đúng 12 chữ số.";
            isValid = false;
        }

        if (formFields.shopName.trim() === '') {
            newFieldErrors.shopName = "Tên cửa hàng không được để trống.";
            isValid = false;
        }

        if (formFields.address.trim() === '') {
            newFieldErrors.address = "Địa chỉ không được để trống.";
            isValid = false;
        }

        if (formFields.description.trim() === '') {
            newFieldErrors.description = "Nội dung không được để trống.";
            isValid = false;
        }

        if (imageErrorMessages.length > 0) {
            newFieldErrors.images = imageErrorMessages.join(" ");
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
        const isValid= Validate();
        if (isValid) {
            openModal();
        }
    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Kênh người bán"/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={6}/>
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[2rem] font-semibold">
                                        Chỉnh sửa thông tin người bán
                                    </span>
                                </div>

                                <div className="flex items-center justify-center gap-10">
                                    <span className="font-semibold text-Blue cursor-pointer hover:text-Dark_blue">
                                        Sửa
                                    </span>
                                </div>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4">
                            <div
                                className="rounded-[50%] bg-Light_gray h-[120px] w-[120px] flex items-center justify-center">
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Selected"
                                         className="w-full h-full rounded-[50%] object-cover"/>
                                ) : (
                                    <FiUser className="text-Dark_gray h-16 w-16"/>
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

                            <div className="flex flex-col items-center justify-center">
                                <span className="text-Dark_gray text-sm">
                                    Dung lượng tối đa: 1MB
                                </span>

                                <span className="text-Dark_gray text-sm">
                                    Định dạng: .JPEG, .PNG, .JPG
                                </span>

                                {error && <p className="text-red-500 mt-2">{error}</p>}
                            </div>
                        </div>

                        <table className="w-[80%]">
                            <tbody>
                            <tr>
                                <td className="py-5">*Họ và tên:</td>
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

                            <tbody>
                            <tr>
                                <td className="py-5">*Căn cước công dân:</td>
                                <td className="py-5 relative">
                                    <input
                                        type="text"
                                        name="cccd"
                                        value={formFields.cccd}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.cccd ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.cccd && (
                                        <p className="text-Red text-sm h-4 absolute left-0">{fieldErrors.cccd}</p>
                                    )}

                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Tên cửa hàng:</td>
                                <td className="py-5 relative">
                                    <input
                                        type="text"
                                        name="shopName"
                                        value={formFields.shopName}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.shopName ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.shopName && (
                                        <p className="text-Red text-sm h-4 absolute left-0">{fieldErrors.shopName}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Địa chỉ:</td>
                                <td className="py-5 relative">
                                    <input
                                        type="text"
                                        name="address"
                                        value={formFields.address}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.address ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.address && (
                                        <p className="text-Red text-sm h-4 absolute left-0">{fieldErrors.address}</p>
                                    )}


                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Mô tả của hàng:</td>
                                <td className="py-5 relative">
                                        <textarea
                                            name="description"
                                            value={formFields.description}
                                            onChange={handleInputChange}
                                            className={`w-full h-40 resize-none border ${fieldErrors.description ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                        />
                                    {fieldErrors.description && (
                                        <p className="text-Red text-sm h-4 absolute left-0">{fieldErrors.description}</p>
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

                    <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleUpdate} title={"Xác nhận cập nhật thông tin"} message={"Bạn có chắc muốn cập nhật thông tin này?"}/>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default EditShopInfo;