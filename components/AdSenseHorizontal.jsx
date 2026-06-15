import React, { useEffect, useRef, useState } from "react";

/**
 * Horizontal Google AdSense component.
 * Disappears completely if no ad is served.
 */
const AdSenseHorizontal = () => {
  const adRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const markReady = () => setIsReady(true);
    const startLoading = () => {
      if (window.__agecalcThirdParty?.state?.adsenseLoaded) {
        markReady();
        return;
      }

      window.__agecalcThirdParty?.loadAdsense?.();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startLoading();
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    window.addEventListener("agecalc:adsense-ready", markReady);

    return () => {
      observer.disconnect();
      window.removeEventListener("agecalc:adsense-ready", markReady);
    };
  }, []);

  useEffect(() => {
    if (!isReady || !adRef.current || adRef.current.hasAttribute("data-adsbygoogle-status")) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      const timer = setTimeout(() => {
        const filled = adRef.current?.querySelector("iframe");
        if (!filled) setVisible(false);
      }, 2500);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error("AdSense error:", e);
      setVisible(false);
    }
  }, [isReady]);

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
