import React, {useState, useEffect, useRef} from 'react';
import versace from '../../assets/versace_cologne.svg';
import { FaMinus, FaPlus } from "react-icons/fa6";

const CartItemListView = (props) => {
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    // state for quantity
    const [amount, setAmount] = useState(props.amount ?? 1);

    // state for selling price
    const [price, setPrice] = useState((props.price * props.amount) ?? 0);


    const increaseQuantity = () => {
        // Call API to update quantity of the product in the cart by 1
        setAmount(amount + 1);
    };

    const decreaseQuantity = () => {
        // Call API to update quantity of the product in the cart by -1
        setAmount(amount - 1);
    };

    const handleDelete = () => {
        setAmount(0);
    }

    useEffect(() => {
        setPrice(props.price * amount);
        props.onChange(props.id, amount);
    }, [amount]);

    return (
        <div className="col-start-2 border-t flex flex-col mb-3 bg-White rounded-md shadow">
            <div className="grid grid-cols-[1.5fr_5.5fr_1.5fr_2fr_1.5fr_1fr] items-center">
                <div className="col-start-1 flex items-center justify-center select-none">
                    <img src={props.picture} alt="product" className="object-cover h-[8rem] w-[8rem] p-4"/>
                </div>

                <div className="flex flex-col justify-between col-start-2">
                    <span className="text-pretty line-clamp-2 break-words">
                        {props.name ?? "Nước hoa Versace hương thơm đẳng cấp, làm chủ cuộc chơi "}
                    </span>

                    <div className="border border-Red self-start flex items-center justify-center mt-2">
                        <span className="text-Red text-[0.75rem] px-1 py-1">
                            Miễn phí đổi trả trong 7 ngày
                        </span>
                    </div>
                </div>

                <div className="col-start-3 flex items-center justify-center">
                    <span className="text-Black text-lg">
                        ₫ {formatNumberWithDots(props.price) ?? "700.000.000"}
                    </span>
                </div>

                <div className="flex items-center justify-center col-start-4">
                    <div className="max-w-[150px] border border-Black grid grid-cols-[25%_50%_25%] items-center">
                        {amount === 1
                            ?
                            <button
                                className="border-r h-[28px] w-[37.5px] border-r-Black flex items-center justify-center select-none cursor-not-allowed"
                                disabled>
                                <FaMinus className="object-cover text-Dark_gray"/>
                            </button>
                            :
                            <button
                                className="border-r h-[28px] w-[37.5px] border-r-Black flex items-center justify-center select-none"
                                onClick={decreaseQuantity}>
                                <FaMinus className="object-cover"/>
                            </button>}

                        <div className="col-start-2  w-[75px] flex items-center justify-center">
                            {/*<input type="text" className="border-none focus:outline-none w-full text-center"*/}
                            {/*       value={amount} onChange={handleInputChange}/>*/}
                            <span>
                                {amount ?? 1}
                            </span>
                        </div>

                        <button
                            className="col-start-3 border-l h-[28px] w-[37.5px] border-l-Black flex items-center justify-center select-none" onClick={increaseQuantity}>
                            <FaPlus className="object-cover"/>
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-center col-start-5">
                    <span className="text-Red text-lg font-bold">
                        ₫ {formatNumberWithDots(price)}
                    </span>
                </div>

                <div className="col-start-6 flex items-center justify-center cursor-pointer select-none">
                    <span className="text-Red font-bold hover:underline hover:text-Dark_red" onClick={handleDelete}>
                        Xóa
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartItemListView;