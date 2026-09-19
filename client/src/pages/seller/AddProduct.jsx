import React, { useContext, useState } from 'react'
import { assets, categories } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const {axios}=useContext(AppContext);
    const [isLoading,setIsLoading]=useState(false);
    const [files,setFiles]=useState([]);
    const [product,setProduct]=useState({
        name:"",
        description:"",
        category:"",
        price:"",
        offerPrice:""
    })

    const onChangeHandler=(e)=>{
        const {name,value}=e.target;
        setProduct((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        setIsLoading(true);
        try{
            const formData=new FormData();
            formData.append('productData',JSON.stringify(product));
            for(let i =0; i<=files.length;i++){
                formData.append('images',files[i]);
            }

            const {data}=await axios.post("/api/product/add",formData);

            if(data.success){
                toast.success(data.message);
                setProduct({
                    name: "",
                    description: "",
                    category: "",
                    price: "",
                    offerPrice: ""
                });
                setFiles([]);
            }else{
                toast.error(data.message);
            }
        }catch(error){
            console.log(error.message);
        }finally{
            setIsLoading(false);
        }
    }
    return (
        <div className="no-scroller flex flex-1 max-h-[95vh] overflow-y-scroll flex-col justify-between">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-3 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input onChange={(e)=>{
                                    const updatedFiles=[...files];
                                    updatedFiles[index]=e.target.files[0];
                                    setFiles(updatedFiles);
                                }} accept="image/*" type="file" id={`image${index}`} hidden />
                                <img className="max-w-24 cursor-pointer" src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area} alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input name='name' onChange={onChangeHandler} id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea name='description' onChange={onChangeHandler} id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select name='category' onChange={onChangeHandler} id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                        {categories.map((cat,index)=>(
                            <option key={index} value={cat.path}>{cat.path}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input name='price' onChange={onChangeHandler} id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input name='offerPrice' onChange={onChangeHandler} id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button className="px-8 py-2.5 bg-primary-dull cursor-pointer text-white font-medium rounded flex items-center justify-center gap-2 min-w-[80px]">
                    {isLoading ? (
                        <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></div>
                    ) : "ADD"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct