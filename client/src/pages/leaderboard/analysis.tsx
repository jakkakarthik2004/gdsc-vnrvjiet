import React, { useState, useEffect } from "react";

const Analysis = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <iframe
      title="Webathon_Dashboard"
      width={dimensions.width}
      height={dimensions.height}
      src="https://app.powerbi.com/view?r=eyJrIjoiZDI0MTc1ODQtNDJjYS00MDJhLTk3ZjQtNjY1ODY2MmE3YmI0IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9"
      frameBorder="0"
      allowFullScreen={true}
    ></iframe>
  );
};

export default Analysis;
