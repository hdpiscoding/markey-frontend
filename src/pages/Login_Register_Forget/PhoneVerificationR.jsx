import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import Verification from "../../components/Login_Register_Forget/Verification";

const PhoneVerificationR = () => {
    return (
        <div>
            <RFHeader title="Đăng ký"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <Verification value="0902374757"/>
            </div>
        </div>
    );
}

export default PhoneVerificationR;