import { getCurrentYear, getFooterCopy } from '../utils/utils';
import AppContext from '../Context/context';

function Footer() {
  return (
    <AppContext.Consumer>
      {({ user }) => (
        <footer className="text-center p-4 italic mt-auto pt-2.5 max-[912px]:p-3 max-[912px]:text-sm">
          <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
          {user.isLoggedIn && (
            <p>
              <a href="#" className="text-[var(--main-color)]">Contact us</a>
            </p>
          )}
        </footer>
      )}
    </AppContext.Consumer>
  );
}

export default Footer;