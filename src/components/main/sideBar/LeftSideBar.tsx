import "./SideBar.css";
import advertiseMent from "../../../assets/sidebarAdvertisement.png";
import dummyData from "../../../stores/dummyData.json";
import { IconBadge } from "@tabler/icons-react";

const LeftSideBar = () => {
  return (
    <div className="leftSideBar">
      <img
        className="advertiseMentImage"
        src={advertiseMent}
        alt="advertiseMent"
      />
      <h3>Top Writer</h3>
      {dummyData.sideBar.TopWriters.map((writer) => (
        <div className="rankingWriter">
          <div>
            <div className="userProfilePictureBackground">
              <img
                className="userProfilePicture"
                src={writer.profilePictureURL}
                alt=""
              />
            </div>
            <span>{writer.userId}</span>
          </div>
          <div>
            <IconBadge></IconBadge>
            <div>{writer.rankingPoint}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftSideBar;
