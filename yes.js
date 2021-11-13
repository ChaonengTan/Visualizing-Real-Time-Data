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
        // left base
        if(i<base) {
            ctx.beginPath()
            ctx.moveTo(bW * i, maxModifier(frequencyArray[i])/2 + height)
            ctx.lineTo(bW * i, -maxModifier(val)/2 + height)
            ctx.lineWidth = '3'
            ctx.strokeStyle = `hsl(${140 - val}, 100%, 50%)`
            ctx.stroke()
        }
        // right base
        if(i<base) {
            ctx.beginPath()
            ctx.moveTo(width - bW * i, maxModifier(frequencyArray[i])/2 + height)
            ctx.lineTo(width - bW * i, -maxModifier(val)/2 + height)
            ctx.lineWidth = '3'
            ctx.strokeStyle = `hsl(${140 - val}, 100%, 50%)`
            ctx.stroke()
        }
        ctx.beginPath()
        // previous value
        ctx.moveTo(step * i-1, maxModifier(frequencyArray[i])/2 + height/2)
        // move to current value
        ctx.lineTo(step * i, -maxModifier(val)/2 + height/2)
        ctx.strokeStyle = `hsl(${140 - val}, 100%, 50%)`
        ctx.lineWidth = '1'
        ctx.stroke()
	})
}