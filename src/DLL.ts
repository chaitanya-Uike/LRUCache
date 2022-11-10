class LinkedNode {
  key : string
  data : object;
  prev : null | LinkedNode;
  next : null | LinkedNode;

  constructor(key : string, data : object) {
    this.key = key;
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DLL {
  head : null | LinkedNode;
  tail : null | LinkedNode;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  insert(key:string, data:object):LinkedNode{
    const newNode = new LinkedNode(key, data);

    newNode.next = this.head;

    if(this.head != null)
      this.head.prev = newNode;
    else
      this.tail = newNode;
    
    this.head = newNode;
    this.size++;

    return newNode;
  }

  remove(node:LinkedNode | null){
    if(this.head === null || node === null) return;

    if(node === this.head && node === this.tail){
      this.head = null;
      this.tail = null;
    }
    else if(node === this.head)
      this.head = node.next;
    else if(node === this.tail){
      this.tail = node.prev;
      if(this.tail)
        this.tail.next = null;
    }
    else {
      if(node.prev)
        node.prev.next = node.next;
      if(node.next)
        node.next.prev = node.prev;
    }
    this.size--;
  }

  removeLastNode():LinkedNode | null{
    const lastNode = this.tail;
    this.remove(lastNode);
    return lastNode;
  }

  printList(){
    let temp = this.head;

    console.log("forward")
    while(temp!==null){
      console.log(temp.data);
      temp = temp.next;
    }

    temp = this.tail;
    console.log("backward")
    while(temp!==null){
      console.log(temp.data);
      temp = temp.prev;
    }
  }
}


export {LinkedNode, DLL}


