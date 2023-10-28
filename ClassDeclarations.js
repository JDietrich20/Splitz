class person{
    //var: str name, int owes
    constructor(name = "Hi", owes = 0){
        this.name = name;
        this.owes = owes;
    }
}

class item{
    //var: str name, cost
    constructor(name, cost){
            this.name = name;
            this.cost = cost;
        }
}

class bill{
    //var: arr of people: arr of items, hashtable, double total, double tip, double tax
    constructor(people =[], items=[],peopleowe=[], total=0, tip=0, tax=0){
            this.people = people;
            this.items = items;
            this.peopleowe=peopleowe;
            this.total = total;
            this.tip = tip;
            this.tax = tax;
    }
        
    //adding an item or person to the recpiet
    additem(itemName, cost = 0){
        this.items.push(new item(itemName, cost));
    }
    addperson(personName, personOwes=0){
        this.people.push(new person(personName, personOwes));
        this.peopleowe.push([])
    }

    //edits the input (cost, people, item)
    editInput(itemName, newCost){}
    editInput(itemName, people){
        for (let personOwesWhat in peopleowe){
        }
    }
    editInput(itemName, newName){}

    //edits tax tip 
    editTax(editedTax){this.tax = editedTax;}
    editTip(editedTip){this.tip = editedTip;}
    editTotal(editedTotal){this.total = editedTotal;} 

    //returns a hashmap of how much people owe
    calculateSplit(){}
    
    //calculate total split for some Person
    personSplitTotal(person){
        //return (subtotal the person owes) + (tip/this.people) + (tax/this.people);
    }
    
}



