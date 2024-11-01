import React, {useEffect, useState} from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import Verification from "../../components/Login_Register_Forget/Verification";

const PhoneVerification = (props) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        switch (props.method) {
            case 'register':
                setTitle('Đăng ký');
                setUrl('/register/enter-password');
                break;
            case 'forget':
                setTitle('Đặt lại mật khẩu');
                setUrl('/forget-password/enter-password');
                break;
            case 'email':
                setTitle('Đổi email');
                setUrl('/change-email/finished');
                break;
            case 'phone':
                setTitle('Đổi số điện thoại');
                setUrl( '/change-phone/finished');
                break;
            default:
                break;
        }
    }, [title]);

    return (
        <div>
            <RFHeader title={title}/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <Verification url={url} />
            </div>
        </div>
    );
}

export default PhoneVerification;