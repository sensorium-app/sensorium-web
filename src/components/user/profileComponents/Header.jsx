import React from 'react'
import PropTypes from 'prop-types'
import ProfilePhoto from './ProfilePhoto'
import '../../style/style.css';
import './styles/header.css'

const Header = (props) => (
  <header className="">
    <div className="header-box">
    <ProfilePhoto image={props.photo} />
    </div>
  </header>
)

Header.propTypes = {
  photo: PropTypes.string.isRequired
}

export default Header
