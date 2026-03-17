import "../style/player.css";
import { useState, useEffect } from "react";
import Character_walk from "../assets/Character1/c1-walk.png";
import Character_stand from "../assets/Character1/c1-stand.png";
import Character_sidekick from "../assets/Character1/c1-side-kick.png";
import Character_jab from "../assets/Character1/c1-jab-punch.png";

function Player() {
  const [position, setPosition] = useState({ top: 150, left: 100 });
  const [currentImage, setCurrentImage] = useState(Character_stand);
  const steps = 10;

  const minTop = 50;
  const maxTop = window.innerHeight - 550;

  const handleKeyDown = (event) => {
    const key = event.key.toLowerCase();
    const playerWidth = 100;
    const playerHeight = 100;
    const maxWidth = window.innerWidth - playerWidth;

    // Change image when moving
    if (["w", "a", "s", "d"].includes(key)) {
      setCurrentImage(Character_walk);
    }

    //kicking action
    if (["k", " "].includes(key)) {
      setTimeout(() => {
        setCurrentImage(Character_sidekick);
      }, 100);
    }

    //jab action

    setPosition((prev) => {
      let newTop = prev.top;
      let newLeft = prev.left;

      if (key === "w" && prev.top > minTop) newTop -= steps;
      if (key === "s" && prev.top < maxTop) newTop += steps;
      if (key === "a" && prev.left > 0) newLeft -= steps;
      if (key === "d" && prev.left < maxWidth) newLeft += steps;

      return { top: newTop, left: newLeft };
    });
  };

  const activejab = () => {
    setTimeout(() => {
      setCurrentImage(Character_jab);
    }, 100);

    if (activejab) {
      setTimeout(() => {
        setCurrentImage(Character_stand);
      }, 1200);
    }
  };

  const handleKeyUp = (event) => {
    // Revert image when key is released
    if (["w", "a", "s", "d"].includes(event.key.toLowerCase())) {
      setTimeout(() => {
        setCurrentImage(Character_stand);
      }, 100);
    }

    if ([" "].includes(event.key.toLowerCase())) {
      setTimeout(() => {
        if (handleKeyUp) {
          setCurrentImage(Character_stand);
        }
      }, 1200);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div
      onMouseDown={(e) => {
        if (e.button === 0) {
          // 0 = left click
          activejab();
        }
      }}
      className="player-container"
    >
      <div
        className="player1 player"
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
        }}
      >
        <img src={currentImage} alt="Player" />
      </div>
    </div>
  );
}

export default Player;
