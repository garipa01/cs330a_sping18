class View {
    constructor(model) {
        model.subscribe(this.redrawList.bind(this))
    }

    redrawList(shoppingList, msg) {
        let tb = document.getElementById("shoppinglist")
        tb.innerHTML = ""
        for (let item of shoppingList.Items) {
            this.addRow(item, tb)
        }
    }

    addRow(item, parent) {
        let row = document.createElement("tr")
        row.classList.add(item.priority)
        let cb = document.createElement("input")
        cb.type = "checkbox"
        cb.onclick = function() { item.purchased = true; }
        row.appendChild(cb)
        
        for (let val of ['name', 'quantity', 'store', 'section', 'price']) {
            let td = document.createElement("td")
            td.innerHTML = item[val]
            row.appendChild(td)
        }
        parent.appendChild(row)
    }
}
