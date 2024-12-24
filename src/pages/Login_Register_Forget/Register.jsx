import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useLocalStorage from "../../components/General/useLocalStorage";
import axios from "axios";
import InfoModal from "../../components/General/InfoModal";
import LoadingModal from "../../components/General/LoadingModal";

const Register = () => {
    const formatPhoneNumber = (phoneNumberNumber) => {
        return phoneNumberNumber.replace(/^0/, '+84');
    }
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ phoneNumber: '', email: '' });
    const [selectedRole, setSelectedRole] = useState('shopper');

    const phoneNumberStorage = useLocalStorage('phoneNumber');
    const emailStorage = useLocalStorage('email');
    const roleStorage = useLocalStorage('selectedRole');

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

    // set up modal
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    // end set up modal

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    }

    const handlephoneNumberChange = (e) => {
        const phoneNumberValue = e.target.value;
        // Kiểm tra chỉ cho phép số và giới hạn tối đa 10 ký tự
        const phoneNumberRegex = /^[0-9]{0,10}$/;
        if (phoneNumberRegex.test(phoneNumberValue)) {
            setPhoneNumber(phoneNumberValue);
            setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: '' })); // Xóa lỗi nếu có
        }
    };

    const frontendValidate = () => {
        let newErrors = {};

        // Kiểm tra số điện thoại không được để trống
        if (!phoneNumber) {
            newErrors.phoneNumber = 'Vui lòng nhập số điện thoại.';
        }
        else if (phoneNumber.length !== 10) {
            newErrors.phoneNumber = 'Số điện thoại phải đủ 10 chữ số.';
        }

        // Kiểm tra email không được để trống
        if (!email) {
            newErrors.email = 'Vui lòng nhập email.';
        } else if (!email.endsWith('@gmail.com')) {
            newErrors.email = 'Email không hợp lệ';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            return true;
        }
        return false;
    }

    const handleNext = async () => {
        if (frontendValidate()) {
            let newErrors = {};
            // Call API kiểm tra xem số điện thoại và email đã tồn tại trong hệ thống chưa
            try {
                setLoading(true);
                openLoadingModal();
                let data = {
                    email: email,
                    phoneNumber: formatPhoneNumber(phoneNumber),
                }
                const response = await axios.post('http://152.42.232.101:5050/api/v1/user-service/shopper/register/validation', data);
            }
            catch (error) {
                if (error.response) {
                    newErrors.email = 'Email hoặc số điện thoại đã tồn tại';
                    newErrors.phoneNumber = 'Email hoặc số điện thoại đã tồn tại';
                }
                setLoading(false);
                closeLoadingModal();
                openModal();
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
            }

            // Chỉ tiếp tục nếu không có lỗi
            if (Object.keys(newErrors).length === 0) {
                phoneNumberStorage.set(phoneNumber);
                emailStorage.set(email);
                roleStorage.set(selectedRole);
                // Thực hiện hành động chuyển trang hoặc xử lý tiếp theo
                navigate('/register/enter-password');
            }
        }
    };

    return (
        <div className="bg-gradient-to-b from-Blue to-Light_blue h-screen w-screen grid grid-cols-[1fr_5fr_5fr_1fr] justify-items-center items-center">
            <div className="flex flex-col items-center col-start-2 select-none">
                <div className="w-[20rem] h-[18rem]">
                    <img src="/Markey_white_vertical.png" className="object-cover" alt="Markey"/>
                </div>
                <div className="flex">
          <span className="font-sans font-semibold text-White text-xl">
            "Mở khóa tiềm năng mua sắm của bạn"
          </span>
                </div>
            </div>

            <div className="flex flex-col rounded-2xl bg-White w-[28rem] justify-center items-center col-start-3">
                <div className="mt-4 select-none">
                    <span className="font-sans text-Black font-semibold text-2xl">Đăng ký</span>
                </div>

                <div className="my-8 relative">
                    <input
                        className={`border-2 w-[20rem] rounded-sm h-8 outline-none pl-2 ${
                            errors.phoneNumber ? 'border-Red' : 'focus:border-Blue focus:ring-Blue focus:ring-1'
                        }`}
                        placeholder="Số điện thoại"
                        value={phoneNumber}
                        onChange={handlephoneNumberChange}
                    />
                    {errors.phoneNumber && (
                        <span className="text-Red text-sm absolute -bottom-6 left-0">{errors.phoneNumber}</span>
                    )}
                </div>

                <div className="mb-8 relative">
                    <input
                        className={`border-2 w-[20rem] rounded-sm h-8 outline-none pl-2 ${
                            errors.email ? 'border-Red' : 'focus:border-Blue focus:ring-Blue focus:ring-1'
                        }`}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                        <span className="text-Red text-sm absolute -bottom-6 left-0">{errors.email}</span>
                    )}
                </div>

                <div className="mb-8">
                    <select className="border-2 w-[20rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 focus:border-Blue" onChange={handleRoleChange}>
                        <option value="shopper">Khách hàng</option>
                        <option value="salesman">Người bán</option>
                    </select>
                </div>

                <div className="mb-8 h-8 bg-Blue flex flex-col items-center justify-center rounded-sm hover:bg-Dark_blue cursor-pointer">
                    <button className="rounded-sm w-[20rem]" onClick={handleNext}>
                        <span className="text-White select-none">Tiếp theo</span>
                    </button>
                </div>

                <div className="mb-4 select-none">
                  <span>
                    Bạn đã có tài khoản?
                    <Link to="/login">
                      <span className="ml-2 text-Red">Đăng nhập</span>
                    </Link>
                  </span>
                </div>

                <InfoModal isOpen={isModalOpen} onClose={closeModal} title="Đăng ký thất bại"
                           message="Email hoặc số điện thoại đã tồn tại. Vui lòng đăng ký lại!"/>
                {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
            </div>
        </div>
    );
};

export default Register;