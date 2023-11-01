import React from "react";  
import "./styles/about.css";
import amazon from "../../public/amazon.png";
import jumia from "../../public/jumia.png";
import gameloft from "../../public/gameloft.png";



class About extends React.Component{

    render(){
        return <div className="about" >
            <section className="preview" >
            <h1>About our organisation</h1>
            <p>Welcome to gadget-x, your ultimate destination for all things gadgets! We are passionate about technology and committed to providing you with the latest and greatest gadgets to enhance your daily life.</p>
            </section>
            <section className="main" >
                <div className="sub" >
                    <h1>Our Story</h1>
                    <p>Founded in 2023, gadget-x has quickly become a go-to hub for gadget enthusiasts worldwide. Our journey started with a simple mission: to offer a curated selection of high-quality gadgets, tech accessories, and gizmos to cater to your ever-evolving needs.</p>
                </div>
 
                <div className="sub" >
                    <h1>What Sets Us Apart</h1>
                    <p>We prioritize quality and solution  sure that every product we offer meets the highest industry standards. Our commitment to quality gives you peace of mind when you shop with us.At gadget-x, you are at the heart of everything we do. We're dedicated to providing exceptional customer service, ensuring your shopping experience is smooth, secure, and satisfying.</p>
                </div>

                <div className="sub" >
                    <h1>Our Vision</h1>
                    <p>Our vision is to be your trusted partner in the world of gadgets. We aim to continue expanding our product range, fostering innovation, and staying ahead of tech trends so that you can stay connected and ahead of the curve.</p>
                </div>

                <div className="sub" >
                    <h1>Join Us in the Tech Journey</h1>
                    <p>We invite you to explore our website and discover the latest and most exciting gadgets. Whether you're a tech enthusiast, a professional, or someone looking for the perfect gift, we have something for everyone.</p>
                </div>
            </section>
            <section className="preview" >
                <h1>our sponsors</h1>
                <img src={jumia} alt="sponsor" />
                <img src={amazon} alt="sponsor" />
                <img src={gameloft} alt="sponsor" />

            </section>
        </div>
    }
}

export default About