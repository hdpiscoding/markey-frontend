import React, {useState, useEffect, useRef} from 'react';
import versace from '../../assets/versace_cologne.svg';
import { FaMinus, FaPlus } from "react-icons/fa6";
import voucher_svg from '../../assets/voucher.svg';
import VoucherModal from "./VoucherModal";

const CartItemListView = (props) => {
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    // state for checkbox
    const [checked, setChecked] = useState(false);

    // state for empty input
    const [isEmpty, setIsEmpty] = useState(false);

    // state for voucher
    const [voucher, setVoucher] = useState({ id: '', name: "", discount: 0, applyProduct: "" });

    // state for modal
    const [open, setOpen] = useState(false);

    const unit_price = props.price ?? 500000000;

    // state for quantity
    const [quantity, setQuantity] = useState(1);

    // state for selling price
    const [sellingPrice, setSellingPrice] = useState((unit_price * quantity) ?? 0);

    const handleCheckChange = (event) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);

        // Update shopper cart's total price
        props.onItemChange(props.id, sellingPrice, newChecked);
    }

    const handleVoucherSelect = (voucher) => {
        setVoucher(voucher);
    }

    const increaseQuantity = () => {
        quantity === '' ? setQuantity(1) : setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;

        value === '' ? setIsEmpty(true) : setIsEmpty(false);

        if (value === '0') {
            setQuantity(1);
            return;
        }

        // Chỉ cập nhật state nếu giá trị là một số hợp lệ
        if (value === '' || /^\d+$/.test(value)) {
            setQuantity(value === '' ? '' : parseInt(value));
        }
    };

    const calculateSellingPrice = () => {
        return voucher.id !== ''
            ? unit_price * quantity * (1 - voucher.discount / 100)
            : unit_price * quantity;
    };

    // Đồng bộ hóa trạng thái checked từ prop nếu prop thay đổi
    useEffect(() => {
        setChecked(props.isChecked);
    }, [props.isChecked]);


    useEffect(() => {
        const newSellingPrice = calculateSellingPrice();
        setSellingPrice(newSellingPrice);

        props.onItemChange(props.id, newSellingPrice, checked);
    }, [sellingPrice, voucher, checked, quantity]);

    return (
        <div className="col-start-2 border-t flex flex-col mb-3">
            <div className="grid grid-cols-[0.5fr_1fr_5.5fr_1.5fr_2fr_1.5fr_1fr] items-center">
                <div className="col-start-1 flex items-center justify-center select-none">
                    <input type="checkbox" className="checked:bg-Blue w-5 h-5 cursor-pointer" onChange={handleCheckChange}/>
                </div>

                <div className="col-start-2 flex items-center justify-center select-none">
                    <img src={versace} alt="product" className="object-cover h-[8rem] w-[8rem]"/>
                </div>

                <div className="flex flex-col justify-between col-start-3">
                    <span className="text-pretty line-clamp-2 break-words">
                        {props.name ?? "Nước hoa Versace hương thơm đẳng cấp, làm chủ cuộc chơi "}
                    </span>

                    <div className="border border-Red self-start flex items-center justify-center mt-2">
                        <span className="text-Red text-[0.75rem] px-1 py-1">
                            Miễn phí đổi trả trong 7 ngày
                        </span>
                    </div>
                </div>

                <div className="col-start-4 flex items-center justify-center">
                    <span className="text-Black text-lg">
                        ₫ {formatNumberWithDots(unit_price) ?? "700.000.000"}
                    </span>
                </div>

                <div className="flex items-center justify-center col-start-5">
                    <div className="max-w-[150px] border border-Black grid grid-cols-[25%_50%_25%] items-center">
                        {quantity === 1
                            ?
                            <button
                                className="border-r h-[28px] border-r-Black flex items-center justify-center select-none cursor-not-allowed"
                                disabled>
                                <FaMinus className="object-cover text-Dark_gray"/>
                            </button>
                            :
                            <button
                                className="border-r h-[28px] border-r-Black flex items-center justify-center select-none"
                                onClick={decreaseQuantity}>
                                <FaMinus className="object-cover"/>
                            </button>}

                        <div className="col-start-2">
                            <input type="text" className="border-none focus:outline-none w-full text-center"
                                   value={quantity} onChange={handleInputChange}/>
                        </div>

                        <button
                            className="border-l h-[28px] border-l-Black flex items-center justify-center select-none" onClick={increaseQuantity}>
                            <FaPlus className="object-cover"/>
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-center col-start-6">
                    {voucher.id !== ''
                        ?
                        <span className="text-Red text-lg font-bold">
                            ₫ {formatNumberWithDots(sellingPrice)}
                        </span>
                        :
                        (isEmpty
                            ?
                            <span className="text-Red text-lg font-bold">
                                ₫ {formatNumberWithDots(unit_price)}
                            </span>
                            :
                            <span className="text-Red text-lg font-bold">
                                ₫ {formatNumberWithDots(sellingPrice)}
                            </span>)
                    }
                </div>

                <div className="col-start-7 flex items-center justify-center cursor-pointer select-none">
                    <span className="text-Red font-bold hover:underline hover:text-Dark_red" onClick={() => {
                        props.onDelete(props.id);
                    } }>
                        Xóa
                    </span>
                </div>
            </div>

            <div>
                <hr className="border-t border-Black mx-3 select-none opacity-25"/>
            </div>

            <div className="grid grid-cols-[0.5fr_11.5fr] mt-4">
                <div className="flex items-center justify-center select-none">
                    <img src={voucher_svg} alt="voucher" className="object-cover w-5 h-[13px]"/>
                </div>

                <div className="flex select-none items-center">
                    {(voucher.id === '')
                        ?
                        <span className="text-Blue font-semibold cursor-pointer  hover:text-Dark_blue" onClick={() => { setOpen(true); }}>
                            Thêm voucher
                        </span>
                        :
                        <div className="flex items-center gap-5">
                            <span className="font-semibold">
                                {voucher.name}, giảm {voucher.discount}%
                            </span>

                            <span className="text-Blue font-semibold cursor-pointer hover:text-Dark_blue" onClick={() => { setOpen(true); }}>
                                Đổi voucher khác
                            </span>
                        </div>
                    }
                </div>

                <div>
                    <VoucherModal
                        open={open}
                        onClose={() => { setOpen(false); }}
                        onSelectVoucher={handleVoucherSelect}
                        selectedVoucherID={voucher.id}></VoucherModal>
                </div>
            </div>
        </div>
    );
};

export default CartItemListView;