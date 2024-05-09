import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MultiSelectDropdown = ({
  onChange,
  disabled = false,
  defaultValue = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedDefaultValue, setUpdatedDefaultValue] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = useSelector((state) => state.subjects);

  useEffect(() => {
    if (defaultValue.length > 0 && !updatedDefaultValue){
      setUpdatedDefaultValue(true);
      setSelectedOptions(defaultValue);
    }
  }, [defaultValue]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionToggle = (option) => {
    if (
      !selectedOptions.find(
        (selectedOption) => selectedOption._id == option._id
      )
    ) {
      const updatedOptions = [...selectedOptions, option];
      setSelectedOptions(updatedOptions);
      onChange(updatedOptions);
    } else {
      const updatedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption._id != option._id
      );
      setSelectedOptions(updatedOptions);
      onChange(updatedOptions);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="shadow-sm">
          <button
            type="button"
            className="inline-flex items-center pb-1 justify-center w-full border-b-2 border-red-400 bg-white text-md font-light text-gray-700 focus:outline-none active:text-gray-800"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded={isOpen ? "true" : "false"}
            onClick={!disabled ? toggleDropdown : () => {}}
          >
            {selectedOptions.length === 0
              ? "Select Options"
              : selectedOptions.map((option) => (
                  <span
                    key={option._id}
                    className="bg-red-200 text-red-800 rounded-md px-2 mr-1 text-lg"
                  >
                    {option.name}
                  </span>
                ))}
            {!disabled ? (
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <></>
            )}
          </button>
        </span>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {options.map((option) => (
              <div
                key={option._id}
                className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer ${
                  selectedOptions.find(
                    (selectedOption) => selectedOption._id == option._id
                  )
                    ? "text-red-300 hover:text-red-400 font-bold"
                    : "hover:bg-gray-100 text-slate-700 font-bold"
                }`}
                role="menuitem"
                onClick={() => handleOptionToggle(option)}
              >
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
