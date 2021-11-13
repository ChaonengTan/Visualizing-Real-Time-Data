export default function render(frequencyArray, ctx, width, height, duration, startTime) {
    // create time
    const currentTime = new Date()
    const timePassed = (currentTime-startTime)/1000

	// clears canvas
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, width, height)
	ctx.fill()

    // px per step
    const base = 128
	const step = width / (frequencyArray.length-base)
    const bW = width / base

    // draws visualizer

    // helperFunctions
    const maxModifier = x => x/255*height
    const baseDrawer = (x, val, i, stroke) => {
        ctx.beginPath()
        ctx.moveTo(x, maxModifier(frequencyArray[i])/2 + height)
        ctx.lineTo(x, -maxModifier(val)/2 + height)
        ctx.lineWidth = `${stroke}`
        ctx.strokeStyle = `hsl(${maxCol(140 - val)}, 100%, 50%)`
        ctx.stroke()
    }
    const maxCol = x => x<0 ? 0 : x

    // primary drawer
	frequencyArray.forEach((val, i) => {
        // drawTimeLine
        ctx.beginPath()
        ctx.moveTo(0, height/40)
        ctx.lineTo(width, height/40)
        ctx.lineWidth = '3'
        ctx.strokeStyle = 'white'
        ctx.stroke()
        // drawTime
        ctx.beginPath()
        ctx.moveTo(width/(duration/timePassed), 0)
        ctx.lineTo(width/(duration/timePassed), height/20)
        ctx.lineWidth = '3'
        ctx.strokeStyle = 'white'
        ctx.stroke()

        // mainVisualizer
        ctx.beginPath()
        ctx.moveTo(step * i-1, maxModifier(frequencyArray[i])/2 + height/2)
        ctx.lineTo(step * i, -maxModifier(val)/2 + height/2)

        ctx.strokeStyle = `hsl(${maxCol(140 - val)}, 100%, 50%)`
        ctx.lineWidth = '1'
        ctx.stroke()
        // drawBase
        i<base && baseDrawer(bW * i, val, i, 3)
        i<base && baseDrawer(width - bW * i, val, i, 3)
	})
}