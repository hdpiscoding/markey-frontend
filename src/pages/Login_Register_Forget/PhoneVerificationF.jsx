import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import Verification from "../../components/Login_Register_Forget/Verification";

const PhoneVerificationF = () => {
    return (
        <div>
            <RFHeader title="Đặt lại mật khẩu"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <Verification value="0985858857"/>
            </div>
        </div>
    );
}

export default PhoneVerificationF;