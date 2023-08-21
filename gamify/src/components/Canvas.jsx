import spriteData from "../spriteData.js";
import { useRef, useState, useEffect } from "react";
import ChatField from "./ChatField.jsx";
import EndScreen from "./EndScreen.jsx";

export default function Canvas(props) {
  const [victory, setVictory] = useState(false);
  const canvasRef = useRef(null);
  const requestIdRef = useRef(null);
  const size = { width: 600, height: 600 };
  const playerImage = new Image();
  playerImage.src = "src/images/sheet.png";
  let gameFrame = 0;
  const staggerFrames = 8;
  let spriteWidth = 160;
  let spriteHeight = 128;
  const spriteAnimations = [];

  const animationStates = spriteData;
  let chosen = "";
  let endMove = false;

  animationStates.forEach((state, index) => {
    let frames = {
      loc: [],
    };
    for (let j = 0; j < state.frames; j++) {
      let positionX = j * spriteWidth;
      let positionY = index * spriteHeight;
      frames.loc.push({ x: positionX, y: positionY });
    }
    spriteAnimations[state.name] = frames;
  });

  const renderFrame = () => {
    if (props.lower && !endMove && !props.zero) {
      chosen = spriteAnimations["hurt"];
    } else if (props.higher && !endMove) {
      chosen = spriteAnimations["attack"];
    } else if (props.zero && !endMove) {
      chosen = spriteAnimations["death"];
    } else if (endMove && !props.zero) {
      chosen = spriteAnimations["idle"];
    } else chosen = spriteAnimations["idle"];

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, size.width, size.height);
    let position = Math.floor(gameFrame / staggerFrames) % chosen.loc.length;
    let frameX = spriteWidth * position;
    let frameY = chosen.loc[position].y;
    ctx.drawImage(
      playerImage,
      frameX,
      frameY,
      spriteWidth,
      spriteHeight,
      0,
      0,
      600,
      600
    );
    gameFrame++;
    if (position == chosen.loc.length - 1) {
      if (chosen == spriteAnimations["death"]) {
        setVictory(true);
      }
      chosen = spriteAnimations["idle"];
      endMove = true;
    }
  };

  const tick = () => {
    if (!canvasRef.current) return;

    renderFrame();
    requestIdRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (victory) {
      return () => {
        cancelAnimationFrame(requestIdRef.current);
      };
    }
    requestIdRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, [props, victory]);
  //chat niegotowy
  return (
    <div className="overlay">
      <canvas {...size} ref={canvasRef} />
      {false ? <ChatField /> : null}
      {victory ? <EndScreen /> : null}
    </div>
  );
}
