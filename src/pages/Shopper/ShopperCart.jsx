import React, {useEffect, useState} from 'react';
import Footer from "../../components/General/Footer";
import SecondaryHeader from "../../components/General/SecondaryHeader";
import CartItemListView from "../../components/Shopper/CartItemListView";
import {useNavigate} from "react-router-dom";
import ConfirmModal from "../../components/General/ConfirmModal";
import LoadingModal from "../../components/General/LoadingModal";
import { BsCartX } from "react-icons/bs";
import {instance} from "../../AxiosConfig";
import {toast} from "react-toastify";

const ShopperCart = () => {
    const [loading, setLoading] = useState(false);
    // set up loading modal
    const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);

    const openLoadingModal = () => {
        setLoadingModalOpen(true);
    };

    const closeLoadingModal = () => {
        setLoadingModalOpen(false);
    };
    // end set up loading modal

    // set up modal
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    // end set up modal

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    }

    const [cart, setCart] = useState({});
    const [cartID, setCartID] = useState("");

    const navigate = useNavigate();
    const handleBuy = async () => {
        // Call API to delete all products in the cart
        try {
            setLoading(true);
            openLoadingModal();
            const addressResponse = await instance.get("v1/user-service/shopper/me");
            const address = addressResponse.data.data.address;

            let data = {
                address: address,
                paymentMethod: paymentMethod
            };
            await instance.post("v1/order-service/order", data);
            if (cart.products?.length > 0) {
                for (let i = 0; i < cart.products.length; i++) {
                    onChange(cart.products[i].id, 0);
                }
            }
            toast.success("Đặt hàng thành công!");
        }
        catch (error) {
            setLoading(false);
            closeLoadingModal();
            console.log(error);
        }
        finally {
            setLoading(false);
            closeLoadingModal();
        }

        //Redirect to the other pages
        if (paymentMethod === "VNPAY") {
            navigate("/shopper/order");
        }
        else {
            navigate("/shopper");
        }
    }


    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    useEffect(() => {
        // Call API to get cart data from the server using Token to authenticate
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                // Call API to get cart data
                const response = await instance.get("v1/shopping-service/cart/me");
                setCart(await response.data.data);
            }
            catch (error) {
                setLoading(false);
                closeLoadingModal();
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
            }
        }

        fetchData();
    }, []);

    const onChange = (productId, amount) => {
        // Call API to re-get cart data from the server using Token to authenticate
        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                let data = {
                    productId: productId,
                    amount: amount
                };
                console.log(data);
                // Call API to get cart data
                await instance.post("v1/shopping-service/cart/add", data);

                const response = await instance.get("v1/shopping-service/cart/me");
                setCart(await response.data.data);
            }
            catch (error) {
                setLoading(false);
                closeLoadingModal();
                console.log(error);
            }
            finally {
                setLoading(false);
                closeLoadingModal();
            }
        }

        fetchData();
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
                        {cart.products?.length <= 0
                            ?
                            <div className="bg-Light_gray text-Gray p-5 flex flex-col items-center justify-center gap-2">
                                <BsCartX className="text-Dark_gray h-20 w-20"/>

                                <span className="text-Dark_gray">
                                    Hiện tại giỏ hàng của bạn còn trống!
                                </span>
                            </div>
                            : (cart.products)?.map((product) => (
                                    <CartItemListView key={product.id} id={product.id} name={product.name} amount={product.amount}
                                                      price={product.price} max_quantity={product.max_quantity} picture={product.picture[0]}
                                                      onChange={onChange} cart_id={cartID}/>
                                ))}

                    </div>

                    <div className="flex flex-row-reverse justify-around bg-White mt-5 sticky bottom-0 gap-5 transition-shadow border py-3">
                        <div className="flex flex-row-reverse gap-5">
                            <div>
                                {(cart.products)?.length > 0
                                    ?
                                    <button className="bg-Blue rounded-sm py-2 px-6 hover:bg-Dark_blue select-none" onClick={openModal}>
                                        <span className="text-White text-lg">
                                            Đặt hàng
                                        </span>
                                    </button>
                                    :
                                    <button className="bg-Light_blue rounded-sm py-2 px-6 cursor-not-allowed" disabled>
                                        <span className="text-White text-lg">
                                            Đặt hàng
                                        </span>
                                    </button>}
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <div>
                                    <span>
                                        Tổng thanh toán: ({(cart.products)?.length ?? 0} sản phẩm)
                                    </span>
                                </div>

                                <div>
                                    <span className="text-Red font-bold text-xl">
                                        ₫ {formatNumberWithDots(cart.total ?? 0)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="select-none flex items-center gap-3">
                            <div>
                                <span>
                                    Phương thức thanh toán:
                                </span>
                            </div>

                            <select className="border focus:border-Blue focus:ring-1 focus:ring-Blue focus:outline-none rounded-sm px-2" value={paymentMethod} onChange={handlePaymentMethodChange}>
                                <option value="COD">COD</option>
                                <option value="VNPAY">VNPAY</option>
                            </select>
                        </div>
                    </div>

                    <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleBuy} title={"Xác nhận đặt hàng"} message={"Bạn có chắc muốn đặt hàng?"}/>
                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default ShopperCart;