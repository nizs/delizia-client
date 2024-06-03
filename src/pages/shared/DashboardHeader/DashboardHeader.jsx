import React from 'react';

const DashboardHeader = () => {
    return (
        <div className='flex items-center justify-evenly'>
            <h2 className='text-2xl font-bold text-slate-700 font-sans'>Cart Item: <span className='text-error text-orange-500'>{cart.length}</span></h2>
            <h2 className='text-2xl font-bold  text-slate-700'>Total Price: <span className='text-error text-orange-500'>${totalPrice}</span></h2>
            <button className="btn bg-orange-500 hover:bg-orange-600 text-white">Pay</button>
        </div>
    );
};

export default DashboardHeader;