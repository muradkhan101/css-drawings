let nodes;

let visited = [];
let toVisit = new MinHeap('totalCost');

let start;
let end;

let cols = 75;
let rows = 75;

function distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(50);
    frameRate(30);
    start = new Node(window.innerWidth / 2, window.innerHeight / 2);
    nodes = makeGraph(start);
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
        start.draw();
        drawPath(minNode);
    } else {
        console.log('DONEZO');
        drawPath(end);
        noLoop();
    }
}