import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import districtsData from "./districts.json"; // Ensure you have the JSON file
import Navbar from "../../components/navbars/Navbar-actions";
import Spinner from "../../components/Spinner";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF4848"]; // Colors for PieChart

// Mapping of keys to their full names
const keyToFullName = {
  n: "Nitrogen",
  p: "Phosphorus",
  k: "Potassium",
  S: "Sulphur",
  OC: "Organic Carbon",
  pH: "pH",
  EC: "Electrical Conductivity",
  Fe: "Iron",
  Zn: "Zinc",
  Cu: "Copper",
  B: "Boron",
  Mn: "Manganese",
};

const TamilNaduDashboard = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [soilData, setSoilData] = useState(null);

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedBlock("");
    setSelectedVillage("");
  };

  const handleBlockChange = (e) => {
    setSelectedBlock(e.target.value);
    setSelectedVillage("");
  };

  const handleVillageChange = (e) => {
    setSelectedVillage(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedDistrict) {
      alert("Please select at least a district.");
      return;
    }

    let variables = {
      state: "63f9be9f519359b7438d08bb", // Tamil Nadu ID
      district: selectedDistrict,
      cycle: "2024-25",
      count: true,
    };

    if (selectedBlock) variables.block = selectedBlock;
    if (selectedVillage) variables.village = selectedVillage;

    const requestData = {
      query: `query GetNutrientDashboardForPortal($state: ID, $district: ID, $block: ID, $village: ID, $cycle: String, $count: Boolean) {
        getNutrientDashboardForPortal(state: $state, district: $district, block: $block, village: $village, cycle: $cycle, count: $count)
      }`,
      variables: variables,
    };

    try {
      const response = await fetch("http://localhost:5004/proxy/soildata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error("Failed to fetch data");

      const responseData = await response.json();
      console.log("✅ Response Data:", responseData);

      setSoilData(responseData.data.getNutrientDashboardForPortal[0].results);
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      alert("Failed to fetch soil data.");
    }
  };

  const getChartData = (key, data) => {
    if (key === "pH") {
      return [
        { name: "Alkaline", value: data[key].Alkaline || 0 },
        { name: "Acidic", value: data[key].Acidic || 0 },
        { name: "Neutral", value: data[key].Neutral || 0 },
      ];
    } else if (key === "EC") {
      return [
        { name: "Saline", value: data[key].Saline || 0 },
        { name: "NonSaline", value: data[key].NonSaline || 0 },
      ];
    } else if (["S", "Fe", "Zn", "Cu", "B", "Mn"].includes(key)) {
      return [
        { name: "Sufficient", value: data[key].Sufficient || 0 },
        { name: "Deficient", value: data[key].Deficient || 0 },
      ];
    } else {
      return [
        { name: "High", value: data[key].High || 0 },
        { name: "Medium", value: data[key].Medium || 0 },
        { name: "Low", value: data[key].Low || 0 },
      ];
    }
  };

  return (
    <div className="container">
        <Navbar />
      <h2>Tamil Nadu Soil Health Dashboard</h2>

      <label>District:</label>
      <select value={selectedDistrict} onChange={handleDistrictChange}>
        <option value="">Select District</option>
        {districtsData.districts.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>

      {selectedDistrict && districtsData.districts.find((d) => d.id === selectedDistrict)?.blocks && (
        <>
          <label>Block:</label>
          <select value={selectedBlock} onChange={handleBlockChange}>
            <option value="">Select Block</option>
            {districtsData.districts
              .find((d) => d.id === selectedDistrict)
              ?.blocks.map((block) => (
                <option key={block.id} value={block.id}>
                  {block.name}
                </option>
              ))}
          </select>
        </>
      )}

      {selectedBlock &&
        districtsData.districts
          .find((d) => d.id === selectedDistrict)
          ?.blocks.find((b) => b.id === selectedBlock)?.villages && (
          <>
            <label>Village (Optional):</label>
            <select value={selectedVillage} onChange={handleVillageChange}>
              <option value="">Select Village</option>
              {districtsData.districts
                .find((d) => d.id === selectedDistrict)
                ?.blocks.find((b) => b.id === selectedBlock)
                ?.villages.map((village) => (
                  <option key={village.id} value={village.id}>
                    {village.name}
                  </option>
                ))}
            </select>
          </>
        )}

      <button onClick={handleSubmit}>Submit</button>

      {soilData && (
        <div className="chart-container" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {Object.keys(soilData).map((key) => (
            <div key={key} className="chart-box" style={{ textAlign: "center", border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
              <h3>{keyToFullName[key] || key}</h3> {/* Display full name if available, otherwise fallback to key */}
              <PieChart width={250} height={250}>
                <Pie
                  data={getChartData(key, soilData)}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {getChartData(key, soilData).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TamilNaduDashboard;