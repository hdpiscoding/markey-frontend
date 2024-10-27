import React from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import Footer from "../../components/General/Footer";

const ViewVoucher = () => {
    const voucher = { id: '1', name: "Voucher mùa thu", discount: 10, code: "CMT8-1945", stock: 10 };

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <SecondaryHeader head="Kênh người bán"/>
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <SalesmanNav currentPage={4}/>
                    </div>

                    <div className="col-start-3 flex flex-col px-4 py-3 bg-White select-none gap-5">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-[2rem] font-semibold">
                                        Chi tiết voucher
                                    </span>
                                </div>

                                <div className="flex items-center justify-center gap-10">
                                    <span className="font-semibold text-Blue cursor-pointer hover:text-Dark_blue">
                                        Sửa
                                    </span>

                                    <span className="font-semibold text-Red cursor-pointer hover:text-Dark_red">
                                        Xóa
                                    </span>
                                </div>
                            </div>


                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <table className="w-[80%]">
                            <tbody>
                            <tr>
                                <td className="py-5">Tên voucher:</td>
                                <td className="py-5 relative"> {/* Thêm class relative */}
                                    <span className="font-semibold">
                                        {voucher.name}
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td className="py-5">Mã voucher:</td>
                                <td className="py-5 relative">
                                    <span className="font-semibold">
                                        {voucher.code}
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td className="py-5">Giảm giá (%):</td>
                                <td className="py-5 relative">
                                    <span className="font-semibold">
                                        {voucher.discount}%
                                    </span>
                                </td>
                            </tr>

                            <tr>
                                <td className="py-5">Số lượng:</td>
                                <td className="py-5 relative">
                                    <span className="font-semibold">
                                        {voucher.stock}
                                    </span>
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

export default ViewVoucher;