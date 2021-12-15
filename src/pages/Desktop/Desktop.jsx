import React, { useEffect, useState } from 'react';

import TaskBar from '../../components/TaskBar/TaskBar';
import StartMenu from '../../components/StartMenu/StartMenu';
import Program from '../Program/Program';
import InstalledApps from '../../config/apps';

import { useGeneralContext } from '../../context/useGeneralContext';
import './Desktop.scss';
import Loading from '../../components/Loading/Loading';

const Desktop = ({ activeUser }) => {
  const {
    accountState: { settings, taskbarApps, defaultApps},
    saveAccount,
    loadAccount,
    logOut,
    terminateProgram,
    startNewProgram,
    memoryState: { appsInstances, programsData }
  } = useGeneralContext()
  const [startMenu, toggleStartMenu] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [logoutMode, setLogoutMode] = useState(false);
  const style = {
    opacity,
    backgroundImage: `url("https://thumbs.dreamstime.com/b/dark-hacker-black-hater-no-face-background-copy-space-shot-raw-k-46735586.jpg")`,
  };

  useEffect(() => loadAccount(activeUser), []);
  useEffect(() => {
    if (!opacity) {
      setTimeout(() => {
        setLogoutMode(true);
        setOpacity(1);
        setTimeout(() => {
          saveAccount(activeUser);
          logOut();
        }, 4000);
      }, 400);
    }
  }, [opacity]);


  const runningPrograms = Object.keys(programsData);
  const [windows, updateWindows] = useState({ maxZIndex: 100, pId: null });
  const [minimized, updateMinimized] = useState({});

  // taskbarApps: [calculator, calendar, ...]
  const taskbarAndOpenedApps = taskbarApps.concat(Object.keys(appsInstances));
  const taskbarAppsData = [...new Set(taskbarAndOpenedApps)].map((appId) => InstalledApps[appId]);

  // bring activated window/program to the foreground
  const onClickProgramWindow = (pId) =>
    updateWindows(({ maxZIndex }) => ({ maxZIndex: maxZIndex + 1, pId }));

  // add a program to minimized state
  const onToggleMinimize = (pId, to) => {
    const newMinimized = {};
    newMinimized[pId] = to;
    updateMinimized(Object.assign(minimized, newMinimized));
  };

  // when program is selected from taskbar
  const onSelectFromTaskBar = (pId) => {
    onClickProgramWindow(pId);
    onToggleMinimize(pId, false);
  };

  // start a new program
  const onStartNewProgram = (app) => {
    toggleStartMenu(false);
    startNewProgram(app)
  };


  return (
    <div className="Desktop" style={style}>
      {logoutMode ? (
        <Loading message="Logging out" fadeInTime=".5s" />
      ) : (
        <>
          {runningPrograms.map((pId) => (
            <Program
              key={pId}
              app={programsData[pId]}
              isMinimized={minimized[pId]}
              zIndex={windows.pId === pId ? windows.maxZIndex : 'auto'}
              onMinimize={(_pId) => onToggleMinimize(_pId, true)}
              onTerminate={() => terminateProgram(pId)}
              onClickWindow={onClickProgramWindow}
            />
          ))}

          <StartMenu
            user={activeUser}
            hide={!startMenu}
            onLogout={() => setOpacity(0)}
            onProgramClick={(app) => onStartNewProgram(app)}
          />

          <TaskBar
            apps={taskbarAppsData}
            programs={appsInstances}
            programsData={programsData}
            onInstanceClick={(pId) => onSelectFromTaskBar(pId)}
            onIconClick={(app) => onStartNewProgram(app)}
            onMordOSIconClick={() => toggleStartMenu(!startMenu)}
            onCloseInstance={(pId) => terminateProgram(pId)}
          />
        </>
      )}
    </div>
  );
};

export default Desktop;

// import React from 'react'

// const Desktop = () => {
//   return (
//     <div>
//       <h1>Hello and welcome to the Desktop</h1>
//     </div>
//   )
// }

// export default Desktop
