var canvas
const pickPosition = { x: Math.random(), y: Math.random() }
function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
    };
}
function setPickPosition(event) {
    const pos = getCanvasRelativePosition(event);
    pickPosition.x = pos.x
    pickPosition.y = pos.y 
}

function pickPos() {
    canvas = document.querySelector("canvas.webgl")
    window.addEventListener("mousemove", setPickPosition);

}
function clear(){
    window.removeEventListener("mousemove", setPickPosition);
}
export { pickPosition,pickPos,clear }