import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <footer className="text-center p-4 italic mt-auto pt-2.5">
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
    </footer>
  );
}

export default Footer;