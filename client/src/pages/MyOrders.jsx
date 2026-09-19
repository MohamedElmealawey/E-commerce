import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currency, axios, user } = useContext(AppContext);

    const fetchMyOrders = async () => {
        if (!user) return;
        
        setLoading(true);
        try {
            const { data } = await axios.get("/api/order/user", {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (data.success) {
                setMyOrders(data.orders || []);
            } else {
                console.error('Failed to fetch orders:', data.message);
            }
        } catch (error) {
            console.error('Error fetching orders:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchMyOrders();
        }
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

    // Handle loading state
    if (loading) {
        return (
            <div className='mt-16 pb-16'>
                <div className="flex justify-center items-center h-64">
                    <p className='text-lg'>Loading orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='mt-16 pb-16'>
            <div className="flex flex-col items-end w-max mb-8">
                <p className='text-2xl font-medium uppercase'>My Orders</p>
                <div className='w-16 h-0.5 bg-primary-dull rounded-full'></div>
            </div>
            
            {myOrders && myOrders.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500">No orders found</p>
                </div>
            ) : (
                myOrders?.map((order, index) => (
                    <div key={order._id || index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
                        <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
                            <span>Order ID: {order._id}</span>
                            <span>Payment: {order.paymentType || 'N/A'}</span>
                            <span>Total Amount: {currency} {order.amount}</span>
                        </p>
                        
                        {order.items && order.items.map((item, itemIndex) => (
                            <div key={item._id || itemIndex} 
                                className={`relative bg-white text-gray-500/70 
                                ${order.items.length !== itemIndex + 1 && "border-b"} border-gray-300 
                                flex flex-col md:flex-row md:items-center justify-between p-4
                                py-5 md:gap-16 w-full max-w-4xl`}>
                                <div className='flex items-center mb-4 md:mb-0'>
                                    <div className='bg-primary/10 p-4 rounded-lg'>
                                        <img 
                                            src={item.product?.images?.[0] || '/placeholder-image.png'} 
                                            alt={item.product?.name || 'Product'} 
                                            className='w-16 h-16 object-cover'
                                        />
                                    </div>
                                    <div className='ml-4'>
                                        <h2 className='text-xl font-medium text-gray-800'>
                                            {item.product?.name || 'Product Name'}
                                        </h2>
                                        <p>Category: {item.product?.category || 'N/A'}</p>
                                    </div>
                                </div>
                                
                                <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0 text-primary text-lg font-medium'>
                                    <p>Quantity: {item.quantity || 1}</p>
                                    <p>Status: {order.status || 'Pending'}</p>
                                    <p>Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
                                </div>
                                
                                <p className='text-primary text-lg font-medium'>
                                    Amount: {currency}
                                    {item.product?.offerPrice 
                                        ? (item.product.offerPrice * (item.quantity || 1)).toFixed(2)
                                        : '0.00'}
                                </p>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default MyOrders;