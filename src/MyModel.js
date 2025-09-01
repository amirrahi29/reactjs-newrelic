import React, { useState } from 'react';

const MyModel = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
    if (window.newrelic) {
      window.newrelic.addPageAction("ModalOpened", {
        modal: "UserFormModal"
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (window.newrelic) {
      window.newrelic.addPageAction("ModalClosed", {
        modal: "UserFormModal"
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (window.newrelic) {
      window.newrelic.addPageAction("ModalFormSubmitted", {
        modal: "UserFormModal",
        email: "test@example.com"
      });
    }
    alert("Form submitted!");
    setShowModal(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hello Modal Example</h1>

      {!showModal && (
        <button onClick={handleOpenModal}>Open Modal</button>
      )}

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "30%",
            left: "30%",
            width: "400px",
            padding: "20px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)"
          }}
        >
          <h2>Modal Form</h2>
          <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Enter Email" required />
            <button type="submit" style={{ marginLeft: "10px" }}>
              Submit
            </button>
          </form>
          <button onClick={handleCloseModal} style={{ marginTop: "10px" }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MyModel;
