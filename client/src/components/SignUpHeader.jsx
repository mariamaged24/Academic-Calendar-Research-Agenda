import React, { Component } from 'react';
import LogoName from "./LogoName"
import { Link } from "react-router-dom";
class SignUpHeader extends Component {
    state = {  } 
    render() { 
        return (
            <div>
                <div className="Header">
                <Link style={{textDecoration: 'none'}} to="/homepage">
                < LogoName/>
                </Link>
               
                </div>
            </div>
        );
    }
}
 
export default SignUpHeader;