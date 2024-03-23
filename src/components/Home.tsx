import Body from "./main/body/Body";
import Header from "./main/header/Header";
import LeftSideBar from "./main/sideBar/LeftSideBar";
import RightSideBar from "./main/sideBar/RightSideBar";
import Footer from "./main/footer/Footer";
function Home() {
  return (
    <div>
      <Header />
      <div className="mainContainer">
        <LeftSideBar />
        <Body></Body>
        <RightSideBar />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
