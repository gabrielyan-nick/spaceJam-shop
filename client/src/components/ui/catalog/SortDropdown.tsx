'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import Select from 'react-select';
import { EnumProductSort } from 'types/product.interface';

const options = [
  { value: EnumProductSort.HIGH_PRICE, label: 'висока ціна' },
  { value: EnumProductSort.LOW_PRICE, label: 'низька ціна' },
  { value: EnumProductSort.NEWEST, label: 'новіші' },
  { value: EnumProductSort.OLDEST, label: 'найстаріші' },
];

interface ISortDropdown {
  sortType: EnumProductSort;
  setSortType: Dispatch<SetStateAction<EnumProductSort>>;
}

const SortDropdown = ({ setSortType, sortType }: ISortDropdown) => {
  //   const [selectedOption, setSelectedOption] = useState<EnumProductSort>(
  //     EnumProductSort.NEWEST,
  //   );

  //   const handleChange = (e: Event) => {
  //     setSelectedOption(e.target);
  //   };

  return (
    <div>
      <Select
        options={options}
        // value={selectedOption}
        styles={{
          control: styles => ({
            ...styles,
            backgroundColor: '#131322',
            border: 'none',
            color: '#DBEDF3',
            borderRadius: '7px',
          }),
          menuList: styles => ({
            ...styles,
            backgroundColor: '#131322',
            border: 'none',
            color: '#DBEDF3',
            borderRadius: '7px',
          }),
          menu: styles => ({
            ...styles,
            zIndex: 25,
            borderRadius: '7px',
          }),
          option: (styles, state) => ({
            ...styles,
            backgroundColor: state.isFocused ? '#00818A' : 'transparent',
            color: state.isFocused ? '#131322' : '#DBEDF3',
          }),
        }}
        // onChange={handleChange}
      />
    </div>
  );
};

export default SortDropdown;
