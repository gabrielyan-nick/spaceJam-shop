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
  { value: EnumProductSort.NEWEST, label: 'Дата додавання (нові > старі)' },
  { value: EnumProductSort.OLDEST, label: 'Дата додавання (старі > нові)' },
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
      />
    </div>
  );
};

export default SortDropdown;
