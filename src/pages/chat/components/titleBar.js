import React from 'react'
import styles from './titleBar.module.scss';

export default function TitleBar({ first, middle, last }) {
  return (
    <div className={styles['title-bar']}>
      <div className={styles['first']}>{first}</div>
      <div className={styles['middle']}>{middle}</div>
      <div className={styles['last']}>{last}</div>
    </div>
  )
}
