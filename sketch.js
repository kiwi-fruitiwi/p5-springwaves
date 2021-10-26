/*
@author Kiwi
@date 2021-10-26

🐳 coding plans
    generate n particles in random locations
    apply arrive behavior to put them in a horizontal line at height/2
    



 */
let font
let particles = []

const TOTAL = 100
const SPACING = 6

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)

    //
    for (let i=0; i<TOTAL; i++) {
        particles.push(new Particle(20+i*SPACING, height/2))
    }
}

function draw() {
    background(234, 34, 24)

    particles.forEach(p => {
        p.applyForce(p.arrive(p.target))
        p.update()
    })

    particles.forEach(p => p.show())
}