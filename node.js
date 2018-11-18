class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.connections = [];

        this.heuristic = Infinity;
        this.distance = Infinity;
        this.totalCost = Infinity;

        this.parent = null;
        this.visited = false;
    }

    draw(visited = [], color = 0) {
        if (!visited.includes(this)) {
            this.updateFill();
            noStroke();
            ellipse(this.x, this.y, this.size);
            visited.push(this);
            this.connections.forEach(edge => {
                this.updateStroke(color);
                line(this.x, this.y, edge.x, edge.y);
                edge.draw(visited, 0);
            });
        }
    }
    updateDistance(dist, endNode) {
        this.distance = dist;
        this.heuristic = distance(this.x, this.y, endNode.x, endNode.y);
        this.totalCost = this.distance + this.heuristic;
    }
    updateFill() {
        if (this.connections.length) fill(255);
        else fill(200, 0, 0);
        if (this.visited) fill(0, 200, 200);
    }
    updateStroke(color) {
        // if (this.connections.length) 
        stroke(255);
        // else stroke(200, 0, 0);
    }
    connect(node) {
        this.connections.push(node);
    }

    shift() {
        this.x = lerp(this.x, this.x + random(-3, 3), 0.15);
        this.y = lerp(this.y, this.y + random(-3, 3), 0.15);
    }
}
