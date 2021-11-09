export default function render(frequencyArray, ctx, width, height) {
	// clears canvas
	ctx.fillStyle = 'white'
	ctx.fillRect(0, 0, width, height)
	ctx.fill()

    // px per step
    const base = 128
	const step = width / (frequencyArray.length-base)
    const bW = width / base

    // draws visualizer
    const maxModifier = x => x/255*height
	frequencyArray.forEach((val, i) => {
        ctx.beginPath()
        if(i<base) {
            ctx.moveTo(bW * i-1, maxModifier(frequencyArray[i-1])/2 + height)
            ctx.lineTo(bW * i, -maxModifier(val)/2 + height)
            ctx.moveTo(width - bW * i-1, maxModifier(frequencyArray[i-1])/2 + height)
            ctx.lineTo(width - bW * i, -maxModifier(val)/2 + height)
            ctx.closePath()
        }
        
        // previous value
        ctx.moveTo(step * i-1, maxModifier(frequencyArray[i-1])/2 + height/2)
        // move to current value
        ctx.lineTo(step * i, -maxModifier(val)/2 + height/2)
        ctx.strokeStyle = `hsl(${90-90 / height * val}, 100%, 50%)`
        ctx.stroke()
	})
}