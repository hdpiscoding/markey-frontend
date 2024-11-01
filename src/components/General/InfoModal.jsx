import React from 'react';

const InfoModal = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-[100] ${isOpen ? "visible bg-black/20" : "collapse"}`}>
            <div onClick={(e) => e.stopPropagation()}
                 className={`bg-White rounded-lg shadow w-[25rem] grid grid-rows-[20%_70%_10%] ${isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>

                <div className="row-start-1 bg-Red flex items-center px-4 py-6 rounded-t-lg">
                    <span className="text-White font-semibold text-2xl">
                        {title ?? "Sample Title"}
                    </span>
                </div>

                <div className="row-start-2 px-4 py-2 mt-2">
                    <span className="text-Black">
                        {message ?? "Sample Message"}
                    </span>
                </div>

                <div className="row-start-3 flex flex-row-reverse items-center mr-2 select-none pb-6">
                    <div>
                        <button className="bg-Red text-White rounded-sm h-[2rem] w-[7rem] hover:bg-Dark_red"
                                onClick={onClose}>
                            <span>
                                OK
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default InfoModal;