import React, { useContext, useState } from "react";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";

import { DataContext } from "./Context";

const AlertSaveCollections = () => {
  const allContextProps = useContext(DataContext);
  const { showAlert, setshowAlert } = {
    ...allContextProps,
  };
  // console.log(showAlert);
  return (
    <div className="alertSaveCollections">
      <Toast
        onClose={() => setshowAlert(false)}
        show={showAlert}
        delay={1000}
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
