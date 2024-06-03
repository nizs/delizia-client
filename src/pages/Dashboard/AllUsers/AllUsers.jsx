import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { RiAdminLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';



const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }

    });



    const handleMakeAdmin = item => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${item._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            console.log(res.data.role)
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${item.name} is an admin now`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });
    }




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

                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your User has been deleted from DB.",
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
                    <h2 className='text-2xl font-bold'>All Users: <span className='text-error'>{users.length}</span></h2>
                    <h2 className='text-2xl font-bold'>Total Users: <span className='text-error'>0</span></h2>
                    <button className="btn btn-active btn-accent text-white">Pay</button>
                </div>

            </div>
            <div className='m-8'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>User Image</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item, index) => <tr key={item._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.photoURL} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <th>

                                        <button onClick={() => handleMakeAdmin(item)} className="btn btn-link text-warning btn-xs"><RiAdminLine className='text-2xl' /></button>
                                        <button className="btn btn-link text-success btn-xs"><CiEdit className='text-2xl' /></button>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-link text-error btn-xs"><MdDeleteOutline className='text-2xl' /></button>
                                    </th>
                                </tr>)
                            }
                            <button className="btn btn-error text-white mt-8"><NavLink to='/order/salad'>Back To Order page</NavLink></button>
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default AllUsers;