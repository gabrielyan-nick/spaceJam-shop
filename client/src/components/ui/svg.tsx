interface IArrowSvg {
  size?: number;
  dir?: string;
  isActive: boolean;
}

export const PrevNextArrow = ({
  size = 30,
  dir = 'prev',
  isActive,
}: IArrowSvg) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: dir === 'next' ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path
        d="M659.2 917.333l66.133-66.133-339.2-339.2 339.2-339.2-66.133-66.133L256 512z"
        fill={isActive ? '#00818A' : 'transparent'}
      />
    </svg>
  );
};
