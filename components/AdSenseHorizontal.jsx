import React, { useEffect, useRef, useState } from "react";

/**
 * Horizontal Google AdSense component.
 * Disappears completely if no ad is served.
 */
const AdSenseHorizontal = () => {
  const adRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (adRef.current && !adRef.current.hasAttribute("data-adsbygoogle-status")) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        // Check after a short delay if an ad iframe was injected
        const timer = setTimeout(() => {
          const filled = adRef.current?.querySelector("iframe");
          if (!filled) setVisible(false); // Hide if no ad is displayed
        }, 2500);
        return () => clearTimeout(timer);
      } catch (e) {
        console.error("AdSense error:", e);
        setVisible(false);
      }
    }
  }, []);

  if (!visible) return null; // Remove from DOM if not visible

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{
        display: "block",
        width: "100%",
        maxHeight: "90px", // Recommended horizontal ad height
      }}
      data-ad-client="ca-pub-3272888926635438"
      data-ad-slot="2076362671"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSenseHorizontal;
