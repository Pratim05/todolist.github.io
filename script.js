function update(){
    console.log('Updating...')

    if(localStorage.getItem('itemsJson')== null){
        itemJsonArray = [];
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }

    else{
        itemJsonArraystr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArraystr);
    }

    let tableBody = document.getElementById('tableBody')
    let str = "";
    itemJsonArray.forEach((element,index) => {
        str += `
        <tr+>
        <th scope="row">${index+1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-primary bg-secondary" onclick = "deleted(${index})">Remove</button></td>
        </tr> 
       `
    });
    tableBody.innerHTML = str;
}

function getandupadte(){
    console.log(' get and Updating...')
    let duplicate = false
    tit = document.getElementById("title").value
    desc =  document.getElementById("description").value
    for (let i = 0; i < itemJsonArray.length; i++) {
        if(tit ==  itemJsonArray[i][0]){
            duplicate = true
        }
    }

    if(duplicate == true){
        alert("Same Title Occured !!")
        document.getElementById('title').value = ''
    }

    else if((/\s/.test(tit)) == false && tit != ""){
        if(localStorage.getItem('itemsJson')== null){
            itemJsonArray = [];
        
            itemJsonArray.push([tit, desc]);
            localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
        }
        else{
            itemJsonArraystr = localStorage.getItem('itemsJson');
            itemJsonArray = JSON.parse(itemJsonArraystr);
            itemJsonArray.push([tit,desc]);
            localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
        }
        update();
        
    }
}

add = document.getElementById("add");
add.addEventListener('click',(getandupadte))
update();  

function deleted(itemindex){
    console.log('delete',itemindex);
    itemJsonArraystr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArraystr);

    itemJsonArray.splice(itemindex,1)
    localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));

    update();
}

function clearStorage(){
    if(confirm('Do You Want to Clear')){
      console.log('Clearing the list')
      localStorage.clear();
      update()
   }
}


let a;
let time;
let date;
const options = { weekday : 'long' , year : 'numeric', month:'long' , day:'numeric'}

setInterval(() => {
    a = new Date();
    time =  a.getHours() +  ":" +a.getMinutes() + ":" + a.getSeconds()
    date =a.toLocaleDateString(undefined,options)
    document.getElementById('time').innerHTML = time +'<br>'+ date
    
}, 1000);