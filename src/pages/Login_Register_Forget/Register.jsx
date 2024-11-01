import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useLocalStorage from "../../components/General/useLocalStorage";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ phone: '', email: '' });
    const [selectedRole, setSelectedRole] = useState('shopper');

    const phoneStorage = useLocalStorage('phone');
    const emailStorage = useLocalStorage('email');
    const roleStorage = useLocalStorage('selectedRole');

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    }

    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value;
        // Kiểm tra chỉ cho phép số và giới hạn tối đa 10 ký tự
        const phoneRegex = /^[0-9]{0,10}$/;
        if (phoneRegex.test(phoneValue)) {
            setPhone(phoneValue);
            setErrors((prevErrors) => ({ ...prevErrors, phone: '' })); // Xóa lỗi nếu có
        }
    };

    const frontendValidate = () => {
        let newErrors = {};

        // Kiểm tra số điện thoại không được để trống
        if (!phone) {
            newErrors.phone = 'Vui lòng nhập số điện thoại.';
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
                const data = {
                    email: email,
                    phoneNumber: phone
                }
                const response = await axios.post('http://152.42.232.101:5050/api/v1/user-service/shopper/register/validation', data);
                if (response.data.code === 400) {
                    newErrors.email = 'Email hoặc số điện thoại đã tồn tại';
                    newErrors.phone = 'Email hoặc số điện thoại đã tồn tại';
                    console.log(response.data.message);
                }
                else {
                    console.log(response.data.message)
                }
            }
            catch (error) {
                console.log(error);
            }

            // Chỉ tiếp tục nếu không có lỗi
            if (Object.keys(newErrors).length === 0) {
                phoneStorage.set(phone);
                emailStorage.set(email);
                roleStorage.set(selectedRole);
                // Thực hiện hành động chuyển trang hoặc xử lý tiếp theo
                navigate('/register/phone-verification');
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
                            errors.phone ? 'border-Red' : 'focus:border-Blue focus:ring-Blue focus:ring-1'
                        }`}
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                    {errors.phone && (
                        <span className="text-Red text-sm absolute -bottom-6 left-0">{errors.phone}</span>
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
            </div>
        </div>
    );
};

export default Register;