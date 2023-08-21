import { useState, useEffect } from "react";

export default function HitField() {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  const left = getRandomArbitrary(10, 70);
  const top = getRandomArbitrary(10, 70);
  return (
    <h1 className="hit zoomIn" style={{ left: left + "%", top: top + "%" }}>
      HIT!
    </h1>
  );
}
