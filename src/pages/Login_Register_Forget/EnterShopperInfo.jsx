import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import CreatePassword from "../../components/Login_Register_Forget/CreatePassword";
import ShopperInfo from "../../components/Login_Register_Forget/ShopperInfo";

const EnterShopperInfo = () => {
    return (
        <div>
            <RFHeader title="Đăng ký"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <ShopperInfo/>
            </div>
        </div>
    );
}

export default EnterShopperInfo;