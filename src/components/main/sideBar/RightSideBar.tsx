import "./SideBar.css";
import advertiseMent from "../../../assets/sidebarAdvertisement.png";
const RightSideBar = () => {
  return (
    <div className="rightSideBar">
      <img
        className="advertiseMentImage"
        src={advertiseMent}
        alt="advertiseMent"
      />
      <img
        className="advertiseMentImage"
        src={advertiseMent}
        alt="advertiseMent"
      />
    </div>
  );
};

export default RightSideBar;
