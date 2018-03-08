'use strict';
class Subject {
 
    constructor() {
        this.handlers = []
    }

    subscribe(fn) {
            this.handlers.push(fn);
        }
     
    unsubscribe(fn) {
        this.handlers = this.handlers.filter(
            function(item) {
                if (item !== fn) {
                    return item;
                }
            }
        );
    }
     
    publish(msg, someobj) {
        var scope = someobj || window;
        for (let fn of this.handlers) {
            fn(scope, msg)
        }
    }
}

class Item extends Subject {
    constructor(name, quantity, priority, store, section, price) {
        super()
        this.name = name;
        this.quantity = quantity;
        this.priority = priority;
        this.store = store;
        this.section = section;
        this.price = price;
        this._purchased = false;
    }

    get purchased() {
        return this._purchased;
    }
    
    set purchased(nv) {
        if(this._purchased == false){
            this._purchased = nv
            this.publish('removed item',this)
        }
        else {
            this._purchased = false
            clearTimeout(this.to)
            this.publish('added',this)
        }
    }
}

class ShoppingList extends Subject {
    constructor() {
        super()
        this.Items = [];
    }

    addItem(item) {
        this.Items.push(item)
        let self = this;
        item.subscribe(function(a,b){
            self.publish('starting to remove',self)
            if(item.purchased == true) {
                item.to = setTimeout(function() {
                    self.removeItem(item);
                },2000)
            }
        });
        this.publish('added item',this)
    }

    removeItem(item){
        let index = this.Item.indexOf(item);
        if(idex > -1){
            let item = this.Item.splice(index,1)
        }
        this.publish('done removing',this)
    }
}
