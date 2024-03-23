import Header from "./main/header/Header";
import SubBody from "./main/body/subBody/SubBody";
import dummyData from "../stores/dummyData.json";
import RightSideBar from "./main/sideBar/RightSideBar";
import LeftSideBar from "./main/sideBar/LeftSideBar";
import Footer from "./main/footer/Footer";
function Knowledge() {
  return (
    <div>
      <Header />
      <div className="mainContainer">
        <LeftSideBar />
        <SubBody
          postInfo={dummyData.subBody.knowledge}
          title={"Knowledge"}
          description={"Share your knowledge and get new ideas."}
          sortList={["Tech News", "Tip", "Column", "Review", "All"]}
        />
        <RightSideBar />
      </div>
      <Footer />
    </div>
  );
}

export default Knowledge;
