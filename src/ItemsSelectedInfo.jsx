import React, { useContext, useState, useRef } from "react";

import { DataContext } from "./Context";

import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

import { FaShoppingCart } from "react-icons/fa";

const ItemsSelectedInfo = () => {
  const allContextProps = useContext(DataContext);
  const {
    items,
    itemsSelected,
    setFilterType,
    setFilterItems,
    setItemsSelected,
    setItems,
    setshowAlert,
    removeItemSelected,
    itemsCollection,
    setItemsCollection,
  } = {
    ...allContextProps,
  };

  // const {  } = props;

  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const deleteItem = (item) => {
    removeItemSelected(item);
  };

  //TODO להאביר ל Context
  const saveCollections = (collection) => {
    collection = Object.keys(collection).map(
      (typeItems) => collection[typeItems]
    );
    let itemsOfType = [...items];
    collection.forEach((typeItems) => {
      itemsOfType = itemsOfType.filter((i) => i.id !== typeItems.id);
    });
    setItems(itemsOfType);
    setItemsCollection((old) => [collection, ...old]);
    setItemsSelected({});
    setFilterType("");
    setFilterItems([]);
    setshowAlert(true);
    const currentCollection =
      JSON.parse(localStorage.getItem("collection")) || [];
    const updatedCollection = currentCollection
      ? [collection, ...currentCollection]
      : [collection];
    localStorage.setItem("collection", JSON.stringify(updatedCollection));
  };

  // onClick={() => getItemSelected(oldValues => {return oldValues.filter(item => item !== value)})}

  return (
    <div className="itemsSelectedInfo">
      <div ref={ref}>
        <Button onClick={handleClick}>
          <FaShoppingCart size={20} className="mr-2" /> items Selected{" "}
          {Object.keys(itemsSelected).length}
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
                {Object.keys(itemsSelected) ? "Collections " : "no items "}

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
                  {itemsSelected[item].type} {itemsSelected[item].brand}{" "}
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
