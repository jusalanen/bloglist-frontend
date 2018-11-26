import React from 'react';

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="notific">
        {message}
      </div>
    )
  }
export default Notification
