import React from 'react';
import avatar_svg from "../../assets/avatar_holder.svg";
import bell_svg from "../../assets/bell.svg";
import blog_svg from "../../assets/blog.svg";
import find_svg from "../../assets/find.svg";
import favourite_svg from "../../assets/favourite.svg";
import cart_svg from "../../assets/cart.svg";
import {Badge} from "@mui/material";

const PrimaryHeader = (props) => {
    return (
        <header className="bg-gradient-to-b from-Blue to-Light_blue grid grid-cols-[1fr_10fr_1fr] w-screen h-auto select-none sticky top-0 z-50">
            <div className="col-start-2">
                <div className="grid grid-rows-[auto_1fr] my-3">
                    <div className="flex flex-row-reverse gap-10 mb-1">
                        <div className="flex items-center justify-items-center ml-4 mr-0.5">
                            <div className="mr-2 w-[2rem] h-[2rem]">
                                <img src={avatar_svg} alt="avatar" className="w-[2rem] h-[2rem]"/>
                            </div>

                            <div>
                                <a href="#">
                                    <span className="text-White text-[0.75rem] font-sans text-center">
                                        placeholder@gmail.com
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center justify-items-center ml-4">
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

                    <div className="row-start-2 flex justify-between">
                        <div className="h-[3.85rem] w-[10rem]">
                            <a href="#">
                                <img src="/Markey_white_horizontal.png" className="object-cover" alt="Markey"/>
                            </a>
                        </div>

                        <div className="flex items-center justify-center">
                            <div>
                                <input className="h-[2rem] w-[40rem] outline-none rounded-l-md relative pl-3"/>
                            </div>

                            <div className="bg-White rounded-r-md w-[4rem] h-[2rem] flex items-center justify-center">
                                <div className="bg-Blue flex items-center justify-center w-[3.5rem] h-[1.5rem] rounded-md">
                                    <button className="rounded-md">
                                        <img src={find_svg} alt="find" className="object-cover w-[1rem] h-[1rem]"/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-16">
                            <div className="flex items-center justify-center">
                                <a href="#">
                                    <img src={blog_svg} alt="blog" className="w-[1.25rem] h-[1.25rem] object-cover"/>
                                </a>
                            </div>

                            <div className="flex items-center justify-center">
                                <a href="#">
                                    <img src={cart_svg} alt="cart"
                                         className="object-cover h-[1.35rem] w-[1.35rem]"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PrimaryHeader;