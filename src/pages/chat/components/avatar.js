import React from 'react'
import styles from './avatar.module.scss';

export default function Avatar({name, url}) {
  return (
    <div className={styles['_avatar']}>
      <img src={url} alt={name} />
    </div>
  )
}
