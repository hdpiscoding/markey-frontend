import React, {useEffect, useState} from 'react';
import Footer from "../../components/General/Footer";
import AccountNav from "../../components/Shopper/AccountNav";
import AddressModal from "../../components/Shopper/AddressModal";
import LoadingModal from "../../components/General/LoadingModal";
import {instance} from "../../AxiosConfig";

const ShopperAddress = () => {
    const convertPhoneNumber = (phoneNumber) => {
        if (phoneNumber?.startsWith('+84')) {
            return '0' + phoneNumber?.slice(3);
        }
        return phoneNumber;
    }

    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [address, setAddress] = React.useState(null);
    const [id, setId] = React.useState(null);


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

    useEffect(() => {
        // Call API to get address
        // If have address, setHaveAddress(true) else setHaveAddress(false)

        const fetchData = async () => {
            try {
                setLoading(true);
                openLoadingModal();
                const response = await instance.get(`v1/user-service/shopper/me`);
                setName(response.data.data.fullname);
                setPhone(response.data.data.phoneNumber);
                setId(response.data.data.id);
                if (response.data.data.address) {
                    setAddress(response.data.data.address);
                }
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

    const handleUpdate = async () => {
        try {
            setLoading(true);
            openLoadingModal();
            const response = await instance.get(`v1/user-service/shopper/me`);
            setAddress(response.data.data.address);
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

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <main className="grid grid-cols-[1fr_10fr_1fr] my-4">
                <div className="col-start-2 grid grid-cols-[15%_2%_83%]">
                    <div className="col-start-1 flex justify-center">
                        <AccountNav currentPage={2}/>
                    </div>

                    <div className="col-start-3 bg-White round-sm py-4 px-6 flex flex-col gap-4">
                        <div className="flex flex-col justify-center gap-2">
                            <div>
                                <span className="font-semibold text-[2rem]">Địa chỉ của tôi</span>
                            </div>

                            <div className="border-t-2 w-full text-Dark_gray"></div>

                            <div className="flex justify-between items-center">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold">
                                            {name}
                                        </span>

                                        <div className="border-l-2 h-5 border-Dark_gray"></div>

                                        <div>
                                            {convertPhoneNumber(phone)}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="text-sm">
                                            {address}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <button className="bg-Blue rounded-md py-2 px-4 hover:bg-Dark_blue"
                                            onClick={() => setOpen(true)}>
                                        <span className="text-White">
                                            Cập nhật
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div>
                                <AddressModal open={open} onClose={() => setOpen(false)}
                                              address={address} id={id} onUpdate={handleUpdate}/>
                            </div>
                        </div>
                    </div>

                    {loading && <LoadingModal isOpen={isLoadingModalOpen} />}
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default ShopperAddress;