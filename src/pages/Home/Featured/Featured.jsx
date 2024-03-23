import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <section className='featured-item bg-fixed text-white'>
            <div className='bg-slate-500 bg-opacity-40 pt-10'>
                <SectionTitle heading='FEATURED ITEM' subHeading='check it out'></SectionTitle>
                <div className='md:flex justify-center items-center pb-20 pt-12 px-4 md:px-20 lg:px-32 md:space-x-8'>
                    <div className='md:w-1/2 lg:w-1/3'>
                        <img src={featuredImg} alt="feature_image" />
                    </div>
                    <div className='md:w-1/2 lg:2/3'>
                        <p>March 25, 2024</p>
                        <p className='uppercase'>Wher can i get some?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex alias voluptatem, veritatis minima facere sit voluptas non eligendi cum cupiditate.</p>
                        <button className="btn bg-transparent border-0 border-b-2 border-white text-white hover:bg-black hover:text-white hover:border-0 mt-4">Order Now</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;

