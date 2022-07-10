// Footer
import React from 'react';

const Footer = () => {
    return (
        <React.Fragment>
            <footer>
                <div className="fb_container">
                    <div className="fb_footer-text">
                        <p>&copy; Hardik Gohil, {new Date()?.getFullYear()}</p>
                    </div>

                    <ul className="fb_footer-links">
                        <li>
                            <a href="https://github.com/HardikGohilHLR" target="_blank" rel="noreferrer">
                                <img src="/images/social/github.svg" alt="Github"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/hardikgohilhlr/" target="_blank" rel="noreferrer">
                                <img src="/images/social/linkedin.svg" alt="Linkedin"/>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/hardikgohilhlr/" target="_blank" rel="noreferrer">
                                <img src="/images/social/instagram.svg" alt="Instagram"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer;