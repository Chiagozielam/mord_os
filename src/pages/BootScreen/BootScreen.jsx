import { SiApostrophe } from 'react-icons/si'

import BootLogo from '../../components/BootLogo/BootLogo';
import './BootScreen.scss';

const BootScreen = () => (
  <div className="BootScreen">
    <div className="brandlogo">
      <SiApostrophe size={200} color="white" />
    </div>
    <div className="bootlogo">
      <BootLogo />
    </div>
  </div>
);

export default BootScreen;
