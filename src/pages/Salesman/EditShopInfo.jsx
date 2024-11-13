import React, {useEffect, useState} from 'react';
import Footer from "../../components/General/Footer";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import {FiUser} from "react-icons/fi";
import ConfirmModal from "../../components/General/ConfirmModal";
import {useNavigate} from "react-router-dom";
import LoadingModal from "../../components/General/LoadingModal";
import {instance, mediaInstance} from "../../AxiosConfig";
import useLocalStorage from "../../components/General/useLocalStorage";

const EditShopInfo = () => {
    function formatPhoneNumber(phoneNumber) {
        if (phoneNumber?.length === 11) {
            return '0' + phoneNumber?.slice(2); // Thay 3 ký tự đầu bằng '0'
        }
        // Kiểm tra nếu chuỗi có 12 ký tự
        else if (phoneNumber?.length === 12) {
            return '0' + phoneNumber?.slice(3); // Thay 2 ký tự đầu bằng '0'
        }
        // Trả về chuỗi không thay đổi nếu không thỏa mãn điều kiện trên
        else {
            return phoneNumber;
        }
    }

    const navigate = useNavigate();

    const onChangeInfo = (method) => {
        navigate(`${method === "email" ? "/change-email" : "/change-phone"}`);
    }

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

    const [salesman, setSalesman] = useState({});
    const [shop, setShop] = useState({});
    const [image, setImage] = useState(null);
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

    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);

    const [fieldErrors, setFieldErrors] = useState({});
    const [formFields, setFormFields] = useState({
        name: '',
        cccd: '',
        shopName: '',
        address: '',
        description: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                // Call API to get salesman info and shop info
                const [salesmanResponse, shopResponse] = await Promise.all([
                    await instance.get('v1/user-service/salesman/me'),
                    await instance.get('v1/shopping-service/shop/me')
                ]);
                setSalesman(await salesmanResponse.data.data);
                setShop(await shopResponse.data.data);
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
        }

        fetchData();
    }, []);

    useEffect(() => {
        setImage(shop.profilePicture);
        setEmail(salesman.email);
        setPhone(formatPhoneNumber(salesman.phoneNumber));
        setFormFields({
            name: salesman.fullname || '',
            cccd: salesman.cccd || '',
            address: salesman.address || '',
            shopName: shop.name || '',
            description: shop.description || ''
        });
    }, [salesman, shop])

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
    };


    const handleUpdate = async () => {
        if (Object.keys(fieldErrors).length <= 0) {
            // Call API here
            try {
                const pictureUrl = await getImagesUrl();
                let salesmanRequest = {
                    fullname: formFields.name,
                    cccd: formFields.cccd,
                    address: formFields.address
                }

                let shopRequest = {
                    name: formFields.shopName,
                    description: formFields.description,
                    profilePicture: pictureUrl ?? image
                }

                setLoading(true);
                openLoadingModal();
                await instance.put(`v1/user-service/salesman/${salesman.id}`, salesmanRequest);
                await instance.put(`v1/shopping-service/shop/salesman-update-shop/${shop.id}`, shopRequest);
            }
            catch (error) {
                setLoading(false);
                closeLoadingModal();
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
                navigate('/salesman/profile');
            }
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
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={6}/>
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4 select-none">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[2rem] font-semibold">
                                        Chỉnh sửa thông tin người bán
                                    </span>
                                </div>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4">
                            <div
                                className="rounded-[50%] bg-Light_gray h-[120px] w-[120px] flex items-center justify-center">
                                {selectedImage ? (
                                    <img src={URL.createObjectURL(selectedImage)} alt="Selected"
                                         className="w-full h-full rounded-[50%] object-cover"/>
                                ) : (image
                                        ?
                                        <img src={image} alt="img" className="w-full h-full rounded-[50%] object-cover"/>
                                        :
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
                                <td className="py-5">
                                    <label htmlFor="email">
                                        *Email
                                    </label>
                                </td>

                                <td className="py-5">
                                    <div className="flex items-center gap-4">
                                            <span className="font-semibold">
                                                { email ?? "placeholder@gmail.com"}
                                            </span>

                                        <span
                                            className="text-sm underline text-Blue select-none cursor-pointer hover:text-Dark_blue"
                                            onClick={() => onChangeInfo("email")}>
                                                Thay đổi
                                            </span>
                                    </div>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">
                                    <label htmlFor="email">
                                        *Số điện thoại
                                    </label>
                                </td>

                                <td className="py-5">
                                    <div className="flex items-center gap-4">
                                            <span className="font-semibold">
                                                { phone ?? "0903039930"}
                                            </span>

                                        <span
                                            className="text-sm underline text-Blue select-none cursor-pointer hover:text-Dark_blue"
                                            onClick={() => onChangeInfo("phone")}>
                                                    Thay đổi
                                            </span>
                                    </div>
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
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>

                    <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleUpdate}
                                  title={"Xác nhận cập nhật thông tin"}
                                  message={"Bạn có chắc muốn cập nhật thông tin này?"}/>
                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default EditShopInfo;