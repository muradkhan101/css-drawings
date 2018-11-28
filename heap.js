class MinHeap {
    constructor(prop) {
        this.stack = [];
        this.prop = prop;
        this.count = 0;

        this.itemSet = new Set();
    }
    getLeftIndex(i) {
        return 2 * i + 1;
    }
    getRightIndex(i) {
        return 2 * i + 2;
    }
    getParentIndex(i) {
        return Math.floor((i - 1) / 2);
    }
    getNode(i) {
        let node = this.stack[i];
        return this.prop ? node[this.prop] : node;
    }
    hasLeftChild(i) {
        let node = this.stack[this.getLeftIndex(i)];
        return Boolean(node);
    }
    hasRightChild(i) {
        let node = this.stack[this.getRightIndex(i)];
        return Boolean(node);
    }
    hasParent(i) {
        let index = this.stack[this.getParentIndex(i)];
        return Boolean(index);
    }
    getLeftChild(i) {
        let node = this.stack[this.getLeftIndex(i)];
        return this.prop ? node[this.prop] : node;
    }
    getRightChild(i) {
        let node = this.stack[this.getRightIndex(i)];
        return this.prop ? node[this.prop] : node;
    }
    getParent(i) {
        let node = this.stack[this.getParentIndex(i)];
        return this.prop ? node[this.prop] : node;
    }

    swap(i, j) {
        let t = this.stack[i];
        this.stack[i] = this.stack[j];
        this.stack[j] = t;
    }
    add(item) {
        this.stack.push(item);
        this.count++;
        this.heapifyUp();
        this.itemSet.add(item);
    }
    heapifyUp() {
        let index = this.count - 1;
        while (this.hasParent(index) && this.getParent(index) > this.getNode(index)) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }
    peek() {
        return this.stack[0];
    }
    pop() {
        let item = this.stack[0];
        this.stack[0] = this.stack.pop();
        this.count--;
        this.heapifyDown();
        return item;
    }
    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerIndex = this.getLeftIndex(index);
            if (this.hasRightChild(index) && this.getRightChild(index) < this.getLeftChild(index)) {
                smallerIndex = this.getRightIndex(index);
            }
            if (this.getNode(index) < this.getNode(smallerIndex)) break;
            else {
                this.swap(index, smallerIndex);
                index = smallerIndex;
            }
        }
    }
    includes(item) {
        return this.itemSet.has(item);
    }
}