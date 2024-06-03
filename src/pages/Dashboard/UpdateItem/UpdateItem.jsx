import React from 'react';
import { useLoaderData } from 'react-router-dom';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { FaEdit } from "react-icons/fa";
import { useForm } from 'react-hook-form';

const UpdateItem = () => {
    const item = useLoaderData();
    console.log(item);
    const { name, category, recipe, price, _id } = item;
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const image_hosting_key = import.meta.env.VITE_image_hosting_key;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const onSubmit = async (data) => {
        // Image upload to imgbb and then get and url and send it to DB
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            // sending item data to the server with the image url
            const updateItem = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price),

            }
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, updateItem);
            console.log(menuRes.data);
            if (menuRes.data.modifiedCount > 0) {
                console.log(menuRes.data)
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been suucessfully updated to DB`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log(res.data);
    }

    return (
        <div>
            <SectionTitle heading='update Item' subHeading='Refresh info'></SectionTitle>
            <div className='p-8'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe name</span>
                        </div>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            defaultValue={name}
                            placeholder="Recipe Name"
                            className="input input-bordered w-full" />
                    </div>
                    <div className='flex gap-4'>
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category</span>
                            </div>
                            <select
                                defaultValue={category}
                                {...register("category", { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value='default'>Select a Category</option>
                                <option value="salad">salad</option>
                                <option value="pizza">pizza</option>
                                <option value="soup">soup</option>
                                <option value="dessert">dessert</option>
                                <option value="drinks">drinks</option>
                            </select>
                        </div>
                        {/* price */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input
                                {...register("price", { required: true })}
                                type="number"
                                defaultValue={price}
                                placeholder="Price"
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea
                            {...register('recipe')}
                            defaultValue={recipe}
                            className="textarea textarea-bordered h-24"
                            placeholder="Enter Recipe Details">

                        </textarea>
                    </div>
                    <div>
                        <input
                            {...register('image', { required: true })}
                            type="file"
                            className="file-input file-input-bordered file-input-accent   w-full max-w-xs my-8" />
                    </div>
                    <button type='submit' className="btn bg-orange-500 hover:bg-orange-400 text-white border-0">
                        <FaEdit />
                        Update Item</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;