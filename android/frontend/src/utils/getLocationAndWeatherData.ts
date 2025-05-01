// import { env_data } from "../data/Rainfall_Soil.json";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";



// interface WeatherDataProps {
//     District: string;
//     ACTUAL: number;
//     NORMAL: number;
//     DEP: number;
//     N: number;
//     P: number;
//     K: number;
//     pH: number;
// }

// const getLocationAndWeather = async () => {
//     try {
//         const res = await fetch('https://api.ipify.org');
//         const data = res.text();

//         return data;
//     } catch (error) {
//         console.log("Failed to fetch ip");
//     }
// };

// // export const fetchIPInfo = async () => {
// //     try {
// //         const ip = await getLocationAndWeather();
// //         if (!ip) {
// //             throw new Error("IP address could not be fetched.");
// //         }

// //         const res = await fetch(`http://ip-api.com/json/${ip}`);
// //         const data = await res.json();
// //         console.log(data);
// //         return data;
// //     } catch (error) {
// //         console.log("Failed to fetch location");
// //     }
// // }

// interface LocationData {
//     city: string;
//   }

// export const fetchIPInfo = async (): Promise<LocationData> => {
//     return new Promise((resolve, reject) => {
//       if (!navigator.geolocation) {
//         toast.error("Geolocation is not supported by your browser.");
//         reject("Geolocation not supported.");
//         return; // Prevent further execution
//       }
  
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const latitude = 8.72867891133813;
//           const longitude = 77.72500695633231;
//           console.log("Detected Latitude & Longitude:", latitude, longitude);
  
//           try {
//             const res = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
//             );
//             const data = await res.json();
//             console.log("Location Data from GPS:", data);
  
//             const district =
//               data.address?.state_district || // ✅ First priority
//               data.address?.county ||
//               data.address?.city ||
//               "Unknown District";
  
//             resolve({ city: district });
//           } catch (error) {
//             toast.error("Failed to fetch GPS location.");
//             reject(error);
//           }
//         },
//         (error) => {
//           toast.error("Failed to fetch GPS location. Please enable location access.");
//           console.error("Geolocation error:", error);
//           reject(error);
//         },
//         { timeout: 10000 } // 10-second timeout for location fetching
//       );
//     });
//   };
  

// export const fetchWeatherInfo = async (): Promise<WeatherDataProps | null> => {
//     try {
//         const district = await fetchIPInfo();
        

//         if (district.city) {
//             const matchedDistrict = env_data.find(
//                 (data) => data.District.toUpperCase() === district.city.toUpperCase()
//             );

//             if (matchedDistrict) {
//                 return matchedDistrict;
//             } else {
//                 console.log(`No data found for the district: ${district.city}`)
//                 return null;
//             }
//         } else {
//             console.log("Could not retrieve district name");
//             return null;
//         }
//     } catch (error) {
//         console.log("Failed to fetch weather info");
//         return null;
//     }
// }

// export const getRegionalWeather = (district: string) => {
//     const matchedDistrict = env_data.find(
//         (data) => data.District.toUpperCase() === district.toUpperCase()
//     );

//     if (matchedDistrict) {
//         return matchedDistrict;
//     } else {
//         console.log(`No data found for the district: ${district}`);
//     }
// }

import * as Location from "expo-location";
import { env_data } from "../data/Rainfall_Soil.json";
import { showToast } from "./showToast";

// ✅ Define interface for Weather Data
interface WeatherDataProps {
  District: string;
  ACTUAL: number;
  NORMAL: number;
  DEP: number;
  N: number;
  P: number;
  K: number;
  pH: number;
}

// ✅ Define interface for Location Data
interface LocationData {
  city: string;
  lat: number;
  lon: number;
}

// Get IP Location (Not used here but available if needed)
const getLocationAndWeather = async (): Promise<string | undefined> => {
  try {
    const res = await fetch("https://api.ipify.org");
    const data = await res.text();
    return data;
  } catch (error) {
    showToast("error", "Error", "Failed to fetch IP");
    console.error("Failed to fetch IP:", error);
  }
};

// ✅ Fetch GPS Location and Get District Name
export const fetchIPInfo = async (): Promise<LocationData> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
  
      if (status !== "granted") {
        showToast("error", "Error", "Location permission denied.");
        throw new Error("Location permission denied.");
      }
  
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
  
      const latitude = 8.72867891133813;
      const longitude =  77.72500695633231
  
      console.log("Detected Latitude & Longitude:", latitude, longitude);
  
      // ✅ Reverse Geocode to get district name
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
  
      if (reverseGeocode.length > 0) {
        const district =
          reverseGeocode[0].district || "Unknown District";
        console.log("Detected District:", district);
  
        return { city: district, lat: latitude, lon: longitude };
      } else {
        throw new Error("No address found for coordinates.");
      }
    } catch (error) {
      showToast("error", "Error", "Failed to fetch GPS location.");
      console.error("Error fetching location:", error);
      throw error;
    }
  };

  
// ✅ Fetch Weather Info Based on District Name
export const fetchWeatherInfo = async (): Promise<WeatherDataProps | null> => {
  try {
    const district: LocationData = await fetchIPInfo();
    console.log("Detected District:", district.city);

    if (district.city) {
      const matchedDistrict = env_data.find(
        (data) =>
          data.District.toUpperCase().trim().normalize() ===
          district.city.toUpperCase().trim().normalize()
      );

      if (matchedDistrict) {
        showToast("success", "Success", `Weather data found for ${district.city}`);
        return matchedDistrict;
      } else {
        showToast("info", "No Data", `No data found for the district: ${district.city}`);
        return null;
      }
    } else {
      showToast("error", "Error", "Could not retrieve district name.");
      return null;
    }
  } catch (error) {
    showToast("error", "Error", "Failed to fetch weather info.");
    console.error("Failed to fetch weather info:", error);
    return null;
  }
};

// ✅ Get Regional Weather by District Name
export const getRegionalWeather = (district: string): WeatherDataProps | undefined => {
  const matchedDistrict = env_data.find(
    (data) => data.District.toUpperCase() === district.toUpperCase()
  );

  if (matchedDistrict) {
    return matchedDistrict;
  } else {
    showToast("info", "No Data", `No data found for the district: ${district}`);
    return undefined;
  }
};
