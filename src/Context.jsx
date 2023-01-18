import React, { createContext, useState, useEffect } from "react";

const storedCollection = JSON.parse(localStorage.getItem("collection"));

export const DataContext = createContext();

async function getData() {
  const actualData = await fetch(
    `https://run.mocky.io/v3/2d06d2c1-5a77-4ecd-843a-53247bcb0b94`
  ).then((response) => response.json());

  return actualData;
}

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [itemsSelected, setItemsSelected] = useState({});
  const [itemsCollection, setItemsCollection] = useState(
    storedCollection ? storedCollection : []
  );
  const [filterType, setFilterType] = useState("");
  const [filterItems, setFilterItems] = useState([]);
  const [showAlert, setshowAlert] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      if (storedCollection.length > 0) {
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
    itemsSelected,
    setItemsSelected,
    showAlert,
    setshowAlert,
    removeItemSelected,
    itemsCollection,
    setItemsCollection,
  };

  return (
    <DataContext.Provider value={{ ...allContextProps }}>
      {children}
    </DataContext.Provider>
  );
}
