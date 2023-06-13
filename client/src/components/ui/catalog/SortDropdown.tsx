'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { EnumProductSort } from 'types/product.interface';

export interface ISelectOption {
  value: EnumProductSort;
  label: string;
}

export interface ISortDropdown {
  sortType: ISelectOption;
  setSortType: Dispatch<SetStateAction<ISelectOption>>;
}

const options = [
  { value: EnumProductSort.HIGH_PRICE, label: 'Ціна (висока > низька)' },
  { value: EnumProductSort.LOW_PRICE, label: 'Ціна (низька > висока)' },
  { value: EnumProductSort.NEWEST, label: 'Дата (нові > старі)' },
  { value: EnumProductSort.OLDEST, label: 'Дата (старі > нові)' },
];

const SortDropdown = ({ setSortType, sortType }: ISortDropdown) => {
  const handleChange = (value: SingleValue<ISelectOption>) => {
    setSortType(value as ISelectOption);
  };

  return (
    <div>
      <Select
        options={options}
        value={sortType}
        isSearchable={false}
        styles={{
          control: (styles, state) => ({
            ...styles,
            border: 'none',
            outline: state.isFocused ? '2px solid #00818A' : 'none',
            backgroundColor: '#131322',
            borderRadius: '7px',
            minWidth: '150px',
            transition: 'all .3s',
          }),
          menuList: styles => ({
            ...styles,
            backgroundColor: '#11111f',
            border: 'none',
            color: '#DBEDF3',
            borderRadius: '5px',
            boxShadow: '0 4px 6px -1px #00000056, 0 2px 4px -2px #00000056',
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
            transition: 'all .1s',
          }),
          singleValue: (styles, state) => ({
            ...styles,
            color: '#DBEDF3',
          }),
        }}
        onChange={handleChange}
        className="shadow-[#00000056] shadow-md"
      />
    </div>
  );
};

export default SortDropdown;
