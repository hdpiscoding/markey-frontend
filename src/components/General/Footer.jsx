import React from 'react';
import facebook_svg from "../../assets/facebook.svg";
import instagram_svg from "../../assets/instagram.svg";
import gmail_svg from "../../assets/gmail.svg";
import phone_svg from "../../assets/phone.svg";

const Footer = () => {
    return (
        <footer className="shadow grid grid-rows-[1fr_auto] bg-White">
            <div className="grid grid-cols-[1fr_10fr_1fr] bg-White mt-5">
                <div className="col-start-2">
                    <div className="grid grid-cols-[auto_1fr_1fr] content-center justify-items-center">
                        <div className="flex flex-col items-center justify-center">
                            <div className="select-none">
                                <img src="/Markey_blue_vertical.png" alt="Markey"
                                     className="object-cover h-[100px] w-[100px]"/>
                            </div>

                            <div>
                            <span className="text-Light_blue font-sans font-semibold text-sm">
                                Mở khóa tiềm năng
                            </span>
                            </div>

                            <div className="mt-[-5px]">
                            <span className="text-Light_blue font-sans font-semibold text-sm">
                                mua sắm của bạn
                            </span>
                            </div>
                        </div>

                        <div className="col-start-2">
                            <div className="mb-1.5">
                            <span className="text-Black font-sans font-bold text-lg">
                                Về chúng tôi
                            </span>
                            </div>

                            <div>
                                <ul className="space-y-1">
                                    <li>
                                        <a href="#">
                                            <span className="text-Gray hover:text-Blue font-sans text-sm">
                                                Thông tin về Markey
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                        <span className="text-Gray hover:text-Blue font-sans text-sm">
                                            Điều khoản Markey
                                        </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                        <span className="text-Gray hover:text-Blue font-sans text-sm">
                                            Chính sách bảo mật
                                        </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-start-3">
                            <div className="mb-1.5">
                                <span className="text-Black font-sans font-bold text-lg">
                                    Liên hệ với chúng tôi
                                </span>
                            </div>

                            <div>
                                <ul className="space-y-1">
                                    <li className="flex items-center gap-2">
                                        <div className="mt-0.5">
                                            <img src={facebook_svg} alt="facebook"
                                                 className="object-cover h-[1rem] w-[1rem]"/>
                                        </div>

                                        <div>
                                            <a href="#">
                                            <span className="text-Gray hover:text-Blue font-sans text-sm">
                                                Facebook
                                            </span>
                                            </a>
                                        </div>
                                    </li>

                                    <li className="flex items-center gap-2">
                                        <div className="mt-0.5">
                                            <img src={instagram_svg} alt="instagram"
                                                 className="object-cover h-[1rem] w-[1rem]"/>
                                        </div>

                                        <div>
                                            <a href="#">
                                            <span className="text-Gray hover:text-Blue font-sans text-sm">
                                                Instagram
                                            </span>
                                            </a>
                                        </div>
                                    </li>

                                    <li className="flex items-center gap-2">
                                        <div className="mt-0.5">
                                            <img src={gmail_svg} alt="gmail"
                                                 className="object-cover h-[0.8rem] w-[1rem]"/>
                                        </div>

                                        <div>
                                            <a href="#">
                                            <span className="text-Gray hover:text-Blue font-sans text-sm">
                                                markey@gmail.com
                                            </span>
                                            </a>
                                        </div>
                                    </li>

                                    <li className="flex items-center gap-2">
                                        <div className="mt-0.5">
                                            <img src={phone_svg} alt="phone"
                                                 className="object-cover h-[1rem] w-[1rem]"/>
                                        </div>

                                        <div>
                                            <a href="#">
                                            <span className="text-Gray hover:text-Blue font-sans text-sm">
                                                (+89) 938 318 615
                                            </span>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row-start-2 text-center mt-1">
                <span className="text-Gray text-[0.5rem] font-sans">
                    © 2024 Markey. Tất cả quyền được bảo lưu.
                </span>
            </div>
        </footer>
    );
};

export default Footer;