import companylogo from "../../../assets/konada-logo.png";
import {
  IconBrandYoutubeFilled,
  IconBrandFacebookFilled,
  IconMailFilled
} from "@tabler/icons-react";
import "./Footer.css";
const Footer = () => {
  return (
    <div>
      <hr />
      <div className="footer">
        <div className="footerIcons">
          <img className="companyLogo" src={companylogo} alt="company logo" />
          <div>
            <IconBrandFacebookFilled className="socialIcon" />
            <IconBrandYoutubeFilled className="socialIcon" />
            <IconMailFilled className="socialIcon" />
          </div>
        </div>
        <div className="footerMainContainer">
          <div className="footerTextLinks">
            <span>Company</span>
            <span>Notice</span>
            <span>Contact</span>
            <span>Ask Advertisement</span>
            <span>Hire</span>
            <span>Report bug</span>
            <span>Privacy</span>
            <span>Term</span>
          </div>
          <div className="companyInfo">
            <span>Company Name: Konada | Representative: HanKyung Sung</span>
            <span>License Number: 123-456-7890</span>
            <span>
              Address: 1328 hornby st, Vancouver, BC | Customer Service:
              712-223-4456(10:00-18:00 Mon to Fri)
            </span>
          </div>
        </div>
        <div className="footerSponsor">sponsorsponsorsponsorsponsor</div>
      </div>
    </div>
  );
};

export default Footer;
