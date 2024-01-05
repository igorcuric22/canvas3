import React from 'react'
import './App.css'

function draw(ctx,location) {
  const {x,y}=location;

  ctx.beginPath();
  ctx.fillStyle="red";
  ctx.fillRect(x, y, 50, 50);
  ctx.stroke();


}

function App() {
  const [locations, setLocations] = React.useState([])
  const canvasRef = React.useRef(null)  
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
    locations.forEach(location => draw(ctx, location));
  })  
  
  function handleCanvasClick(e) {
    const newLocation = { x: e.clientX, y: e.clientY }
    setLocations([...locations, newLocation])
  }  
  
  function handleClear() {
    setLocations([])
  }  
  
  function handleUndo() {
    setLocations(locations.slice(0, -1))
  }  
  
  return (
    <>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleUndo}>Undo</button>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleCanvasClick}
      />
    </>
  )
}

export default App;
