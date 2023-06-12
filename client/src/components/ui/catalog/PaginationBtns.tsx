import { PrevNextArrow } from '../svg';
import { Button } from 'components';
import React, { Dispatch, SetStateAction } from 'react';

interface IPaginationBtns {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pagesCount: number;
  onGoBack: () => void;
  onGoForward: () => void;
}

const PaginationBtns = ({
  page,
  setPage,
  pagesCount,
  onGoBack,
  onGoForward,
}: IPaginationBtns) => {
  return (
    <div className="flex justify-center mt-12 gap-5">
      <button disabled={page === 1} onClick={onGoBack}>
        <PrevNextArrow isActive={page !== 1} />
      </button>

      {Array.from({ length: pagesCount }).map((_, index) => {
        const pageNumber = index + 1;
        return (
          <Button
            key={index}
            variant={
              pageNumber === page ? 'pagination-btn-active' : 'pagination-btn'
            }
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}
      <button disabled={page === pagesCount} onClick={onGoForward}>
        <PrevNextArrow dir="next" isActive={page !== pagesCount} />
      </button>
    </div>
  );
};

export default PaginationBtns;
