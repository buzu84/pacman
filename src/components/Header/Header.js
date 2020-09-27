import React from 'react'

function Header ({ score}) {
  return (
    <div>SCORE: {score}</div>
  )
}

Header.defaultProps = {
  score:0
}

export default Header;
