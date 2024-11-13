import React, {useState} from 'react';
import SalemansOrderItem from "./SalemansOrderItem";
import ConfirmModal from "../General/ConfirmModal";
import LoadingModal from "../General/LoadingModal";
import {instance} from "../../AxiosConfig";

const SalesmanOrderWrapper = (props) => {
    const formatNumberWithDots = (number) => {
        // Convert the number to a string
        let numberStr = number?.toString();

        // Use a regular expression to add dots every three digits from the end
        let formattedStr = numberStr?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        return formattedStr;
    }

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

    const [order, setOrder] = useState(props.order);

    const handleApprove = async () => {
        // Call API to update status of the order to "DELIVERING"
        try {
            setLoading(true);
            openLoadingModal();
            let data = {
                status: "DELIVERING"
            }
            await instance.put(`v1/order-service/order/status/${order.id}`, data);
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
        // Callback to re-render the list of orders
        props.onApprove();
    }

    return (
        <div className="bg-White rounded-md flex flex-col gap-3 shadow">
            <div className="flex flex-col gap-4 px-4 py-4">
                {(order.items)?.map((order) => (
                    <SalemansOrderItem key={order.product?.id} productName={order.product?.name} quantity={order.amount}
                                       price={order.product?.price}
                                       picture={order.product?.picture[0]}/>
                ))}
            </div>

            <div className="flex flex-row-reverse items-end gap-8 px-4 pb-4 select-none">
                <div>
                    <button className="bg-Blue hover:bg-Dark_blue rounded-md text-center px-6 py-1.5"
                            onClick={openModal}>
                        <span className="text-White">
                            Duyệt
                        </span>
                    </button>
                </div>
            </div>

            <ConfirmModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleApprove} title={"Xác nhận duyệt đơn hàng"} message={"Bạn có chắc muốn duyệt đơn hàng này?"}/>
            {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
        </div>
    );
};

export default SalesmanOrderWrapper;