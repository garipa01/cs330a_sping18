var shoppinglist = new ShoppingList()
var view = new View(shoppinglist)
var storage = new LocalStorage(shoppinglist, "key")

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