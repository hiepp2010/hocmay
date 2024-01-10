"use client";
import React, { useEffect, useRef } from "react";

const IframeComponent = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleIframeLoad = () => {
      const iframe = iframeRef.current;
      iframe.style.height = "900px";
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener("load", handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleIframeLoad);
      }
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="http://localhost:3000/d/f2e3256c-c7e1-49d7-87bc-526fa318ae73/dashboard-demo?orgId=1&refresh=5s&viewPanel=2&from=1696510326929&to=1699102326929"
      style={{ height: "1200px" }}
    />
  );
};

export default IframeComponent;
