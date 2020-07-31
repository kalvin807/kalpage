import RightArrow from '../assets/svg/arrow-forward.svg';
import { IconLink } from './Header';

const Footer = () => (
  <footer className="text-center text-xs m-1 mb-3">
    <i>
      Built with React and 🍔.
      {'   '}
      <IconLink className={'inline-block arrow'} url="https://github.com/kalvin807/kalpage">
        Source code{' '}
        <RightArrow
          className="align-middle inline-block"
          width={14}
          height={14}
        />
      </IconLink>
    </i>
  </footer>
);

export default Footer;
