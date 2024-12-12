import React, { useContext } from "react";
import Classes from "./header.module.css";
import { FaSearch } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/Data";
import { auth } from "../../utilities/firebase";

export default function Header() {
    const [{ basket, user }] = useContext(DataContext); // Removed unused 'dispatch'

    const totalitems = basket?.reduce((amount, item) => item.amount + amount, 0) || 0;

    return (
        <section className={Classes.fixed}>
            <header className={Classes.header_container}>
                {/* Logo and Location */}
                <div className={Classes.logo_container}>
                    <Link to="/" className={Classes.logo_link}>
                        <img
                            src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
                            alt="Amazon Logo"
                            className={Classes.logo}
                        />
                    </Link>
                    <div className={Classes.location}>
                        <IoLocationOutline className={Classes.location_icon} />
                        <div className={Classes.delivery}>
                            <p>Deliver to</p>
                            <span>Ethiopia</span>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className={Classes.search}>
                    <select className={Classes.search_category}>
                        <option value="all">All</option>
                        
                    </select>
                    <input
                        type="text"
                        placeholder="Search Amazon"
                        className={Classes.search_input}
                    />
                    <button className={Classes.search_button}>
                        <FaSearch size={20} />
                    </button>
                </div>

                {/* User Options */}
                <div className={Classes.user_options}>
                    {/* Language Selector */}
                    <div className={Classes.language}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
                            alt="USA Flag"
                            className={Classes.language_flag}
                        />
                        <select className={Classes.language_selector}>
                            <option value="en">EN</option>
                        </select>
                    </div>

                    {/* Sign-in / Account */}
                    <div className={Classes.account}>
                        <Link to={!user && '/auth'} className={Classes.account_link}>
                            <div>
                                {user ? (
                                    <p>
                                        Hello, {user?.email?.split("@")[0]} <br />
                                        <span
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to sign out?")) {
                                                    auth.signOut();
                                                    alert("You have successfully signed out!");
                                                }
                                            }}
                                            
                                        >
                                            SignOut
                                        </span>
                                    </p>
                                ) : (
                                    <p>
                                        Hello, Sign in <br />
                                        Account & Lists
                                    </p>
                                )}

                            </div>
                        </Link>
                    </div>

                    {/* Orders */}
                    <div className={Classes.orders}>
                        <Link to="/orders" className={Classes.orders_link}>
                            <p>
                                Returns <br />
                                & Orders
                            </p>
                        </Link>
                    </div>

                    {/* Cart */}
                    <div className={Classes.cart}>
                        <Link to="/cart" className={Classes.cart_link}>
                            <BiCart size={35} />
                            <span className={Classes.cart_badge}>{totalitems}</span>
                        </Link>
                    </div>
                </div>
            </header>
        </section>
    );
}
