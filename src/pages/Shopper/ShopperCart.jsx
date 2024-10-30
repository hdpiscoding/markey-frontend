import React, {useEffect, useState} from 'react';
import Footer from "../../components/General/Footer";
import CartItemGroupByDate from "../../components/Shopper/CartItemGroupByDate";
import SecondaryHeader from "../../components/General/SecondaryHeader";
import CartItemListView from "../../components/Shopper/CartItemListView";

const ShopperCart = () => {
    const [cartID, setCartID] = useState("");
    const [productCount, setProductCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);


    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    const [productList, setProductList] = useState([{
        id: 1, name: "Nước hoa Versace Pour Homme", price: 500000, max_quantity: 104,
    }, {
        id: 2, name: "Nước hoa Hugo Boss", price: 100000, max_quantity: 115,
    }, {
        id: 3, name: "Nước hoa Chanel", price: 40000, max_quantity: 162,
    }, {
        id: 4, name: "Nước hoa Dior", price: 140000, max_quantity: 165,
    },]);

    useEffect(() => {
        // Call API to get cart data from the server using Token to authenticate
        // setCartID = data.shoppingCartId; (from API)
        // totalPrice = data.total; (from API)
        // productCount = data.products.length; (from API)
    }, []);

    const onChange = () => {
        // Call API to re-get cart data from the server using Token to authenticate
        // setTotalPrice = data.total; (from API)
        // setProductCount = data.products.length; (from API)
    }
    return (
        <div className="bg-Light_gray overflow-x-hidden h-screen">
            <SecondaryHeader head="Giỏ hàng"/>
            <main className="grid grid-cols-[1fr_10fr_1fr] my-5 w-screen">
                <div className="col-start-2 flex flex-col gap-5">
                    <div className="bg-White">
                        <div className="col-start-2 grid grid-cols-[7fr_1.5fr_2fr_1.5fr_1fr]">
                            <div className="flex items-center justify-center col-start-1 py-2">
                                <span className="font-semibold text-lg">
                                    Sản phẩm
                                </span>
                            </div>

                            <div className="flex items-center justify-center col-start-2">
                                <span className="font-semibold text-lg">
                                    Đơn giá
                                </span>
                            </div>

                            <div className="flex items-center justify-center col-start-3">
                                <span className="font-semibold text-lg">
                                    Số lượng
                                </span>
                            </div>

                            <div className="flex items-center justify-center col-start-4">
                                <span className="font-semibold text-lg">
                                    Số tiền
                                </span>
                            </div>

                            <div className="flex items-center justify-center col-start-5">
                                <span className="font-semibold text-lg">
                                    Thao tác
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        {productList.map((product) => (
                            <CartItemListView key={product.id} id={product.id} name={product.name}
                                              price={product.price} max_quantity={product.max_quantity}
                                              onChange={onChange} cart_id={cartID}/>
                        ))}
                    </div>

                    <div className="flex flex-row-reverse bg-White mt-5 sticky bottom-0 gap-5 transition-shadow border">
                        <div className="mr-10 my-3">
                            {productCount > 0
                                ?
                                <button className="bg-Blue rounded-sm py-2 px-6 hover:bg-Dark_blue">
                                    <span className="text-White text-lg">
                                        Mua hàng
                                    </span>
                                </button>
                                :
                                <button className="bg-Light_blue rounded-sm py-2 px-6 cursor-not-allowed" disabled>
                                    <span className="text-White text-lg">
                                        Mua hàng
                                    </span>
                                </button>}
                        </div>

                        <div className="flex flex-col items-center justify-center">
                            <div>
                                <span>
                                    Tổng thanh toán: ({productCount ?? 0} sản phẩm)
                                </span>
                            </div>

                            <div>
                                <span className="text-Red font-bold text-xl">
                                    ₫ {formatNumberWithDots(totalPrice ?? 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            <Footer/>
        </div>
    );
};

export default ShopperCart;