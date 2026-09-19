import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [state, setState] = useState("login");
    const { setShowUserLogin, axios, navigate, setUser,user } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data } = await axios.post(`/api/user/${state}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (data.success) {
                toast.success(data.message || 'Login successful!');
                setShowUserLogin(false);
                setUser(data.user);
                navigate("/");
            }else{
                toast.error(data.message || 'Login failed');
                setIsLoading(false);
                return;
            }
            
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div onClick={() => setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50'>
            <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className="sm:w-[400px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
                <h1 className="text-gray-900 text-3xl mt-10 font-medium">
                    {state === "login" ? "Login" : "Sign up"}
                </h1>
                <p className="text-gray-500 text-sm mt-2">
                    {state === "login" ? "Please sign in to continue" : "Create your account"}
                </p>
                
                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="5" />
                            <path d="M20 21a8 8 0 0 0-16 0" />
                        </svg>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            className="border-none outline-none ring-0 w-full pr-4" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                )}
                
                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                    </svg>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email id" 
                        className="border-none outline-none ring-0 w-full pr-4" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        className="border-none outline-none ring-0 w-full pr-4" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div className="mt-4 text-left text-[#4fbf8b]">
                    <button type="button" className="text-sm">Forget password?</button>
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="mt-2 w-full h-11 rounded-full text-white bg-[#4fbf8b] hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                            <span>Loading...</span>
                        </>
                    ) : (
                        state === "login" ? "Login" : "Sign up"
                    )}
                </button>
                
                <p 
                    onClick={() => setState(prev => prev === "login" ? "register" : "login")} 
                    className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer"
                >
                    {state === "login" ? "Don't have an account?" : "Already have an account?"} 
                    <span className="text-[#4fbf8b] hover:underline ml-1">
                        click here
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;