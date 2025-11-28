import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <header className="flex items-center p-4 max-[912px]:p-2 max-[520px]:flex-col max-[520px]:text-center">
      <img src={holbertonLogo} alt="holberton logo" className="h-[200px] w-[200px] max-[912px]:h-[150px] max-[912px]:w-[150px] max-[520px]:h-[120px] max-[520px]:w-[120px]" />
      <h1 className="text-[var(--main-color)] ml-4 text-4xl font-bold max-[912px]:text-3xl max-[520px]:text-2xl max-[520px]:ml-0 max-[520px]:mt-2">School Dashboard</h1>
    </header>
  );
}

export default Header;
