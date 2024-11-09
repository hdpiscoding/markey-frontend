import React, {useEffect, useState} from 'react';
import PrimaryHeader from "../../components/General/PrimaryHeader";
import Footer from "../../components/General/Footer";
import AccountNav from "../../components/Shopper/AccountNav";
import { FiUser } from "react-icons/fi";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ConfirmModal from "../../components/General/ConfirmModal";
import { useNavigate} from "react-router-dom";
import LoadingModal from "../../components/General/LoadingModal";
import {instance, mediaInstance} from "../../AxiosConfig";
import useLocalStorage from "../../components/General/useLocalStorage";
dayjs.extend(customParseFormat);

const ShopperProfile = () => {
    // Hàm chuyển đổi ngày từ YYYY-MM-DD sang DD/MM/YYYY
    const formatDate = (inputDate) => {
        const [year, month, day] = inputDate.split('-');
        return `${day}/${month}/${year}`;
    }

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
    const userIdStorage = useLocalStorage('userId');

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

    // Store API data
    const [shopper, setShopper] = useState(null);

    // Store API image data (URL)
    const [image, setImage] = useState(null);
    // Store selected image
    const [selectedImage, setSelectedImage] = useState(null);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [error, setError] = useState('');

    const validateName = () => {
        if (name.trim() === '') {
            setNameError('Họ và tên không được để trống.');
            return false;
        }
        setNameError('');
        return true;
    };

    useEffect(() => {
        // Call API to get shopper's data by shopper_id and set to shopper and set shopper's avatar to selectedImage
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                const response = await instance.get("v1/user-service/shopper/me");
                const item = response.data.data;
                setShopper(item);
                setName(item.fullname);
                setImage(item.profilePicture);
                setSelectedDate(dayjs(formatDate(item.birthdate), 'DD/MM/YYYY'));
                setGender(item.gender);
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

    const handleNameChange = (event) => {
        setName(event.target.value);
        if (nameError) setNameError('');
    }

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

    const [gender, setGender] = React.useState('');

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const [selectedDate, setSelectedDate] = useState(null);

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

    const handleUpdateClick = () => {
        const isValid = validateName(); // Kiểm tra lỗi tên
        if (isValid) {
            openModal(); // Mở modal nếu hợp lệ
        }
    };

    const handleUpdate = async () => {
        try {
            const pictureUrl = await getImagesUrl();
            let data = {
                fullname: name,
                birthdate: selectedDate?.format('YYYY-MM-DD'),
                profilePicture: pictureUrl,
                gender: gender,
            }
            setLoading(true);
            openLoadingModal();
            const response = await instance.put(`v1/user-service/shopper/${userIdStorage.get()}`, data);
        }
        catch (error) {
            setLoading(false);
            closeLoadingModal();
            console.error('Error:', error);
        }
        finally {
            setLoading(false);
            closeLoadingModal();
        }
        closeModal();
    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <PrimaryHeader/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <AccountNav currentPage={1}/>
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4">
                        <div className="flex flex-col justify-center gap-2">
                            <div>
                                <span className="font-semibold text-[2rem]">
                                    Hồ sơ của tôi
                                </span>
                            </div>

                            <div className="border-t-2 w-full text-Dark_gray"></div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="rounded-[50%] bg-Light_gray h-[120px] w-[120px] flex items-center justify-center">
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
                                <td className="py-3">
                                    <label htmlFor="name">
                                        Họ và tên
                                    </label>
                                </td>

                                <td className="py-3 relative">
                                    <input type="text" className={`focus:outline-none border py-1 px-2 w-3/4 ${nameError ? 'border-Red text-Red' : 'border-Black'}`} value={name} onChange={handleNameChange}/>
                                    {nameError && (
                                        <p className="text-Red text-sm absolute mt-1">{nameError}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-3">
                                    <label htmlFor="gender">
                                        Giới tính
                                    </label>
                                </td>

                                <td className="py-3">
                                    <RadioGroup
                                        row
                                        name="gender_group"
                                        value={gender}
                                        onChange={handleGenderChange}
                                    >
                                        <FormControlLabel value="Nam" control={<Radio/>} label="Nam"/>
                                        <FormControlLabel value="Nữ" control={<Radio/>} label="Nữ"/>
                                    </RadioGroup>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <td className="py-3">
                                        <label htmlFor="email">
                                            Email
                                        </label>
                                    </td>

                                    <td className="py-3">
                                        <div className="flex items-center gap-4">
                                            <span className="font-semibold">
                                                {shopper?.email}
                                            </span>

                                            <span className="text-sm underline text-Blue select-none cursor-pointer hover:text-Dark_blue" onClick={() => onChangeInfo("email")}>
                                                Thay đổi
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <td className="py-3">
                                        <label htmlFor="email">
                                            Số điện thoại
                                        </label>
                                    </td>

                                    <td className="py-3">
                                        <div className="flex items-center gap-4">
                                            <span className="font-semibold">
                                                {formatPhoneNumber(shopper?.phoneNumber)}
                                            </span>

                                            <span className="text-sm underline text-Blue select-none cursor-pointer hover:text-Dark_blue" onClick={() => onChangeInfo("phone")}>
                                                    Thay đổi
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                            <tbody>
                                <tr>
                                    <td className="py-3">
                                        <label htmlFor="email">
                                            Ngày sinh
                                        </label>
                                    </td>

                                    <td className="py-3">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                value={selectedDate}
                                                onChange={(newValue) => {
                                                    // Kiểm tra tính hợp lệ trước khi cập nhật
                                                    if (newValue && newValue.isValid()) {
                                                        setSelectedDate(newValue);
                                                    } else {
                                                        console.error('Selected date is invalid');
                                                    }
                                                }}
                                                slotProps={{
                                                    textField: {
                                                        placeholder: "Ngày sinh", // Đặt placeholder
                                                        sx: {
                                                            '& .MuiOutlinedInput-root': {
                                                                height: '36px', // Chiều cao
                                                                padding: '4px 8px', // Padding
                                                                borderRadius: '0px', // Bỏ bo tròn
                                                            },
                                                            '& .MuiInputBase-input': {
                                                                padding: '4px 8px', // Padding cho input
                                                                fontSize: '0.875rem', // Kích thước văn bản
                                                            },
                                                        },
                                                        InputLabelProps: {
                                                            shrink: false, // Ngăn nhãn nổi lên khi click vào input
                                                        },
                                                    },
                                                }}
                                            />
                                        </LocalizationProvider>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex items-center justify-center select-none">
                            <button className="bg-Blue text-white py-1 px-8 rounded hover:bg-Dark_blue text-center" onClick={handleUpdateClick}>
                                Cập nhật
                            </button>
                        </div>
                    </div>
                    <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleUpdate} title="Xác nhận cập nhật thông tin" message="Bạn có chắc muốn cập nhật thông tin này?"/>
                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>

            </main>

            <Footer/>
        </div>
    );
};

export default ShopperProfile;