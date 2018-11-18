let nodes = [];
let edges = [];
let MAX_DEPTH;

let dragging;

function makeNode(parent, depth = 0) {
    let max = random(0, 8);
    for (let i = 0; i < max && depth < MAX_DEPTH; ++i) {
        if (Math.random() > 0.15) {
            let x = random(parent.x - 150, parent.x + 150);
            let y = random(parent.y - 150, parent.y + 150);
            let node = new Node(x, y);
            nodes.push(node);
            parent.connect(node);
            makeNode(node, depth += 1);
        } else {
            edges.push(parent);
        }
    }
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(50);
    MAX_DEPTH = random(5, 10);

    let start = new Node(window.innerWidth / 2, window.innerHeight / 2);
    nodes.push(start);
    makeNode(start);

    for (let i = 0; i < edges.length; ++i) {
        let edge = edges[i];
        let otherEdge = random(edges);
        if (Math.random() > 0.2) {
            if (edge !== otherEdge) {
                edge.connect(otherEdge);
            }
            else {
                --i;
            }
        }
    }
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