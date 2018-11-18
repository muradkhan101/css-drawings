class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.connections = [];

        this.heuristic = -Infinity;
        this.distance = -Infinity;
        this.totalCost = -Infinity;
    }

    draw(visited) {
        if (!visited.includes(this)) {
            stroke(255);
            visited.push(this);
            this.connections.forEach(edge => {
                line(this.x, this.y, edge.x, edge.y);
                edge.draw(visited);
            })
        }
    }
}
