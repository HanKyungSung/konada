import Header from "./main/header/Header";
import SubBody from "./main/body/subBody/SubBody";
import dummyData from "../stores/dummyData.json";
import LeftSideBar from "./main/sideBar/LeftSideBar";
import RightSideBar from "./main/sideBar/RightSideBar";
import Footer from "./main/footer/Footer";
function Event() {
  return (
    <div>
      <Header />
      <div className="mainContainer">
        <LeftSideBar />
        <SubBody
          postInfo={dummyData.subBody.evet}
          title={"Event"}
          description={
            "Let's share information about technology-related events and networking events."
          }
          sortList={["IT Event", "Advertisement", "All"]}
        />
        <RightSideBar />
      </div>
      <Footer />
    </div>
  );
}

export default Event;
