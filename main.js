
// Notes 
// https://www.kkhaydarov.com/audio-visualizer/
// https://medium.com/@duraraxbaccano/computer-art-visualize-your-music-in-javascript-with-your-browser-part-2-fa1a3b73fdc6


// Import a renderer 
import circleRenderer from './radialRayMonoRenderer.js'
import circleGridRenderer from './renderCircleGrid.js'
import circleCenterRenderer from './renderCircleCenter.js'
import verticalBarsRenderer from './verticalBarRenderer.js'
import verticalBarsMonoRenderer from './verticalBarsMonoRenderer.js'
import radialRayRenderer from './radialRayRenderer.js'
import yes from './yes.js'

const reader = new FileReader()
// --------------------------------------------------------
// Canvas

// Get reference to the canvas context for use by the 
// renderers below
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


// ----------------------------------------------------------
// Buttons 
const playButton = document.getElementById('button-play')
const pauseButton = document.getElementById('button-pause')

playButton.addEventListener('click', (e) => {
	startAudio()
})

pauseButton.addEventListener('click', (e) => {
	audio.pause()
})


// --------------------------------------------------------
// Upload 
const audioUpload = document.getElementById('audioUpload')
let audioFile
let audioURL
let duration
audioUpload.addEventListener('change', (e) => {
	audioFile = document.getElementById('audioUpload').files[0]
	audioURL = URL.createObjectURL(audioFile)
    reader.onload = event => {
        var audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.decodeAudioData(event.target.result, buffer => {
            duration = buffer.duration;
        })
    }
	reader.readAsArrayBuffer(audioFile);
})

// --------------------------------------------------------
// Audio setup

// Defime some variables 
let analyser
let frequencyArray
let audio

let startTime
// Starts playing the audio
function startAudio() {
	// make a new Audio Object
	audio = new Audio()
	// Get a context 
	const audioContext = new (window.AudioContext || window.webkitAudioContext)()
	
	// Define a source sound file 
	// You can replace this with your own file
	if (audioURL) {
		audio.src = audioURL
	} else {
		audio.src = 'bird-whistling-a.wav'
		// audio.src = 'log-sine-sweep.wav'
	}
	
	// Make a new analyser
	analyser = audioContext.createAnalyser()
	// Connect the analyser and the audio
	const source = audioContext.createMediaElementSource(audio)
	source.connect(analyser)
	analyser.connect(audioContext.destination)

	// Get an array of audio data from the analyser
	frequencyArray = new Uint8Array(analyser.frequencyBinCount)
	// console.log(frequencyArray.length)
	
	// Start playing the audio
	audio.play()
	startTime = new Date()
	requestAnimationFrame(render)
}

// This function renders the audio to the canvas using a renderer
function render() {

	const centerX = 300 / 2
	const centerY = 300 / 2
	const radius = 300 / 5
	analyser.getByteFrequencyData(frequencyArray)
	
	// Use one of the renderers below 
	// radialRayRenderer(frequencyArray, ctx, centerX, centerY, radius)
	// verticalBarsMonoRenderer(frequencyArray, ctx, 12, 300, 300)
	// verticalBarsRenderer(frequencyArray, ctx, 300, 300)
	// circleCenterRenderer(frequencyArray, ctx, centerX, centerY)
	// circleGridRenderer(frequencyArray, ctx, 300, 300)
	// circleRenderer(frequencyArray, ctx, centerX, centerY, radius)
	yes(frequencyArray, ctx, 500, 500, duration, startTime)
	
	// Set up the next animation frame
	requestAnimationFrame(render)
}

