
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

        let config = {}
        config.method = "POST"
        config.body = JSON.stringify(shoppinglist.Items)
        config.headers = {"Content-Type":"application/json", "Accept" : "application/json"}
        fetch("http://127.0.0.1:5001/savelist", config)
        .then(function(response){return response.status})
        .then(function(status){
            if(status != 200){
                alert("List not saved!")
            }
        })
}

    addRow(item, parent) {
        let row = document.createElement("tr")
        row.classList.add(item.priority)
        let cb = document.createElement("input")
        cb.type = "checkbox"
        cb.classList.add("form-control")
        cb.onclick = function() { item.purchased = true }
        if (item.purchased) {
            cb.checked = true;
        }
        row.appendChild(cb)
        for (let val of ['name', 'quantity', 'store', 'section', 'price']) {
            let td = document.createElement("td")
            td.innerHTML = item[val]
            if (item.purchased == true) {
                td.classList.add('purchased')
            }
            row.appendChild(td)
        }
        parent.appendChild(row)
    }
}
