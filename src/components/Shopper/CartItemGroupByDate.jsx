import React, {useState} from 'react';

const CartItemGroupByDate = (props) => {
    const [productList, setProductList] = useState([{
        id: 1, name: "Nước hoa Versace Pour Homme", price: 500000, max_quantity: 104,
    }, {
        id: 2, name: "Nước hoa Hugo Boss", price: 100000, max_quantity: 115,
    }, {
        id: 3, name: "Nước hoa Chanel", price: 40000, max_quantity: 162,
    }, {
        id: 4, name: "Nước hoa Dior", price: 140000, max_quantity: 165,
    },]);

    return (
        <div className="bg-White rounded-sm shadow">
            <div className="flex flex-col mt-5 col-start-2">
                <div className="ml-4 my-4">
                    <span className="font-bold text-xl">
                        {props.date ?? "18/04/2024"}
                    </span>
                </div>

                <div>
                    {productList.map((product) => (
                        <div>
                            <hr className="border-t border-Black select-none opacity-25"/>

                            <div className="grid grid-cols-[0.25fr_11.5fr_0.25fr]">

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CartItemGroupByDate;