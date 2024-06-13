/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { assets } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';

const Food = ({ id, name, image, price, description }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    return (
        <div className='w-full m-auto rounded-md shadow-md transition animate-[fadeIn_1.5s_ease-in-out] hover:scale-105'>
            <div className='relative'>
                <img src={`${url}/images/${image}`} alt={name} className='w-full rounded-t-md' />
                {
                    !cartItems[id] ?
                        <img src={assets.add_icon_white} alt='add' onClick={() => addToCart(id)} className='w-8 absolute bottom-2 right-2 cursor-pointer rounded-full p-1 box-content' /> :
                        <div className='absolute bottom-2 right-2 flex items-center gap-2 p-1 rounded-full bg-white'>
                            <img src={assets.remove_icon_red} alt='remove' onClick={() => removeFromCart(id)} className='w-8' />
                            <p>{cartItems[id]}</p>
                            <img src={assets.add_icon_green} alt='plus' onClick={() => addToCart(id)} className='w-8' />
                        </div>
                }
            </div>
            <div className='p-5'>
                <div className='flex justify-between items-center mb-3'>
                    <p className='font-semibold text-md'>{name}</p>
                    <img src={assets.rating} alt="rating" className='w-[70px]' />
                </div>
                <p className='text-sm'>{description}</p>
                <p className='text-orange-700 font-semibold my-3 '>{price} TL</p>
            </div>
        </div>
    );
}

export default Food;
