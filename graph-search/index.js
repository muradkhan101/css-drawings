let nodes = [];
let visited = [];
let toVisit = [];

let start;
let end;

function setup() {
    createCanvas(800, 600);
    background(50);
    
    let pass = 25;
    let lastNode = start = new Node(pass, pass);
    nodes.push(lastNode);

    for (let i = 0; i < 40; i++) {
        let x = Math.floor(random(pass - 50, pass + 200));
        let y = Math.floor(random(pass - 50, pass + 200));
        let node = new Node(x, y);

        nodes.push(node);
        lastNode.connect(node);
        if (Math.random() > 0.4) {
            lastNode = node;
        }
        pass += 10;
    }

    for (let i = 0; i < nodes.length; i++) {
        if (Math.random() > 0.6) {
            let index = Math.floor(random(i + 1, nodes.length - 2));
            let nodeAhead = nodes[index];
            nodes[i].connect(nodeAhead);
        }
    }
    end = nodes[nodes.length - 1];
    nodes[0].draw([]);
}
