import styles from './RadioBtns.module.scss';
import { AttentionIcon } from 'components/ui/svg';
import React from 'react';

interface IRadioBtns {
  label: string;
  values: string[];
  warningText: string;
}

const RadioBtns = ({ label, values, warningText }: IRadioBtns) => {
  return (
    <div className="mt-7">
      <span className="text-lg">{label}</span>
      <div className="bg-secondaryDark rounded-2xl p-0.5 w-max mt-3 ">
        <input
          className={styles.radio}
          type="radio"
          value={values[0]}
          id="self"
          checked
          readOnly
        />
        <label
          htmlFor="self"
          className="cursor-pointer mr-2 px-2 py-0.5  rounded-xl transition-colors"
        >
          {values[0]}
        </label>

        <input
          className={styles.radio}
          type="radio"
          value={values[1]}
          id="post"
          disabled
        />
        <label
          htmlFor="post"
          className="cursor-pointer px-2 py-0.5 rounded-xl transition-colors"
        >
          {values[1]}
        </label>
      </div>
      <div className="flex mt-1 items-center">
        <AttentionIcon size={18} className="shrink-0 ml-1" />
        <p className="text-textSecondary text-sm sxx:text-base ml-1">
          {warningText}
        </p>
      </div>
    </div>
  );
};

export default RadioBtns;
