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
            this.people = [];
            this.peopleOwe=new Map();
            this.total = -1;
            this.subtotal = -1;
    }

    //adding an item or person to the recpiet
    additem(itemName,price){
        this.items.push(new item(itemName,price));
        this.#calculateSubtotal();
    }
    
    removeItem(item){  
        this.items.splice(this.items.indexOf(item),1);
        this.#calculateSubtotal();
    }

    removePerson(person){ 
        this.peopleOwe.delete(Array.from(this.peopleOwe)[this.people.indexOf(person)][0]);
        this.people.splice(this.people.indexOf(person),1);
    }

    addperson(personName){
        this.people.push(new person(personName));
        this.peopleOwe.set(this.people[this.people.length-1],[]);
    }

    
    editItemCost(itemVar, newCost){
        itemVar.cost = newCost; 
        this.#calculateSubtotal();
    }

    editPeopleWhoOweItem(itemVar, PeopleWhoOweItem){
        //var itemVar = this.items[itemVarr]
        itemVar.numPeopleWhoOwe = PeopleWhoOweItem.length;
        for (let aPerson of this.people){
            if (PeopleWhoOweItem.includes(aPerson)){
                if (!(this.peopleOwe.get(Array.from(this.peopleOwe)[this.people.indexOf(aPerson)][0]).includes(itemVar))){
                    this.peopleOwe.get(Array.from(this.peopleOwe)[this.people.indexOf(aPerson)][0]).push(this.items[this.items.indexOf(itemVar)]);
                }
            }else{
                if (this.peopleOwe.get(Array.from(this.peopleOwe)[this.people.indexOf(aPerson)][0]).includes(itemVar)){
                    var newarr = this.peopleOwe.get(Array.from(this.peopleOwe)[this.people.indexOf(aPerson)][0]);
                    newarr.splice(newarr.indexOf(itemVar),1);
                    this.peopleOwe.set(Array.from(this.peopleOwe)[this.people.indexOf(aPerson)][0],newarr);
                }
            }
        }
    }
    /*
    doTheyOwe(person,item){
        console.log(person);
        console.log(this.peopleOwe.get(Array.from(this.peopleOwe)[this.people.indexOf(person)][0])[0]);
        console.log(item);
        console.log(this.peopleOwe.get(Array.from(this.peopleOwe)[this.people.indexOf(person)][0])[0] == this.items[this.items.indexOf(item)]);
        console.log(this.items.indexOf(item));
        console.log(this.items.indexOf(this.peopleOwe.get(Array.from(this.peopleOwe)[this.people.indexOf(person)][0])[0]));
      //  for (let boughtitem of this.people){
        return this.peopleOwe.get(Array.from(this.peopleOwe)[this.people.indexOf(person)][0]).includes(item);
             (this.peopleOwe.get(Array.from(this.peopleOwe)[this.people.indexOf(aPerson)][0]).includes(itemVar))
    }
    */
    editItemName(itemVar, newName){
        itemVar.name = newName; 
    }

    //edits total 
    editTotal(editedTotal){
        this.total = editedTotal;
    } 

    //sets the subtotal variable
    #calculateSubtotal(){
        this.subtotal=0;
        for (let anItem of this.items){
            this.subtotal+=anItem.cost;
        }
        this.subtotal = this.subtotal.toFixed(2);
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
            howMuchPeopleOwe.set(aPerson,Math.round(this.#indvidualSplitTotal(aPerson)*100)/100);
        }
        return howMuchPeopleOwe;
    }
    /*
    async #scan(){
        var myHeaders = new Headers();
        myHeaders.append("apikey", "ba09fab08be211ee9d5a010aee18edbc");
      
        var formdata = new FormData();
        formdata.append("file", input.files[0]);
      
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
      
        var output = "hi"
        fetch("https://api.taggun.io/api/receipt/v1/verbose/file?refresh=false&incognito=false&extractTime=false&extractLineItems=true", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result);
          return result;
        })
        .catch(error => {console.log('error', error)
          return "error";
        });    
    }
    */

    async #scan() {
        var myHeaders = new Headers();
        myHeaders.append("apikey", "ba09fab08be211ee9d5a010aee18edbc");
    
        var formdata = new FormData();
        formdata.append("file", input.files[0]);
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
    
        try {
            const response = await fetch("https://api.taggun.io/api/receipt/v1/verbose/file?refresh=false&incognito=false&extractTime=false&extractLineItems=true", requestOptions);
            const result = await response.json();
            //console.log(result);
            return result;
        } catch (error) {
            //console.log('error', error);
            return "error";
        }
    }
    
    async scanRecipt(){

        const scan = await this.#scan();
        if (scan == "error"){
            return 
        }
        var scanneditems = scan["amounts"];
        var scannedSubtotal = 100000000000;
        if (!("totalAmount" in scan)){
            return
        }
        if (scan["totalAmount"]["confidenceLevel"]>0){
            scannedSubtotal = scan["totalAmount"]["data"];
        }
        var i = 0; 
        while(i<scanneditems.length && this.subtotal < scannedSubtotal){
            if (scanneditems[i]["data"]>0){
                var lastSpaceIndex = scanneditems[i]["text"].length-1;
                while (lastSpaceIndex>-1 && scanneditems[i]["text"][lastSpaceIndex] != ' '){
                    lastSpaceIndex -= 1;
                }
                if (lastSpaceIndex==-1){
                    lastSpaceIndex = scanneditems[i]["text"].length-1
                }
                this.additem(scanneditems[i]["text"].slice(0,lastSpaceIndex),scanneditems[i]["data"]);
                this.#calculateSubtotal();
                
            }
            i +=1;
        } 
        if(this.subtotal > scannedSubtotal){
            this.removeItem(this.items[this.items.length-1],1);
        }
        console.log(this.items);
        return true;
    }



    
}
check = new bill();

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
*/