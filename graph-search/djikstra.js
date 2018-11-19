let nodes = [];

let start;
let end;

function distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(50);
    frameRate(20);
    start = new Node(window.innerWidth / 2, window.innerHeight / 2);
    nodes = makeGraph(start);
    start = nodes[0];
    start.distance = 0;
    end = nodes[nodes.length - 1];

    end.size = 15;
    start.draw();

    console.log('Setup Complete!');
}
function draw() {
    if (nodes.length) {
        background(50);
        let dists = nodes.map(node => node.distance);
        let index = dists.indexOf(Math.min(...dists));
        let nextNode = nodes.splice(index, 1)[0];
        for (let i = 0; i < nextNode.connections.length; ++i) {
            connection = nextNode.connections[i];
            let tempDist = nextNode.distance + distance(nextNode.x, nextNode.y, connection.x, connection.y);

            if (tempDist < connection.distance) {
                connection.distance = tempDist;
                connection.parent = nextNode;
            }

            if (connection === end) {
                connection.parent = nextNode;
                nodes = [];
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
