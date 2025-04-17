/**
 * Node {
 *   next:Mode | null
 *   prev: Node|null
 *   value:value
 *}
 */

class LRUCache {
  constructor(capacity) {
    this.capacity = Number(capacity);
    this.length = 0;
    this.map = new Map();
    this.head = null;
    this.tail = null;
  }
  #removeNode(node) {
    // console.log(`Removing Node : ${node.key},${node.value}`);
    if (!node) return;
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (node === this.head) {
      this.head = node.next;
    }
    if (node === this.tail) {
      this.tail = node.prev;
    }
  }
  get(key) {
    if(!this.map.has(key)) return null;
    const node = this.map.get(key);

    this.#removeNode(node)
    node.prev = null
    node.next = this.head

    if(this.head !== null){
        this.head.prev = node;
    }

    this.head = node;
    return node.value;
  }

  put(key, value) {
    // if key already there
    //remove the existing node
    //create a new node
    //add it to the head

    // Check if we have capacity
    if (this.length === this.capcaity) {
      if (!this.map.has(key)) {
        this.#removeNode(this.tail);
        this.length -= 1;
      }
    }

    // 1.Case: If the key is already in cache store
    if (this.map.has(key)) {
      // 1.remove the older node
      this.#removeNode(this.map.get(key));
    }

    const node = {
      next: this.head,
      prev: null,
      key,
      value,
    };

    this.map.set(key, node);
    if(this.head !== null){
        this.head.prev = node;
    }
    this.head = node;

    if (this.tail === null) {
      this.tail = node;
    }

    this.length += 1;
  }
  debug() {
   let current = this.head;
    const arr = [];
    while (current !== null) {
      arr.push(current);
      current = current.next;
    }

    return arr.reduce(
      (acc, curr) => acc.concat(`-->[[${curr.key}]: [${curr.value}]]-->`),
      ''
    );
  }
}

const cache = new LRUCache(3);
// const cache = new LRUCache(2);
// cache.put(1,10);
// cache.put(2,20);
// cache.put(3,30);
// cache.put(4,40);
// cache.put(5,50);
// cache.put(6,60);
// cache.put(7,70);
// cache.put(8,80);
// cache.put(9,90);


cache.put(1,10);
cache.put(2,20);
// console.log(cache.get(1));
cache.put(3,30);
console.log(cache.get(1));
console.log(cache.get(1));
console.log(cache.get(2));
cache.put(4,40);

console.log(cache.debug());