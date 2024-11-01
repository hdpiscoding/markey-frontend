import React from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import product_1 from "../../assets/product_1.png";
import Footer from "../../components/General/Footer";
import {Link} from "react-router-dom";

const ViewShopInfo = () => {
    const salesman = { id: "1", name: "Nguyễn Văn A", cccd: "123456789012", email: "abc@gmail.com", phone: "0909090909", shopName: "Cửa hàng ABC", address: "123 Đường XYZ, Quận 1, TP.HCM", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.\n" +
            "\n" +
            "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.\n" +
            "\n" + "Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc," };

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Kênh người bán"/>

            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={6}/>
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[2rem] font-semibold">
                                        Chỉnh sửa thông tin người bán
                                    </span>
                                </div>

                                <div className="flex items-center justify-center gap-10">
                                    <Link to="/salesman/edit-profile">
                                        <span className="font-semibold text-Blue cursor-pointer hover:text-Dark_blue">
                                            Sửa
                                        </span>
                                    </Link>

                                </div>
                            </div>

                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="rounded-[50%] bg-Light_gray h-[120px] w-[120px] flex items-center justify-center">
                                <img src={product_1} alt="Selected"
                                     className="w-full h-full border rounded-[50%] object-cover"/>
                            </div>
                        </div>

                        <table className="w-[100%]">
                            <tbody>
                            <tr>
                                <td className="py-5">*Họ và tên:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.name}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Căn cước công dân:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.cccd}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Email:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.email}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Số điện thoại:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.phone}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Tên cửa hàng:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.shopName}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Địa chỉ:</td>
                                <td className="py-5">
                                    <span className="font-semibold">
                                        {salesman.address}
                                    </span>
                                </td>
                            </tr>
                            </tbody>

                            <tbody>
                            <tr>
                                <td className="py-5">*Mô tả của hàng:</td>
                                <td className="py-5 w-[80%]">
                                    <p className="whitespace-pre-line">
                                        {salesman.description}
                                    </p>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default ViewShopInfo;