var shoppinglist = new ShoppingList()
var view = new View(shoppinglist)
//var storage = new LocalStorage(shoppinglist, "key")
fetch('http://127.0.0.1:5001/getlist')
.then(function(response){return response.text()})
.then(function(text){
    console.log(text)
    let list = JSON.parse(text)
    console.log(list)
    restoreList(list)
})


function clickedon() {
    let rowcolids = ['itemname', 'qty', 'store', 'category', 'price', 'priority']
    let vals = {}
    for (let id of rowcolids) {
        vals[id] = document.getElementById(id).value;
    }
    let item = new Item(vals.itemname, vals.qty, vals.priority, vals.store, vals.category, vals.price)
    shoppinglist.addItem(item)
}

function sortCol(col){
    let property = col.textContext.toLowerCase();
    shoppinglist.sortItems(property)
}

function restoreList(savedlist){
    if(savedlist != null)        
        itemdict = JSON.parse(savedlist)
        console.log(itemdict)
        for(let i = 0; i < itemdict.length; i++){
            item = itemdict[i]
            console.log(item)
            restoreditem = new Item(item.name, item.quanity, item.priority, item.store, item.section, item.price, item._purchased)
            shoppinglist.Items.push(restoreditem)
            view.redrawList(shoppinglist, "initialize")
        }
    }