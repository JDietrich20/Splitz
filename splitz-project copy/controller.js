//Storage Setup
document.addEventListener('DOMContentLoaded', function() {

var check = new bill();
var savedPeopleOwe;

console.log(check.peopleOwe);

if(sessionStorage.getItem('peopleOwe')){

  check.items = JSON.parse(sessionStorage.getItem('items'));
  check.people = JSON.parse(sessionStorage.getItem('people'));
  check.total = JSON.parse(sessionStorage.getItem('total'));
  check.subtotal = JSON.parse(sessionStorage.getItem('subtotal'));

  const arrayMap = JSON.parse(sessionStorage.getItem('peopleOwe'));
  check.peopleOwe = new Map(arrayMap);

  const arrayMap2 = JSON.parse(sessionStorage.getItem('savedPeopleOwe'));
  savedPeopleOwe = new Map(arrayMap2);

}

//Event Listeners
const startButton = document.getElementById('start-button');
if(startButton){
  startButton.addEventListener('click',function(){
    sessionStorage.clear();
  })
}

const nextButton = document.getElementById('next-button-section');
if(nextButton){
  nextButton.addEventListener('click',function(){
    updateStorage();
  })
}

const enterButton = document.getElementById('addPersonButton');
const nameInput = document.getElementById('name-input');
if(enterButton){
  for(let i=0; i<check.people.length; i++){
    displayName(check.people[i].name);
  }
  enterButton.addEventListener('click', function(){
    if(nameInput.value!=''){

      check.addperson(nameInput.value);
      displayName(nameInput.value);
      nameInput.value = '';
    updateStorage();
    location.reload();
    }
    
  })
  const jsonMap2 = JSON.stringify(Array.from(check.peopleOwe.entries()));
  sessionStorage.setItem('savedPeopleOwe',jsonMap2);
}

const itemName = document.getElementById('itemName-input');
const itemCost = document.getElementById('itemCost-input');
const addItemButton = document.getElementById('addItem-button');
if(addItemButton){
  for(let i=0; i<check.items.length; i++){
    displayItem(check.items[i].name,check.items[i].cost);
  }
  addItemButton.addEventListener('click', function(){
    if(itemName.value!=''&&itemCost.value!=''){
      const cost = parseFloat(itemCost.value);
      check.additem(itemName.value,cost);
      displayItem(itemName.value,itemCost.value);
      itemName.value = '';
      itemCost.value = '';
      updateStorage();
      location.reload();
    }
  })
}
const enterListPerson = document.getElementsByClassName('enterList-person');
if(enterListPerson){
  for(let i=0; i<enterListPerson.length; i++){
    enterListPerson[i].addEventListener('click',function(){
      check.removePerson(check.people[i]);
      this.remove();
      updateStorage();
      location.reload();
    })
  }
}
const enterListItems = document.getElementsByClassName('enterList-items');
if(enterListItems){
  for(let i=0; i<enterListItems.length; i++){
    enterListItems[i].addEventListener('click',function(){
      check.removeItem(check.items[i]);
      this.remove();
      updateStorage();
      location.reload();
    })
  }
}

const manualStart = document.getElementById('manual-button');
if(manualStart){
  manualStart.addEventListener('click',function(){
    check.items = [];
    updateStorage();
  })
}

const scanButton = document.getElementById('scan-button');
if(scanButton){
  scanButton.addEventListener('click',function(){
    check.scanRecipt();
    scanButton.textContent = 'Scanning...';
    let intervalID = setInterval(function(){
      if(check.subtotal!=-1){
        scanButton.c
        updateStorage();
        window.location.href = 'receipt.html';
      }
    },1000)
    setTimeout(function(){
      clearInterval(intervalID);
    },10000)
    
  })
}

const totalPrice = document.getElementById('total-input');
const confirmButton = document.getElementById('confirm-button');
if(totalPrice){
  confirmButton.addEventListener('click',function(){
    check.total = parseFloat(totalPrice.value);
    check.peopleOwe = savedPeopleOwe;
    updateStorage();
  })
}

const receiptPage = document.getElementById('receipt-title');
if(receiptPage){
  console.log('receipt page');
  for(let i=0; i<check.items.length;i++){
    generateReceiptItems(check.items[i].name,check.items[i].cost);
  }
  document.getElementById('subtotal-price').innerHTML = check.subtotal;
} 

const editPage = document.getElementById('edit-section');
const itemNameList = document.getElementsByClassName('itemName-edit');
const itemPriceList = document.getElementsByClassName('itemPrice-edit');
if(editPage){
  for(let i=0; i<check.items.length; i++){
    displayEditItems(check.items[i].name, check.items[i].cost);
    itemNameList[i].addEventListener('input',function(){
      check.editItemName(check.items[i],itemNameList[i].textContent);
    })
    itemPriceList[i].addEventListener('input',function(){
      check.editItemCost(check.items[i],parseFloat(itemPriceList[i].textContent));
    })
  }
}

const doneEdit = document.getElementById('doneEdit-button');
if(doneEdit){
  doneEdit.addEventListener('click',function(){
    updateStorage();
    window.location.href = 'receipt.html';
  })
}

const currentItemName = document.getElementById('checklist-itemName')
const currentItemPrice = document.getElementById('checklist-itemPrice')
let itemIndex = 0;
if(currentItemName){
  if(itemIndex<check.items.length){
    for(let i=0; i<check.people.length; i++){
      displayPeopleOptions(check.people[i].name,false);
    }
    updateCheckPage();
  }
}

const nextSelectButton = document.getElementById('nextSelect-button');
const checkboxes = document.getElementsByClassName('check-box'); 
if(nextSelectButton){
  nextSelectButton.addEventListener('click',function(){
    if(itemIndex<check.items.length){
      var peoplePaying = []; 
      for(let i=0; i<checkboxes.length; i++){
        if (checkboxes[i].checked){
          peoplePaying.push(check.people[i]);
        } 
      }
      check.editPeopleWhoOweItem(check.items[itemIndex],peoplePaying);
      updateStorage();
      itemIndex++;
      updateCheckPage();
    }
    
  })
}

const finalPage = document.getElementById('final-section');
if(finalPage){
  const totalMap = check.calculateTotalSplit();
  for(let i=0; i<check.people.length; i++){
    var personObject = check.people[i];
    personObject = Array.from(check.peopleOwe)[check.people.indexOf(personObject)][0];
    console.log(personObject.name,);
    console.log(totalMap.get(personObject));
    console.log(check.peopleOwe.get(personObject));

    displayResult(personObject.name,
      totalMap.get(personObject),
      check.peopleOwe.get(personObject));
    document.getElementById('total-result').textContent='Total: $'+check.total;
  }
}

const deletButtons = document.getElementsByClassName('item-delete');
if(deletButtons){
  for(let i=0;i<deletButtons.length;i++){
    deletButtons[i].addEventListener('click', function(){
      check.removeItem(check.items[i]);
      this.parentNode.remove();
      updateStorage();
      location.reload();
    })
  }
}

//Methods
function updateStorage(){
  sessionStorage.setItem('items', JSON.stringify(check.items));
  sessionStorage.setItem('people', JSON.stringify(check.people));
  sessionStorage.setItem('total', JSON.stringify(check.total));
  sessionStorage.setItem('subtotal', JSON.stringify(check.subtotal));


  const jsonMap = JSON.stringify(Array.from(check.peopleOwe.entries()));
  sessionStorage.setItem('peopleOwe',jsonMap);

  console.log('storage set');
}

function displayName(name){
  var newNameText = document.createElement('p');
  newNameText.id = 'name'+check.people.length;
  newNameText.textContent = name;
  newNameText.className = 'enterList-person';
  document.getElementById('name-section').appendChild(newNameText);
}

function displayItem(item, price){
  var newItem = document.createElement('p');
  newItem.id = 'item'+check.items.length;
  newItem.textContent = item + ' $' + price;
  newItem.className = 'enterList-items';
  document.getElementById('itemEnter-section').appendChild(newItem);
}

function generateReceiptItems(name,price){
  var newItem = document.createElement('div');
  newItem.className = 'item';

  var newName = document.createElement('p');
  newName.textContent = name;
  newName.className ='item-name';
  newItem.appendChild(newName);

  var newPrice = document.createElement('p');
  newPrice.lassName = 'item-price';
  newPrice.textContent = price;
  newItem.appendChild(newPrice);

  document.getElementById('item-section').appendChild(newItem);
}

function displayEditItems(item, cost){
  var newItem = document.createElement('div');
  newItem.className = 'item-edit';

  var newName = document.createElement('p');
  newName.textContent = item;
  newName.className = 'itemName-edit';
  newName.contentEditable = 'true';
  newItem.appendChild(newName);

  var newPrice = document.createElement('p');
  newPrice.textContent = cost;
  newPrice.className = 'itemPrice-edit';
  newPrice.contentEditable = 'true';
  newItem.appendChild(newPrice);

  var deleteButton = document.createElement('p');
  deleteButton.textContent='x';
  deleteButton.className = 'item-delete';
  newItem.appendChild(deleteButton);

  document.getElementById('edit-section').appendChild(newItem);
}

function displayPeopleOptions(name,checked){
  var newPerson = document.createElement('li');
  
  var newName = document.createElement('label');
  newName.className = 'person';
  newName.textContent = name;
  newPerson.appendChild(newName);

  var newCheckbox = document.createElement('input');
  newCheckbox.className = 'check-box';
  newCheckbox.type = 'checkbox';
  newCheckbox.checked= checked;
  newCheckbox.id = name;
  newPerson.appendChild(newCheckbox);

  document.getElementById('people-section').appendChild(newPerson);
}

function displayResult(nameInput,totalInput,itemList){
  var person = document.createElement('div');
  person.className = 'person-section';

  var nameSection = document.createElement('div');
  nameSection.className = 'pay-list';

  var name = document.createElement('h6');
  name.textContent = nameInput;
  name.className = 'person-name';

  var total = document.createElement('p');
  total.textContent = '$'+totalInput;
  total.className = 'total-pay';

  nameSection.appendChild(name);
  nameSection.appendChild(total);

  person.appendChild(nameSection);


  for(let i=0; i<itemList.length;i++){
    var itemSection = document.createElement('div');
    itemSection.className = 'pay-list';
    var item = document.createElement('p');
    item.className = 'pay-item';
    var price = document.createElement('p')
    price.className = 'pay-price';
    item.textContent = itemList[i].name;

    price.textContent = Math.round(itemList[i].cost/itemList[i].numPeopleWhoOwe*100)/100;
   
    itemSection.appendChild(item);

    itemSection.appendChild(price);

    person.appendChild(itemSection);
    console.log(person);

  }
  document.getElementById('final-section').appendChild(person);

}

function updateCheckPage(){
  if(itemIndex<check.items.length){
    const boxes = document.getElementsByClassName('check-box');
    currentItemName.textContent = check.items[itemIndex].name;
    currentItemPrice.textContent = '$'+ check.items[itemIndex].cost;
    for(let i=0;i<check.people.length;i++){
      boxes[i].checked = false;
    }
  }else{
    updateStorage();
    window.location.href = 'finalpage.html';
  }
  
}
});