import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const FamilyContext = createContext();
const URL = "http://localhost:3000";
const FamilyContextProvider = ({ children }) => {
  const [families, setFamilies] = useState([]);
  const [sections, setSections] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch families from server
    axios
      .get(`${URL}/api/family`)
      .then((res) => setFamilies(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addFamily = (familyName, members) => {
    // Add new family to server
    axios
      .post(`${URL}/api/family`, { familyName, members })
      .then((res) => setFamilies([...families, res.data]))
      .catch((err) => console.log(err));
  };

  const addSection = (sectionName, familyId) => {
    // Add new section to server
    axios
      .post(`${URL}/api/sections`, { sectionName, familyId })
      .then((res) => setSections([...sections, res.data]))
      .catch((err) => console.log(err));
  };

  const addProduct = (productName, sectionId) => {
    // Add new product to server
    axios
      .post(`${URL}/api/products`, { productName, sectionId })
      .then((res) => setProducts([...products, res.data]))
      .catch((err) => console.log(err));
  };

  const value = {
    families,
    sections,
    products,
    addFamily,
    addSection,
    addProduct,
  };

  return (
    <FamilyContext.Provider value={value}>{children}</FamilyContext.Provider>
  );
};

export default FamilyContextProvider;
