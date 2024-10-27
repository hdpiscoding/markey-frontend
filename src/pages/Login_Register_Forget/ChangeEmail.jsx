import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import EnterEmailOrPhone from "../../components/Login_Register_Forget/EnterEmailOrPhone";

const ChangeEmail = () => {
    return (
        <div>
            <RFHeader title="Đổi email"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <EnterEmailOrPhone method="email"/>
            </div>
        </div>
    );
};

export default ChangeEmail;