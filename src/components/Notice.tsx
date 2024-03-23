import Header from "./main/header/Header";
import SubBody from "./main/body/subBody/SubBody";
import dummyData from "../stores/dummyData.json";
import RightSideBar from "./main/sideBar/RightSideBar";
import LeftSideBar from "./main/sideBar/LeftSideBar";
import Footer from "./main/footer/Footer";
function Notice() {
  return (
    <div>
      <Header />
      <div className="mainContainer">
        <LeftSideBar />
        <SubBody
          postInfo={dummyData.subBody.notice}
          title={"Announcement"}
          description={
            "This is a space where you can share information about OKKY's news, events, and events."
          }
          sortList={["Notice", "Archive"]}
        />
        <RightSideBar />
      </div>
      <Footer />
    </div>
  );
}

export default Notice;
