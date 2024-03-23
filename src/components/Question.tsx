import Header from "./main/header/Header";
import SubBody from "./main/body/subBody/SubBody";
import dummyData from "../stores/dummyData.json";
import Footer from "./main/footer/Footer";
import RightSideBar from "./main/sideBar/RightSideBar";
import LeftSideBar from "./main/sideBar/LeftSideBar";
function Question() {
  return (
    <div>
      <Header />
      <div className="mainContainer">
        <LeftSideBar />
        <SubBody
          postInfo={dummyData.subBody["q&a"]}
          title={"Q&A"}
          description={
            "Save your colleagues time with good questions and answers"
          }
          sortList={["Tech", "Career", "Etc", "All"]}
        />
        <RightSideBar />
      </div>
      <Footer />
    </div>
  );
}

export default Question;
