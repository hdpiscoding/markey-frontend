import React from 'react';

const RFHeader = (props) => {
    return (
        <div className="bg-gradient-to-b from-Blue to-Light_blue select-none grid grid-cols-[1fr_10fr_1fr]">
            <div className="col-start-2 my-3 flex justify-items-center items-center">
                <div className="h-[3.85rem] w-[10rem] mr-10">
                    <img src="/Markey_white_horizontal.png" className="object-cover" alt="Markey"/>
                </div>

                <div>
                    <span className="text-White font-sans text-2xl font-semibold">
                        {props.title}
                    </span>
                </div>
            </div>

        </div>
    )
}

export default RFHeader;