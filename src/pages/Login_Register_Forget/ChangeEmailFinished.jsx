import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import Finished from "../../components/Login_Register_Forget/Finished";

const ChangeEmailFinished = () => {
    return (
        <div>
            <RFHeader title="Đổi email"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <Finished method="email"/>
            </div>
        </div>
    );
};

export default ChangeEmailFinished;