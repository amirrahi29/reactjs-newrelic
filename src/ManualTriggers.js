import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';

// 1. Button Click Tracker
const ButtonClick = () => {
  const handleClick = () => {
    console.log("Button clicked!");
    if (window.newrelic) {
      window.newrelic.addPageAction("ButtonClick", {
        button: "Demo Button",
        user: "Amir Rahi"
      });
    }
  };
  return <button onClick={handleClick}>Click Me</button>;
};

// 2. Form Submit Tracker
const FormSubmit = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    if (window.newrelic) {
      window.newrelic.addPageAction("FormSubmit", {
        form: "DemoForm",
        email: "test@example.com"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <input type="text" placeholder="Enter email" />
      <button type="submit">Submit</button>
    </form>
  );
};

// 3. Route Change Tracker
const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    console.log("Route changed:", location.pathname);
    if (window.newrelic) {
      window.newrelic.addPageAction("RouteChange", {
        path: location.pathname
      });
    }
  }, [location]);
  return null;
};

// 4. API Call Tracker
const ApiCall = () => {
  const callApi = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(res => res.json())
      .then(data => {
        console.log("API success:", data);
        if (window.newrelic) {
          window.newrelic.addPageAction("APISuccess", {
            endpoint: "/posts/1"
          });
        }
      })
      .catch(err => {
        console.error("API error:", err);
        if (window.newrelic) {
          window.newrelic.noticeError(err);
        }
      });
  };

  return <button onClick={callApi}>Call API</button>;
};

// 5. Business Event Tracker (Checkout)
const Checkout = () => {
  const completeCheckout = () => {
    console.log("Checkout completed!");
    if (window.newrelic) {
      window.newrelic.addPageAction("CheckoutComplete", {
        userId: "U12345",
        cartValue: 4500,
        items: 3
      });
    }
  };

  return <button onClick={completeCheckout}>Complete Checkout</button>;
};

// 6. Custom Performance Checkpoint
const PerformanceCheck = () => {
  const markCheckpoint = () => {
    const ts = Date.now();
    console.log("Performance checkpoint at:", ts);
    if (window.newrelic) {
      window.newrelic.addPageAction("PerformanceCheckpoint", {
        step: "DashboardRendered",
        timestamp: ts
      });
    }
  };

  return <button onClick={markCheckpoint}>Mark Performance Checkpoint</button>;
};

// 7. Manual Error Trigger
const ErrorTrigger = () => {
  const throwError = () => {
    try {
      throw new Error("Manual error for New Relic!");
    } catch (err) {
      console.error(err);
      if (window.newrelic) {
        window.newrelic.noticeError(err);
      }
    }
  };

  return <button onClick={throwError}>Trigger Error</button>;
};

const ManualTriggers = () => {
  return (
    <Router>
      <RouteTracker />
      <div style={{ padding: "20px" }}>
        <h1>New Relic Manual Trigger Demo</h1>
        <nav style={{ marginBottom: "10px" }}>
          <Link to="/">Home</Link> | <Link to="/checkout">Checkout</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <ButtonClick />
                <FormSubmit />
                <ApiCall />
                <PerformanceCheck />
                <ErrorTrigger />
              </>
            }
          />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default ManualTriggers;
