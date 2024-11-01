import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import CreatePassword from "../../components/Login_Register_Forget/CreatePassword";
import useLocalStorage from "../../components/General/useLocalStorage";

const EnterPasswordR = () => {
    // Decoding the token to get the role of the user
    // sample role
    const role = useLocalStorage('selectedRole')?.get();
    return (
        <div>
            <RFHeader title="Đăng ký"/>
            <div className="flex flex-col items-center justify-items-center mt-32">
                <CreatePassword method="register" role={role}/>
            </div>
        </div>
    );
}

export default EnterPasswordR;