import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import EnterEmailOrPhone from "../../components/Login_Register_Forget/EnterEmailOrPhone";

const EnterPhoneF = () => {
    return (
        <div>
            <RFHeader title="Đặt lại mật khẩu"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <EnterEmailOrPhone method="forget"/>
            </div>

        </div>
    );
}

export default EnterPhoneF;