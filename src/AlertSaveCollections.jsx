import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";

const AlertSaveCollections = (props) => {
  const { showAlert, isShowAlert } = props;

  return (
    <div className="alertSaveCollections">
      <Toast
        onClose={() => isShowAlert(false)}
        show={showAlert}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Collections have been saved</strong>
        </Toast.Header>
      </Toast>
    </div>
  );
};

export default AlertSaveCollections;
