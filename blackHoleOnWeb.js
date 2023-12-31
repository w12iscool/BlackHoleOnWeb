alert('Black Hole on Web -w12iscool');
let userName = prompt("What is the name of your black hole?");
let color = prompt("What color is your black hole?")
    let circle = document.createElement('div');
    circle.style.cssText = `
        width: 100px;
        height: 100px;
        font-size: 30px;
        font-family: math;
        position: fixed;
        transform: translate(-50%, -50%);
        align-items: center;
        justify-content: center;
        display: flex;
        padding: 20px;
        top: 50%;
        left: 50%;
        background-color: rgb(0, 0, 0);
        color: rgb(255, 255, 255);
        border-radius: 50%;
    `;
    circle.style.backgroundColor = `${color}`;
    circle.textContent = `${userName}`;
    document.body.appendChild(circle);

    let velocityX = 0;
    let velocityY = 0;
    let acceleration = 0;
    let friction = 0.95;

    function moveCircle() {
        circle.style.top = parseFloat(circle.style.top) + velocityY + 'px';
        circle.style.left = parseFloat(circle.style.left) + velocityX + 'px';

        const circleRect = circle.getBoundingClientRect();
        const images = document.querySelectorAll('img');

        images.forEach(image => {
            const imageRect = image.getBoundingClientRect();
            if (circleRect.top < imageRect.bottom &&
                circleRect.bottom > imageRect.top &&
                circleRect.left < imageRect.right &&
                circleRect.right > imageRect.left) {
                image.remove();
                let circleSize = parseInt(circle.style.width, 10);
                circleSize += 3; // this is kinda important lol
                circle.style.width = circleSize + 'px';
                circle.style.height = circleSize + 'px';
            }
        });

        if (parseFloat(circle.style.top) < 0) {
            circle.style.top = '0px';
            velocityY = -velocityY;
        } else if (parseFloat(circle.style.top) > window.innerHeight - circle.offsetHeight) {
            circle.style.top = window.innerHeight - circle.offsetHeight + 'px';
            velocityY = -velocityY;
        }

        if (parseFloat(circle.style.left) < 0) {
            circle.style.left = '0px';
            velocityX = -velocityX;
        } else if (parseFloat(circle.style.left) > window.innerWidth - circle.offsetWidth) {
            circle.style.left = window.innerWidth - circle.offsetWidth + 'px';
            velocityX = -velocityX;
        }

        velocityX *= friction;
        velocityY *= friction;

        requestAnimationFrame(moveCircle);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp' || event.key === '38') {
            velocityY -= 5;
        } else if (event.key === 'ArrowDown' || event.key === '40') {
            velocityY += 5;
        } else if (event.key === 'ArrowLeft' || event.key === '37') {
            velocityX -= 5;
        } else if (event.key === 'ArrowRight' || event.key === '39') {
            velocityX += 5;
        }
    });

    moveCircle();
// thank you StackOverflow for allowing me to "inspired" by other people's work
