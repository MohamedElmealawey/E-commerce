import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import axios from "axios";

const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate, axios } = useContext(AppContext);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            const {data} = await axios.post(`/api/seller/login`, user,);

            if (data.success) {
                setIsSeller(true);
                toast.success(data.message);
                navigate("/seller");
            } else {
                toast.error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isSeller) {
            navigate("/seller");
        }
    }, [isSeller, navigate]);

    if (isSeller) return null;

    return (
        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
            <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
                <p className='text-2xl font-medium m-auto'>
                    <span className='text-primary-dull'>Seller</span> Login
                </p>
                <div className='w-full'>
                    <p>Email</p>
                    <input 
                        type="email" 
                        name='email' 
                        onChange={handleChange} 
                        placeholder='Enter your email'
                        value={user.email}
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary-dull'
                        disabled={loading}
                        required
                    />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input 
                        type="password" 
                        name='password' 
                        onChange={handleChange} 
                        placeholder='Enter your password'
                        value={user.password}
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary-dull'
                        disabled={loading}
                        required
                    />
                </div>
                <button 
                    type='submit' 
                    className='bg-primary-dull text-white w-full py-2 rounded-md cursor-pointer hover:bg-opacity-90 transition-colors'
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </div>
        </form>
    );
};

export default SellerLogin;