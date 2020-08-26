import React, { useState, useEffect, useReducer } from 'react';
import Chat from './pages/chat/index';
import styles from './app.module.scss';

function App() {

  return (
    // <div className={styles['app']}>
      <div className={styles['head']} />
      <div className={styles['main']}>
        <Chat />
      </div>
    </div>
  );
}

export default App;
