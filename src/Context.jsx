import React, { createContext, useState, useEffect } from 'react';

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
  const [itemsCollection, setItemsCollection] = useState([]);
  
  

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setItems(data);
      // filterOutSelectedItems()
      // set the first data as the current data
    }
    fetchData();
  }, [items]);

  const filterOutSelectedItems = () => {
    let itemsOfType = [...items];
    // items, collection
    if (itemsCollection.length > 0) {
      itemsCollection.forEach((typeItems) => {
        Object.keys(typeItems).forEach((typeItem) => {
          // typeItem[typeItem].id
          itemsOfType = itemsOfType.filter(
            (item) => item.id !== typeItems[typeItem].id
          );
        });
      });
      console.log(itemsOfType)
      return itemsOfType
    }
  }

  const removeItemSelected = (item) => {
    let itemsObj = { ...itemsSelected };
    delete itemsObj[item];
    setItemsSelected(itemsObj);
  }
  

  function saveCollections(itemsSelected) {
    // Object.keys(collectionObj).forEach(item => collectionObj[item])
    setItemsCollection((old) => [...old, itemsSelected]);
    setItemsSelected({})
    filterOutSelectedItems()
  }

  
  
  const allContextProps = {items, setItems, itemsSelected, setItemsSelected, saveCollections, removeItemSelected, itemsCollection}

  return (
    <DataContext.Provider value={{ ...allContextProps }}>
      {children}
    </DataContext.Provider>
  );
}
