import Hpbar from "./Hpbar.jsx";
import Player from "./Player.jsx";
import "../style/hero.css";

function Hero() {
  return (
    <>
      <div className="hero-container">
        <Hpbar />
        <Player />
      </div>
    </>
  );
}
export default Hero;
