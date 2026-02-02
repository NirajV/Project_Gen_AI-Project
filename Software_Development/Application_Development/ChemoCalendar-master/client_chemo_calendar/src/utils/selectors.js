export const getUndoItem = state => state.get('undoHistory').undoQueue[0];
export const getRedoItem = state => state.get('undoHistory').redoQueue[0];