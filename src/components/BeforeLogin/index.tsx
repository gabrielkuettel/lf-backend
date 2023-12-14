import React from 'react'

const BeforeLogin: React.FC = () => {
  if (process.env.PAYLOAD_PUBLIC_SEED === 'true') {
    return (
      <p>
        {'Log in with the email '}
        <strong>amin@amin.com</strong>
        {' and the password '}
        <strong>amin</strong>.
      </p>
    )
  }
  return null
}

export default BeforeLogin
