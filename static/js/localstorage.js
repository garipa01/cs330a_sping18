"use strict";
class LocalStorage {
    constructor(model, key){
        this.key = key
        let self = this
        model.subscribe(function(list, key){
            self.save(list)
        })

        if (JSON.parse(localStorage.getItem(self.key))) {
            let saved_list = JSON.parse(localStorage.getItem(self.key))
            console.log(saved_list)
            for(let part of saved_list){
                let item = new Item(part.name, part.quantity, part.priority, part.store, part.section, part.price)
                model.addItem(item)
            }

        }

    }
    save(list){
        let newlist = JSON.stringify(list.Items)
        localStorage.setItem(this.key, newlist)
    }
}