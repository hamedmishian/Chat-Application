import React from 'react'
import styles from './list.module.scss'

export default function List({ children, className }) {
  return (
    <div className={styles['list']}>
      {children}
    </div>
  )
}
