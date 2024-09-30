"use client";

import React from "react";

const TrainingCard = ({ title, description, onClick }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={onClick}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default TrainingCard;