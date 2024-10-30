import React, {useState} from "react";
import bell_svg from "../../assets/bell.svg";
import {FiUser} from "react-icons/fi";
import {Link} from "react-router-dom";


const SecondaryHeader = (props) => {
    // Get token from localStorage here and extract user_id and role (admin, shopper, salesman)

    // Store user role
    const [role, setRole] = useState("admin");

    // Store avatar API data (URL)
    const [avatar, setAvatar] = useState(null);

    // Store email API data
    const [email, setEmail] = useState(null);

    return (
        <header className="grid grid-rows-[auto_1fr] w-screen h-auto select-none">
            <div className="bg-gradient-to-b from-Blue to-Light_blue py-2">
                <div className="grid grid-cols-[1fr_10fr_1fr]">
                    <div className="flex flex-row-reverse gap-10 col-start-2">
                        <div className="flex items-center justify-items-center ml-4 mr-0.5">
                            <div className="mr-2 w-[2rem] h-[2rem]">
                                {avatar
                                    ?
                                    <img src={avatar} alt="avatar" className="w-[2rem] h-[2rem]"/>
                                    :
                                    <div className="bg-Light_gray w-[2rem] h-[2rem] rounded-[50%] flex items-center justify-center">
                                        <FiUser className="text-Dark_gray h-[1.25rem] w-[1.25rem]"/>
                                    </div>
                                }
                            </div>

                            <div>
                                {role === "shopper"
                                    ?
                                    <Link to="/shopper">
                                        <span className="text-White text-[0.75rem] font-sans text-center">
                                            {email ?? "placeholder@gmail.com"}
                                        </span>
                                    </Link> : null}

                                {role === "salesman"
                                    ?
                                    <Link to="/salesman">
                                        <span className="text-White text-[0.75rem] font-sans text-center">
                                            {email ?? "placeholder@gmail.com"}
                                        </span>
                                    </Link> : null}

                                {role === "admin"
                                    ?
                                    <Link to="/admin">
                                        <span className="text-White text-[0.75rem] font-sans text-center">
                                            {email ?? "placeholder@gmail.com"}
                                        </span>
                                    </Link> : null}

                            </div>
                        </div>

                        <div className="flex items-center justify-items-center">
                            <div className="mr-2">
                                <img src={bell_svg} alt="bell" className="w-[1.2rem] h-[1.2rem]"/>
                            </div>

                            {role === "shopper"
                                ?
                                <Link to="/shopper/notification">
                                    <div>
                                        <span className="text-White text-[0.75rem] font-sans text-center">
                                            Thông báo
                                        </span>
                                    </div>
                                </Link>
                                :
                                <div>
                                    <span className="text-White text-[0.75rem] font-sans text-center">
                                        Thông báo
                                    </span>
                                </div>}
                        </div>
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
                                        <img src="/markey_blue_horizontal.png" className="object-cover" alt="Markey"/>
                                    </Link> : null}

                                {role === "salesman"
                                    ?
                                    <Link to="/salesman">
                                        <img src="/markey_blue_horizontal.png" className="object-cover" alt="Markey"/>
                                    </Link> : null}

                                {role === "admin"
                                    ?
                                    <Link to="/admin">
                                        <img src="/markey_blue_horizontal.png" className="object-cover" alt="Markey"/>
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
    );
};

export default SecondaryHeader;