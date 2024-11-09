import React, {useEffect, useState, useTransition} from 'react';
import bell_svg from "../../assets/bell.svg";
import blog_svg from "../../assets/blog.svg";
import find_svg from "../../assets/find.svg";
import cart_svg from "../../assets/cart.svg";
import {FiUser} from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import {instance} from "../../AxiosConfig";

const PrimaryHeader = (props) => {
    //const navigate = useNavigate();

    // Get token from localStorage here and extract shopper_id and role
    const tokenStorage = useLocalStorage('token');
    const roleStorage = useLocalStorage('role');
    const userStorage = useLocalStorage('userId');

    // Store email API data
    const [email, setEmail] = useState(null);

    // Store avatar API data (URL)
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        // Call API to get email, avatar from shopper_id
        const fetchData = async () => {
            try {
                const response = await instance.get("v1/user-service/shopper/me");
                const item = response.data.data;
                setEmail(item.email);
                setAvatar(item.profilePicture);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();
    },[])

    return (
        <header className="bg-gradient-to-b from-Blue to-Light_blue grid grid-cols-[1fr_10fr_1fr] w-screen h-auto select-none sticky top-0 z-50">
            <div className="col-start-2">
                <div className="grid grid-rows-[auto_1fr] my-3">
                    <div className="flex flex-row-reverse gap-10 mb-1">
                        <div className="flex items-center justify-center gap-2 mr-0.5">
                            <div className="w-[2rem] h-[2rem] rounded-[50%]">
                                {avatar
                                    ?
                                    <img src={avatar} alt="avatar" className="w-[2rem] h-[2rem] rounded-[50%]"/>
                                    :
                                    <div className="bg-Light_gray w-[2rem] h-[2rem] rounded-[50%] flex items-center justify-center">
                                        <FiUser className="text-Dark_gray h-[1.25rem] w-[1.25rem]"/>
                                    </div>
                                    }

                            </div>

                            <div className="pb-1.5">
                                <Link to="/shopper/profile">
                                    <span className="text-White text-[0.75rem] font-sans text-center">
                                        {email ?? "placeholder@gmail.com"}
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <div>
                                <img src={bell_svg} alt="bell" className="w-[1.4rem] h-[1.4rem]"/>
                            </div>

                            <Link to="/shopper/notification">
                                <div className="pb-1">
                                    <span className="text-White text-[0.75rem] font-sans text-center">
                                        Thông báo
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="row-start-2 flex justify-between">
                        <div className="h-[3.85rem] w-[10rem]">
                            <Link to="/shopper">
                                <img src="/Markey_white_horizontal.png" className="object-cover" alt="Markey"/>
                            </Link>
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
                                <Link to="/shopper/blog">
                                    <img src={blog_svg} alt="blog" className="w-[1.25rem] h-[1.25rem] object-cover"/>
                                </Link>
                            </div>

                            <div className="flex items-center justify-center">
                                <Link to="/shopper/cart">
                                    <img src={cart_svg} alt="cart"
                                         className="object-cover h-[1.35rem] w-[1.35rem]"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PrimaryHeader;