import React, {useEffect, useState} from 'react';
import {instance} from "../../AxiosConfig";

const AddressModal = ({open, onClose, address, id, onUpdate}) => {
    const [newAddress, setNewAddress] = useState(address ?? "");

    const handleAddressChange = (event) => {
        setNewAddress(event.target.value);
    }

    const [errors, setErrors] = useState({
        address: ''
    });

    // Reset form state
    const resetForm = () => {
        setErrors({
            address: ''
        });
    };

    const handleClose = () => {
        onUpdate();
        resetForm(); // Reset form state when closing
        onClose(); // Call the onClose function passed from props
    };

    if (!open) return null;

    const validateForm = () => {
        let newErrors = { address: '' };

        // Chỉ kiểm tra khi người dùng đã nhập giá trị
        if (!newAddress) {
            newErrors.address = 'Địa chỉ không được để trống';
        }

        setErrors(newErrors);
        return !newErrors.address;
    };

    const handleUpdate = async () => {
        if (validateForm()) {
            // Logic cập nhật khi form hợp lệ
            try {
                let data = {
                    address: newAddress
                }
                await instance.put(`v1/user-service/shopper/${id}`, data);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                handleClose();
            }
        }
    };

    return (
        // backdrop
        <div className={`fixed inset-0 flex items-center justify-center z-[100] ${open ? "visible bg-black/20" : "collapse"}`}>
            <div onClick={(e) => e.stopPropagation()}
                 className={`bg-White rounded-sm shadow w-[40rem] h-[15rem] grid grid-rows-[85%_15%] ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <div className="flex flex-col px-4 py-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-2xl">
                            Cập nhật địa chỉ
                        </span>
                        <div className="border-t-2 w-full text-Dark_gray"></div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span>Địa chỉ cụ thể</span>
                        <textarea
                            className={`border ${errors.address ? 'border-Red' : 'border-Black'} focus:outline-none rounded-sm p-2 w-full resize-none ${errors.address ? 'text-Red' : ''}`}
                            value={newAddress}
                            onChange={handleAddressChange}
                        />
                        {errors.address && <p className="text-Red text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="flex flex-row-reverse gap-4">
                        <div>
                            <button className="bg-Blue text-White rounded-md py-2 px-4 hover:bg-Dark_blue"
                                    onClick={handleUpdate}>
                                <span>Cập nhật</span>
                            </button>
                        </div>

                        <div>
                            <button className="bg-Red rounded-md py-2 px-4 hover:bg-Dark_red" onClick={handleClose}>
                                <span className="text-White">Hủy</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressModal;