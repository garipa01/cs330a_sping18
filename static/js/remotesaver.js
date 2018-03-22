"use strict";
class remotesaver {
    constructor(model, key){
        this.key = key
        let self = this
        model.subscribe(function(list, key){
            self.save(list)
        })

        fetch('/getlist')
        .then(function(response){return response.text()})
            .then(function(text){
                return JSON.parse(text)    
            }).then(function(list){self.restoreList(list,model)})
    }
    save(list){
        let config = {}
        config.method = "POST"
        config.body = JSON.stringify(list.Items)
        config.headers = {"Content-Type":"application/json", "Accept" : "application/json"}
        fetch("/savelist", config)
        .then(function(response){return response.status})
        .then(function(status){
            if(status != 200){
                alert("List not saved!")
            }
        })
    }


    restoreList(list, model){
        if(list != null)        
            var itemdict = JSON.parse(list)
            console.log(itemdict)
            for(let i = 0; i < itemdict.length; i++){
                var item = itemdict[i]
                console.log(item)
                var restoreditem = new Item(item.name, item.quantity, item.priority, item.store, item.section, item.price, item._purchased)
                model.addItem(restoreditem)
            }
        }
}