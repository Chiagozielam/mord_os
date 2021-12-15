import {
  LOAD_ACCOUNT,
  SAVE_ACCOUNT,
  CREATE_NEW_DIR_ITEM,
  RENAME_DIR_ITEM,
  DELETE_DIR_ITEM,
  COPY_DIR_ITEM,
  MOVE_DIR_ITEM
} from '../types'
import {
  renameNodes,
  getAccountFromStorage,
  unlinkNodes,
  linkNodes,
  copyNodes,
  moveNodes,
  saveAccountInStorage,
} from './account.utils'

const AccountReducer = (prevState, { type, payload }) => {
  switch (type) {
    case LOAD_ACCOUNT: {
      const loadedAccount = getAccountFromStorage(payload);
      return { ...prevState, ...loadedAccount };
    }

    case SAVE_ACCOUNT: {
      const activeAccount = payload;
      saveAccountInStorage(activeAccount, prevState);
      return prevState;
    }

    case CREATE_NEW_DIR_ITEM: {
      const item = payload;
      const newNode = Node(item.name, item.isDir, item.path);
      const newFs = linkNodes(prevState.filesystem, prevState.filesystem[item.path], [newNode]);
      return { ...prevState, filesystem: newFs };
    }

    case RENAME_DIR_ITEM: {
      const itemsId = payload.items;
      const { newName } = payload;
      const newFs = renameNodes(prevState.filesystem, itemsId, newName);
      return { ...prevState, filesystem: newFs };
    }

    case DELETE_DIR_ITEM: {
      const parent = payload.path;
      const idsToDelete = payload.ids;
      const newFs = unlinkNodes(prevState.filesystem, prevState.filesystem[parent], idsToDelete);
      return { ...prevState, filesystem: newFs };
    }

    case COPY_DIR_ITEM: {
      const { toPath } = payload;
      const idsToCopy = payload.ids;
      const nodesToCopy = idsToCopy.map((id) => prevState.filesystem[id]);
      const newFs = copyNodes(
        prevState.filesystem,
        nodesToCopy.map((node) => Node(node.node.name, node.node.isDir, toPath)),
        prevState.filesystem[toPath]
      );
      return { ...prevState, filesystem: newFs };
    }

    case MOVE_DIR_ITEM: {
      const { toPath } = payload;
      const idsToMove = payload.ids;
      const fromPath = prevState.filesystem[idsToMove[0]].parent;
      const nodesToMove = idsToMove.map((id) => prevState.filesystem[id]);
      const newFs = moveNodes(
        prevState.filesystem,
        nodesToMove,
        prevState.filesystem[fromPath],
        prevState.filesystem[toPath]
      );
      return { ...prevState, filesystem: newFs };
    }
    default:
      return prevState
  }
}

export default AccountReducer
