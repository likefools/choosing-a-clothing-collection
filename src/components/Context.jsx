import React, { createContext, useState, useEffect } from "react";

const storedCollection = JSON.parse(localStorage.getItem("collection"));
const storedDatatime = JSON.parse(localStorage.getItem("dataTime"));
export const DataContext = createContext();

const getData = async () => {
  const actualData = await fetch(
    `https://run.mocky.io/v3/2d06d2c1-5a77-4ecd-843a-53247bcb0b94`
  ).then((response) => response.json());

  return actualData;
};

export const DataProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [itemsSelected, setItemsSelected] = useState({});
  const [itemsCollection, setItemsCollection] = useState(
    storedCollection ? storedCollection : []
  );

  const [filterType, setFilterType] = useState("");
  const [filterItems, setFilterItems] = useState([]);
  const [showAlert, setshowAlert] = useState(false);
  const [startTimer, setStartTimer] = useState(new Date().getTime());

  const [startTimeDate, setStartTimeDate] = useState(
    storedDatatime ? [...storedDatatime] : []
  );

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      if (storedCollection) {
        const collection = storedCollection.flat();
        const storedIds = collection.map((item) => item.id);
        const updatedItems = data.filter(
          (item) => !storedIds.includes(item.id)
        );
        setItems(updatedItems);
      } else {
        setItems(data);
      }
    }
    fetchData();
  }, []);

  const createTypesList = () => {
    const types = [];
    for (const item of items) {
      if (!types.includes(item.type)) {
        types.push(item.type);
      }
    }
    return types;
  };

  const removeItemSelected = (item) => {
    let itemsObj = { ...itemsSelected };
    delete itemsObj[item];
    setItemsSelected(itemsObj);
  };

  const allContextProps = {
    items,
    setItems,
    filterType,
    setFilterType,
    filterItems,
    setFilterItems,
    createTypesList,
    itemsSelected,
    setItemsSelected,
    showAlert,
    setshowAlert,
    removeItemSelected,
    itemsCollection,
    setItemsCollection,
    startTimer,
    setStartTimer,
    startTimeDate,
    setStartTimeDate,
  };

  return (
    <DataContext.Provider value={{ ...allContextProps }}>
      {children}
    </DataContext.Provider>
  );
};
