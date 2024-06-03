import React from 'react';
import { FaHome, FaList, FaShoppingBasket, FaUsers } from 'react-icons/fa';
import { VscPreview } from "react-icons/vsc";
import { NavLink, Outlet } from 'react-router-dom';
import { IoCalendarNumberSharp } from "react-icons/io5";
import { MdOutlineRestaurantMenu, MdOutlineBorderColor, MdMenuBook, MdPayment  } from "react-icons/md";
import { ImSpoonKnife } from "react-icons/im";
import { RiContactsBookFill } from "react-icons/ri";
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';


const Dashboard = () => {
    const { user } = useAuth();
    const [cart] = useCart();

    const [isAdmin] = useAdmin();
    return (
        <div className='flex p-8 m-12 shadow-slate-300 shadow-lg rounded font-sans'>
            <div className='w-64 min-h-screen bg-orange-500'>
                <ul className='menu p-4 gap-2 text-white'>
                    {
                        isAdmin ?
                            // admin only routes
                            <>
                                <li>
                                    <NavLink to='/dashboard/userhome'>
                                        <FaHome className='text-2xl' />
                                        <span className='font-semibold'>{`Admin's Dashboard`}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/additems'>
                                        <ImSpoonKnife className='text-2xl' />
                                        Add Items 
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/manageitems'>
                                        <FaList className='text-2xl' />
                                        Manage Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/managebookings'>
                                        <MdMenuBook className='text-2xl' />
                                        Manage Bookings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/allusers'>
                                        <FaUsers className='text-2xl' />
                                        All Users
                                    </NavLink>
                                </li>
                            </> :
                            // user routes
                            <>
                                <li>
                                    <NavLink to='/dashboard/userhome'>
                                        <FaHome className='text-2xl' />
                                        <span className='font-semibold'>{`${user?.displayName}'s Dashboard`}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/carts'>
                                        <FaShoppingBasket className='text-2xl' />
                                        My Cart ({cart.length})
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/paymenthistory'>
                                        <VscPreview className='text-2xl' />
                                        Payments
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/mybooking'>
                                        <IoCalendarNumberSharp className='text-2xl' />
                                        My Bookings
                                    </NavLink>
                                </li>
                            </>
                    }

                    {/* shared navlinks */}
                    <div className="divider"></div>

                    <li>
                        <NavLink to='/home'>
                            <FaHome className='text-2xl' />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/menu'>
                            <MdOutlineRestaurantMenu
                                className='text-2xl' />
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/salad'>
                            <MdOutlineBorderColor
                                className='text-2xl' />
                            Order
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact'>
                            <RiContactsBookFill
                                className='text-2xl' />
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;