import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

const ItemsSelectedInfo = (props) => {
    const { itemsSelected , deleteItem} = props;

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

  // onClick={() => getItemSelected(oldValues => {return oldValues.filter(item => item !== value)})}

  return (
    <div className="itemsSelectedInfo">
      <div ref={ref}>
        <Button onClick={handleClick}>
          items Selected {itemsSelected.length}
        </Button>

        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref}
          containerPadding={20}
        >
          <Popover id="popover-contained">
            <Popover.Header as="h3">
              {itemsSelected.length ? "items" : "no items"}
            </Popover.Header>
            {itemsSelected.map((item, index) => (
              <Popover.Body key={index}>
                <div className="item">
                  {item.type}
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
