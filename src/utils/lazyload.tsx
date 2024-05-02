import React from 'react' // don't delete this line
import { Spin } from 'antd'
import loadable from '@loadable/component'
import styles from '../layout.module.less'

function LoadingComponent(props: {
  error: boolean
  timedOut: boolean
  pastDelay: boolean
}) {
  if (props.error) {
    console.error(props.error)
    return null
  }
  return (
    <div className={styles.spin}>
      <Spin />
    </div>
  )
}

export default (loader) =>
  loadable(loader, {
    fallback: LoadingComponent({
      pastDelay: true,
      error: false,
      timedOut: false,
    }),
  })
