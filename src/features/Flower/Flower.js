import { useState } from "react";
import { ASSETS_PATH } from "../../shared/constants";
import "./Flower.css";

export const Flower = (props) => {
  const {isTalking} = props;
  return (
    <div className="Flower">
      <div
        className={`Flower-mouth ${
          isTalking===true ? "Flower-mouth--talk" : ""
        }`}
      ></div>
      <div className="Flower-eye Flower-eye--left"></div>
      <div className="Flower-eye Flower-eye--right"></div>
      <img
        className="Flower-body"
        src={ASSETS_PATH + "flowerNik.png"}
        alt="Flower"
      />
      <div className="Flower-leg Flower-leg--left"></div>
      <div className="Flower-leg Flower-leg--right"></div>
      <div className="Flower-leg Flower-feet--left"></div>
      <div className="Flower-leg Flower-feet--right"></div>

    </div>
  );
};
