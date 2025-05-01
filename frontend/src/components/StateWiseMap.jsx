import React, { useEffect, useRef } from "react";
import './map.css';
import Navbar from "./navbars/Navbar-actions";

// Helper function to load external JS files
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const StateWiseMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Load external JS files when component mounts
    const loadMapScripts = async () => {
      try {
        await loadScript("/static/js/MapData_JS.js");
        await loadScript("/static/js/Map_JS.js");
        console.log("Map JS files loaded successfully!");
      } catch (error) {
        console.error("Error loading map JS files:", error);
      }
    };

    loadMapScripts();

    // Cleanup by removing scripts when component unmounts
    return () => {
      const scripts = document.querySelectorAll("script[src*='/static/js/']");
      scripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <div>
      <Navbar />
    <div
      
      ref={mapRef}
      id="map-container"
      className="map-container flex justify-center items-center min-h-screen bg-gray-300 p-5"
    >
      
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          State Wise Agricultural Map
        </h1>
        
        <p className="text-center mt-4 text-lg">
          Hover over different states to view detailed agricultural data.
        </p>
        <div
          id="map"
          className="w-full h-[900px] border border-gray-500 shadow-md"
        ></div>
      </div>
    </div>
    </div>
  );
};

export default StateWiseMap;
