import React from 'react'


function draw(ctx,location) {
  console.log(location);
  const {x,y}=location;

  ctx.beginPath();
  ctx.fillStyle="red";
  ctx.fillRect(x, y, 50, 50);
  ctx.stroke();


}

function App() {
  const canvasRef = React.useRef(null);
  const [locations, setLocations] = React.useState([]);  
  
  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={e => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const newLocation = { x: e.clientX, y: e.clientY };
        setLocations([...locations, newLocation]);
        draw(ctx, newLocation);
      }}
    />
  )
}

export default App;
