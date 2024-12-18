import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import Finished from "../../components/Login_Register_Forget/Finished";

const ForgetFinished = () => {
    return (
        <div>
            <RFHeader title="Đặt lại mật khẩu"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <Finished method="password"/>
            </div>
        </div>
    );
};

export default ForgetFinished;