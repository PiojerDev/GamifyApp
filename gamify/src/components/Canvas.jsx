import spriteData from "../spriteData.js";
import { useRef, useState, useEffect } from "react";
import ChatField from "./ChatField.jsx";

/* const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
const playerImage = new Image();
playerImage.src = "src/images/sheet.png";
let gameFrame = 0;
const staggerFrames = 8;
let spriteWidth = 160;
let spriteHeight = 128;
const spriteAnimations =[];


const animationStates = spriteData;
animationStates.forEach((state, index) => {
  let frames = {
    loc:[],
  }
  for(let j=0; j< state.frames; j++){
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({x: positionX, y: positionY});
  }
  spriteAnimations[state.name] = frames;
}  );
console.log(spriteAnimations);

function animate(){
  ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations['death'].loc.length;
  let frameX = spriteWidth*position;
  let frameY = spriteAnimations['death'].loc[position].y;
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0 ,0, 600, 600);
  gameFrame++;
  if(position == spriteAnimations['death'].loc.length - 1){
    return;
  };
  requestAnimationFrame(animate);
  
  
};
animate();
*/

export default function Canvas(props) {
  useEffect(() => {
    console.log("zmiana");
  }, [props]);
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
    if (props.lower && !endMove) {
      chosen = spriteAnimations["hurt"];
    } else if (props.higher && !endMove) {
      chosen = spriteAnimations["attack"];
    } else {
      chosen = spriteAnimations["idle"];
    }

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
    requestIdRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, [props]);
  //chat niegotowy
  return (
    <div className="overlay">
      <canvas {...size} ref={canvasRef} />
      {false ? <ChatField /> : null}
    </div>
  );
}
