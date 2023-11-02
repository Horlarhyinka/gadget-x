import React from "react";
import "./styles/footer.css";
import Social from "./social";

const Footer = () => {
    return ( <footer className="footer" >
        <ul>
            <li>Product</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Docs</li>
        </ul>
        <ul>
            <li>Company</li>
            <li>About us</li>
            <li>Customers</li>
            <li>Brand</li>
        </ul>
        <ul>
            <li>Resources</li>
            <li>Community</li>
            <li>contact</li>
            <li>terms of service</li>
        </ul>
        <p>&copy;2022 Horlarhyinkaddev, All rights reserved.</p>
        <Social />
    </footer> );
}
 
export default Footer;