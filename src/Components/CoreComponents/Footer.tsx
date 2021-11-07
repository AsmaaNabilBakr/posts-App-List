import * as React from 'react';
import Styles from "./Components.module.scss"
import { MDBContainer } from 'mdbreact';


const FooterComponent = () => {
  return (

    <div className={Styles.footerContainer}>
      <MDBContainer className={Styles.footer}>
        <p>© Our registered office is Breadfast</p>
      </MDBContainer >
    </div>
  );
}
export default FooterComponent;

