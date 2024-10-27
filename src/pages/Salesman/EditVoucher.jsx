import React, {useEffect, useState} from 'react';
import SecondaryHeader from "../../components/General/SecondaryHeader";
import SalesmanNav from "../../components/Salesman/SalesmanNav";
import Footer from "../../components/General/Footer";

const EditVoucher = () => {
    const voucher = { id: '1', name: "Voucher mùa thu", discount: 10, code: "CMT8-1945", stock: 10 };

    const [fieldErrors, setFieldErrors] = useState({});
    const [formFields, setFormFields] = useState({
        categoryName: '',
        code: '',
        discount: '',
        stock: '',
    });

    useEffect(() => {
        setFormFields({
            categoryName: String(voucher.name) || '',
            code: String(voucher.code) || '',
            discount: String(voucher.discount) || '',
            stock: String(voucher.stock) || '',
        })
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const positiveIntegerRegex = /^\d*$/;

        if (name === 'discount' || name === 'stock') {
            if (positiveIntegerRegex.test(value) || value === '') {
                setFormFields((prevFields) => ({
                    ...prevFields,
                    [name]: value,
                }));
                setFieldErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: '',
                }));
            }
        } else {
            setFormFields((prevFields) => ({
                ...prevFields,
                [name]: value,
            }));
            setFieldErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    const handleSubmit = () => {
        let newFieldErrors = {};

        if (formFields.categoryName.trim() === '') {
            newFieldErrors.categoryName = "Tên voucher không được để trống.";
        }
        if (formFields.code.trim() === '') {
            newFieldErrors.code = "Mã voucher không được để trống.";
        }
        if (formFields.discount.trim() === '') {
            newFieldErrors.discount = "Giảm giá không được để trống.";
        } else if (!/^[1-9]\d*$/.test(formFields.discount)) {
            newFieldErrors.discount = "Giảm giá phải là số nguyên dương.";
        } else if (formFields.discount <= 0 || formFields.discount > 100) {
            newFieldErrors.discount = "Giảm giá phải lớn hơn 0 và nhỏ hơn hoặc bằng 100.";
        }
        if (formFields.stock.trim() === '') {
            newFieldErrors.stock = "Tồn kho không được để trống.";
        } else if (!/^[1-9]\d*$/.test(formFields.stock)) {
            newFieldErrors.stock = "Tồn kho phải là số nguyên dương.";
        }

        setFieldErrors(newFieldErrors);
    };

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
                            <div>
                                <span className="text-[2rem] font-semibold">
                                    Chỉnh sửa voucher
                                </span>
                            </div>
                            <div className="border-t-2 w-full border-Dark_gray"></div>
                        </div>

                        <table className="w-[80%]">
                            <tbody>
                            <tr>
                                <td className="py-5">*Tên voucher:</td>
                                <td className="py-5 relative"> {/* Thêm class relative */}
                                    <input
                                        type="text"
                                        name="categoryName"
                                        value={formFields.categoryName}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.categoryName ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.categoryName && (
                                        <p className="text-Red text-sm absolute left-0">{fieldErrors.categoryName}</p>
                                    )}
                                </td>
                            </tr>

                            <tr>
                                <td className="py-5">*Mã voucher:</td>
                                <td className="py-5 relative">
                                    <input
                                        type="text"
                                        name="code"
                                        value={formFields.code}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.code ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.code && (
                                        <p className="text-Red text-sm absolute left-0">{fieldErrors.code}</p>
                                    )}
                                </td>
                            </tr>

                            <tr>
                                <td className="py-5">*Giảm giá (%):</td>
                                <td className="py-5 relative">
                                    <input
                                        type="text"
                                        name="discount"
                                        value={formFields.discount}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.discount ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.discount && (
                                        <p className="text-Red text-sm absolute left-0">{fieldErrors.discount}</p>
                                    )}
                                </td>
                            </tr>

                            <tr>
                                <td className="py-5">*Số lượng:</td>
                                <td className="py-5 relative">
                                    <input
                                        type="text"
                                        name="stock"
                                        value={formFields.stock}
                                        onChange={handleInputChange}
                                        className={`w-full h-8 border ${fieldErrors.stock ? 'border-Red' : 'border-Black'} focus:outline-none px-2 rounded-sm`}
                                    />
                                    {fieldErrors.stock && (
                                        <p className="text-Red text-sm absolute left-0">{fieldErrors.stock}</p>
                                    )}
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="flex items-center justify-center">
                            <button
                                className="bg-Blue hover:bg-Dark_blue rounded-md py-1 px-10"
                                onClick={handleSubmit}
                            >
                                <span className="text-White">Thêm voucher</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default EditVoucher;