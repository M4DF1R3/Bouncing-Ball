// Bouncing Balls

// Set up Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
initGraphics(800, 600)

// Global Variables
// 2D Array to store balls Data

let balls = [];
let colorNames = ["black", "red", "orange", "green", "blue", "purple", "pink"]

// Main Program Loop
requestAnimationFrame(draw);



function draw() {
    // Drawing Black Background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 800, 600);

    // Draw balls
    for (let i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].xspd
        balls[i].y += balls[i].yspd
        checkBallCollision(i);
        if (balls[i].x <= 0 + balls[i].r) {
            // Left Wall
            balls[i].xspd = -balls[i].xspd

        } else if (balls[i].x + balls[i].r >= 800) {
            // Right Wall
            balls[i].xspd = -balls[i].xspd

        } else if (balls[i].y <= 0 + balls[i].r) {
            // Top Wall
            balls[i].yspd = -balls[i].yspd

        } else if (balls[i].y + balls[i].r >= 600) {
            // Bottom Wall
            balls[i].yspd = -balls[i].yspd
        }



        // Draw balls
        ctx.fillStyle = balls[i].col;
        ctx.fillCircle(balls[i].x, balls[i].y, balls[i].r);
        if (balls[i].y > cnv.height) {
            balls[i].y = 0;
            balls[i].x = Math.randomDec(0, cnv.width)
        }
    }

    // Request another Animation Frame
    requestAnimationFrame(draw);
}

// Key Events
document.addEventListener("keydown", keydownHandler);

function keydownHandler(event) {
    if (event.code == "ArrowDown") {
        balls.pop();
    } else if (event.code == "ArrowUp") {
        balls.push({
            x: Math.randomDec(50, 750),
            y: Math.randomDec(50, 550),
            r: Math.randomDec(5, 10),
            xspd: Math.randomDec(-5, 5),
            yspd: Math.randomDec(-5, 5),
            col: Math.randomElement(colorNames)
        })
    } else if (event.code == "ArrowRight") {
        balls.push({
            x: 5,
            y: 5,
            r: 5,
            xspd: 3,
            yspd: 3,
            col: "black"
        })
    } else if (event.code == "ArrowLeft") {
        balls.push({
            x: 595,
            y: 595,
            r: 5,
            xspd: -3,
            yspd: -3,
            col: "black"
        })
    }
}

// Mouse Events
document.addEventListener("click", mousedownHandler);

function mousedownHandler() {
    // Add a new random button
    balls.push({
        x: mouseX,
        y: mouseY,
        r: Math.randomDec(5, 10),
        xspd: Math.randomDec(-2, 2),
        yspd: Math.randomDec(-2, 2),
        col: Math.randomElement(colorNames)
    });
    // for (let i = 0; i < balls.length; i++) {
    //     if (-10 < balls[i].x - mouseX < 10 && -10 < balls[i].y - mouseY < 10) {
    //         balls.splice(i - 1, 1)
    //         console.log(balls)
    //     }
    // }
}

function checkBallCollision(index) {
    for (let i = 0; i < balls.length; i++) {
        if (index != i) {
            if (ballsCollision(balls[index], balls[i])) {
                balls[i].xspd = -balls[i].xspd
                balls[i].yspd = -balls[i].yspd
                balls[index].xspd = -balls[index].xspd
                balls[index].yspd = -balls[index].yspd   
                var Xdistance = balls[i].x - balls[index].x;
                var Ydistance = balls[i].y - balls[index].y;
                let angle = Math.atan(Xdistance/Ydistance) * (180 / Math.PI)
                console.log(angle)
            }
        }
    }
}

function ballsCollision(ball1, ball2) {
    
    let distance = Math.sqrt((ball1.x - ball2.x) ** 2 + (ball1.y - ball2.y) ** 2)
    if (distance < ball1.r + ball2.r) {
        return true;
    }
}

// Helping Sources
//https://www.khanacademy.org/science/physics/linear-momentum/momentum-tutorial/a/what-are-two-dimensional-collisions