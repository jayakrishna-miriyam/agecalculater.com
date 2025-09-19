import React, { useEffect, useRef } from "react";

const AdSenseHorizontal = () => {
  const adRef = useRef(null);

  useEffect(() => {
    // Only push if this ad hasn't already been initialized
    if (adRef.current && !adRef.current.hasAttribute("data-adsbygoogle-status")) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-3272888926635438"
      data-ad-slot="2076362671"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSenseHorizontal;
