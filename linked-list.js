class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  prepend(data) {
    this.head = new Node(data, this.head);
    this.size += 1;
  }

  append(data) {
    const node = new Node(data);
    let current;

    if (!this.head) this.head = node;
    else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }

    this.size += 1;
  }

  getSize() {
    return this.size;
  }
  getFirstNode() {
    return this.head.data;
  }
  getLastNode() {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    return current.data;
  }
  getIndex(i) {
    let current = this.head;
    let count = 0;
    while (current) {
      if (count === i) return current.data;
      count += 1;
      current = current.next;
    }
    return null;
  }
  pop() {
    if (!this.head) {
      return null;
    }

    let current = this.head;
    let previous = null;

    while (current.next) {
      previous = current;
      current = current.next;
    }

    if (previous) {
      previous.next = null;
    } else {
      this.head = null;
    }
    this.size -= 1;
    return current.data;
  }
  contains(value) {
    let current = this.head;
    let contains = false;
    while (current) {
      if (current.data === value) contains = true;
      current = current.next;
    }
    return contains;
  }
  find(value) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (value === current.data) return index;
      if (!current.next) return null;
      index += 1;
      current = current.next;
    }
  }

  printList() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}

const list = new LinkedList();

list.append(22);
list.append(252);
list.prepend(1327);
list.prepend(31);
list.prepend(61);
list.append(3);
list.pop();
list.printList();
console.log("list size-> " + list.getSize());
console.log("first node-> " + list.getFirstNode());
console.log("last node-> " + list.getLastNode());
console.log("index at-> " + list.getIndex(2));
console.log("does contain-> " + list.contains(1327));
console.log("does contain-> " + list.contains(1331));
console.log("find value-> " + list.find(1327));
