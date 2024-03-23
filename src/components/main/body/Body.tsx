import dummyData from "../../../stores/dummyData.json";
import "./Body.css";
import Post from "./Post";
import eventImage from "../../../assets/event.jpg";
const Body = () => {
  return (
    <div className="body">
      <img className="bodyBanner" src={dummyData.bodyBannerURL} alt="" />
      <div className="postContainer">
        <Post postTitle={"Q&A"} postInfo={dummyData.body["q&a"]} />
        <Post postTitle={"Community"} postInfo={dummyData.body["community"]} />
        <Post
          postTitle={"EditorChoice"}
          postInfo={dummyData.body["editorChoice"]}
        />
        <Post
          postTitle={"WeeklyBest"}
          postInfo={dummyData.body["weeklyBest"]}
        />
        <Post postTitle={"Knowledge"} postInfo={dummyData.body["knowledge"]} />
        <Post postTitle={"Notice"} postInfo={dummyData.body["notice"]} />
      </div>
      <div className="event">
        <span>Event</span>
        <div className="imageContainer">
          <img className="eventImage" src={eventImage} alt="event image" />
          <img className="eventImage" src={eventImage} alt="event image" />
          <img className="eventImage" src={eventImage} alt="event image" />
        </div>
      </div>
    </div>
  );
};

export default Body;
