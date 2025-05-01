import React, { useContext, useEffect, useState } from 'react';
import Post from './post';
import PostContext from '../context/post/postContext';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user/userContext';

export default function Home() {
    const { allPosts, fetchPosts } = useContext(PostContext);
    const { getUserDetails } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        } else {
            getUserDetails();
            fetchPosts();
        }
    }, []);

    // Filter form state
    const initialFilters = {
        category: "",
        productName: "",
        minPrice: "",
        maxPrice: "",
        minQuantity: "",
        maxQuantity: "",
        pricingType: "",
        harvestDateFrom: "",
        harvestDateTo: "",
    };

    const [filters, setFilters] = useState(initialFilters);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);

    const handleClearFilters = () => {
        setFilters(initialFilters);
        setFilteredPosts([]);
        setFilterApplied(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleFilterSubmit = async (e) => {
        console.log(filters)
        e.preventDefault();

        let queryParams = new URLSearchParams();
        for (let key in filters) {
            if (filters[key]) {
                queryParams.append(key, filters[key]);
            }
        }

        try {
            const res = await fetch(`http://localhost:5005/api/post/filter?${queryParams.toString()}`);
            const data = await res.json();
            if (data.success) {
                setFilteredPosts(data.posts);
                setFilterApplied(true);
            } else {
                console.error("Error fetching filtered posts");
            }
        } catch (error) {
            console.error("Error fetching filtered posts:", error);
        }
    };

    // Decide which posts to display: filtered or all posts from context
    const postsToDisplay = filterApplied ? filteredPosts : allPosts;

    return (
        // <div className="flex h-screen overflow-y-auto ">
        //     {/* Left Section - Posts */}
        //     <div className="w-full h-screen overflow-y-auto" style={{backgroundColor : "#E4FFF0"}}>
        //         <main>
        //             <div>
        //             <div className="w-full font-extrabold px-4 sticky top-0 pr-2 lg:text-3xl bg-green-200 bg-opacity-30 backdrop-blur-md">
        //                 <h2 className='pt-5 pb-1'>All Posts</h2>
        //                 <div className="h-[2px] bg-gray-800 w-full my-4"></div>
        //             </div>
                        
        //                 <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        //                     {postsToDisplay.length !== 0 ? (
        //                         postsToDisplay.map((post) => (
        //                             <Post key={post.images.filename} post={post} />
        //                         ))
        //                     ) : (
        //                         <div>No Posts to display....</div>
        //                     )}
        //                 </div>
        //             </div>
        //         </main>
        //     </div>

        //     {/* Right Section - Filter Panel */}
        //     <div className="p-4 bg-green-950" style={{width : "31%"}}>
        //         <div className="bg-green-950 text-white p-4 rounded-lg-lg shadow-md">
        //             <h2 className="text-2xl font-extrabold mb-7">Filters</h2>
        //             <form onSubmit={handleFilterSubmit}>
        //                 {/* Category */}
        //                 <div className="mb-4">
        //                     <label className="block mb-1 font-medium">Category</label>
        //                     <select
        //                         name="category"
        //                         value={filters.category}
        //                         onChange={handleInputChange}
        //                         className="w-full border-lime-500 border-2 rounded-lg p-2 text-black"
        //                     >
        //                         <option value="">Any</option>
        //                         <option value="Fruits">Fruits</option>
        //                         <option value="Vegetables">Vegetables</option>
        //                         <option value="Seeds">Seeds</option>
        //                         <option value="Grains">Grains</option>
        //                         <option value="Dairy">Dairy</option>
        //                         <option value="Livestock">Livestock</option>
        //                         <option value="Others">Others</option>
        //                     </select>
        //                 </div>

        //                 {/* Product Name */}
        //                 <div className="mb-4">
        //                     <label className="block mb-1 font-medium">Product Name</label>
        //                     <input
        //                         type="text"
        //                         name="productName"
        //                         value={filters.productName}
        //                         onChange={handleInputChange}
        //                         className="w-full border-lime-500 border-2 rounded-lg p-2 text-black placeholder:text-gray-700"
        //                         placeholder="Enter product name"
        //                     />
        //                 </div>

        //                 {/* Price Range */}
        //                 <div className="mb-4">
        //                     <label className="block mb-1 font-medium">Price Range</label>
        //                     <div className="flex space-x-2">
        //                         <input
        //                             type="number"
        //                             name="minPrice"
        //                             value={filters.minPrice}
        //                             onChange={handleInputChange}
        //                             className="w-1/2 border-lime-500 border-2 rounded-lg p-2 text-black placeholder:text-gray-700"
        //                             placeholder="Min"
        //                         />
        //                         <input
        //                             type="number"
        //                             name="maxPrice"
        //                             value={filters.maxPrice}
        //                             onChange={handleInputChange}
        //                             className="w-1/2 border-lime-500 border-2 rounded-lg p-2 text-black placeholder:text-gray-700"
        //                             placeholder="Max"
        //                         />
        //                     </div>
        //                 </div>

        //                 {/* Quantity Range */}
        //                 <div className="mb-4">
        //                     <label className="block mb-1 font-medium">Quantity Range</label>
        //                     <div className="flex space-x-2">
        //                         <input
        //                             type="number"
        //                             name="minQuantity"
        //                             value={filters.minQuantity}
        //                             onChange={handleInputChange}
        //                             className="w-1/2 border-lime-500 border-2 rounded-lg p-2  text-black placeholder:text-gray-700"
        //                             placeholder="Min"
        //                         />
        //                         <input
        //                             type="number"
        //                             name="maxQuantity"
        //                             value={filters.maxQuantity}
        //                             onChange={handleInputChange}
        //                             className="w-1/2 border-lime-500 border-2 rounded-lg p-2 text-black placeholder:text-gray-700"
        //                             placeholder="Max"
        //                         />
        //                     </div>
        //                 </div>

        //                 {/* Pricing Type */}
        //                 <div className="mb-4">
        //                     <label className="block mb-1 font-medium">Pricing Type</label>
        //                     <select
        //                         name="pricingType"
        //                         value={filters.pricingType}
        //                         onChange={handleInputChange}
        //                         className="w-full border-lime-500 border-2 rounded-lg p-2 text-black placeholder:text-gray-700"
        //                     >
        //                         <option value="">Any</option>
        //                         <option value="Fixed">Fixed</option>
        //                         <option value="Negotiable">Negotiable</option>
        //                     </select>
        //                 </div>

        //                 {/* Harvest Date Range */}
        //                 <div className="mb-4">
        //                     <label className="block mb-1 font-medium">Harvest Date Range</label>
        //                     <div className="flex space-x-2">
        //                         <input
        //                             type="date"
        //                             name="harvestDateFrom"
        //                             value={filters.harvestDateFrom}
        //                             onChange={handleInputChange}
        //                             className="w-1/2 border-lime-500 border-2 rounded-lg p-2 text-black placeholder:text-gray-700"
        //                         />
        //                         <input
        //                             type="date"
        //                             name="harvestDateTo"
        //                             value={filters.harvestDateTo}
        //                             onChange={handleInputChange}
        //                             className="w-1/2 border-lime-500 border-2 rounded-lg p-2 text-black placeholder:text-gray-700"
        //                         />
        //                     </div>
        //                 </div>

        //                 <div className='w-full my-7'>
        //                 <button
        //                     type="submit"
        //                     className=" bg-lime-600  text-white p-2 mx-3 rounded-lg font-bold"
        //                     style={{width : "42%"}}
        //                 >
        //                     Apply Filters
        //                 </button>
        //                 <button
        //                     className=" bg-lime-800 text-white p-2 mx-3 rounded-lg font-bold"
        //                     style={{width : "42%"}}
        //                     onClick={handleClearFilters}
        //                 >
        //                     Clear Filters
        //                 </button>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>

        <div className="flex h-screen overflow-y-auto bg-[#F5FCF7]">
        {/* Left Section - Posts */}
        <div className="w-full h-screen overflow-y-auto">
            <main>
                <div>
                <div className="w-full font-bold px-6 py-4 sticky top-0 bg-white/80 backdrop-blur-lg border-b border-[#C1E1C1] shadow-sm">
                    <h2 className='text-2xl text-gray-800'>Marketplace Feed</h2>
                    <p className="text-sm text-gray-600 mt-1">Explore agricultural products from farmers</p>
                </div>
                    
                    <div className="px-6 py-4 mx-auto max-w-7xl">
                        {postsToDisplay.length !== 0 ? (
                            postsToDisplay.map((post) => (
                                <Post key={post.images.filename} post={post} />
                            ))
                        ) : (
                            <div className="text-gray-500 text-center py-8">No posts available matching your criteria</div>
                        )}
                    </div>
                </div>
            </main>
        </div>

        {/* Right Section - Filter Panel */}
        <div className="p-6 bg-white border-l border-[#C1E1C1] shadow-lg" style={{width : "31%"}}>
            <div className="p-4 rounded-xl bg-white">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Filter Products</h2>
                <form onSubmit={handleFilterSubmit}>
                    {/* Category */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] bg-white text-gray-800"
                        >
                            <option value="">All Categories</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Seeds">Seeds</option>
                            <option value="Grains">Grains</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Livestock">Livestock</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    {/* Product Name */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={filters.productName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] bg-white text-gray-800 placeholder-gray-400"
                            placeholder="Search product..."
                        />
                    </div>

                    {/* Price Range */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Price Range (₹)</label>
                        <div className="flex gap-3">
                            <input
                                type="number"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={handleInputChange}
                                className="w-1/2 px-4 py-2 rounded-lg border border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] bg-white text-gray-800"
                                placeholder="Min"
                            />
                            <input
                                type="number"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handleInputChange}
                                className="w-1/2 px-4 py-2 rounded-lg border border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] bg-white text-gray-800"
                                placeholder="Max"
                            />
                        </div>
                    </div>

                    {/* Quantity Range */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Quantity Range</label>
                        <div className="flex gap-3">
                            <input
                                type="number"
                                name="minQuantity"
                                value={filters.minQuantity}
                                onChange={handleInputChange}
                                className="w-1/2 px-4 py-2 rounded-lg border border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] bg-white text-gray-800"
                                placeholder="Min"
                            />
                            <input
                                type="number"
                                name="maxQuantity"
                                value={filters.maxQuantity}
                                onChange={handleInputChange}
                                className="w-1/2 px-4 py-2 rounded-lg border border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] bg-white text-gray-800"
                                placeholder="Max"
                            />
                        </div>
                    </div>

                    {/* Pricing Type */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Pricing Type</label>
                        <select
                            name="pricingType"
                            value={filters.pricingType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 rounded-lg border border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] bg-white text-gray-800"
                        >
                            <option value="">All Types</option>
                            <option value="Fixed">Fixed Price</option>
                            <option value="Negotiable">Negotiable</option>
                        </select>
                    </div>

                    {/* Harvest Date Range */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2 text-gray-700">Harvest Date</label>
                        <div className="flex gap-3">
                            <input
                                type="date"
                                name="harvestDateFrom"
                                value={filters.harvestDateFrom}
                                onChange={handleInputChange}
                                className="w-1/2 px-4 py-2 rounded-lg border border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] bg-white text-gray-800"
                            />
                            <input
                                type="date"
                                name="harvestDateTo"
                                value={filters.harvestDateTo}
                                onChange={handleInputChange}
                                className="w-1/2 px-4 py-2 rounded-lg border border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] bg-white text-gray-800"
                            />
                        </div>
                    </div>

                    <div className='flex gap-3 mt-8'>
                    <button
                        type="submit"
                        className="w-full bg-[#C1E1C1] hover:bg-[#AED6AE] text-gray-800 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                        Apply Filters
                    </button>
                    <button
                        type="button"
                        onClick={handleClearFilters}
                        className="w-full border-2 border-[#C1E1C1] hover:border-[#AED6AE] text-gray-700 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                        Clear
                    </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}
