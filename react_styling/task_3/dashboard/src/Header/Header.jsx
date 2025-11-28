import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <header className="flex items-center p-4">
      <img src={holbertonLogo} alt="holberton logo" className="h-[200px] w-[200px]" />
      <h1 className="text-[var(--main-color)] ml-4 text-4xl font-bold">School Dashboard</h1>
    </header>
  );
}

export default Header;
