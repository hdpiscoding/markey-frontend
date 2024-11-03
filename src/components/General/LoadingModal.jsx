import React from 'react';
import {CircularProgress} from "@mui/material";

const LoadingModal = ({ isOpen }) => {
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-[100] ${isOpen ? "visible bg-black/20" : "collapse"}`}>
            <div onClick={(e) => e.stopPropagation()}
                 className={`bg-White rounded-lg shadow w-[5rem] h-[5rem] grid grid-rows-[20%_70%_10%] ${isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <div className="flex items-center justify-center h-full mt-8">
                    <CircularProgress />
                </div>
            </div>
        </div>
    );
};

export default LoadingModal;