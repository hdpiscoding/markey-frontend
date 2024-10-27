import React, {useEffect, useState} from 'react';

const AddressModal = ({open, onClose, name, phone, address, onUpdateInfo}) => {
    const [newName, setNewName] = useState(name ?? "");
    const [newPhone, setNewPhone] = useState(phone ?? "");
    const [newAddress, setNewAddress] = useState(address ?? "");

    const handleNameChange = (event) => {
        const value = event.target.value;

        // Chỉ loại bỏ các ký tự không phải chữ cái hoặc khoảng trắng
        const sanitizedValue = value.replace(/[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/g, '');

        setNewName(sanitizedValue);
    }

    const handlePhoneChange = (event) => {
        const value = event.target.value;
        // Sử dụng regex để chỉ cho phép nhập số và giới hạn tối đa 10 ký tự
        const sanitizedValue = value.replace(/[^0-9]/g, '');

        // Giới hạn tối đa chỉ cho phép nhập 10 chữ số
        if (sanitizedValue.length <= 10) {
            setNewPhone(sanitizedValue);
        }
    }
    const handleAddressChange = (event) => {
        setNewAddress(event.target.value);
    }

    const [errors, setErrors] = useState({
        name: '',
        address: '',
        phone: ''
    });

    // Reset form state
    const resetForm = () => {
        setErrors({
            name: '',
            phone: '',
            address: ''
        });
    };

    const handleClose = () => {
        resetForm(); // Reset form state when closing
        onClose(); // Call the onClose function passed from props
    };

    // Reset form when modal opens
    useEffect(() => {
        if (open) {
            resetForm();
        }
    }, [open]); // Chạy khi mở modal

    if (!open) return null;

    const validateForm = () => {
        let newErrors = { name: '', phone: '', address: '' };

        // Chỉ kiểm tra khi người dùng đã nhập giá trị
        if (!newName) {
            newErrors.name = 'Họ và tên không được để trống';
        }
        if (!newPhone) {
            newErrors.phone = 'Số điện thoại không được để trống';
        } else if (!/^\d{10}$/.test(newPhone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }
        if (!newAddress) {
            newErrors.address = 'Địa chỉ không được để trống';
        }

        setErrors(newErrors);
        return !newErrors.name && !newErrors.phone && !newErrors.address;
    };

    const handleUpdate = () => {
        if (validateForm()) {
            // Logic cập nhật khi form hợp lệ
            console.log('Form hợp lệ, thực hiện cập nhật...');
            onUpdateInfo(newName, newPhone, newAddress);
            onClose();
        }
    };




    return (
        // backdrop
        <div className={`fixed inset-0 flex items-center justify-center z-[100] ${open ? "visible bg-black/20" : "collapse"}`}>
            <div onClick={(e) => e.stopPropagation()}
                 className={`bg-White rounded-sm shadow w-[40rem] h-[25rem] grid grid-rows-[85%_15%] ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <div className="flex flex-col px-4 py-2 gap-5">
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-2xl">
                            Cập nhật địa chỉ
                        </span>
                        <div className="border-t-2 w-full text-Dark_gray"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <span>Họ và tên</span>
                            <input
                                type="text"
                                className={`border ${errors.name ? 'border-Red' : 'border-Black'} focus:outline-none rounded-sm p-2 py-1 ${errors.name ? 'text-Red' : ''}`}
                                value={newName}
                                onChange={handleNameChange}
                            />
                            {errors.name && <p className="text-Red text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <span>Số điện thoại</span>
                            <input
                                type="text"
                                className={`border ${errors.phone ? 'border-Red' : 'border-Black'} focus:outline-none rounded-sm px-2 py-1 ${errors.phone ? 'text-Red' : ''}`}
                                value={newPhone}
                                onChange={handlePhoneChange}
                            />
                            {errors.phone && <p className="text-Red text-sm mt-1">{errors.phone}</p>}
                        </div>
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
                </div>

                <div className="flex flex-row-reverse gap-4 mx-4">
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
    );
};

export default AddressModal;