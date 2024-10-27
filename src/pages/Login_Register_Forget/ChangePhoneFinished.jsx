import React from "react";
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import Finished from "../../components/Login_Register_Forget/Finished";

const ChangePhoneFinished = () => {
    return (
        <div>
            <RFHeader title="Đổi số điện thoại"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <Finished method="phone"/>
            </div>
        </div>
    );
};

export default ChangePhoneFinished;