import toast from "react-hot-toast";
import { env_data } from "../data/Rainfall_Soil.json";

const getLocationAndWeather = async () => {
    try {
        const res = await fetch('https://api.ipify.org');
        const data = res.text();

        return data;
    } catch (error) {
        toast.error(error.message);
        console.log("Failed to fetch ip");
    }
}

// export const fetchIPInfo = async () => {
//     try {
//         const ip = await getLocationAndWeather();
//         if (!ip) {
//             throw new Error("IP address could not be fetched.");
//         }

//         const res = await fetch(`http://ip-api.com/json/${ip}`);
//         const data = await res.json();
//         console.log(data);
//         return data;
//     } catch (error) {
//         toast.error(error.message);
//         console.log("Failed to fetch location");
//     }
// }

export const fetchIPInfo = async () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser.");
            reject("Geolocation not supported.");
            return; // Prevent further execution
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const  latitude = 8.72867891133813;
                const longitude  =  77.72500695633231;
                console.log("Detected Latitude & Longitude:", latitude, longitude);

                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`);
                    const data = await res.json();
                    console.log("Location Data from GPS:", data);

                    const district =
                        data.address?.state_district || // ✅ First priority (correct in your case)
                        data.address?.county || 
                        data.address?.city || 
                        "Unknown District";

                    resolve({ city: district });
                } catch (error) {
                    toast.error("Failed to fetch GPS location.");
                    reject(error);
                }
            },
            (error) => {
                toast.error("Failed to fetch GPS location. Please enable location access.");
                console.error("Geolocation error:", error);
                reject(error);
            },
            { timeout: 10000 } // 10-second timeout for location fetching
        );
    });
};

export const fetchWeatherInfo = async () => {
    try {
        const district = await fetchIPInfo();
        console.log(district)

        if (district.city) {
            const matchedDistrict = env_data.find(
                (data) => data.District.toUpperCase().trim().normalize() ===
                    district.city.toUpperCase().trim().normalize()
            );

            console.log(matchedDistrict)

            if (matchedDistrict) {
                return matchedDistrict;
            } else {
                toast.error(`No data found for the district: ${district.city}`);
            }
        } else {
            toast.error("Could not retrieve district name");
        }
    } catch (error) {
        toast.error(error.message);
        console.log("Failed to fetch weather info");
    }
}

export const getRegionalWeather = (district) => {
    const matchedDistrict = env_data.find(
        (data) => data.District.toUpperCase() === district.toUpperCase()
    );

    if (matchedDistrict) {
        return matchedDistrict;
    } else {
        toast.error(`No data found for the district: ${district}`);
    }
}