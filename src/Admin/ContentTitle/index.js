import React from 'react'
import PropTypes from 'prop-types';
import styles from './style.module.css'

const ContentTitle = (props) => {
  const {title = ''} = props
  return (
    <div className={styles.contentTitle}>
      <h3>
        {title}
      </h3>
    </div>
  )
}

ContentTitle.defaultProps = {
  title: ''
}

ContentTitle.propTypes = {
  title: PropTypes.string,
}

export default ContentTitle