// import React from 'react'
// import logo from '../images/logo.png'
// import background from '../images/bg.jpg'
// import { Link, useNavigate } from 'react-router-dom'

// export default function Signup() {

//     const navigate = useNavigate()

//     const [user, setUser] = React.useState({
//         name: '',
//         email : '',
//         password: '',
//         type: 'farmer',
//     })

//     const handleChange = (event) => {
//         setUser({
//             ...user,
//             [event.target.name]: event.target.value
//         })
//     }

//     const handleUserCreate = async() => {
//         try{
//             const response = await fetch('http://localhost:5000/api/auth/createuser',{
//                 method : 'POST',
//                 headers : {
//                     'Content-Type': 'application/json'
//                 },
//                 body : JSON.stringify(user)
//             })
//             const result = await response.json()
//             if(result.success){
//                 localStorage.setItem('token', result.authToken)
//                 localStorage.setItem('userId', result.user._id)
//                 alert('Sign up success, user created')
//                 navigate('/')
//             }
//             else{
//                 alert('invalid inputs, try again...')
//             }
//         }
//         catch(error){
//             console.log(error)
//         }
//     }

//     return (
//         <div className="font-[sans-serif] bg-gradient-to-r from-green-900 via-green-500 to-lime-800 text-gray-800"  style={{backgroundImage : `url(${background})` }}>
//             <div className="min-h-screen flex flex-col items-center justify-center">
//                 <div className="flex items-center gap-10 w-full">
//                     <div className='self-start w-1/2'>
//                         <div className='flex mx-auto w-full'>
//                             <a href="/"><img
//                                 src={logo} alt="logo" className='inline-block h-5/6 mx-48' />
//                             </a>
//                         </div>
//                     </div>

//                     <form className="bg-white rounded-l-full px-6 space-y-4 w-2/4 h-screen self-end flex flex-col items-center">
//                         <h3 className="text-6xl font-extrabold mb-4 mt-20 text-lime-600 text-left">
//                             SIGN UP
//                         </h3>

//                         <div className="h-[2px] bg-lime-600 w-4/6 mx-auto"></div>

//                         <div className="space-y-8 w-full flex-col items-center justify-center my-8">
//                             <div className='flex flex-col items-center justify-center'>
//                                 <input onChange={handleChange} name="name" type="text" autoComplete="text" required className="border-lime-400 border-2 font-bold bg-gray-100 focus:bg-transparent w-4/6 text-sm px-4 py-3.5 rounded-md outline-gray-800" placeholder="User Name" />
//                             </div>
//                             <div className='flex flex-col items-center justify-center'>
//                                 <input onChange={handleChange} name="email" type="email" autoComplete="email" required className="border-lime-400 border-2 font-bold bg-gray-100 focus:bg-transparent w-4/6 text-sm px-4 py-3.5 rounded-md outline-gray-800" placeholder="Email address" />
//                             </div>
//                             <div className='flex flex-col items-center justify-center'>
//                                 <input onChange={handleChange} name="password" type="password" autoComplete="current-password" required  className="border-lime-400 border-2 font-bold bg-gray-100 focus:bg-transparent w-4/6 text-sm px-4 py-3.5 rounded-md outline-gray-800" placeholder="Password" />
//                             </div>
//                             <div className='flex flex-col items-center justify-center'>
//                                 <select onChange={handleChange} value={user.type} name="type" id="type" className="border-lime-400 border-2 font-bold bg-gray-100 focus:bg-transparent w-4/6 text-sm px-4 py-3.5 rounded-md outline-gray-800">
//                                     <option value="farmer">Farmer</option>
//                                     <option value="buyer">Buyer</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div className='w-full flex justify-center '>
//                             <button onClick={handleUserCreate} type="button" className="w-4/6 shadow-xl py-3 px-6 text-lg font-semibold rounded-md text-white bg-gray-800 hover:bg-[#222] focus:outline-none">
//                                 Sign Up
//                             </button>
//                         </div>
//                         <p className='text-sm'>Already have an account ? <Link to="/login" className='text-indigo-600 underline'>Login</Link></p>
//                         <p className="my-6 text-sm text-gray-400 text-center">or continue with</p>

//                         <div className="space-x-6 flex justify-center">
//                             <button type="button"
//                                 className="border-none outline-none">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="30px" className="inline" viewBox="0 0 512 512">
//                                     <path fill="#fbbd00"
//                                         d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
//                                         data-original="#fbbd00" />
//                                     <path fill="#0f9d58"
//                                         d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
//                                         data-original="#0f9d58" />
//                                     <path fill="#31aa52"
//                                         d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
//                                         data-original="#31aa52" />
//                                     <path fill="#3c79e6"
//                                         d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
//                                         data-original="#3c79e6" />
//                                     <path fill="#cf2d48"
//                                         d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
//                                         data-original="#cf2d48" />
//                                     <path fill="#eb4132"
//                                         d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
//                                         data-original="#eb4132" />
//                                 </svg>
//                             </button>
//                             <button type="button"
//                                 className="border-none outline-none">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#000" viewBox="0 0 22.773 22.773">
//                                     <path d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z" data-original="#000000"></path>
//                                 </svg>
//                             </button>

//                             <button type="button"
//                                 className="border-none outline-none">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="30px" fill="#007bff" viewBox="0 0 167.657 167.657">
//                                     <path d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z" data-original="#010002"></path>
//                                 </svg>
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>  
//         </div>
//     )
// }


import React, { useState } from 'react'
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        type: 'farmer',
    })
    const [showNotification, setShowNotification] = useState(false)
    const [showErrorNotification, setShowErrorNotification] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState('')

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleUserCreate = async () => {
        try {
            const response = await fetch('http://localhost:5005/api/auth/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const result = await response.json()
            if (result.success) {
                localStorage.setItem('token', result.authToken)
                localStorage.setItem('userId', result.user._id)
                setNotificationMessage('Account created successfully! Redirecting...')
                setShowNotification(true)
                setTimeout(() => navigate('/'), 2000)
            } else {
                setNotificationMessage('Invalid inputs. Please check your details and try again.')
                setShowErrorNotification(true)
            }
        } catch (error) {
            console.log(error)
            setNotificationMessage('Network error. Please try again later.')
            setShowErrorNotification(true)
        }
    }

    return (
        <div className="min-h-screen bg-[#f5faf7] flex items-center justify-center p-4">
            {/* Success Notification */}
            {showNotification && (
                <div className="fixed bottom-6 right-6 animate-slideIn">
                    <div className="bg-[#C1E1C1] text-gray-800 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 relative overflow-hidden">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 text-green-800 shrink-0"
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 13l4 4L19 7" 
                            />
                        </svg>
                        <div>
                            <p className="font-medium">{notificationMessage}</p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-green-800/20">
                            <div 
                                className="h-full bg-green-800/40 animate-progress"
                                onAnimationEnd={() => setShowNotification(false)}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Notification */}
            {showErrorNotification && (
                <div className="fixed bottom-6 right-6 animate-slideIn">
                    <div className="bg-[#FFEBEE] text-red-800 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 relative overflow-hidden">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 text-red-600 shrink-0"
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                            />
                        </svg>
                        <div>
                            <p className="font-medium">{notificationMessage}</p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600/20">
                            <div 
                                className="h-full bg-red-600/40 animate-progress"
                                onAnimationEnd={() => setShowErrorNotification(false)}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Signup Form */}
            <div className=" max-w-6xl flex flex-col md:flex-row items-center gap-8">
                {/* Logo Section */}
                <div className="w-full md:w-1/2 flex justify-center mb-12 md:mb-0">
                    <img 
                        src={logo} 
                        alt="logo" 
                        className="h-24 md:h-32 transition-transform duration-300 hover:scale-105" 
                    />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-4xl font-bold text-[#2a4b3c] mb-2">Create Account</h2>
                            <p className="text-gray-600">Join our farming community</p>
                        </div>

                        <div className="space-y-6">
                            {/* Name Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    onChange={handleChange}
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] placeholder-gray-400 transition-all duration-200"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    onChange={handleChange}
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] placeholder-gray-400 transition-all duration-200"
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <input
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] placeholder-gray-400 transition-all duration-200"
                                    placeholder="••••••••"
                                />
                            </div>

                            {/* Account Type Select */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                                <select
                                    onChange={handleChange}
                                    value={user.type}
                                    name="type"
                                    className="w-full px-4 py-3 rounded-lg border border-[#C1E1C1] focus:ring-2 focus:ring-[#9BC19B] focus:border-[#9BC19B] bg-white text-gray-800"
                                >
                                    <option value="farmer">Farmer</option>
                                    <option value="buyer">Buyer</option>
                                </select>
                            </div>

                            {/* Signup Button */}
                            <button
                                onClick={handleUserCreate}
                                type="button"
                                className="w-full py-3.5 px-6 bg-[#C1E1C1] hover:bg-[#AED6AE] text-gray-800 font-semibold rounded-lg transition-colors duration-200 shadow-sm"
                            >
                                Create Account
                            </button>

                            {/* Login Link */}
                            <p className="text-center text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#6a9b7d] hover:text-[#5a8a6d] transition-colors">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation Styles */}
            <style jsx global>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }

                @keyframes progress {
                    from { width: 100%; }
                    to { width: 0%; }
                }

                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }

                .animate-progress {
                    animation: progress 2.5s linear forwards;
                }
            `}</style>
        </div>
    )
}