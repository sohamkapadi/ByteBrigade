import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {GiHamburgerMenu} from "react-icons/gi";

const Navbar=()=>{
    const [show,setShow]=useState(false);
    const {isAuthorized,setIsAuthorized,user}=useContext(Context);
    const navigateTo=useNavigate();

    const handleLogout=async ()=>{
    try {
        const response=await axios.get("http://localhost:3000/api/v1/user/logout",{withCredentials:true});
        toast.success(response.data.message);
        setIsAuthorized(false);
        navigateTo("/login");
    } catch (error) {
        toast.error(error.response.data.message);
        setIsAuthorized(true);
    }
    };

    return (
        <>
            <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
                <div className="container">
                    <div className="logo">
                        <img src="" alt="logo"/>
                    </div>
                    <ul className={!show ? "menu" : "show-menu menu"} >
                    <li>
                            <Link to={"/"} onClick={()=> setShow(false)}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/education"} onClick={()=> setShow(false)}>EDUCATION</Link>
                        </li>
                        <li>
                            <Link to={"/recommendations"} onClick={()=> setShow(false)}>RECOMMENDATIONS</Link>
                        </li>
                        <button onClick={handleLogout}>LOGOUT</button>
                    </ul>
                    <div className="hamburger">
                        <GiHamburgerMenu  onClick={()=>setShow(!show)}/>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;