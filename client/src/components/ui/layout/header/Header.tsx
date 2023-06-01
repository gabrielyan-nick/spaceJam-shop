import { AuthButton, Logo } from 'components';

const Header = () => {
  return (
    <header className="sticky top-0 h-[64px] z-30 flex items-center justify-between px-4 bg-mainDark backdrop-blur-sm">
      <Logo />
      <AuthButton />
    </header>
  );
};

export default Header;
