import React, { useContext, useState, useRef, useEffect } from "react";

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
    startTimer,
    setStartTimeDate,
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

  const setDataTime = () => {
    let startTimeD = new Date();
    return (startTimeD = `${startTimeD.toLocaleDateString()} ${startTimeD.toLocaleTimeString()}`);
  };

  function formatElapsedTime(elapsedTime) {
    const minutes = Math.floor(elapsedTime / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (elapsedTime % 60).toFixed(0).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  const timerCalculation = () => {
    let endTime = new Date().getTime();
    const elapsedTimeNum = (endTime - startTimer) / 1000;
    const elapsedTimeFormatted = formatElapsedTime(elapsedTimeNum);
    return elapsedTimeFormatted;
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
    const totalTimer = timerCalculation();
    const dataTime = setDataTime();
    setStartTimeDate((oldDataTime) => [
      `Time Select: ${dataTime} Time to Select: ${totalTimer}`,
      ...oldDataTime,
    ]);
    const currentCollection =
      JSON.parse(localStorage.getItem("collection")) || [];
    const updatedCollection = currentCollection
      ? [collection, ...currentCollection]
      : [collection];
    localStorage.setItem("collection", JSON.stringify(updatedCollection));

    const currentDataTime = JSON.parse(localStorage.getItem("dataTime")) || [];
    const updatedDataTime = currentDataTime
      ? [
          `the time: ${dataTime} time to Select: ${totalTimer}`,
          ...currentDataTime,
        ]
      : [`the time: ${dataTime} time to Select: ${totalTimer}`];
    localStorage.setItem("dataTime", JSON.stringify(updatedDataTime));

    setShow(!show);
  };

  const title = Object.keys(itemsSelected) ? "Collections " : "no items ";

  const seveButtonDisabled =
    Object.keys(itemsSelected).length !== 3 ? true : false;

  const itemsSelectedCount = Object.keys(itemsSelected).length;

  return (
    <div className="itemsSelectedInfo">
      <div ref={ref}>
        <Button onClick={handleClick}>
          <FaShoppingCart size={20} className="mr-2" /> items Selected{" "}
          {itemsSelectedCount}
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
                {title}

                <Button
                  size="sm"
                  variant="success"
                  disabled={seveButtonDisabled}
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
