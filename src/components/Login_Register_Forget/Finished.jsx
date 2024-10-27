import React, {useEffect, useState} from "react";

const Finished = (props) => {
    const [title, setTitle] = useState("");

    useEffect(() => {
        if (props.method === "password") {
            setTitle("Bạn đã thiết lập lại mật khẩu thành công");
        }
        if (props.method === "email") {
            setTitle("Bạn đã đổi email thành công");
        }
        if (props.method === "phone") {
            setTitle("Bạn đã đổi số điện thoại thành công");
        }
    }, [props.method]);

    return (
        <div className="bg-White shadow rounded-lg h-auto w-[32rem] select-none flex flex-col items-center justify-items-center">
            <div className="mt-4 mb-6">
                        <span className="font-sans font-semibold text-center text-Black text-xl">
                            {title}
                        </span>
            </div>

            <div className="mb-12">
                        <span className="font-sans text-center text-Black text-sm">
                            Hãy tiếp tục tận hưởng trải nghiệm mua sắm của bạn!
                        </span>
            </div>

            <div className="mb-4 bg-Blue hover:bg-Dark_blue rounded-sm">
                <button
                    className="w-[22rem] rounded-sm font-sans flex flex-col items-center justify-items-center">
                                <span className="text-White my-1">
                                    Trở về trang đăng nhập
                                </span>
                </button>
            </div>
        </div>
    );
};

export default Finished;