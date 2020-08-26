import React, { useState, useRef, useEffect } from 'react'
import TitleBar from './titleBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './appStatus.module.scss';

function useLegacyState(initState) {
  const [state, setState] = useState(initState);
  return [state, newState => setState({ ...state, ...newState })]
}

function useKeyborad(eventName, callback, dependencies){
useEffect(
    () => {
      window.addEventListener(eventName, callback);
      return () => {
        window.removeEventListener(eventName, callback);
      }
    },
    dependencies
  );
}

export default function AppStatus({ onInputChange }) {
  const [mode, setMode] = useState('list');
  const input = useRef(null);

  function gotoSearchMode() {
    setMode('search');
  }

  function gotoListMode() {
    setMode('list');
  }

  function handleChange(e){
    onInputChange(e.target.value)
  }
  useEffect(
    () => {
      if (mode === 'search') {
        input.current.focus();
      }
    },
    [mode]
  );
    
  useKeyborad('keydown', handleKeyDown, [mode]);

      function handleKeyDown (e) {
        console.log('fired');
        if(e.ctrlKey && e.key === 'f'){
        e.preventDefault();
          if(mode !== 'search'){
            setMode('search')
          }
        }
      }
  
  const listMode = mode === 'list';

  return (
    <TitleBar
        first={<FontAwesomeIcon
         icon={listMode ? faBars : faArrowLeft}
         size='lg'
         color='#009588'
         className={styles['pointer']}
         onClick={gotoListMode}
      />}
      middle={
        <div className={styles['app-title']}>
          {listMode && "Fancy Messenger"}
          {!listMode && 
           <input
            type='text'
            className={styles['search-text']}
            ref={input}
            onChange={handleChange}
          />}
        </div>
      }
      last={listMode && <FontAwesomeIcon
        icon={faSearch}
        size='lg'
        color='#009588'
        className={styles['pointer']}
        onClick={gotoSearchMode}
      />}
    />
  )
}
