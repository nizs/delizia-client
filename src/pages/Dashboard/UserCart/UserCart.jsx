
import { Link, NavLink } from 'react-router-dom';
import useCart from '../../../hooks/useCart';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UserCart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className='p-8'>
                <div className='flex items-center justify-evenly'>
                    <h2 className='text-2xl font-bold text-slate-700 font-sans'>Cart Item: <span className='text-error text-orange-500'>{cart.length}</span></h2>
                    <h2 className='text-2xl font-bold  text-slate-700'>Total Price: <span className='text-error text-orange-500'>${totalPrice}</span></h2>
                    {
                        cart.length ?
                            <Link to='/dashboard/payment'>
                                <button className="btn bg-orange-500 hover:bg-orange-600 text-white">Pay</button>
                            </Link>
                            :
                            <button disabled className="btn bg-orange-500 hover:bg-orange-600 text-white">Pay</button>

                    }
                </div>

            </div>
            <div className='m-8'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='text-orange-500'>
                                <th>
                                    #
                                </th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item, index) => <tr key={item._id}>
                                    <td>
                                        <span className='text-slate-700 font-bold'>{index + 1}</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className='text-slate-700 font-bold'>{item.recipeName}</span>
                                    </td>
                                    <td><span className='text-slate-700 font-bold'>{item.price}</span></td>
                                    <th>
                                        <button className="btn btn-link text-success btn-xs"><CiEdit className='text-2xl' /></button>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-link text-error btn-xs"><MdDeleteOutline className='text-2xl' /></button>
                                    </th>
                                </tr>)
                            }
                            <button className="btn bg-orange-500 hover:bg-orange-600 text-white mt-8"><NavLink to='/order/salad'>Back To Order page</NavLink></button>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserCart;