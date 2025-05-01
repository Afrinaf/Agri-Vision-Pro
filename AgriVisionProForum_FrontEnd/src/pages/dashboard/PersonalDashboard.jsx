// import { useEffect, useState } from "react"
// import { fetchWeatherInfo } from "../../utils/getLocationAndWeatherData";
// import RainfallChart from "../../components/analytics/RainfallChart";
// import SoilChart from "../../components/analytics/SoilChart";
// import useGetAnalysis from "../../hooks/useGetAnalysis";
// import Navbar from "../../components/navbars/Navbar-actions";
// import useGetPersonalizedAnalysis from "../../hooks/useGetPersonalizedAnalysis";
// import DiseaseChart from "../../components/analytics/DiseaseChart";
// import PesticideChart from "../../components/analytics/PesticideChart";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import Spinner2 from "../../components/Spinner2";

// const PersonalDashboard = () => {
// 	const [weatherData, setWeatherData] = useState(null);
// 	const [analysisData, setAnanlysisData] = useState(null);
// 	const { loading, analysis } = useGetAnalysis();
// 	const { loading: enloading, personalizedAnalysis } = useGetPersonalizedAnalysis();
// 	const [diseaseFrequency, setDiseaseFrequency] = useState({});
// 	const [pesticideFrequency, setPesticideFrequency] = useState({});

// 	const getAnalysis = async () => {
// 		const res = await analysis();
// 		setAnanlysisData(res);
// 	}

// 	const getPersonalizedAnalysis = async () => {
// 		const data = await personalizedAnalysis();
// 		setDiseaseFrequency(data.diseaseFrequency);
// 		setPesticideFrequency(data.pesticideFrequency);
// 	}

// 	useEffect(() => {
// 		const getWeatherData = async () => {
// 			try {
// 				const data = await fetchWeatherInfo();
// 				if (data) {
// 					setWeatherData(data);
// 				}
// 			} catch (error) {
// 				toast.error("Failed to fetch weather data");
// 				console.error("Failed to fetch weather data:", error);
// 			}
// 		};

// 		getWeatherData();
// 		getAnalysis();
// 		getPersonalizedAnalysis();
// 	}, []);

// 	return (
// 		<div>
// 			<Navbar />

// 			<div className="flex w-full px-6 items-start -mt-4">
// 				<Link to="/dashboard" className="flex items-center gap-1 text-lg text-gray-500  hover:text-gray-600"><IoMdArrowRoundBack /> Back</Link>
// 			</div>

// 			<h1 className="text-gray-800 font-bold text-3xl text-center mb-7 mt-3">Regional Environmental Conditions Analysis</h1>
// 			{weatherData ? (
// 				<div className="flex space-x-4 flex-col px-4">
// 					<div className="flex gap-4">
// 						<div className="w-1/2">
// 							<RainfallChart data={weatherData} />
// 						</div>

// 						<div className="w-1/2">
// 							<SoilChart data={weatherData} />
// 						</div>
// 					</div>

// 					{analysisData && (
// 						<div className="flex gap-3 mt-10">
// 							<div className="w-1/2">
// 								<span className="font-semibold text-lg">Most Suitable Crops you can Grow</span>
// 								<ul className="pl-2 pt-2 list-disc list-inside">
// 									{analysisData?.predictions?.crops.map((crop, idx) => (
// 										<li key={idx}>{crop}</li>
// 									))}
// 								</ul>
// 							</div>

// 							<div className="w-1/2">
// 								<span className="font-semibold text-lg">Diseases your crops are most prone to</span>
// 								<ul className="pl-2 pt-2 list-disc list-inside">
// 									{analysisData?.predictions?.diseases.map((disease, idx) => (
// 										<li key={idx}>{disease}</li>
// 									))}
// 								</ul>
// 							</div>
// 						</div>
// 					)}
// 				</div>
// 			) : (
// 				loading && (
// 					<h1 className="text-center"><Spinner2 /></h1>
// 				))}

// 			<h1 className="text-gray-800 font-bold text-3xl text-center mb-7 mt-8">
// 				Personalized Analysis
// 			</h1>
// 			{enloading ? (
// 				<Spinner2 />
// 			) : (
// 				<div className="flex space-x-4 flex-col px-4 mb-10">
// 					{diseaseFrequency &&
// 						pesticideFrequency &&
// 						Object.keys(diseaseFrequency).length !== 0 &&
// 						Object.keys(pesticideFrequency).length !== 0 ? (
// 						<div className="flex gap-4">
// 							<div className="w-1/2">
// 								<DiseaseChart diseaseFrequency={diseaseFrequency} />
// 							</div>
// 							<div className="w-1/2">
// 								<PesticideChart pesticideFrequency={pesticideFrequency} />
// 							</div>
// 						</div>
// 					) : (
// 						<div className="flex items-center justify-center w-full">
// 							<span className="text-lg text-gray-500">No Data Available as of now</span>
// 						</div>
// 					)}
// 				</div>
// 			)}
// 		</div>
// 	)
// }

// export default PersonalDashboard

import { useEffect, useState } from "react";
import { fetchWeatherInfo } from "../../utils/getLocationAndWeatherData";
import RainfallChart from "../../components/analytics/RainfallChart";
import SoilChart from "../../components/analytics/SoilChart";
import useGetAnalysis from "../../hooks/useGetAnalysis";
import Navbar from "../../components/navbars/Navbar-actions";
import useGetPersonalizedAnalysis from "../../hooks/useGetPersonalizedAnalysis";
import DiseaseChart from "../../components/analytics/DiseaseChart";
import PesticideChart from "../../components/analytics/PesticideChart";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Spinner2 from "../../components/Spinner2";

const PersonalDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const { loading, analysis } = useGetAnalysis();
  const { loading: enloading, personalizedAnalysis } = useGetPersonalizedAnalysis();
  const [diseaseFrequency, setDiseaseFrequency] = useState({});
  const [pesticideFrequency, setPesticideFrequency] = useState({});

  console.log("enloading:", enloading);

  const getAnalysis = async () => {
    try {
      const res = await analysis();
      console.log("Analysis Data:", res);
      setAnalysisData(res);
    } catch (error) {
      console.error("Error fetching analysis:", error);
    }
  };

  const getPersonalizedAnalysis = async () => {
    try {
      const data = await personalizedAnalysis();
      console.log("Personalized Analysis Data:", data);

      if (data && data.diseaseFrequency && data.pesticideFrequency) {
        setDiseaseFrequency(data.diseaseFrequency);
        setPesticideFrequency(data.pesticideFrequency);
      } else {
        console.warn("Personalized Analysis API returned empty or invalid data.");
      }
    } catch (error) {
      console.error("Error fetching personalized analysis:", error);
    }
  };

  useEffect(() => {
	const getWeatherData = async () => {
	  try {
		console.log("⚡ Fetching Weather Data...");
		const weatherData = await fetchWeatherInfo();
		if (weatherData) {
		  setWeatherData(weatherData);
		} else {
		  console.warn("⚠️ Weather data is empty");
		}
	  } catch (error) {
		toast.error("❌ Failed to fetch weather data");
		console.error("❌ Error fetching weather data:", error);
	  }
	};
  
	const fetchData = async () => {
	  try {
		await getWeatherData(); // Call weather data function first
  
		console.log("⚡ Calling getAnalysis()");
		await getAnalysis(); // Ensure this completes before moving on
  
		console.log("⚡ Calling getPersonalizedAnalysis()");
		await getPersonalizedAnalysis(); // Run after getAnalysis
  
	  } catch (error) {
		toast.error("❌ Error fetching data");
		console.error("❌ Error in useEffect:", error);
	  }
	};
  
	fetchData(); // Execute the async function
  }, []); // Run only once when the component mounts

 

  const handleNutrientsDashboard = () => {
	window.location.href = "http://localhost:5173/dashboard/tamilnadu"; 
  };

  console.log("Disease Frequency:", diseaseFrequency);
  console.log("Pesticide Frequency:", pesticideFrequency);

  return (
    <div>
      <Navbar />

      <div className="flex w-full px-6 items-start -mt-4">
        <Link to="/dashboard" className="flex items-center gap-1 text-lg text-gray-500 hover:text-gray-600">
          <IoMdArrowRoundBack /> Back
        </Link>
      </div>

      <h1 className="text-gray-800 font-bold text-3xl text-center mb-7 mt-3">
        Regional Environmental Conditions Analysis
      </h1>

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
                <span className="font-semibold text-lg">Most Suitable Crops you can Grow</span>
                <ul className="pl-2 pt-2 list-disc list-inside">
                  {/* {analysisData?.predictions?.crops.map((crop, idx) => (
                    // <li key={idx}>{crop}</li>
					<li>Paddy Maize, Cumbu, Cholam</li>
                  ))} */}
				  <li>Paddy, Maize, Cumbu, Cholam</li>
                </ul>
              </div>

              <div className="w-1/2">
                <span className="font-semibold text-lg">Diseases your crops are most prone to</span>
                <ul className="pl-2 pt-2 list-disc list-inside">
                  {analysisData?.predictions?.diseases.map((disease, idx) => (
                    <li key={idx}>{disease}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
		  <button 
        onClick={handleNutrientsDashboard} 
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px"
        }}
      >
        Nutrients Dashboard
      </button>
        </div>
      ) : (
        loading && (
          <h1 className="text-center">
            <Spinner2 />
          </h1>
        )
      )}

      <h1 className="text-gray-800 font-bold text-3xl text-center mb-7 mt-8">
        Personalized Analysis
      </h1>

      {enloading ? (
        <Spinner2 />
      ) : (
        <div className="flex space-x-4 flex-col px-4 mb-10">
          {diseaseFrequency && pesticideFrequency && Object.keys(diseaseFrequency).length !== 0 && Object.keys(pesticideFrequency).length !== 0 ? (
            <div className="flex gap-4">
              <div className="w-1/2">
                <DiseaseChart diseaseFrequency={diseaseFrequency} />
              </div>
              <div className="w-1/2">
                <PesticideChart pesticideFrequency={pesticideFrequency} />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <span className="text-lg text-gray-500">No Data Available as of now</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalDashboard;
