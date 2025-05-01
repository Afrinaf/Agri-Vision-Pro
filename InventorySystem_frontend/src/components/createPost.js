// import React from 'react'
// import PostContext from '../context/post/postContext';

// export default function Example() {
//     const { post, setPost, setImg, addPost } = React.useContext(PostContext);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPost({ ...post, [name]: value, });
//     };
//     const handleImage = (e) => {
//         setImg(e.target.files[0])
//     }

//     const submitPost = async (e) => {
//         e.preventDefault()
//         addPost()
//     }


//     return (
//         <form onSubmit={submitPost} encType='multipart/formdata' className="flex-col flex-1 " style={{ overflowY: "auto", height: "100vh", background : "#e4fff0"}} >
//             {/* component */}

//             <section className=" py-1">
//                 <div className="w-4/6 px-4 mx-auto mt-6">
//                     <div className=" border-green-950 border-2 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white ">
//                         <div className="rounded-t bg-lime-400 mb-0 px-6 py-6">
//                             <div className="text-center flex justify-between">
//                                 <h6 className="text-black text-3xl font-extrabold">Create Post</h6>

//                                 <button
//                                     className="bg-green-950 hover:bg-green-400 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
//                                     type="submit"
//                                 >
//                                     Post
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-lime-400">
//                         <div className="h-[2px] bg-gray-800 w-full my-4"></div>
//                             <div>
//                                 <h6 className="text-black text-sm mt-3 mb-6 font-extrabold uppercase">
//                                     Post Information
//                                 </h6>
//                                 <div className="flex flex-wrap">
//                                     <div className="w-full lg:w-12/12 px-4">
//                                         <div className="relative w-full mb-3">
//                                             <label
//                                                 className="block uppercase text-gray-900 text-xs font-bold mb-2"
//                                                 htmlFor="grid-password"
//                                             >
//                                                 Post Title
//                                             </label>
//                                             <input
//                                                 onChange={handleChange} type="text" name='postTitle'
//                                                 value={post.postTitle}
//                                                 className="border-2 px-3 py-3 placeholder-gray-500 border-black text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                                 placeholder='Post Title'
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="w-full lg:w-12/12 px-4">
//                                         <div className="relative w-full mb-3">
//                                             <label
//                                                 className="block uppercase text-gray-900 text-xs font-bold mb-2"
//                                                 htmlFor="grid-password"
//                                             >
//                                                 Post Description
//                                             </label>
//                                             <textarea
//                                                 onChange={handleChange} type="text" name='postDescription'
//                                                 value={post.postDescription}
//                                                 className="border-2 px-3 py-3 placeholder-gray-500 border-black text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                                 rows={4}
//                                                 placeholder='Post Description'
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <hr className="mt-6 border-b-1 border-blueGray-300" />
//                                 <h6 className="text-gray-900 text-sm mt-3 mb-6 font-extrabold uppercase">
//                                     Product Information
//                                 </h6>
//                                 <div className="flex flex-wrap">
//                                     <div className="w-full lg:w-6/12 px-4">
//                                         <div className="relative w-full mb-3">
//                                             <label
//                                                 className="block uppercase text-gray-900 text-xs font-bold mb-2"
//                                                 htmlFor="grid-password"
//                                             >
//                                                 Product Name
//                                             </label>
//                                             <input
//                                                 onChange={handleChange} type="text" name='productName'
//                                                 value={post.productName}
//                                                 className="border-2 px-3 py-3 placeholder-gray-500 border-black text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                                 placeholder='Product Name'
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="w-full lg:w-6/12 px-4">
//                                         <div className="relative w-full mb-3">
//                                             <label
//                                                 className="block uppercase text-gray-900 text-xs font-bold mb-2"
//                                                 htmlFor="grid-password"
//                                             >
//                                                 Product Category
//                                             </label>
//                                             <select onChange={handleChange} value={post.category} className="border-2 px-3 py-3 placeholder-gray-500 border-black text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                                 name='category' id="">
//                                                 <option defaultValue="Others">Others</option>
//                                                 <option value="Fruits">Fruits</option>
//                                                 <option value="Vegetables">Vegetables</option>
//                                                 <option value="Livestock">Livestock</option>
//                                                 <option value="Seeds">Seeds</option>
//                                                 <option value="Grains">Grains</option>
//                                                 <option value="Dairy">Dairy</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="w-full lg:w-6/12 px-4">
//                                         <div className="relative w-full mb-3">
//                                             <label
//                                                 className="block uppercase text-gray-900 text-xs font-bold mb-2"
//                                                 htmlFor="grid-password"
//                                             >
//                                                 Product Variety
//                                             </label>
//                                             <input
//                                                 onChange={handleChange} type="text" name='variety'
//                                                 value={post.variety}
//                                                 className="border-2 px-3 py-3 placeholder-gray-500 border-black text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                                 placeholder='Product Variety'
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="w-full lg:w-6/12 px-4">
//                                         <div className="relative w-full mb-3">
//                                             <label
//                                                 className="block uppercase text-gray-900 text-xs font-bold mb-2"
//                                                 htmlFor="grid-password"
//                                             >
//                                                 Product Grade
//                                             </label>
//                                             <input
//                                                 onChange={handleChange} type="text" name='grade'
//                                                 value={post.grade}
//                                                 className="border-2 px-3 py-3 placeholder-gray-500 border-black text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                                 placeholder='Product Grade'
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="w-full lg:w-6/12 px-4">
//                                         <div className="relative w-full mb-3">
//                                             <label
//                                                 className="block uppercase text-gray-900 text-xs font-bold mb-2"
//                                                 htmlFor="grid-password"
//                                             >
//                                                 Product Harvest Date
//                                             </label>
//                                             <input
//                                                 onChange={handleChange} type="date" name='harvestDate'
//                                                 value={post.harvestDate}
//                                                 className="border-2 px-3 py-3 placeholder-gray-500 border-black text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                                 placeholder='Product Harvest Date'
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="w-full lg:w-6/12 px-4">
//                                         <div className="relative w-full mb-3">
//                                             <label
//                                                 className="block uppercase text-gray-900 text-xs font-bold mb-2"
//                                                 htmlFor="grid-password"
//                                             >
//                                                 Product Shelf Life
//                                             </label>
//                                             <input
//                                                 onChange={handleChange} type="text" name='shelfLife'
//                                                 value={post.shelfLife}
//                                                 className="border-2 px-3 py-3 placeholder-gray-500 border-black text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                                 placeholder='Product Shelf Life'
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <hr className="mt-6 border-b-1 border-blueGray-300" />
//                                 <h6 className="text-gray-900 text-sm mt-3 mb-6 font-bold uppercase">
//                                     Product Quantity and Price
//                                 </h6>
//                                 <div className="flex flex-wrap">
//                                     <div className="w-full lg:w-6/12 px-4">
//                                         <div className="relative w-full mb-3">
//                                             <label
//                                                 className="block uppercase text-gray-900 text-xs font-bold mb-2"
//                                                 htmlFor="grid-password"
//                                             >
//                                                 Product Quantity
//                                             </label>
//                                             <input
//                                                 onChange={handleChange} type="Number" name='quantity'
//                                                 value={post.quantity}
//                                                 className="border-2 px-3 py-3 placeholder-gray-500 border-black text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                                 placeholder='Product Quantity'
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="w-full lg:w-6/12 px-4">
//                                         <div className="relative w-full mb-3">
//                                             <label
//                                                 className="block uppercase text-gray-900 text-xs font-bold mb-2"
//                                                 htmlFor="grid-password"
//                                             >
//                                                 Quantity Unit
//                                             </label>
//                                             <select onChange={handleChange} value={post.unit} className="border-2 px-3 py-3 placeholder-gray-500 border-black text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                                 name="unit" id="">
//                                                 <option defaultValue="kg">kg</option>
//                                                 <option value="lbs">lbs</option>
//                                                 <option value="crates">crates</option>
//                                                 <option value="liters">liters</option>
//                                                 <option value="units">units</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div className="w-full lg:w-6/12 px-4">
//                                         <div className="relative w-full mb-3">
//                                             <label
//                                                 className="block uppercase text-gray-900 text-xs font-bold mb-2"
//                                                 htmlFor="grid-password"
//                                             >
//                                                 Price per Unit
//                                             </label>
//                                             <input
//                                                 onChange={handleChange} type="number" name='pricePerUnit'
//                                                 value={post.pricePerUnit}
//                                                 className="border-2 px-3 py-3 placeholder-gray-500 border-black text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                                 placeholder='Price per Units'
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="w-full lg:w-6/12 px-4">
//                                         <div className="relative w-full mb-3">
//                                             <label
//                                                 className="block uppercase text-gray-900 text-xs font-bold mb-2"
//                                                 htmlFor="grid-password"
//                                             >
//                                                 Pricing Type
//                                             </label>
//                                             <select onChange={handleChange} value={post.pricingType} className="border-2 px-3 py-3 placeholder-gray-500 border-black text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                                                 name="pricingType" id="">
//                                                 <option defaultValue="Fixed">Fixed</option>
//                                                 <option value="Negotiable">Negotiable</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <hr className="mt-6 border-b-1 border-blueGray-300" />
//                                 <h6 className="text-gray-900 text-sm mt-3 mb-6 font-bold uppercase">
//                                     Upload Images
//                                 </h6>
//                                 <div>
//                                     <div>
//                                         <label htmlFor="file-input" className="sr-only">Choose file</label>
//                                         <input onChange={handleImage} type="file" name="image" id="image" className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-indigo-900 dark:border-neutral-700 400 file:bg-gray-50 file:border-2 file:me-4 file:py-3 file:px-4 dark:file:bg-indigo-500 dark:file:text-white" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </section>
//         </form>
//     )
// }




import React, { useState, useEffect } from 'react';
import PostContext from '../context/post/postContext';

export default function Example() {
    const { post, setPost, setImg, addPost } = React.useContext(PostContext);
    const [preview, setPreview] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submitPost = async (e) => {
        e.preventDefault();
        try {
            await addPost();
            setNotificationMessage('Bid placed successfully!');
            setIsError(false);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                window.location.reload(); // Add this line
            }, 3000);
        } catch (error) {
            setNotificationMessage('Error placing bid. Please try again.');
            setIsError(true);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        }
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <form onSubmit={submitPost} encType="multipart/form-data" className="flex flex-col flex-1 h-screen bg-[#F5FCF7] overflow-y-auto">
            {/* Notification */}
            {showNotification && (
                <div className="fixed bottom-6 right-6 animate-slideIn">
                    <div className={`${isError ? 'bg-red-100 text-red-800' : 'bg-[#C1E1C1] text-gray-800'} px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 relative overflow-hidden`}>
                        {isError ? (
                            <svg className="h-6 w-6 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6 text-green-800 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        <div>
                            <p className="font-medium">{notificationMessage}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto w-full p-6">
                <div className="border-2 border-[#C1E1C1] rounded-xl bg-white shadow-lg">
                    {/* Header */}
                    <div className="rounded-t-xl bg-[#C1E1C1] px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">Create New Bid</h2>
                            <button
                                className="bg-[#2a4b3c] hover:bg-[#3c6b5c] text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
                                type="submit"
                            >
                                Place Bid
                            </button>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-6 space-y-8">
                        <div className="space-y-6">
                            {/* Post Information */}
                            <div className="border-b border-[#C1E1C1] pb-6">
                                <h3 className="text-lg font-semibold text-[#2a4b3c] mb-4">Post Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
                                        <input
                                            onChange={handleChange}
                                            name="postTitle"
                                            value={post.postTitle}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] placeholder-gray-400"
                                            placeholder="Enter post title"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                        <textarea
                                            onChange={handleChange}
                                            name="postDescription"
                                            value={post.postDescription}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] placeholder-gray-400"
                                            rows={4}
                                            placeholder="Write your post description"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Product Information */}
                            <div className="border-b border-[#C1E1C1] pb-6">
                                <h3 className="text-lg font-semibold text-[#2a4b3c] mb-4">Product Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                        <input
                                            onChange={handleChange}
                                            name="productName"
                                            value={post.productName}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] placeholder-gray-400"
                                            placeholder="Product name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                        <select
                                            onChange={handleChange}
                                            name="category"
                                            className="w-full px-4 py-3 rounded-lg border-2 border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] bg-white"
                                        >
                                            <option value="Others">Select Category</option>
                                            <option value="Fruits">Fruits</option>
                                            <option value="Vegetables">Vegetables</option>
                                            <option value="Livestock">Livestock</option>
                                            <option value="Seeds">Seeds</option>
                                            <option value="Grains">Grains</option>
                                            <option value="Dairy">Dairy</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Variety</label>
                                        <input
                                            onChange={handleChange}
                                            name="variety"
                                            value={post.variety}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] placeholder-gray-400"
                                            placeholder="Product variety"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
                                        <input
                                            onChange={handleChange}
                                            name="grade"
                                            value={post.grade}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] placeholder-gray-400"
                                            placeholder="Product grade"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Date</label>
                                        <input
                                            onChange={handleChange}
                                            type="date"
                                            name="harvestDate"
                                            value={post.harvestDate}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Shelf Life</label>
                                        <input
                                            onChange={handleChange}
                                            name="shelfLife"
                                            value={post.shelfLife}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] placeholder-gray-400"
                                            placeholder="Shelf life duration"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Pricing Section */}
                            <div className="border-b border-[#C1E1C1] pb-6">
                                <h3 className="text-lg font-semibold text-[#2a4b3c] mb-4">Pricing & Quantity</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                        <input
                                            onChange={handleChange}
                                            type="number"
                                            name="quantity"
                                            value={post.quantity}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B]"
                                            placeholder="Enter quantity"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                                        <select
                                            onChange={handleChange}
                                            name="unit"
                                            className="w-full px-4 py-3 rounded-lg border-2 border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B]"
                                        >
                                            <option value="kg">kg</option>
                                            <option value="lbs">lbs</option>
                                            <option value="crates">Crates</option>
                                            <option value="liters">Liters</option>
                                            <option value="units">Units</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Price per Unit</label>
                                        <input
                                            onChange={handleChange}
                                            type="number"
                                            name="pricePerUnit"
                                            value={post.pricePerUnit}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B]"
                                            placeholder="Enter price"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Type</label>
                                        <select
                                            onChange={handleChange}
                                            name="pricingType"
                                            className="w-full px-4 py-3 rounded-lg border-2 border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B]"
                                        >
                                            <option value="Fixed">Fixed Price</option>
                                            <option value="Negotiable">Negotiable</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <h3 className="text-lg font-semibold text-[#2a4b3c] mb-4">Product Images</h3>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col w-full border-2 border-[#C1E1C1] border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-[#9BC19B] transition-colors">
                                            {preview ? (
                                                <img 
                                                    src={preview} 
                                                    alt="Preview" 
                                                    className="h-32 w-32 object-cover mx-auto rounded-lg mb-4"
                                                />
                                            ) : (
                                                <>
                                                    <svg 
                                                        className="mx-auto h-12 w-12 text-[#C1E1C1]" 
                                                        stroke="currentColor" 
                                                        fill="none" 
                                                        viewBox="0 0 48 48"
                                                    >
                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                                                        strokeWidth="2" 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round"
                                                    />
                                                    </svg>
                                                    <span className="mt-2 text-sm text-gray-600">Drag and drop or click to upload</span>
                                                </>
                                            )}
                                            <input 
                                                onChange={handleImage} 
                                                type="file" 
                                                name="image" 
                                                id="image" 
                                                className="hidden"
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }

                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
        </form>
    );
}