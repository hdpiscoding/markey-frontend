import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import EnterEmailOrPhone from "../../components/Login_Register_Forget/EnterEmailOrPhone";

const ChangePhoneNumber = () => {
    return (
        <div>
            <RFHeader title="Đổi số điện thoại"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <EnterEmailOrPhone method="phone"/>
            </div>
        </div>
    );
};

export default ChangePhoneNumber;