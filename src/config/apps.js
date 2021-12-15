import { FcDocument, FcFolder } from 'react-icons/fc';
import Notepad from '../softwares/Notepad/Notepad';

const InstalledApps = {
  notepad: {
    id: 'notepad',
    name: 'Notepad',
    icon: FcDocument,
    component: Notepad,
    config: {
      initTitle: 'Untitled - Notepad',
      initWindowWidth: '480px',
      initWindowHeight: '480px',
    },
  },
};

export default InstalledApps;
