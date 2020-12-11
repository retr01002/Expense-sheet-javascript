var table = document.getElementById('table').getElementsByTagName('tbody')[0];
var date = document.getElementById("date");
var nameE = document.getElementById("nameE");
var amount = document.getElementById("amount");
var submit = document.getElementById("submit_button");

reloadPage();

submit.addEventListener("click", function(){
    var r = checkIntegrity();
    if (r == 0){

        putNewValue();

        nameE.value = "";
        date.value = "";
        amount.value = "";

        configStorage();
        reloadPage();
    }
});

function createDelBtn(){
    let btn = document.createElement("button");
    btn.innerHTML = "X";
    btn.style = "font-size: larger; font-weight: bolder; border: 1px solid #dddddd;";

    return btn
}

function checkIntegrity(){
    let r = 0;
    if(nameE.value == ""){
        alert("Please enter expense name!");
        r = 1;
    }
    if(date.value == ""){
        alert("Please select a valid date!");
        r = 1;
    }
    if(amount.value == "" || isNaN(amount.value)){
        alert("Please enter a valid amount!");
        r = 1;
    }
    return r
}

function configStorage(){
    let store = localStorage.getItem("table");
    store = table.innerHTML;
    localStorage.setItem("table", store);
}

function reloadPage(){
    if (localStorage.getItem("table") == "" || localStorage.length == 0){
        resetHead();
    }
    table.innerHTML = localStorage.getItem("table");
    setButtons();
    console.log(localStorage);
}

function putNewValue(){
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.innerHTML = nameE.value;
    cell2.innerHTML = date.value;
    cell3.innerHTML = amount.value;
    let btn = createDelBtn();
    cell4.appendChild(btn);
    cell4.style.border = "none";
}

function setButtons(){
    let btns = table.getElementsByTagName("button");
    for(i = 0; i < btns.length; i++){
        btns[i].addEventListener("click", function(){
            if (btns.length == 1 || btns.length == 0){
                table.deleteRow(-1);
                resetHead();
            }else{
                table.deleteRow(btns.length);
            }
            configStorage();
            reloadPage();
        });
    }
}

function resetHead(){
    localStorage.setItem("table", "<tbody><tr><th>Name</th><th>Date</th><th>Amount</th></tr></tbody>");
}