import React from 'react';
import './year.css'

function YearSelect(props) {
  const years = [];
  const currentYear = new Date().getFullYear();

  for (let year = currentYear; year >= currentYear - 100; year--) {
    years.push(year);
  }

  const options = years.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ));

  return (
    <select
      className="year-select"
      value={props.selectedYear}
      onChange={props.onYearChange}
    >
      {options}
    </select>
  );
}

export default YearSelect;