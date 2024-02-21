import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div>
        <p>
          Ready to get Started ? <br /> Talk to us today
        </p>
        <NavLink to={"/login"} className="btn">
          Get Started
        </NavLink>
      </div>
      <section>
        <aside>
          <h4>Abhinav Maurya</h4>
          <p>
            This Website is Made by Abhinav. <br /> A MERN Stack Developer.
          </p>
        </aside>
        <div>
          <p>
            Subscribe to get <br /> Important Update !!
          </p>
          <input type="text" placeholder="example@gmail.com" />
        </div>
        <aside>
          <h4>Follow Me</h4>
          <div>
            <a href="https://www.instagram.com/nx.abhinav/" target="blank">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/abhinav28/" target="blank">
              <FaLinkedin />
            </a>
            <a href="https://github.com/abhinav2-3" target="blank">
              <FaGithub />
            </a>
          </div>
        </aside>
      </section>
    </footer>
  );
};

export default Footer;
