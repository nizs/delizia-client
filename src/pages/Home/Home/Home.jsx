import React from 'react';
import DeliziaAdd from '../../../components/DeliziaAdd/DeliziaAdd';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Recommend from '../Recommend/Recommend';
import Featured from '../Featured/Featured';
import Testimonials from '../Testimonials/Testimonials';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Delizia | Home</title>
            </Helmet>
            <Banner />
            <Category />
            <DeliziaAdd />
            <PopularMenu />
            <Recommend />
            <Featured />
            <Testimonials />
        </>
    );
};

export default Home;