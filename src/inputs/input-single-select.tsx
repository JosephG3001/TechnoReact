import { FC } from "react";
import Select, { ValueType } from "react-select";
import styled from "styled-components";
import { theme as globalTheme } from "../styles/theme";

const StyledInputSingleSelect = styled.div`
  div[class*="-control"] {
    background-color: ${({ theme }) =>
      theme.pallet.formControlBackgroundColour};
    border-color: ${({ theme }) =>
      theme.pallet.formControlBoxColour} !important;

    &.react-select__control--is-focused,
    &:focus,
    &:active {
      border-color: ${({ theme }) =>
        theme.pallet.formControlBoxSelectedColour} !important;
      box-shadow: none !important;
      outline: 0 !important;
    }
  }

  div[class*="-singleValue"],
  div[class*="-Input"] {
    color: ${({ theme }) => theme.pallet.formControlTextColourColour};
  }

  .react-select__menu {
    background-color: ${({ theme }) =>
      theme.pallet.formControlBackgroundColour};

    .react-select__option {
      background-color: ${({ theme }) =>
        theme.pallet.formControlBackgroundColour};

      &:hover,
      &:focus {
        background-color: ${({ theme }) =>
          theme.pallet.formControlSelectItemHoverColour} !important;
      }

      &::-ms-value {
        background-color: ${({ theme }) =>
          theme.pallet.formControlSelectItemSelectedColour};
      }
    }

    .react-select__option--is-selected {
      background-color: ${({ theme }) =>
        theme.pallet.formControlSelectItemSelectedColour};
    }
  }
`;

export type DropDownValueType = string | number | boolean;

interface IDropdownSelectItem {
  value: DropDownValueType;
  label: string;
}

interface IInputSingleSelectProps {
  name: string;
  label: string;
  items: Array<any>;
  value: any;
  textProperty: string;
  valueProperty: string;
  onChange: Function;
}

const InputSingleSelect: FC<IInputSingleSelectProps> = ({
  name,
  label,
  items,
  value,
  textProperty,
  valueProperty,
  onChange,
}) => {
  const style = {
    control: (base) => ({
      ...base,
      border: `1px solid ${globalTheme.pallet.formControlBoxColour}`,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };

  const mapItems = (): IDropdownSelectItem[] => {
    return items?.map((item) => {
      return {
        label: item[textProperty],
        value: item[valueProperty],
      };
    });
  };

  const mapValues = (): IDropdownSelectItem => {
    let selectedValue: IDropdownSelectItem = { label: "", value: "" };
    if (value != null) {
      const itemsMap = mapItems();
      selectedValue = itemsMap.find((item) => item.value === value) || {
        label: "",
        value: "",
      };
    }
    return selectedValue;
  };

  const onChangeSelect = (
    data: ValueType<IDropdownSelectItem, false>
  ): void => {
    if (onChange) {
      const selectItem = data as IDropdownSelectItem;
      if (selectItem != null) {
        onChange(selectItem.value);
      } else {
        onChange(null);
      }
    }
  };

  return (
    <StyledInputSingleSelect>
      <label htmlFor={name}>{label}</label>
      <Select
        styles={style}
        name={name}
        options={mapItems()}
        value={mapValues()}
        onChange={onChangeSelect}
        isMulti={false}
        isSearchable
        classNamePrefix="react-select"
      />
    </StyledInputSingleSelect>
  );
};

export default InputSingleSelect;
