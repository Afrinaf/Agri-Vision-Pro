import React, { useContext, useEffect, useState } from 'react'
import PostContext from '../context/post/postContext'
import { useParams } from 'react-router-dom'
import PostTracking from './PostTracking'
import BidTable from './bidTable'

export default function Dashboard() {

    const { name } = useParams()
    const { userPosts, fetchUserPosts } = useContext(PostContext)
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5005/api/auth/getuserbyname/${name}`, {
                    headers: {
                        'auth-token': localStorage.getItem('token')
                    }
                });
                if (!response.ok) {
                    throw new Error("User not found");
                }
                const data = await response.json();
                setUser(data);
            } catch (err) {
                console.error(err.message);
            }
        }
        fetchUser()
        if (user._id) {
            fetchUserPosts(user._id)
        }
    }, [fetchUserPosts, name, user._id]);

    useEffect(() => {
        fetchUserPosts(localStorage.getItem('userId'));
    }, [userPosts, fetchUserPosts]);

    const date_parser = (d) => {
        const fullDate = new Date(d);
        return fullDate.toISOString().split("T")[0];
    }

    return (
        // <>
        //     <div className="flex flex-col items-center overflow-y-auto h-screen" style={{backgroundColor : "#E4FFF0"}}>
        //         <div className="flex w-3/4 ">
        //             <div className="flex-1 m-4">
        //                 {/*all bids*/}
        //                 <div className="bg-lime-400 p-4 rounded-md">
        //                     <h2 className="text-black text-3xl font-extrabold pb-4">
        //                         All Bids
        //                     </h2>
        //                     <div className="my-1" />
        //                     <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6" />
        //                     {userPosts.length !== 0 && userPosts.map((p) => {
        //                         return (<div className='bg-white p-4 rounded-md my-14' key={p._id}>
        //                             <div className="mb-6">
        //                                 <h3 className="font-extrabold text-xl text-gray-800">Product Description</h3>
        //                                 <div className="h-[2px] bg-gray-800 w-full my-4"></div>
        //                                 <div className='flex justify-around'>
        //                                     <div>
        //                                         <p>Product name : {p.productName}</p>
        //                                         <p>Product category : {p.category}</p>
        //                                         <p>Product variety : {p.variety}</p>
        //                                     </div>
        //                                     <div>
        //                                         <p>Product garde : {p.grade}</p>
        //                                         <p>Harvest date : {date_parser(p.harvestDate)}</p>
        //                                         <p>Shelf life : {p.shelfLife}</p>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <div className="mb-8">
        //                                 <h3 className="font-extrabold text-xl text-gray-800">Product Pricing and Quantity</h3>
        //                                 <div className="h-[2px] bg-gray-800 w-full my-4"></div>
        //                                 <div className='flex justify-around'>
        //                                     <div>
        //                                         <p>Product quantity : {p.quantity}</p>
        //                                         <p>Quantity unit : {p.unit}</p>
        //                                     </div>
        //                                     <div>
        //                                         <p>Price per unit : {p.pricePerUnit}</p>
        //                                         <p>Pricing type : {p.pricingType}</p>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             <BidTable p={p} ></BidTable>
        //                             <div className='w-full'><PostTracking currentStep={p.acceptedBidState} /></div>
        //                         </div>)
        //                     })}
        //                     {userPosts.length === 0 && <div>
        //                         no post to show
        //                     </div>}
        //                 </div>
        //             </div>
        //         </div>
        //     </div >
        // </>

        <div className="flex flex-col items-center overflow-y-auto h-screen bg-[#F5FCF7]">
            <div className="flex w-3/4">
                <div className="flex-1 m-4">
                    {/* All bids section */}
                    <div className="bg-[#C1E1C1] p-6 rounded-xl shadow-lg">
                        <h2 className="text-[#2a4b3c] text-3xl font-bold pb-4">
                            All Bids
                        </h2>
                        <div className="h-[2px] bg-[#2a4b3c] w-full mb-6"></div>
                        
                        {userPosts.length !== 0 && userPosts.map((p) => (
                            <div className='bg-white p-6 rounded-lg my-8 shadow-md' key={p._id}>
                                {/* Product Description */}
                                <div className="mb-8">
                                    <h3 className="font-bold text-xl text-[#2a4b3c] mb-4">Product Description</h3>
                                    <div className="h-[2px] bg-[#C1E1C1] w-full mb-4"></div>
                                    <div className='flex justify-around'>
                                        <div className="space-y-2">
                                            <p className="text-gray-700">Product name: <span className="text-[#2a4b3c]">{p.productName}</span></p>
                                            <p className="text-gray-700">Category: <span className="text-[#2a4b3c]">{p.category}</span></p>
                                            <p className="text-gray-700">Variety: <span className="text-[#2a4b3c]">{p.variety}</span></p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-gray-700">Grade: <span className="text-[#2a4b3c]">{p.grade}</span></p>
                                            <p className="text-gray-700">Harvest date: <span className="text-[#2a4b3c]">{date_parser(p.harvestDate)}</span></p>
                                            <p className="text-gray-700">Shelf life: <span className="text-[#2a4b3c]">{p.shelfLife}</span></p>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Pricing */}
                                <div className="mb-8">
                                    <h3 className="font-bold text-xl text-[#2a4b3c] mb-4">Product Pricing & Quantity</h3>
                                    <div className="h-[2px] bg-[#C1E1C1] w-full mb-4"></div>
                                    <div className='flex justify-around'>
                                        <div className="space-y-2">
                                            <p className="text-gray-700">Quantity: <span className="text-[#2a4b3c]">{p.quantity}</span></p>
                                            <p className="text-gray-700">Unit: <span className="text-[#2a4b3c]">{p.unit}</span></p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-gray-700">Price/Unit: <span className="text-[#2a4b3c]">₹{p.pricePerUnit}</span></p>
                                            <p className="text-gray-700">Pricing Type: <span className="text-[#2a4b3c]">{p.pricingType}</span></p>
                                        </div>
                                    </div>
                                </div>

                                <BidTable p={p} />
                                <div className='w-full mt-6'>
                                    <PostTracking currentStep={p.acceptedBidState} />
                                </div>
                            </div>
                        ))}
                        
                        {userPosts.length === 0 && (
                            <div className="text-center py-8 text-gray-600">
                                No active bids to display
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
