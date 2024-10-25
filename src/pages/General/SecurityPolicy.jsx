import React from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import Footer from "../../components/General/Footer";

const SecurityPolicy = () => {
    return (
        <div className="bg-Light_gray overflow-x-hidden">
            <SecondaryHeader head="Chính sách bảo mật"/>

            <main className="grid grid-cols-[1fr_10fr_1fr] w-screen">
                <div className="col-start-2 bg-White my-4">
                    <div className="grid grid-rows-auto">
                        <div className="flex items-center justify-center relative h-[5rem] my-2">
                            <div className="text-center">
                                <span className="text-2xl font-sans font-bold">
                                    CHÍNH SÁCH BẢO MẬT
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
                                        I. Thu thập thông tin cá nhân
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Khi bạn tạo tài khoản, mua hàng hoặc liên hệ với chúng tôi, chúng tôi có thể thu thập các thông tin cá nhân như tên, địa chỉ email, địa chỉ giao hàng, số điện thoại và thông tin thanh toán.
                                        </li>

                                        <li className="ml-8">
                                            Khi bạn truy cập Markey, chúng tôi tự động thu thập một số thông tin như địa chỉ IP, loại trình duyệt, lịch sử truy cập và hành vi sử dụng trang web thông qua cookie hoặc công nghệ tương tự.
                                        </li>

                                        <li className="ml-8">
                                            Chúng tôi có thể thu thập thông tin từ các nguồn bên ngoài như mạng xã hội, đối tác quảng cáo hoặc nhà cung cấp dịch vụ thanh toán.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        II. Mục đích sử dụng thông tin
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Chúng tôi sử dụng thông tin cá nhân để tạo tài khoản, xử lý đơn hàng, giao hàng và cung cấp dịch vụ khách hàng.
                                        </li>

                                        <li className="ml-8">
                                            Thông tin thu thập được sẽ giúp chúng tôi cải thiện giao diện và chức năng của Markey, đồng thời cá nhân hóa trải nghiệm người dùng.
                                        </li>

                                        <li className="ml-8">
                                            Chúng tôi có thể sử dụng thông tin cá nhân để gửi các thông tin tiếp thị, chương trình khuyến mãi và cập nhật về sản phẩm nếu bạn đồng ý nhận.
                                        </li>

                                        <li className="ml-8">
                                            Thông tin của bạn sẽ được sử dụng để ngăn chặn các hành vi gian lận, bảo vệ an ninh tài khoản và bảo vệ quyền lợi của Markey.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        III. Chia sẻ thông tin cá nhân
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Chúng tôi có thể chia sẻ thông tin cá nhân với các nhà cung cấp dịch vụ bên thứ ba để xử lý thanh toán, giao hàng, lưu trữ dữ liệu hoặc cung cấp các chức năng khác của trang web.
                                        </li>

                                        <li className="ml-8">
                                            Trong trường hợp cần thiết, chúng tôi có thể chia sẻ thông tin của bạn với các cơ quan thực thi pháp luật hoặc khi yêu cầu bởi pháp luật để bảo vệ quyền lợi và tài sản của Markey.
                                        </li>

                                        <li className="ml-8">
                                            Nếu có sự hợp nhất, mua lại hoặc chuyển nhượng tài sản, thông tin cá nhân của bạn có thể được chuyển giao cho bên thứ ba liên quan, nhưng bạn sẽ được thông báo về bất kỳ thay đổi nào liên quan.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        IV. Bảo mật thông tin cá nhân
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Chúng tôi sử dụng các biện pháp kỹ thuật và quản lý để bảo vệ thông tin cá nhân của bạn khỏi các truy cập trái phép, tiết lộ hoặc sử dụng sai mục đích.
                                        </li>

                                        <li className="ml-8">
                                            Thông tin của bạn được lưu trữ trong khoảng thời gian cần thiết để cung cấp dịch vụ và tuân thủ quy định pháp luật.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        V. Quyền của người dùng
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Bạn có quyền truy cập, chỉnh sửa hoặc cập nhật thông tin cá nhân của mình thông qua tài khoản trên Markey.
                                        </li>

                                        <li className="ml-8">
                                            Bạn có quyền yêu cầu chúng tôi xóa thông tin cá nhân của mình, trừ khi việc lưu trữ thông tin là bắt buộc theo quy định pháp luật.
                                        </li>

                                        <li className="ml-8">
                                            Bạn có thể từ chối nhận các thông báo tiếp thị từ Markey bất kỳ lúc nào bằng cách chỉnh sửa cài đặt trong tài khoản hoặc liên hệ với chúng tôi.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        VI. Cookie và công nghệ theo dõi
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Chúng tôi sử dụng cookie để theo dõi hành vi duyệt web và lưu trữ thông tin như tùy chọn người dùng để cải thiện trải nghiệm.
                                        </li>

                                        <li className="ml-8">
                                            Bạn có thể tùy chỉnh hoặc từ chối sử dụng cookie thông qua cài đặt trình duyệt, nhưng điều này có thể ảnh hưởng đến chức năng của trang web.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        VII. Thay đổi chính sách bảo mật
                                    </span>

                                    <ol className="list-decimal">
                                        <li className="ml-8">
                                            Chúng tôi có quyền cập nhật Chính sách Bảo mật này theo thời gian. Mọi thay đổi sẽ được công bố trên trang web và có hiệu lực ngay sau khi đăng.
                                        </li>

                                        <li className="ml-8">
                                            Bạn nên kiểm tra Chính sách Bảo mật thường xuyên để nắm được các thay đổi.
                                        </li>
                                    </ol>
                                </div>

                                <div className="mb-4">
                                    <span className="font-bold font-sans">
                                        VIII. Thông tin liên hệ
                                    </span>
                                    <br/>
                                    <span className="font-sans">
                                        Nếu bạn có bất kỳ câu hỏi nào về Chính sách Bảo Mật này, vui lòng liên hệ với chúng tôi qua:
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

export default SecurityPolicy;