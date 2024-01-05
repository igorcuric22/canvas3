import React from 'react'
import './App.css'

function draw(ctx,location) {
  const {x,y}=location;

  ctx.beginPath();
  ctx.fillStyle="red";
  ctx.fillRect(x, y, 50, 50);
  ctx.stroke();
}

// our first custom hook
function usePersistentState(init) {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem('draw-app')) || init
  )  
  
  React.useEffect(() => {
    localStorage.setItem('draw-app', JSON.stringify(value))
  })  
  
  return [value, setValue]
}

// our second custom hook: a composition of the first custom hook // and React's useEffect + useRef
function usePersistentCanvas() {
  const [locations, setLocations] = usePersistentState([])
  
  const canvasRef = React.useRef(null)
  
  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    locations.forEach(location => draw(ctx, location))
  })  
  
  return [locations, setLocations, canvasRef]
}


function App() {
  const [locations, setLocations] =usePersistentState(
    JSON.parse(localStorage.getItem('draw-app')) || [] );

  const canvasRef = React.useRef(null);  
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, window.innerHeight, window.innerWidth);
    locations.forEach(location => draw(ctx, location))
  })  
  
  React.useEffect(() => {
    localStorage.setItem('draw-app', JSON.stringify(locations))
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
      <div className="controls">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleUndo}>Undo</button>
      </div>
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