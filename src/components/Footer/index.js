import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-social-media-container">
      <FaGoogle className="footer-social-media-icon" />
      <FaTwitter className="footer-social-media-icon" />
      <FaInstagram className="footer-social-media-icon" />
      <FaYoutube className="footer-social-media-icon" />
    </div>
    <p className="footer-contact-us">Contact Us</p>
  </div>
)

export default Footer
