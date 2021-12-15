import { START_NEW_PROGRAM, TERMINATE_PROGRAM } from '../types'
import {
  loadProgram,
  removeAppInstance,
  removeProgram,
  updateAppsInstances,
  updateProgramsData,
} from './memory.utils';

const MemoryReducer = (prevState, { type, payload }) => {
  switch (type) {
    case START_NEW_PROGRAM: {
      const { app, metadata } = payload;
      const newProgram = loadProgram(app, metadata);
      return {
        ...prevState,
        programsData: updateProgramsData(prevState.programsData, newProgram),
        appsInstances: updateAppsInstances(prevState.appsInstances, newProgram),
      };
    }

    case TERMINATE_PROGRAM: {
      const pId = payload;
      const { id } = prevState.programsData[pId];
      return {
        ...prevState,
        programsData: removeProgram(prevState.programsData, pId),
        appsInstances: removeAppInstance(prevState.appsInstances, id, pId),
      };
    }

    default:
      return prevState
  }
}

export default MemoryReducer
