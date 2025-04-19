import { useState } from "react";
import { useFetchItems } from "../hooks/useFetchItems";

const Closet = () => {
  const item = useFetchItems();

  return <div className="card-container"></div>;
};

export default Closet;
