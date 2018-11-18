let nodes = new MinHeap('distance');

let start;
let end;

let cols = 20;
let rows = 40;

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
    frameRate(20);
    let lastPos = 5;
    let lastNode = start = new Node(lastPos, lastPos);
    start.distance = 0;
    nodes.add(start);

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

            nodes.add(node);
            lastNode.connect(node);
            if (Math.random() > 0.9) {
                lastNode = node;
            }
        }
    }

    
    for (let i = 0; i < nodes.length; i++) {
        if (Math.random() > 0.8) {
            let index = Math.floor(random(i + 1, nodes.length - 2));
            let nodeAhead = nodes[index];
            nodes.stack[i].connect(nodeAhead);
        }
    }
    end = nodes[nodes.length - 1];
    start.draw();
    end.size = 15;

    console.log('Setup Complete!');
}
function draw() {
    if (nodes.peek()) {
        background(50);
        // Update to use min heap
        let nextNode = nodes.pop();
        for (let i = 0; i < nextNode.connections.length; ++i) {
            connection = nextNode.connections[i];
            let tempDist = nextNode.distance + distance(nextNode.x, nextNode.y, connection.x, connection.y);

            if (tempDist < connection.distance) {
                connection.distance = tempDist;
                connection.parent = nextNode;
            }

            if (connection === end) {
                console.log('CONNECTION IS END');
                nodes = new MinHeap();
                break;
            }
        }
        nextNode.visited = true;
        start.draw();
        drawPath(nextNode);
    } else {
        console.log('DONEZO');
        drawPath(end);
        noLoop();
    }
}
