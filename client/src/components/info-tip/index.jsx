import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsQuestionCircle } from 'react-icons/bs';

const InfoTip = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
      >
        <BsQuestionCircle className="text-blue-600" size={20} />
      </span>
      {showTooltip && (
        <div
          className="absolute bg-gray-800 text-white text-sm p-2 rounded-md z-10 bottom-full left-0 mb-2 w-[200px]"
        >
          {text}
        </div>
      )}
    </span>
  );
};

InfoTip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default InfoTip;
