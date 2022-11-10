import { LinkedNode, DLL } from "./DLL";

interface HashMap {
    [key: string] : LinkedNode;
} 

class LRUCache{
    dll : DLL;
    hashMap : HashMap;
    capacity:number;
    evictionCount:number;

    constructor(capacity:number, evictionCount:number){
        this.dll = new DLL();
        this.hashMap = {};
        this.capacity = capacity;
        this.evictionCount = evictionCount;
    }

    put(key:string, data:object){
        if(this.hashMap[key]){
            this.dll.remove(this.hashMap[key]);
            this.hashMap[key] = this.dll.insert(key, data);
            return;
        }

        if(this.dll.size === this.capacity)
            this.evict()

        const newNode = this.dll.insert(key, data);
        this.hashMap[key] = newNode;
    }

    get(key:string){
        if(!this.hashMap[key]) return;

        const node = this.hashMap[key];
        this.dll.remove(node);
        this.hashMap[key] = this.dll.insert(key, node.data);

        return node.data;
    }

    evict(){
        for(let i=0; i<this.evictionCount; i++){
            const removedNode = this.dll.removeLastNode();
            if(removedNode)
                delete this.hashMap[removedNode.key];
        }
    }
}

export = LRUCache;