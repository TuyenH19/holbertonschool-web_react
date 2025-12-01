import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <footer className="text-center p-4 italic mt-auto pt-2.5 max-[912px]:p-3 max-[912px]:text-sm">
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
    </footer>
  );
}

export default Footer;