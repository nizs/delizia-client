
import { Link } from 'react-router-dom';
import './Navbar.css';
import { MdOutlineShoppingCart } from "react-icons/md";
import useAuth from '../../../hooks/useAuth';
import useCart from '../../../hooks/useCart';


const Navbar = () => {
    const { user, logOut } = useAuth();
    const [data] = useCart();
    // console.log(data);
    const menuitem = <>
        <Link to='home'><li><a>Home</a></li></Link>
        <Link to='menu'><li><a>Our Menu</a></li></Link>
        <Link to='order/Salad'><li><a>Order</a></li></Link>
    </>

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="navbar fixed z-10 bg-black bg-opacity-30 text-white max-w-screen-xl">
            <div className="navbar-start">
                <div className="burger dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {menuitem}
                    </ul>
                </div>
                <Link to='/'>
                    <a className="btn btn-ghost text-xl text-yellow-300">DELIZIA</a>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menuitem}
                </ul>
            </div>
            <div className="navbar-end">
                {/* cart */}
                <Link to='/dashboard/carts'>
                    <div className="mr-6">
                        <div className="relative py-2">
                            <div className="t-0 absolute left-3">
                                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{data.length}</p>
                            </div>
                            <MdOutlineShoppingCart className='mt-4 h-6 w-6' />
                        </div>
                    </div></Link>
                {
                    user ?
                        <>
                            <div className="avatar">
                                <div className="w-12  mask mask-hexagon mr-2">
                                    <img src={user?.photoURL} />
                                </div>
                            </div>
                            <Link onClick={handleLogout}><a className="btn btn-warning mr-2">Logout</a></Link>
                        </> :
                        <>
                            <Link to='/login'><a className="btn tn-outline btn-warning mr-2">Login</a></Link>
                        </>
                }
            </div>
        </div >
    );
};

export default Navbar;