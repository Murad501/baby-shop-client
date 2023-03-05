import React from 'react';
import AdvertisedProducts from './AdvertisedProducts/AdvertisedProducts';
import ContactUs from './ContactUs/ContactUs';
import Hero from './Hero/Hero';
import TopCategories from './TopCategories/TopCategories';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <AdvertisedProducts></AdvertisedProducts>
            <TopCategories></TopCategories>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;