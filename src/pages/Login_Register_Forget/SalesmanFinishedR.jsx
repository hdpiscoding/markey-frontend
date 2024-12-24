import React from 'react';
import RFHeader from "../../components/Login_Register_Forget/RFHeader";
import {Link, useNavigate} from "react-router-dom";

const SalesmanFinishedR = () => {
    const navigate = useNavigate();
    const handleHome = () => {
        // Delete token in localStorage
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div>
            <RFHeader title="Đăng ký người bán"/>

            <div className="flex flex-col items-center justify-items-center mt-32">
                <div
                    className="bg-White shadow rounded-lg h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
                    <div className="mt-4 mb-6">
                        <span className="font-sans font-semibold text-center text-Black text-xl">
                            Bạn đã trở thành người bán của Markey!
                        </span>
                    </div>

                    <div className="mb-12">
                        <span className="font-sans text-center text-Black text-sm">
                            Chúng tôi rất vui khi có bạn tham gia vào cộng đồng. Vui lòng đợi để chúng tôi xác nhận tai khoản của bạn. Xin cảm ơn!
                        </span>
                    </div>

                    <div className="mb-4 bg-Blue hover:bg-Dark_blue rounded-sm">
                        <button className="w-[22rem] rounded-sm font-sans flex flex-col items-center justify-items-center" onClick={handleHome}>
                            <span className="text-White my-1">
                                Trở về trang đăng nhập
                            </span>
                        </button>

                    </div>
                </div>
            </div>


        </div>
    );
};

export default SalesmanFinishedR;