import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SyncSlider() {
  const [filter, setFilter] = useState("DESC");

  function handleAddrTypeChange(e) {
    setFilter(e.target.value);
  }
  return (
    <select
      defaultValue={filter}
      onChange={handleAddrTypeChange}
      className="browser-default custom-select"
    >
      <option selected value="DESC">
        DESC
      </option>
      <option value="ASC">ASC</option>
    </select>
  );
}
