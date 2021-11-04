export default function render(frequencyArray, ctx, width, height) {
	// clears canvas
	ctx.fillStyle = 'white'
	ctx.fillRect(0, 0, width, height)
	ctx.fill()

    // px per step
	const step = width / frequencyArray.length

    // draws visualizer
	frequencyArray.forEach((val, i) => {
        ctx.beginPath()
        
        ctx.stroke()
	})
}