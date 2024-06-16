"use client"
import React, { useState } from 'react'
import '../styles/Header.css'
import { IoIosArrowDown } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Link from 'next/link';
const Header = () => {

    const [showDialogue, setShowDialogue] = useState(false);
    const handleMouseEnter = () => {
        setShowDialogue(true);
    };

    const handleMouseLeave = () => {
        setShowDialogue(false);
    };
    return (
        <div className='header__main'>
            <div className='logo'>
                <p>Koinpr</p>
                <p>A Todayq Product</p>
            </div>
            <div className='menue__items'>
                <p>360 Marketing</p>
                <p>Marketplace</p>
                <p>Packages</p>
            </div>
            <div
                className='profile__section'
                onMouseEnter={handleMouseEnter}

            >
               <FaUser />

                <div className='profile'>
                    <p className='name'>Profile</p>
                    <IoIosArrowDown />
                </div>
                {showDialogue && (
                    <div className='dialogue__box' onMouseLeave={handleMouseLeave}>
                        <div className='dialogue__box__menue'>
                            <FaRegUserCircle />
                            <p>My Account</p>
                        </div>
                        <div className='dialogue__box__menue'>
                            <IoCartOutline />
                            <Link href="/cart" className="no-text-decoration">
                                My Cart
                            </Link>
                        </div>
                        <div className='dialogue__box__menue'>
                            <FaBookmark />

                            <p>My Bookmarks</p>
                        </div>
                        <div className='dialogue__box__menue'>
                            <FaRegUserCircle />
                            <p>Order History</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header