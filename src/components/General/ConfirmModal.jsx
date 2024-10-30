import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-[100] ${isOpen ? "visible bg-black/20" : "collapse"}`}>
            <div onClick={(e) => e.stopPropagation()}
                 className={`bg-White rounded-lg shadow w-[25rem] h-[15rem] grid grid-rows-[20%_70%_10%] ${isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>

                <div className="row-start-1 bg-Blue flex items-center px-4 rounded-t-lg">
                    <span className="text-White font-semibold text-2xl">
                        {title ?? "Sample Title"}
                    </span>
                </div>

                <div className="row-start-2 px-4 py-2">
                    <span className="text-Black">
                        {message ?? "Sample Message"}
                    </span>
                </div>

                <div className="row-start-3 flex flex-row-reverse items-center gap-4 mr-2 select-none pb-6">
                    <div>
                        <button className="bg-Blue text-White rounded-sm h-[2rem] w-[7rem] hover:bg-Dark_blue"
                                onClick={onConfirm}>
                            <span>
                                Có
                            </span>
                        </button>
                    </div>

                    <div>
                        <button className="border border-Red bg-White rounded-sm h-[2rem] w-[7rem] hover:bg-Light_red"
                                onClick={onClose}>
                            <span className="text-Red">
                                Không
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ConfirmModal;