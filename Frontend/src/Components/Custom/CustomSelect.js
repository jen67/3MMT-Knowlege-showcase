// CustomSelect.js
import React, { useState } from "react";
import "./CustomSelect.css";

const CustomSelect = ({
  options,
  onSelectChange,
  value,
  name,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelectChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className={`custom-select ${isOpen ? "open" : ""}`}>
      <div tabIndex='0'
        className={`selected-option ${!value ? "placeholder" : ""}`}
        onClick={toggleDropdown} 
      >
        {value ? options.find(option => option.value === value).label : placeholder}
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
      <input type="hidden" name={name} value={value ? value : ""} />
    </div>
  );
};

export default CustomSelect;