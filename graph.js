function makeGraph(start, MAX_CONNECTION = 5, MAX_DEPTH = random(5, 10)) {
    let edges = [];
    let nodeList = [start];
    function makeConnections(parent, depth = 0) {
        let max = random(0, MAX_CONNECTION);
        for (let i = 0; i < max && depth < MAX_DEPTH; ++i) {
            if (Math.random() > 0.225) {
                let x = random(parent.x - 150, parent.x + 150);
                let y = random(parent.y - 150, parent.y + 150);
                let node = new Node(x, y);
                nodeList.push(node);
                parent.connect(node);
                makeConnections(node, depth + 1);
            } else {
                edges.push(parent);
            }
        }
    }
    makeConnections(start, 0);
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
    return nodeList;
}

function drawPath(node) {
    stroke(0, 255, 0);
    fill(0, 255, 0);

    ellipse(node.x, node.y, node.size * 1.25);
    while (node.parent) {
        line(node.x, node.y, node.parent.x, node.parent.y);
        node = node.parent;
        ellipse(node.x, node.y, node.size);
    }
}
