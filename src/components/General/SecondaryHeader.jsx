import React, {useEffect, useState} from "react";
import bell_svg from "../../assets/bell.svg";
import {FiUser} from "react-icons/fi";
import {Link, Outlet} from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import {instance} from "../../AxiosConfig";


const SecondaryHeader = (props) => {
    // Get token from localStorage here and extract user_id and role (admin, shopper, salesman)
    const roleStorage = useLocalStorage('role')
    // Store user role
    const [role, setRole] = useState(String(roleStorage.get()));

    // Store avatar API data (URL)
    const [avatar, setAvatar] = useState(null);

    // Store email API data
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (roleStorage.get() === "shopper")
                {
                    const response = await instance.get(`v1/user-service/shopper/me`);
                    const item = response.data.data;
                    setEmail(item.email);
                    setAvatar(item.profilePicture);
                }
                else if (roleStorage.get() === "salesman"){
                    const response = await instance.get(`v1/user-service/salesman/me`);
                    const shopResponse = await instance.get('v1/shopping-service/shop/me');
                    const shop = shopResponse.data.data;
                    const item = response.data.data;
                    setEmail(item.email);
                    setAvatar(shop.profilePicture);
                }

            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <header className="grid grid-rows-[auto_1fr] w-screen h-auto select-none">
                <div className="bg-gradient-to-b from-Blue to-Light_blue py-2">
                    <div className="grid grid-cols-[1fr_10fr_1fr]">
                        <div className="flex flex-row-reverse gap-10 col-start-2">
                            <div className="flex items-center justify-items-center gap-2 mr-0.5">
                                <div className="w-[2rem] h-[2rem] rounded-[50%]">
                                    {avatar
                                        ?
                                        <img src={avatar} alt="avatar" className="w-[2rem] h-[2rem] rounded-[50%]"/>
                                        :
                                        <div
                                            className="bg-Light_gray w-[2rem] h-[2rem] rounded-[50%] flex items-center justify-center">
                                            <FiUser className="text-Dark_gray h-[1.25rem] w-[1.25rem]"/>
                                        </div>
                                    }
                                </div>

                                <div>
                                    {role === "shopper"
                                        ?
                                        <Link to="/shopper/profile">
                                            <div className="pb-1.5">
                                            <span className="text-White text-[0.75rem] font-sans text-center">
                                                {email ?? "placeholder@gmail.com"}
                                            </span>
                                            </div>

                                        </Link> : null}

                                    {role === "salesman"
                                        ?
                                        <Link to="/salesman">
                                            <div className="pb-1.5">
                                            <span className="text-White text-[0.75rem] font-sans text-center">
                                                {email ?? "placeholder@gmail.com"}
                                            </span>
                                            </div>
                                        </Link> : null}

                                    {role === "admin"
                                        ?
                                        <Link to="/admin">
                                            <div className="pb-1.5">
                                            <span className="text-White text-[0.75rem] font-sans text-center">
                                                {"admin"}
                                            </span>
                                            </div>

                                        </Link> : null}

                                </div>
                            </div>

                            {role === "shopper"
                                ?
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
                                :
                                null}
                        </div>
                    </div>
                </div>

                <div className="row-start-2 bg-White pt-2 pb-3 shadow">
                    <div className="grid grid-cols-[1fr_10fr_1fr]">
                        <div className="col-start-2 flex">
                            <div className="flex items-center justify-center">
                                <div className="h-[3.85rem] w-[10rem]">
                                    {role === "shopper"
                                        ?
                                        <Link to="/shopper">
                                            <img src="/Markey_blue_horizontal.png" className="object-cover h-[3.85rem] w-[10rem]"
                                                 alt="Markey"/>
                                        </Link> : null}

                                    {role === "salesman"
                                        ?
                                        <Link to="/salesman">
                                            <img src="/Markey_blue_horizontal.png" className="object-cover h-[3.85rem] w-[10rem]"
                                                 alt="Markey"/>
                                        </Link> : null}

                                    {role === "admin"
                                        ?
                                        <Link to="/admin">
                                            <img src="/Markey_blue_horizontal.png" className="object-cover h-[3.85rem] w-[10rem]"
                                                 alt="Markey"/>
                                        </Link> : null}
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

            <Outlet/>
        </>
    );
};

export default SecondaryHeader;