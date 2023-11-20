/*function to ensure variable typing is correct and won't cause error to overall code
plug these into functions that require user input to ensure the user is inputting the 
correct variable type. IF NOT, do not proceed with current flow and have them correct
their input given to the system
*/
function isNumber(variable){
    if(typeof(variable) == 'number'){
        return true;
    }
    else {
        return false;
    }
}

function isString(variable){
    if(typeof(variable) == 'string'){
        return true;
    }
    else{
        return false;
    }
}

/*
steps of process:
1. grab input from user
2. check input from user
IF VALID: proceed
IF ERROR: have user type in the correct input 
*/


class person{
    constructor(name = "Hi"){
        this.name = name;
    }
}

class item{
    constructor(name, cost=-1,numPeopleWhoOwe=-1){
            this.name = name;
            this.cost = cost;
            this.numPeopleWhoOwe = numPeopleWhoOwe;
        }
}

class bill{
    //var: arr of items, hashtable, double total, double tip, double tax
    constructor(){
            this.items = [];
            this.people = []
            this.peopleOwe=new Map();
            this.total = -1;
            this.subtotal = -1;
    }

    //adding an item or person to the recpiet
    additem(itemName,price){
        this.items.push(new item(itemName,price));
    }

    addperson(personName){
        this.people.push(new person(personName));
        this.peopleOwe.set(this.people[this.people.length-1],[]);
    }

    editItemCost(itemVar, newCost){
        itemVar.cost = newCost; 
    }

    editPeopleWhoOweItem(itemVar, PeopleWhoOweItem){
        itemVar.numPeopleWhoOwe = PeopleWhoOweItem.length;
        for (let aPerson of this.peopleOwe.keys()){
            if (PeopleWhoOweItem.includes(aPerson)){
                if (!(this.peopleOwe.get(aPerson).includes(itemVar))){
                    this.peopleOwe.get(aPerson).push(itemVar);
                }
            }else{
                if (itemVar in this.peopleOwe.get(aPerson)){
                    this.peopleOwe.set(aPerson,remove(itemVar,this.peopleOwe.get(aPerson)));
                }
            }
        }
    }

    editItemName(itemVar, newName){
        itemVar.name = newName;
    }

    //edits total 
    editTotal(editedTotal){this.total = editedTotal;} 

    //sets the subtotal variable
    #calculateSubtotal(){
        this.subtotal=0;
        for (let anItem of this.items){
            this.subtotal+=anItem.cost;
        }
    }

        //calculate total split for some Person
    #indvidualSplitTotal(aPerson){
        let individualSubtotal = 0.0;
        for(let item of this.peopleOwe.get(aPerson)){
            individualSubtotal += item.cost/item.numPeopleWhoOwe;
        }
        return  individualSubtotal/this.subtotal*this.total;
    }

    //returns a hashmap of how much people owe
    calculateTotalSplit(){
        //calc subtotal
        this.#calculateSubtotal();

        let howMuchPeopleOwe = new Map();

        for (let aPerson of this.peopleOwe.keys()){
            howMuchPeopleOwe.set(aPerson,Math.round(this.#individualSplitTotal(aPerson)*100)/100);
        }
        return howMuchPeopleOwe;
    }
        



    
}


//testing ground
/*
//person class testing
let person1 = new person();
console.log(person1.name); //Hi
console.log(person1.personOwes);//-1

let person2 = new person("John Doe", 20);
console.log(person2.name);//John Doe
console.log(person2.personOwes);//20

let person3 = new person("Becky");
console.log(person3.name);//Becky
console.log(person3.personOwes);//-1

let person4 = new person(20);
console.log(person4.name);//20
console.log(person4.personOwes);//-1

//map config and testing
let a = new Map();
a.set(person1,"125");
a.set(person2,"2");
person1.name = "21"
console.log(a.get(person1));//125


//Bill class
//we are unable to remove specific indicies with pop() or shift() so
//we must implement a function to do such 
peopleSplitting = ["Josh", "Lily", "Daniel"];
peopleSplitting.push("Ron", "George");
peopleSplitting.push("Becca");
peopleSplitting.pop();
peopleSplitting.shift();
recpiet = new bill(peopleSplitting);
console.log(recpiet);

*/
/*

//testing ground
peopleSplitting = ["Josh", "Lily", "Daniel"];
peopleSplitting.push("Ron", "George");
peopleSplitting.push("Becca");
peopleSplitting.pop();
//peopleSplitting.shift();

recpiet = new bill(peopleSplitting);
console.log(recpiet);


function remove(item, array){
    deletedVar = array.splice(item, 1);
    // console.log(item);
    // console.log(deletedVar);
    return array;
}

function findIndexOfItem(item){
    return peopleSplitting.indexOf(item);
}
//console.log(findIndexOfItem("Lily"));

remove(findIndexOfItem("Lily"), peopleSplitting);
    
console.log(recpiet);

*/
check = new bill();
check.addperson("alice");
check.addperson("bob");
check.addperson("eve");
//console.log(check.peopleOwe);
check.additem("cheeseburger",10.58);
check.additem("fires", 6.99);
check.additem("milkshake", 5.99);
//console.log(check.peopleOwe);
check.editPeopleWhoOweItem(check.items[0],[check.people[0]]);
check.editPeopleWhoOweItem(check.items[1],[check.people[0],check.people[2]]);
check.editPeopleWhoOweItem(check.items[2],[check.people[1]]);

check.editItemCost(check.items[0],10);
//console.log(check.peopleOwe);
check.editTotal(30.0);
console.log(check.calculateTotalSplit());
check.editPeopleWhoOweItem(check.items[2],[check.people[1],check.people[0]]);
console.log(check.calculateTotalSplit());