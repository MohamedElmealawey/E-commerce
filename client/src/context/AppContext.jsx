import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials=true;
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency=import.meta.env.VITE_CURRENCY;
    const navigate=useNavigate();
    const [user,setUser]=useState(null);
    const [isSeller,setIsSeller]=useState(false);
    const [showUserLogin,setShowUserLogin]=useState(false);
    const [products,setProducts]=useState([]);
    const [cartItems,setCartItems]=useState({});
    const [searchQuery,setSearchQuery]=useState({});

    const getAllProducts=async()=>{
    try{
        const {data}=await axios.get("/api/product/list");
        if(!data.success){
            toast.error(data.message);
        }
        setProducts(data.products);
    }catch(error){
        console.log(error.message)
    }
    }

    const fetchUser=async()=>{
        try{
            const {data}=await axios.get("/api/user/is-auth");
            if(data.success){
                setUser(data.user);
                setCartItems(data.user.cartItems);
            }
        }catch(error){
            setUser(null);
            console.log(error.message);
        }
    }

    const fetchSeller=async()=>{
        try{
            const {data}=await axios.get("/api/seller/is-auth");

            if(data.success){
                setIsSeller(true);
            }else{
                setIsSeller(false);
            }

        }catch(error){
            setIsSeller(false);
            console.log(error.message);
        }
    }

    const addToCart=(itemId)=>{
        let cardData =structuredClone(cartItems);

        if(cardData[itemId]){
            cardData[itemId]+=1;
        }else{
            cardData[itemId]=1;
        }
        setCartItems(cardData);
        toast.success("Add to Cart")

    }

    const updateCartItem=(itemId,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId]=quantity;
        setCartItems(cartData);
        toast.success("Cart Updated")
    }

    const removeCartItem=(itemId)=>{
        const cartData=structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId]-=1;
            if(cartData[itemId]===0){
                delete cartData[itemId];
            }
        }
        toast.success("Removed from Cart");
        setCartItems(cartData);
    }

    const getCartCount=()=>{
        let totalCount=0;
        for(const item in cartItems){
            totalCount+=cartItems[item];
        }
        return totalCount;
    }

    const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){;
            let itemInfo=products.find((product)=>product._id===items);
            if(cartItems[items]>0){
                totalAmount+=itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100)/100;
    }

    useEffect(()=>{
        fetchUser();
        getAllProducts();
        fetchSeller();
    },[])

    useEffect(()=>{
        const updateCart=async()=>{
            try{
                const {data}=await axios.post('/api/cart/update',{cartItems});
                if(!data.success){
                    toast.error(data.message)
                }
            }catch(error){
                console.log(error.message);
            }
        }
        if(user){
            updateCart();
        }
    },[cartItems])
    return (
        <AppContext.Provider value={{getAllProducts,products,axios,isSeller,setIsSeller,addToCart,updateCartItem,removeCartItem,
        cartItems,currency,products,navigate,user,setUser,showUserLogin,
        setShowUserLogin ,searchQuery,setSearchQuery,getCartAmount,setCartItems,getCartCount}}>
            {children}
        </AppContext.Provider>
    );
}