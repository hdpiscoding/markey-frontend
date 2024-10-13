import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import CreatePassword from "../../components/Login_Register_Forget/CreatePassword";

const EnterPasswordR = () => {
    return (
        <div>
            <RFHeader title="Đăng ký"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <CreatePassword/>
            </div>
        </div>
    );
}

export default EnterPasswordR;