import { createContext, useState } from "react";

const MyContext = createContext();

export const Provider = MyContext.Provider;

export const useMessage = () => {
    const [message, setMessage] = useState('Hello, World!');
    return { message, setMessage }
};


export const useCollection = () => {
  const [collection, setCollection] = useState([]);
  return { collection, setCollection }
};