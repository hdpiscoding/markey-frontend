import React from "react";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <section className="flex items-center h-full p-16 dark:bg-gray-50 dark:text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Xin lỗi, chúng tôi không tìm thấy trang bạn yêu cầu.</p>
                    <p className="mt-4 mb-8 dark:text-gray-600">Xin vui lòng trở về trang đăng nhập</p>
                    <Link to="/login">
                        <div className="px-8 py-3 font-semibold rounded bg-Blue text-White hover:bg-Dark_blue">Trở về
                            trang đăng nhập
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;