import React, {useEffect, useState} from 'react';
import PrimaryHeader from "../../components/General/PrimaryHeader";
import Footer from "../../components/General/Footer";
import AccountNav from "../../components/Shopper/AccountNav";
import { FiUser } from "react-icons/fi";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ConfirmModal from "../../components/General/ConfirmModal";
dayjs.extend(customParseFormat);

const ShopperProfile = () => {
    // Store API data
    const [shopper, setShopper] = useState(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Call API to get shopper's data by shopper_id and set to shopper and set shopper's avatar to selectedImage

    }, []);

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

    const [gender, setGender] = React.useState('');

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    // Khởi tạo giá trị với dayjs từ chuỗi ngày DD/MM/YYYY
    const initialDate = dayjs('25/10/2024', 'DD/MM/YYYY'); // Ngày hợp lệ

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

    const handleUpdate = () => {
        // Call API to update shopper's data

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
                                    <img src={selectedImage} alt="Selected" className="w-full h-full rounded-[50%] object-cover" />
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
                                <td className="py-3">
                                    <label htmlFor="name">
                                        Họ và tên
                                    </label>
                                </td>

                                <td className="py-3">
                                    <input type="text" className="focus:outline-none border border-Black py-1 px-2 w-3/4"/>
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
                                        <FormControlLabel value="male" control={<Radio/>} label="Nam"/>
                                        <FormControlLabel value="female" control={<Radio/>} label="Nữ"/>
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
                                                    placeholder@gmail.com
                                                </span>

                                            <span
                                                className="text-sm underline text-Blue select-none cursor-pointer hover:text-Dark_blue">
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
                                                    0903039930
                                                </span>

                                            <span
                                                className="text-sm underline text-Blue select-none cursor-pointer hover:text-Dark_blue">
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
                            <button className="bg-Blue text-white py-1 px-8 rounded hover:bg-Dark_blue text-center" onClick={openModal}>
                                Cập nhật
                            </button>
                        </div>
                    </div>
                    <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleUpdate} title="Xác nhận cập nhật thông tin" message="Bạn có chắc muốn cập nhật thông tin này?"/>
                </div>

            </main>

            <Footer/>
        </div>
    );
};

export default ShopperProfile;