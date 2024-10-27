import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import SalesmanInfo from "../../components/Login_Register_Forget/SalesmanInfo";

const EnterSalesmanInfo = () => {
    return (
        <div>
            <RFHeader title="Đăng ký người bán"/>
            <div className="flex flex-col items-center justify-items-center my-16">
                <SalesmanInfo/>
            </div>
        </div>
    );
};

export default EnterSalesmanInfo;