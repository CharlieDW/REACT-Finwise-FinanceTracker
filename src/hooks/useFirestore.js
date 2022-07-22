import { useReducer, useEffect, useState } from 'react';
import { projectDb, timestamp } from './../firebase/config';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null };
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null };
    case 'ERROR':
      return { isPending: false, document: null, success: null, error: action.payload };
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null };
    default:
      return state;
  }
};

const useFirestore = (collection) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  // collection ref
  const ref = projectDb.collection(collection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDoc = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDoc,
      });
    } catch (e) {
      dispatchIfNotCancelled({
        type: 'ERROR',
        payload: e.message,
      });
    }
  };

  // delete document
  const deleteDocument = async (docID) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      await ref.doc(docID).delete();

      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' });
    } catch (e) {
      dispatchIfNotCancelled({
        type: 'ERROR',
        payload: 'Could not deleted.',
      });
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { addDocument, deleteDocument, response };
};

export default useFirestore;
