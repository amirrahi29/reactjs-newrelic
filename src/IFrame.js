import React, { useState } from 'react';

const IFrame = () => {
  const [showIframe, setShowIframe] = useState(false);

  const handleOpenIframe = () => {
    setShowIframe(true);
    if (window.newrelic) {
      window.newrelic.addPageAction("IframeOpened", {
        url: "https://example.com"
      });
    }
  };

  const handleCloseIframe = () => {
    setShowIframe(false);
    if (window.newrelic) {
      window.newrelic.addPageAction("IframeClosed", {
        url: "https://example.com"
      });
    }
  };

  const handleIframeLoad = () => {
    if (window.newrelic) {
      window.newrelic.addPageAction("IframeLoaded", {
        url: "https://example.com"
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hello</h1>

      {!showIframe && (
        <button onClick={handleOpenIframe}>Open Iframe</button>
      )}

      {showIframe && (
        <div>
          <button onClick={handleCloseIframe} style={{ marginBottom: "10px" }}>
            Close Iframe
          </button>
          <iframe
            src="https://example.com"
            title="Demo Iframe"
            width="600"
            height="400"
            onLoad={handleIframeLoad}
            style={{ border: "1px solid #ccc" }}
          />
        </div>
      )}
    </div>
  );
};

export default IFrame;
