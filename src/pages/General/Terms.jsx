import React from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";

const Terms = () => {
    return (
        <div className="bg-Light_gray overflow-x-hidden">
            <SecondaryHeader head="Điều khoản sử dụng"/>

            <main className="grid grid-cols-[1fr_10fr_1fr] w-screen">
                <div className="col-start-2 bg-White my-4">
                    <div className="grid grid-rows-auto">
                        <div className="flex items-center justify-center relative h-[5rem] my-2">
                            <div className="text-center">
                                <span className="text-2xl font-sans font-bold">
                                    ĐIỀU KHOẢN SỬ DỤNG
                                </span>
                            </div>

                            <div className="absolute right-2">
                                <img src="/Markey_blue_vertical.png" alt="Markey" className="object-cover h-[5rem] w-[5rem]"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-[1fr_10fr_1fr]">
                            <div className="col-start-2">
                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        I. Điều khoản tổng quát
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Bạn sẽ không sử dụng nền tảng này cho bất kỳ mục đích nào bất hợp pháp hoặc
                                            không
                                            được ủy quyền.
                                        </li>

                                        <li className="ml-8">
                                            Bạn chịu trách nhiệm giữ bí mật thông tin tài khoản của mình, bao gồm cả mật
                                            khẩu.
                                        </li>

                                        <li className="ml-8">
                                            Markey có quyền chấm dứt hoặc tạm ngưng tài khoản của người dùng nếu phát
                                            hiện
                                            hành vi gian lận hoặc gây hại.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        II. Đăng ký tài khoản
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Bạn phải tạo tài khoản để truy cập một số tính năng nhất định của Markey.
                                        </li>

                                        <li className="ml-8">
                                            Bạn phải cung cấp thông tin cá nhân chính xác và cập nhật khi đăng ký.
                                        </li>

                                        <li className="ml-8">
                                            Bạn có trách nhiệm cập nhật thông tin của mình khi có sự thay đổi.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        III. Mua hàng và thanh toán
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Tất cả các khoản thanh toán cho sản phẩm và dịch vụ phải được thực hiện
                                            thông qua các phương thức thanh toán có sẵn trên Markey.
                                        </li>

                                        <li className="ml-8">
                                            Giá cả có thể thay đổi vào bất kỳ lúc nào mà không cần thông báo trước.
                                        </li>

                                        <li className="ml-8">
                                            Markey không chịu trách nhiệm về bất kỳ phí hoặc chi phí nào do nhà cung cấp
                                            dịch vụ thanh toán hoặc ngân hàng của bạn áp dụng.
                                        </li>

                                        <li className="ml-8">
                                            Trong trường hợp thanh toán thất bại hoặc bị thu hồi, Markey có thể tạm
                                            ngưng tài khoản của bạn và thực hiện các hành động pháp lý nếu cần thiết.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        IV. Giao hàng và vận chuyển
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Thời gian giao hàng ước tính sẽ được cung cấp cho tất cả các đơn hàng nhưng có thể thay đổi do các yếu tố bên ngoài.
                                        </li>

                                        <li className="ml-8">
                                            Phí và chính sách vận chuyển sẽ được hiển thị trong quá trình thanh toán.
                                        </li>

                                        <li className="ml-8">
                                            Bạn có trách nhiệm cung cấp địa chỉ giao hàng chính xác.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        V. Hoàn tiền và trả lại hàng
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Khách hàng có thể trả lại sản phẩm theo chính sách trả hàng của Markey.
                                        </li>

                                        <li className="ml-8">
                                            Sản phẩm phải được trả lại trong bao bì gốc và tình trạng ban đầu. Một số sản phẩm có thể không đủ điều kiện để trả lại.
                                        </li>

                                        <li className="ml-8">
                                            Hoàn tiền sẽ được xử lý theo Chính sách Hoàn tiền của Markey và phụ thuộc vào phương thức thanh toán đã sử dụng.
                                        </li>

                                        <li className="ml-8">
                                            Markey có quyền từ chối trả lại hoặc hoàn tiền nếu không đáp ứng điều kiện chính sách.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        VI. Hành vi người dùng
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Bạn không được sử dụng nền tảng này cho các hoạt động gian lận hoặc gây hiểu lầm.
                                        </li>

                                        <li className="ml-8">
                                            Bạn không được tải lên hoặc phân phối nội dung bất hợp pháp, gây hại, phỉ báng hoặc khiêu dâm.
                                        </li>

                                        <li className="ml-8">
                                            Bạn không được thực hiện hành vi spam, hack, hoặc can thiệp vào hoạt động bình thường của nền tảng.
                                        </li>

                                        <li className="ml-8">
                                            Bạn không được giả mạo danh tính của người khác hoặc tổ chức.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        VII. Quyền sở hữu trí tuệ
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Tất cả nội dung trên website của Markey thuộc sở hữu của Markey hoặc các bên cấp phép và được bảo vệ bởi luật bản quyền và thương hiệu.
                                        </li>

                                        <li className="ml-8">
                                            Bạn không được sao chép, phân phối hoặc chỉnh sửa bất kỳ nội dung nào mà không có sự cho phép bằng văn bản từ Markey.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        VIII. Giới hạn trách nhiệm
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Markey không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên hoặc hậu quả nào phát sinh từ việc sử dụng nền tảng.
                                        </li>

                                        <li className="ml-8">
                                            Chúng tôi không đảm bảo rằng dịch vụ sẽ không bị gián đoạn hoặc không có lỗi.
                                        </li>

                                        <li className="ml-8">
                                            Markey không chịu trách nhiệm cho bất kỳ thiệt hại nào do sự chậm trễ hoặc gián đoạn gây ra.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        IX. Liên kết bên thứ ba
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Markey có thể chứa các liên kết đến trang web hoặc dịch vụ của bên thứ ba.
                                        </li>

                                        <li className="ml-8">
                                            Markey không chịu trách nhiệm hoặc bảo đảm cho bất kỳ nội dung, sản phẩm hoặc dịch vụ nào của bên thứ ba.
                                        </li>

                                        <li className="ml-8">
                                            Bạn truy cập các liên kết của bên thứ ba là rủi ro của chính bạn.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        X. Sửa đổi điều khoản
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Markey có quyền sửa đổi hoặc thay thế các Điều khoản Sử dụng này vào bất kỳ lúc nào.
                                        </li>

                                        <li className="ml-8">
                                            Bạn có trách nhiệm xem lại Điều khoản Sử dụng định kỳ.
                                        </li>

                                        <li className="ml-8">
                                            Việc bạn tiếp tục sử dụng trang web sẽ được coi là chấp nhận những thay đổi đó.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        XI. Luật quản lý
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Các điều khoản này được điều chỉnh và giải thích theo luật pháp của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
                                        </li>

                                        <li className="ml-8">
                                            Mọi tranh chấp phát sinh từ các điều khoản này sẽ thuộc thẩm quyền của tòa án ở nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        XII. Thông tin liên hệ
                                    </span>
                                    <br/>
                                    <span className="font-sans">
                                        Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản này, vui lòng liên hệ với chúng tôi tại:
                                    </span>

                                    <ul className="list-disc">
                                        <li className="ml-8">
                                            Email: markey@gmail.com
                                        </li>

                                        <li className="ml-8">
                                            Địa chỉ: Khu phố 6, P.Linh Trung, Tp.Thủ Đức, Tp.Hồ Chí Minh
                                        </li>

                                        <li className="ml-8">
                                            Số điện thoại: (+84) 938 318 615
                                        </li>
                                    </ul>
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

export default Terms;