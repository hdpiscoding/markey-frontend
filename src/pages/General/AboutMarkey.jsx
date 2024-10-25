import React from "react";
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";

const AboutMarkey = () => {
    return (
        <div className="bg-Light_gray overflow-x-hidden">
            <SecondaryHeader head="Thông tin về Markey"/>

            <main className="grid grid-cols-[1fr_10fr_1fr] w-screen">
                <div className="col-start-2 bg-White my-4">
                    <div className="grid grid-rows-auto">
                        <div className="flex items-center justify-center mt-3">
                            <img src="/Markey_blue_vertical.png" alt="Markey"
                                 className="object-cover h-[150px] w-[150px]"/>
                        </div>

                        <div className="flex items-center justify-center mb-3 font-sans font-semibold text-Light_blue">
                            <span>
                                Mở khóa tiềm năng mua sắm của bạn
                            </span>
                        </div>

                        <div className="grid grid-cols-[1fr_10fr_1fr] mb-3">
                            <div className="flex col-start-2">
                                <p className="font-sans indent-10 font-semibold">
                                    Chào mừng đến với Markey, nơi sự đổi mới kết hợp với sự tiện lợi trong thế giới
                                    thương mại điện tử. Là một nền tảng phát triển nhanh chóng, Markey tận tâm cách mạng
                                    hóa cách bạn mua sắm trực tuyến. Kết hợp các khái niệm "market" và "key", chúng tôi
                                    hướng đến mục tiêu trở thành cổng thông tin cuối cùng để khám phá và mua các sản
                                    phẩm yêu thích của bạn trên nhiều danh mục khác nhau.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-[1fr_10fr_1fr] mb-3">
                            <div className="flex col-start-2">
                                <p className="font-sans indent-10 font-semibold">
                                    Tại Markey, chúng tôi tin rằng mua sắm phải đơn giản, thú vị và được cá nhân hóa. Cho dù bạn đang tìm kiếm các tiện ích công nghệ mới nhất, các mặt hàng thời trang hay các mặt hàng thiết yếu hàng ngày, nền tảng của chúng tôi được thiết kế để mang đến trải nghiệm liền mạch. Chúng tôi cung cấp nhiều loại sản phẩm từ những người bán đáng tin cậy, đảm bảo cả chất lượng và sự đa dạng cho những khách hàng có giá trị của chúng tôi.
                                </p>
                            </div>
                        </div>

                        <div className="mt-3 mb-6 text-center">
                            <span className="text-Blue font-sans font-bold text-2xl">
                                SỨ MỆNH CỦA MARKEY
                            </span>
                        </div>

                        <div className="grid grid-cols-[1fr_5fr_5fr_1fr] gap-4 mb-4">
                            <div className="col-start-2 bg-Lighter_gray flex flex-col rounded-md">
                                <div className="text-center my-4">
                                    <span className="font-sans font-semibold text-Blue text-xl">
                                        Trao quyền cho người mua
                                    </span>
                                </div>

                                <div className="mx-5 mb-4">
                                    <p className="font-sans font-semibold">
                                        Bằng cách cung cấp nhiều loại sản phẩm đa dạng, chất lượng cao, chúng tôi trao
                                        cho khách hàng quyền tự do lựa chọn chính xác những gì phù hợp với nhu cầu và
                                        lối sống của họ.
                                    </p>
                                </div>
                            </div>

                            <div className="col-start-3 bg-Lighter_gray flex flex-col rounded-md">
                                <div className="text-center my-4">
                                    <span className="font-sans font-semibold text-Blue text-xl">
                                        Hỗ trợ người bán
                                    </span>
                                </div>

                                <div className="mx-5 mb-4">
                                    <p className="font-sans font-semibold">
                                        Chúng tôi cam kết giúp các doanh nghiệp ở mọi quy mô thành công. Bằng cách cung
                                        cấp các công cụ trực quan, thông tin chi tiết về dữ liệu và tài nguyên, chúng
                                        tôi trao quyền cho người bán phát triển và tiếp cận đối tượng mới.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-[1fr_5fr_5fr_1fr] gap-4 mb-4">
                            <div className="col-start-2 bg-Lighter_gray flex flex-col rounded-md">
                                <div className="text-center my-4">
                                    <span className="font-sans font-semibold text-Blue text-xl">
                                        Đổi mới và tiện lợi
                                    </span>
                                </div>

                                <div className="mx-5 mb-4">
                                    <p className="font-sans font-semibold">
                                        Chúng tôi liên tục mở rộng ranh giới của thương mại điện tử để cung cấp các tính năng tiên tiến giúp việc mua sắm trở nên nhanh chóng, dễ dàng và thú vị.
                                    </p>
                                </div>
                            </div>

                            <div className="col-start-3 bg-Lighter_gray flex flex-col rounded-md">
                                <div className="text-center my-4">
                                    <span className="font-sans font-semibold text-Blue text-xl">
                                        Xây dựng niềm tin
                                    </span>
                                </div>

                                <div className="mx-5 mb-4">
                                    <p className="font-sans font-semibold">
                                        Chúng tôi nỗ lực đảm bảo tính minh bạch, độ tin cậy và trách nhiệm giải trình trong mọi khía cạnh của nền tảng, dù là thông qua hỗ trợ khách hàng, thanh toán an toàn hay danh sách sản phẩm xác thực.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default AboutMarkey;