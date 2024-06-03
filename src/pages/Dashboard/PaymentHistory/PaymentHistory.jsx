import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link, NavLink } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    })

    return (
        <>
            <div className='p-8'>
                <div className='flex items-center justify-evenly'>
                    <h2 className='text-2xl font-bold text-slate-700 font-sans'>Total Payments: <span className='text-error text-orange-500'>{payments.length}</span></h2>
                </div>

            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Transaction ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            payments.map((item, index) => <tr
                                key={item._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {item.email}
                                </td>
                                <td>
                                    {item.price}
                                </td>
                                <td>
                                    {item.transactionId}
                                </td>
                                <td>
                                    {item.date}
                                </td>
                                <td>
                                    {item.status}
                                </td>
                                <th>
                                    <Link>
                                        <button
                                            className="btn btn-link text-success btn-xs"
                                        >
                                            <CiEdit
                                                className='text-2xl'
                                            />
                                        </button>
                                    </Link>
                                    <button
                                        className="btn btn-link text-error btn-xs"
                                    >
                                        <MdDeleteOutline
                                            className='text-2xl'
                                        />
                                    </button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PaymentHistory;