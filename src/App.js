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
  const [locations, setLocations] = React.useState([])
  const canvasRef = React.useRef(null)  
  
  React.useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, window.innerHeight, window.innerWidth)
    locations.forEach(location => draw(ctx, location))
  })  
  
  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={e => {
        const newLocation = { x: e.clientX, y: e.clientY }
        setLocations([...locations, newLocation])
      }}
    />
  )
}
export default App