export function useCanvas(){
    const canvasRef=useRef(null);
    const [coordinates,setCoordinates]=useState([]);

    useEffect(()=>{
        const canvasObj=canvasRef.current;
        const ctx=canvasObj.getContext('2d');

        ctx.clearRect(0,0,canvasWidth,canvasHeight);

        coordinates.forEach((coordinate)=>{draw(ctx,coordinate)});
    });
    
    
    return [coordinates,setCoordinates,canvasRef,canvasWidth,canvasHeight];

}