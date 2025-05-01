// import { useEffect, useState } from "react";
// import { getRegionalWeather } from "../../utils/getLocationAndWeatherData";
// import RainfallChart from "../../components/analytics/RainfallChart";
// import SoilChart from "../../components/analytics/SoilChart";
// import Navbar from "../../components/navbars/Navbar-actions";
// import Spinner from "../../components/Spinner";
// import useGetRegionalAnalysis from "../../hooks/useGetRegionalAnalysis";
// import { Link, useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import { IoMdArrowRoundBack } from "react-icons/io";

// const RegionalDashboard = () => {
//     const { district } = useParams();
//     const [weatherData, setWeatherData] = useState(null);
//     const [analysisData, setAnalysisData] = useState(null);
//     const { loading, regionalAnalysis } = useGetRegionalAnalysis();

//     const getRegionalAnalysis = async () => {
//         const res = await regionalAnalysis(district);
//         console.log("Regional Analysis Response:", res); // Debugging log

//         if (res && res.predictions) {
//             setAnalysisData(res);
//         } else {
//             console.error("No predictions found in response:", res);
//             toast.error("No prediction data available for this district.");
//         }
//     };

//     const getWeatherData = () => {
//         try {
//             const data = getRegionalWeather(district);
//             if (data) {
//                 setWeatherData(data);
//             } else {
//                 console.error("No weather data found.");
//                 toast.error("Failed to fetch weather data.");
//             }
//         } catch (error) {
//             toast.error("Failed to fetch weather data.");
//             console.error("Weather Data Error:", error);
//         }
//     };

//     useEffect(() => {
//         getWeatherData();
//         getRegionalAnalysis();
//     }, [district]); // Re-fetch when district changes

//     return (
//         <div>
//             <Navbar />

//             <div className="flex w-full px-6 items-start -mt-4">
//                 <Link to="/dashboard" className="flex items-center gap-1 text-lg text-gray-500 hover:text-gray-600">
//                     <IoMdArrowRoundBack /> Back
//                 </Link>
//             </div>

//             <h1 className="text-gray-800 font-bold text-3xl text-center mb-7 mt-3">
//                 Environmental Conditions Analysis of {district}
//             </h1>

//             {weatherData ? (
//                 <div className="flex space-x-4 flex-col px-4">
//                     <div className="flex gap-4">
//                         <div className="w-1/2">
//                             <RainfallChart data={weatherData} />
//                         </div>
//                         <div className="w-1/2">
//                             <SoilChart data={weatherData} />
//                         </div>
//                     </div>

//                     {analysisData ? (
//                         <div className="flex gap-3 mt-10">
//                             <div className="w-1/2">
//                                 <span className="font-semibold text-lg">Most Suitable Crops for this Region</span>
//                                 <ul className="pl-2 pt-2 list-disc list-inside">
//                                     {analysisData?.predictions?.crops?.length > 0 ? (
//                                         analysisData.predictions.crops.map((crop, idx) => (
//                                             <li key={idx}>{crop}</li>
//                                         ))
//                                     ) : (
//                                         <li>No crop data available</li>
//                                     )}
//                                 </ul>
//                             </div>

//                             <div className="w-1/2">
//                                 <span className="font-semibold text-lg">Diseases the crops here are most prone to</span>
//                                 <ul className="pl-2 pt-2 list-disc list-inside">
//                                     {analysisData?.predictions?.diseases?.length > 0 ? (
//                                         analysisData.predictions.diseases.map((disease, idx) => (
//                                             <li key={idx}>{disease}</li>
//                                         ))
//                                     ) : (
//                                         <li>No disease data available</li>
//                                     )}
//                                 </ul>
//                             </div>
//                         </div>
//                     ) : (
//                         <h1 className="text-center text-gray-500">Loading analysis data...</h1>
//                     )}
//                 </div>
//             ) : (
//                 loading && <h1 className="text-center"><Spinner /></h1>
//             )}
//         </div>
//     );
// };

// export default RegionalDashboard;




import { useEffect, useState } from "react"
import { getRegionalWeather } from "../../utils/getLocationAndWeatherData";
import RainfallChart from "../../components/analytics/RainfallChart";
import SoilChart from "../../components/analytics/SoilChart";
import Navbar from "../../components/navbars/Navbar-actions";
import Spinner from "../../components/Spinner";
import useGetRegionalAnalysis from "../../hooks/useGetRegionalAnalysis";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";

const RegionalDashboard = () => {
	const { district } = useParams();
	const [weatherData, setWeatherData] = useState(null);
	const [analysisData, setAnanlysisData] = useState(null);
	const { loading, regionalAnalysis } = useGetRegionalAnalysis()

	const getRegionalAnalysis = async () => {
		const res = await regionalAnalysis(district);
		setAnanlysisData(res);
	}

	const getWeatherData = () => {
		try {
			const data = getRegionalWeather(district);
			if (data) {
				setWeatherData(data);
			}
		} catch (error) {
			toast.error("Failed to fetch weather data");
			console.error("Failed to fetch weather data:", error);
		}
	};

	useEffect(() => {
		getWeatherData();
		getRegionalAnalysis();
	}, []);

	return (
		<div>
			<Navbar />

			<div className="flex w-full px-6 items-start -mt-4">
				<Link to="/dashboard" className="flex items-center gap-1 text-lg text-gray-500  hover:text-gray-600"><IoMdArrowRoundBack /> Back</Link>
			</div>

			<h1 className="text-gray-800 font-bold text-3xl text-center mb-7 mt-3">Environmental Conditions Analysis of {district}</h1>
			{weatherData ? (
				<div className="flex space-x-4 flex-col px-4">
					<div className="flex gap-4">
						<div className="w-1/2">
							<RainfallChart data={weatherData} />
						</div>

						<div className="w-1/2">
							<SoilChart data={weatherData} />
						</div>
					</div>

					{analysisData && (
						<div className="flex gap-3 mt-10">
							<div className="w-1/2">
								<span className="font-semibold text-lg">Most Suitable Crops for this Region</span>
								<ul className="pl-2 pt-2 list-disc list-inside">
									{analysisData.predictions.crops.map((crop, idx) => (
										<li key={idx}>{crop}</li>
									))}
								</ul>
							</div>

							<div className="w-1/2">
								<span className="font-semibold text-lg">Diseases the crops here are most prone to</span>
								<ul className="pl-2 pt-2 list-disc list-inside">
									{analysisData.predictions.diseases.map((disease, idx) => (
										<li key={idx}>{disease}</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</div>
			) : (
				loading && (
					<h1 className="text-center"><Spinner /></h1>
				))}
		</div>
	)
}

export default RegionalDashboard