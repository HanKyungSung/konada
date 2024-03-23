import Header from "./main/header/Header";
import SubBody from "./main/body/subBody/SubBody";
import dummyData from "../stores/dummyData.json";
import LeftSideBar from "./main/sideBar/LeftSideBar";
import RightSideBar from "./main/sideBar/RightSideBar";
import Footer from "./main/footer/Footer";
function Community() {
  return (
    <div>
      <Header />
      <div className="mainContainer">
        <LeftSideBar />
        <SubBody
          postInfo={dummyData.subBody["q&a"]}
          title={"WeeklyBest"}
          description={"Meet a wide range of people and broaden your thoughts."}
          sortList={["Talk", "Meeting& Study", "All"]}
        />
        <RightSideBar />
      </div>
      <Footer />
    </div>
  );
}

export default Community;
