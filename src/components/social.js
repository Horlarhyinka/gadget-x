import React from "react";
import "./styles/social.css";
import { Icon } from "@iconify/react";

const Social = () =>{
    return <div className="social" >
    <a href="https://twitter.com/DanijuFarouq?t=JrmLRy5UaAdVNTDGgP_1rg&s=09" ><Icon className="icn" icon="logos:twitter" /></a>
    <a href="https://web.facebook.com/farouq.daniju" ><Icon className="icn" icon="logos:facebook" /></a>
    <a href="https://www.linkedin.com/in/farouq-daniju-9440a2219" ><Icon className="icn" icon="skill-icons:linkedin" /></a>
</div>
}

export default Social;