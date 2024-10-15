import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import Verification from "../../components/Login_Register_Forget/Verification";

const EmailVerificationF = () => {
    return (
        <div>
            <RFHeader title="Đặt lại mật khẩu"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <Verification method="email" value="abcxyz@gmail.com"/>
            </div>
        </div>
    );
}

export default EmailVerificationF;