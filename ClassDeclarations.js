
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
    constructor( items=[],peopleOwe=[], total=-1, subtotal=-1){
            this.items = items;
            this.peopleowe=peopleOwe;
            this.total = total;
            this.subtotal = subtotal;
    }

    remove(item, array){
        deletedVar = array.splice(item, 1);
        return array;
    }
    
    findIndexOfItem(item){
        return peopleSplitting.indexOf(item);
    }
        
    //adding an item or person to the recpiet
    additem(itemName){
        this.items.push(new item(itemName,-1));
    }
    addperson(personName){
        this.peopleowe.set(new person(personName),[])
    }

    editItemCost(itemVar, newCost){
        itemVar.cost = newCost; 
    }

    editPeopleWhoOweItem(itemVar, PeopleWhoOweItem){
        itemVar.numPeopleWhoOwe = PeopleWhoOweItem.length;
        for (let aPerson in peopleOwe.keys()){
            if (aPerson in PeopleWhoOweItem){
                if (!(itemVar in peopleOwe.get(aperson))){
                    peopleOwe.set(aPerson,peopleOwe.get(aPerson).push(itemVar));
                }
            }else{
                if (itemVar in peopleOwe.get(aPerson)){
                    peopleOwe.set(aPerson,remove(itemVar,peopleOwe.get(aPerson)));
                }
            }
        }
    }

    editInput(itemVar, newName){
        itemVar.name = newName
    }

    //edits total 
    editTotal(editedTotal){this.total = editedTotal;} 



    //returns a hashmap of how much people owe
    calculateSplit(){
        //calc subtotal
        calcualteSubtotal();

        howMuchPeopleOwe = new Map();
        for (let aPerson in peopleOwe.keys()){
            howMuchPeopleOwe.set(aPerson,personSplitTotal(aPerson));
        }
        return howMuchPeopleOwe;
    }
        


    //calculate total split for some Person
    personSplitTotal(aPerson){
        let individualSubtotal = 0.0
        for(let item in peopleOwe.get(aPerson)){
            individualSubtotal += item.cost/item.numPeopleWhoOwe;
        }
        return  individualSubtotal/subtotal*total;
    }

    //sets the subtotal variable
    calculateSubtotal(){
        subtotal=0;
        for (let anItem in items){
            subtotal+=anItem.cost;
        }
    }

    
}


//testing ground

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
