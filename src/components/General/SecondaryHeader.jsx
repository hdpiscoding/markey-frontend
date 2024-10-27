import React from "react";
import avatar_svg from "../../assets/avatar_holder.svg";
import bell_svg from "../../assets/bell.svg";


const SecondaryHeader = (props) => {
    return (
        <header className="grid grid-rows-[auto_1fr] w-screen h-auto select-none">
            <div className="bg-gradient-to-b from-Blue to-Light_blue py-2">
                <div className="grid grid-cols-[1fr_10fr_1fr]">
                    <div className="flex flex-row-reverse gap-10 col-start-2">
                        <div className="flex items-center justify-items-center ml-4 mr-0.5">
                            <div className="mr-2 w-[2rem] h-[2rem]">
                                <img src={props.avatar ?? avatar_svg} alt="avatar" className="w-[2rem] h-[2rem]"/>
                            </div>

                            <div>
                                <a href="#">
                                    <span className="text-White text-[0.75rem] font-sans text-center">
                                        {props.name ?? "placeholder@gmail.com"}
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center justify-items-center">
                            <div className="mr-2">
                                <img src={bell_svg} alt="bell" className="w-[1.2rem] h-[1.2rem]"/>
                            </div>

                            <a href="#">
                                <div>
                                    <span className="text-White text-[0.75rem] font-sans text-center">
                                        Thông báo
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row-start-2 bg-White pt-2 pb-3 shadow">
                <div className="grid grid-cols-[1fr_10fr_1fr]">
                    <div className="col-start-2 flex">
                        <div className="flex items-center justify-center">
                            <div className="h-[3.85rem] w-[10rem]">
                                <a href="#">
                                    <img src="/markey_blue_horizontal.png" className="object-cover" alt="Markey"/>
                                </a>
                            </div>

                            <div className="border-l-2 border-gray-500 h-5 mx-4"></div>

                            <div>
                                <span className="text-Blue font-sans font-semibold text-lg">
                                    {props.head}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default SecondaryHeader;