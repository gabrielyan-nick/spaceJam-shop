import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

type TClickOut = {
  ref: any;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
};

export const useOnClickOutside = (initialIsVisible: boolean): TClickOut => {
  const [isShow, setIsShow] = useState(initialIsVisible);
  const ref = useRef<HTMLElement>(null);

  const handleClick = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) setIsShow(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  });

  return {
    ref,
    isShow,
    setIsShow,
  };
};

// const useOnClickOutside = (
//   ref: RefObject<HTMLElement>,
//   handler: (event: MouseEvent) => void,
// ) => {
//   useEffect(() => {
//     const listener = (event: MouseEvent) => {
//       if (!ref.current || ref.current.contains(event.target as Node)) return;
//       if (typeof handler === 'function') handler(event);
//     };
//     document.addEventListener('mousedown', listener);
//     return () => {
//       document.removeEventListener('mousedown', listener);
//     };
//   });
// };

export default useOnClickOutside;
