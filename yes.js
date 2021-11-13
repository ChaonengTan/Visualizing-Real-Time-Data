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
    const baseDrawer = (x, val, i, stroke) => {
        ctx.beginPath()
        ctx.moveTo(x, maxModifier(frequencyArray[i])/2 + height)
        ctx.lineTo(x, -maxModifier(val)/2 + height)
        ctx.lineWidth = `${stroke}`
        ctx.strokeStyle = `hsl(${140 - val}, 100%, 50%)`
        ctx.stroke()
    }
	frequencyArray.forEach((val, i) => {
        // drawBase
        i<base && baseDrawer(bW * i, val, i, 3)
        i<base && baseDrawer(width - bW * i, val, i, 3)

        // mainVisualizer
        ctx.beginPath()
        ctx.moveTo(step * i-1, maxModifier(frequencyArray[i])/2 + height/2)
        ctx.lineTo(step * i, -maxModifier(val)/2 + height/2)
        
        ctx.strokeStyle = `hsl(${140 - val}, 100%, 50%)`
        ctx.lineWidth = '1'
        ctx.stroke()
	})
}