class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.connections = [];

        this.heuristic = -Infinity;
        this.distance = -Infinity;
        this.totalCost = -Infinity;
    }

    draw(visited) {
        if (!visited.includes(this)) {
            this.updateFill();
            this.updateStroke();
            ellipse(this.x, this.y, this.size);
            visited.push(this);
            this.connections.forEach(edge => {
                line(this.x, this.y, edge.x, edge.y);
                edge.draw(visited);
                this.updateStroke();
            });
        }
    }
    updateFill() {
        if (this.connections.length) fill(255);
        else fill(200, 0, 0);
    }
    updateStroke() {
        if (this.connections.length) stroke(255);
        else stroke(200, 0, 0);
    }
    connect(node) {
        this.connections.push(node);
    }
}
