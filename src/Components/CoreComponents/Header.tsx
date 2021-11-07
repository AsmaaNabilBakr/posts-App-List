import * as React from 'react';
import Styles from "./Components.module.scss"
import Logo from "../Assets/Imgs/logo.jpg"
import { MDBContainer } from 'mdbreact';

const HeaderComponent = () => {
  return (
    <div className={Styles.headerContainer}>
      <MDBContainer className={Styles.header}>
        <img src={Logo} alt="" />
        <span>Breadfast Frontend Task</span>
      </MDBContainer>
    </div>
  );
}

export default HeaderComponent;
