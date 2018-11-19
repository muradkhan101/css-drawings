let nodes = [];
let edges = [];

let dragging;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(50);

    let start = new Node(window.innerWidth / 2, window.innerHeight / 2);
    nodes = makeGraph(start);

    start.draw();
    fill(50, 200, 200);
    ellipse(start.x, start.y, 8);
    console.log('Finsihed Setting Up!');
}



function draw() {
    background(50);
    nodes.forEach(node => {
        node.shift();
    })
    nodes[0].draw();
}

function mouseDragged() {
    if (dragging) {
        dragging.x = lerp(dragging.x, mouseX, 0.2);
        dragging.y = lerp(dragging.y, mouseY, 0.2);
        dragging.connections.forEach(edge => {
            edge.x = lerp(dragging.x, edge.x, 0.2);
            edge.y = lerp(dragging.y, edge.x, 0.2);
        })
    }
}

function mousePressed({clientX, clientY}) {
    let dist = nodes.map(node => Math.hypot(node.x - clientX, node.y - clientY));
    let minIndex = dist.indexOf(Math.min(...dist));
    dragging = nodes[minIndex];
}

function mouseReleased() {
    dragging = undefined;
}