import React, {useState, useEffect} from 'react';
import { IoArrowBack } from "react-icons/io5";

const Verification = (props) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [isResendDisabled, setIsResendDisabled] = useState(false);

    // Handle resend code
    const handleResendCode = () => {
        if(!isResendDisabled){
            setIsResendDisabled(true);
            setTimeLeft(30);
        }
    }

    // Timer for resend code
    useEffect(() => {
        let timer;
        if(timeLeft !== null && timeLeft > 0) {
            timer = setTimeout(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000)
        }
        else if(timeLeft === 0){
            setIsResendDisabled(false);
            setTimeLeft(null);
        }

        return () => clearTimeout(timer); // Clear the timer
    }, [timeLeft]);

    return (
        <div className="bg-White shadow rounded-lg h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
            <div className="flex items-center justify-items-center ml-8 mt-4 mb-6 h-auto w-full">
                <div className="cursor-pointer">
                    <IoArrowBack className="h-5 w-5 object-cover"/>
                </div>

                <div className="grow text-center">
                    <span className="font-sans font-semibold text-Black text-xl">
                        Nhập mã xác nhận
                    </span>
                </div>

                <div className="w-[3.25rem]"></div> {/* Empty <div></div> for spacing */}
            </div>

            <div className="flex flex-col items-center justify-items-center h-auto w-[22rem]">
                <div>
                    <span className="font-sans text-Black text-sm">
                        Mã xác nhận của bạn đã được gửi đến {props.method}
                    </span>
                </div>

                <div className="mb-6">
                    <span className="font-sans text-Black text-sm font-bold">
                        {props.value}
                    </span>
                </div>

                <div className="mb-4">
                    <input
                        className="border-2 w-[22rem] rounded-sm h-8 focus:ring-Blue focus:ring-1 outline-none pl-2 focus:border-Blue"
                        placeholder="Mã xác nhận" type="phone"/>
                    <div className="flex float-right self-end select-none mt-2">
                        <span className="text-[0.75rem] font-sans">
                            Chọn phương thức khác
                            <a href="#">
                                <span className="text-Blue font-semibold underline ml-1.5">
                                    {props.method === "email" ? "Số điện thoại" : "Email"}
                                </span>
                            </a>
                        </span>
                    </div>
                </div>

                <div className="mb-4 select-none">
                    <span className="text-[0.75rem] font-sans mr-1">
                        Bạn chưa nhận được mã?

                    </span>

                    {isResendDisabled
                        ?
                        <span className="text-[0.75rem] font-sans text-[#E57373]" onClick={null}>
                            Gửi lại mã
                        </span>
                        :
                        <span className="text-[0.75rem] font-sans text-Red font-semibold cursor-pointer" onClick={handleResendCode}>
                            Gửi lại mã
                        </span>}

                    {(timeLeft !== null && timeLeft > 0) ? <span className="ml-3 text-[0.75rem] font-sans text-Black">00:{timeLeft >= 10 ? timeLeft : ("0" + timeLeft)}</span> : null}
                </div>

                <div className="mb-4 bg-Blue rounded-sm hover:bg-Dark_blue">
                    <button className="rounded-sm w-[22rem] font-sans flex flex-col items-center justify-items-center">
                        <span className="text-White my-1">
                            Tiếp theo
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Verification;