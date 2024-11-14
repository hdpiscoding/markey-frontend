import React from 'react';
import { IoClose } from "react-icons/io5";
import VoucherModalListView from "./VoucherModalListView";

const VoucherModal = ({open, onClose, onSelectVoucher, selectedVoucherID}) => {
    const handleDelete = () => {
        onSelectVoucher({id: '', name: "", discount: 0, code: ""});
        onClose();
    }

    if (!open) return null;

    const vouchers = [
        { id: '1', name: "Voucher mùa thu", discount: 10, code: "CMT8-1945" },
        { id: '2', name: "Voucher mùa xuân", discount: 30, code: "GPMN-1975" },
        { id: '3', name: "Voucher mùa hè", discount: 5, code: "ĐBP-1954" },
        { id: '4', name: "Voucher mùa đông", discount: 12, code: "PNVN-2010" },
    ]

    return (
        // backdrop
        <div className={`fixed inset-0 flex items-center justify-center z-[100] ${open ? "visible bg-black/20" : "collapse"}`}>
            {/* modal */}
            <div onClick={(e) => e.stopPropagation()} className={`bg-White rounded-sm shadow w-[35rem] h-[30rem] grid grid-rows-[90%_10%] ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <div className="row-start-1 flex flex-col overflow-auto overflow-x-hidden">
                    <div className="flex ml-2 mr-1 my-1 items-center justify-between select-none">
                        <div>
                            <span className="text-xl font-semibold">
                                CHỌN VOUCHER
                            </span>
                        </div>

                        <button>
                            <IoClose onClick={onClose} className="h-6 w-6"/>
                        </button>
                    </div>

                    <div>
                        {vouchers.map((voucher) => (
                            <VoucherModalListView
                                key={voucher.id}
                                id={voucher.id}
                                name={voucher.name}
                                discount={voucher.discount}
                                code={voucher.code}
                                isSelected={selectedVoucherID === voucher.id}
                                onSelect={onSelectVoucher}/>
                        ))}
                    </div>
                </div>

                <div className="row-start-2 flex flex-row-reverse items-center gap-4 mr-2 select-none">
                    <div>
                        <button className="bg-Blue text-White rounded-sm h-[2rem] w-[7rem] hover:bg-Dark_blue" onClick={onClose}>
                            <span>
                                Áp dụng
                            </span>
                        </button>
                    </div>

                    <div>
                        <button className="border border-Red bg-White rounded-sm h-[2rem] w-[7rem] hover:bg-Light_red" onClick={handleDelete}>
                            <span className="text-Red">
                                Xóa voucher
                            </span>
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default VoucherModal;