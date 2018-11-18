let nodes = [];
let visited = [];
let toVisit = new MinHeap('totalCost');

let start;
let end;

let cols = 75;
let rows = 75;

function distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

function drawPath(node) {
    stroke(0, 255, 0);
    fill(0, 255, 0);

    ellipse(node.x, node.y, node.size);
    while (node.parent) {
        line(node.x, node.y, node.parent.x, node.parent.y);
        node = node.parent;
        ellipse(node.x, node.y, node.size);
    }
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(50);
    frameRate(30);
    let lastPos = 5;
    let lastNode = start = new Node(lastPos, lastPos);
    nodes.push(lastNode);

    // for (let i = 0; i < 500; i++) {
    //     let x = Math.floor(random(lastPos - 200, lastPos + 250));
    //     let y = Math.floor(random(lastPos - 200, lastPos + 250));
    //     // let x = Math.floor(random(window.innerWidth));
    //     // let y = Math.floor(random(window.innerHeight));
    //     let node = new Node(x, y);

    //     nodes.push(node);
    //     lastNode.connect(node);
    //     if (Math.random() > 0.4) {
    //         lastNode = node;
    //     }
    //     lastPos += 5;
    // }
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            let x = Math.floor(window.innerWidth / rows) * i + 10;
            let y = Math.floor(window.innerHeight / cols) * j + 10;
            let node = new Node(x, y);

            nodes.push(node);
            lastNode.connect(node);
            if (Math.random() > 0.95) {
                lastNode = node;
            }
        }
    }

    for (let i = 0; i < nodes.length; i++) {
        if (Math.random() > 0.85) {
            let index = Math.floor(random(i + 1, nodes.length - 2));
            let nodeAhead = nodes[index];
            nodes[i].connect(nodeAhead);
        }
    }
    end = nodes[nodes.length - 1];
    end.size = 15;
    start.updateDistance(0, end);
    toVisit.add(start);
    // start.draw();

    console.log('Setup Complete!');
}

function draw() {
    if (toVisit.peek()) {
        background(50);
        let minNode = toVisit.pop();

        for (let i = 0; i < minNode.connections.length; ++i) {
            connection = minNode.connections[i];
            if (connection === end) {
                toVisit = new MinHeap();
                connection.parent = minNode;
                break;
            }
            if (visited.includes(connection)) continue;
            let tempDist = minNode.distance + distance(minNode.x, minNode.y, connection.x, connection.y);

            if (!toVisit.includes(connection)) toVisit.add(connection);
            else if (tempDist >= connection.distance) continue;

            connection.parent = minNode;
            connection.updateDistance(tempDist, end);
            connection.visited = true;
        }
        nodes[0].draw();
        drawPath(minNode);
    } else {
        console.log('DONEZO');
        drawPath(end);
        noLoop();
    }
}