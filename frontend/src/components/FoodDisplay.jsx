/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import Food from './Food';
import { StoreContext } from '../context/StoreContext';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    if (!Array.isArray(food_list)) {
        return <div>Loading...</div>;
    }

    return (
        <div id='food-display' className='mt-8'>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] my-7 gap-y-10 gap-x-7'>
                {
                    food_list.map((el, index) => {
                        if (category === "All" || category === el.category)
                            return <Food key={index} id={el._id} name={el.name} image={el.image} price={el.price} description={el.description} />
                    })
                }
            </div>
        </div>
    );
}

export default FoodDisplay;
