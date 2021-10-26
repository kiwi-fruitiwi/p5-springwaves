/*
@author Kiwi
@date 2021-10-26

🐳 coding plans
    generate n particles in random locations
    apply arrive behavior to put them in a horizontal line at height/2

🌟 I realized that this is much more complex than I imagined
    I'm trying to model the wave equation which is a 2nd order differential

stackoverflow explanation of JPMastrogiacomo's code!
https://stackoverflow.com/questions/10081942/python-writing-a-program-to-simulate-1d-wave-motion-along-a-string
so apparently these are differential equations: 1st, 2nd, 3rd orders




 */
let font
let particles = []

const TOTAL = 60
const SPACING = 10
const REST_LENGTH = 6
const K = 0.01

function preload() {
    font = loadFont('fonts/Meiryo-01.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)

    // generate particles with "home" locations in a horizontal line
    for (let i=0; i<TOTAL; i++) {
        particles.push(new Particle(20+i*SPACING, height/2))
    }
}

function draw() {
    background(234, 34, 24)
    stroke(0, 0, 100, 20)
    strokeWeight(1)

    particles.forEach(p => {
        p.applyForce(p.arrive(p.target))
        p.update()
    })

    // wait 2 seconds while the particles arrive at their home locations
    if (frameCount > 120) {
        let yForce = new p5.Vector()
        let p

        // apply spring forces on adjacent particles
        for (let i = 1; i < particles.length; i++) {
            // TODO lol I don't think we want spring forces
            particles[i].applyForce(
                springForce(particles[i], particles[i-1], REST_LENGTH, K))

            particles[i-1].applyForce(
                springForce(particles[i-1], particles[i], REST_LENGTH, K))


            // p = particles[i]
            // yForce = new p5.Vector(0, p.seek(particles[i-1].pos).y)
            // p.applyForce(yForce)

            line(particles[i].pos.x, particles[i].pos.y,
                particles[i-1].pos.x, particles[i-1].pos.y)
        }
    }

    particles.forEach(p => p.show())

    // after 2.5 seconds, oscillate the first one
    if (frameCount > 120 && frameCount < 1080) {
        let head = particles[0]
        head.pos.y = 400*sin(TAU/120 * frameCount) + height/2
    }
}


// calculate the spring force [Hooke's Law F=-kx] copied from p5-polygonsprings
function springForce(a, b, restLength, k) {
    const force = p5.Vector.sub(b.pos, a.pos)
    const currentLength = force.mag()

    // restLength - currentLength is the displacement, x, in F=-kx
    force.setMag(restLength - currentLength)
    force.mult(-k)
    return force.limit(5)
}