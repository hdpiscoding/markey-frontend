import React from 'react';
import PrimaryHeader from "../../components/General/PrimaryHeader";
import Footer from "../../components/General/Footer";
import AccountNav from "../../components/Shopper/AccountNav";
import AddressModal from "../../components/Shopper/AddressModal";

const ShopperAddress = () => {
    const [haveAddress, setHaveAddress] = React.useState(false);

    const [open, setOpen] = React.useState(false);

    const [name, setName] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [address, setAddress] = React.useState(null);

    const getInfoCallback = (name, phone, address) => {
        setName(name);
        setPhone(phone);
        setAddress(address);
        setHaveAddress(true);
    }

    return (
        <div className="bg-Light_gray w-screen overflow-x-hidden">
            <PrimaryHeader/>

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

                            {!haveAddress
                                ?
                                <div className="select-none">
                                    <button className="bg-Blue rounded-sm p-2 hover:bg-Dark_blue"
                                            onClick={() => setOpen(true)}>
                                        <span className="text-White">
                                            Thêm địa chỉ mới
                                        </span>
                                    </button>
                                </div>
                                :
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">
                                                {name}
                                            </span>

                                            <div className="border-l-2 h-5 border-Dark_gray"></div>

                                            <div>
                                                {phone}
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
                                </div>}

                            <div>
                                <AddressModal open={open} onClose={() => setOpen(false)} name={name} phone={phone}
                                              address={address} onUpdateInfo={getInfoCallback}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default ShopperAddress;