import React, {useState} from 'react';
import OrderItem from "./OrderItem";
import {useNavigate} from "react-router-dom";
import ConfirmModal from "../General/ConfirmModal";
import LoadingModal from "../General/LoadingModal";
import {instance} from "../../AxiosConfig";

const OrderWrapper = (props) => {
    const [order, setOrder] = React.useState(props.order);
    const navigate = useNavigate();
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number?.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

    // set up modal
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };
    // end set up modal

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

    const handleBuyAgain = () => {
        navigate(`/shopper/product/${order.items[0]?.product?.id}`)
    }

    const handlePayment = async () => {
        closeModal();
        try {
            setLoading(true);
            openLoadingModal();
            const paymentResponse = await instance.get(`v1/payment-service/payment/by-order/${props.orderId}`);
            const paymentId = paymentResponse.data.data.id;

            const response = await instance.get(`v1/payment-service/payment/vnp-url/${paymentId}`);
            const paymentUrl = response.data.data.payUrl;
            window.open(paymentUrl, '_blank', 'noopener,noreferrer');
        }
        catch (e) {
            setLoading(false);
            closeLoadingModal();
            console.log(e);
        }
        finally {
            setLoading(false);
            closeLoadingModal();
            props.onPayment();
        }
    }

    return (
        <div className="bg-White rounded-md flex flex-col gap-3 shadow">
            <div className="flex flex-col px-4 py-2 gap-3">
                <div>
                    <span className="font-semibold text-xl text-Blue">
                        {order.status?.toUpperCase() === "HOÀN THÀNH" ? "ĐÃ NHẬN HÀNG" : order.status?.toUpperCase()}
                    </span>
                </div>

                <div className="border-t-2 w-full border-Dark_gray"></div>

                <div className="flex flex-col gap-4">
                    {(order.items)?.map((product, index) => (
                        <OrderItem key={index} productId={product.product?.id} productName={product.product?.name} price={product.product?.price} quantity={product.amount} picture={product.product?.picture[0]} status={props.status}/>
                    ))}
                </div>


                <div className="flex flex-col gap-2">
                    <div className="flex flex-col items-end px-4">
                        <div className="flex flex-row-reverse items-center gap-5">
                            <span className="text-Red text-xl font-bold">
                                đ {formatNumberWithDots(order.total ?? 0)}
                            </span>

                            <span className="text-Black">
                                Thành tiền:
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-row-reverse items-end gap-8 px-4 pb-4">
                        <div>
                            <button className="bg-Blue hover:bg-Dark_blue rounded-md text-center px-6 py-1.5" onClick={handleBuyAgain}>
                                <span className="text-White">
                                    Mua lại
                                </span>
                            </button>
                        </div>

                        {order.status?.toLowerCase() === "chưa thanh toán"
                            ?
                            <div>
                                <button className="bg-Red hover:bg-Dark_red rounded-md text-center px-6 py-1.5" onClick={openModal}>
                                    <span className="text-White">
                                        Thanh toán
                                    </span>
                                </button>
                            </div>
                            : null}
                    </div>

                </div>

                <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handlePayment}
                              title="Xác nhận thanh toán" message="Bạn có chắc chắn muốn thanh toán?"/>
                {loading && <LoadingModal isOpen={isLoadingModalOpen}/>}
            </div>
        </div>
    );
};

export default OrderWrapper;