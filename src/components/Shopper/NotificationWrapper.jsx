import React, {useState} from 'react';
import ConfirmModal from "../General/ConfirmModal";
import ShopperReceivedItem from "./ShopperReceivedItem";
import {instance} from "../../AxiosConfig";

const NotificationWrapper = (props) => {
    const [order, setOrder] = React.useState(props.order);
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

    const handleAccept = async () => {
        //Call API to update status of the order to "ĐÃ NHẬN HÀNG"
        closeModal();
        try {
            let data = {
                status: "COMPLETED"
            }
            await instance.put(`v1/order-service/order/status/${order.id}`, data);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            props.onReceived();
        }
    }

    return (
        <div className="bg-White rounded-md flex flex-col gap-3 shadow">
            <div className="flex flex-col px-4 py-2 gap-3">
                <div>
                    <span className="font-semibold text-xl text-Blue">
                        {"ĐANG GIAO HÀNG"}
                    </span>
                </div>

                <div className="border-t-2 w-full border-Dark_gray"></div>

                <div className="flex flex-col gap-4">
                    {(order.items)?.map((product, index) => (
                        <ShopperReceivedItem key={index} productName={product.product?.name} price={product.product?.price} quantity={product.amount} picture={product.product?.picture[0]}/>
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
                            <button className="bg-Blue hover:bg-Dark_blue rounded-md text-center px-6 py-1.5" onClick={openModal}>
                                <span className="text-White">
                                    Đã nhận hàng
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleAccept}
                              title="Xác nhận đã nhận hàng" message="Bạn có chắc chắn đã nhận hàng chưa?"/>
            </div>
        </div>
    );
}

export default NotificationWrapper;