import { FC, KeyboardEvent, useEffect, useState } from "react";
import { StyledDropdown } from "./styles";

interface IProps {
  onClick: any;
  matchedRecords: [
    {
      item: {
        key: string;
        value: string;
      };
    }
  ];
  dropdownHoverColor: string;
  dropdownBorderColor: string;
}

const Dropdown: FC<IProps> = ({
  onClick,
  matchedRecords = [],
  dropdownBorderColor,
  dropdownHoverColor,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  useEffect(() => {
    const currentItem = document.querySelector(
      `.react-search-box-dropdown-list-item:focus`
    );
    if (currentItem) {
      currentItem.blur();
    }
    const nextItem = document.querySelectorAll(
      `.react-search-box-dropdown-list-item`
    )[focusedIndex];
    if (nextItem) {
      nextItem.focus();
    }
  }, [focusedIndex]);

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case "ArrowUp":
        setFocusedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : matchedRecords.length - 1
        );
        break;
      case "ArrowDown":
        setFocusedIndex((prevIndex) => (prevIndex + 1) % matchedRecords.length);
        break;
      case "Space":
      case "Enter":
        onClick(matchedRecords[focusedIndex]);
        break;
      default:
        break;
    }
  };

  return (
    <StyledDropdown
      className="react-search-box-dropdown"
      dropdownHoverColor={dropdownHoverColor}
      dropdownBorderColor={dropdownBorderColor}
    >
      <ul>
        {matchedRecords.map((record) => {
          return (
            <li
              key={record.item.key}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              className="react-search-box-dropdown-list-item"
              onClick={() => onClick(record)}
            >
              {record.item.value}
            </li>
          );
        })}
      </ul>
    </StyledDropdown>
  );
};

export default Dropdown;
