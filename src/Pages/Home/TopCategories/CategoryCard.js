import React, { useContext } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { darkProvider } from '../../../Context/DarkContext';

const CategoryCard = ({category}) => {
    const {isDark} = useContext(darkProvider)
    return (
        <div className='mx-auto max-w-sm hover:text-rose-400'>
            <img className={`border hover:shadow-md ${isDark && 'border-gray-800'}`} src={category.img} alt="categoryImage" />
            <span className='my-2 font-semibold flex justify-center items-center gap-2'>{category.name} <FaArrowRight></FaArrowRight></span>
        </div>
    );
};

export default CategoryCard;