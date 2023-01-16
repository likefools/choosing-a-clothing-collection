import React, { useContext, useState, useRef } from "react";

import { DataContext } from './Context';

import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

const ItemsSelectedInfo = (props) => {

  const allContextProps = useContext(DataContext);
  const {itemsSelected, removeItemSelected, saveCollections} = {...allContextProps};

  // const {  } = props;

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const deleteItem = (item) => {
    removeItemSelected(item)
  }


  // onClick={() => getItemSelected(oldValues => {return oldValues.filter(item => item !== value)})}

  return (
    <div className="itemsSelectedInfo">
      <div ref={ref}>
        <Button onClick={handleClick}>
          items Selected {Object.keys(itemsSelected).length}
        </Button>

        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref}
          containerPadding={10}
        >
          <Popover id="popover-contained">
            <Popover.Header as="h3">
              <div className="item">
                {Object.keys(itemsSelected) ? "Collections" : "no items"}

                <Button
                  size="sm"
                  variant="success"
                  disabled={
                    Object.keys(itemsSelected).length !== 3 ? true : false
                  }
                  onClick={() => saveCollections(itemsSelected)}
                >
                  Save
                </Button>
              </div>
            </Popover.Header>

            {Object.keys(itemsSelected).map((item, index) => (
              <Popover.Body key={index}>
                <div className="item">
                  {itemsSelected[item].type} {itemsSelected[item].brand}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteItem(item)}
                  >
                    Delete
                  </Button>
                </div>
              </Popover.Body>
            ))}
          </Popover>
        </Overlay>
      </div>
    </div>
  );
};

export default ItemsSelectedInfo;
