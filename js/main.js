let productName =document.getElementById("productName");
let productpicture =document.getElementById("picture");
let productPrice =document.getElementById("productPrice");
let productDescription =document.getElementById("productDescription");
let addButton  = document.getElementById('add-button');
let inputs     =Array.from( document.querySelectorAll('.form-control'));
let displayRow = document.getElementById('display-data');
let products=[];
if(JSON.parse(localStorage.getItem("productList"))!=null){
    products = JSON.parse(localStorage.getItem("productList"));
    displayData();
}
//-----valdation ---------- \\
    addButton.disabled = "true"
var alert =document.getElementById("alert")
var nameVald = /^[a-z A-Z0-9]{5,15}$/
productName.onkeyup = function(){

    if(!nameVald.test(productName.value)){
        addButton.disabled = "true";
        productName.classList.add('is-invalid')
        productName.classList.remove('is-valid')
        alert.classList.remove("d-none")
    }else{
        productName.classList.add('is-valid')
        productName.classList.remove('is-invalid')
        alert.classList.add("d-none")
        addButton.removeAttribute('disabled')
    }
}
var PriceVald = /^[0-9]{2,7}$/
productPrice.onkeyup =function(){

    if(!PriceVald.test(productPrice.value)){
        
        addButton.disabled = "true";
        productPrice.classList.add('is-invalid')
    }else{
        productPrice.classList.add('is-valid')
        productPrice.classList.remove('is-invalid')
        addButton.removeAttribute('disabled')
    }
}
console.log(productName.value)
//--------------------------//
addButton.addEventListener('click',function(){
        addProudcts();
        displayData();
        clearData();
        productName.classList.remove('is-valid');
        productPrice.classList.remove('is-valid');
        addButton.disabled = "true"
})
//-------get input value ----//

function addProudcts(){
    var product = {
        name:productName.value,
        Price:productPrice.value,
        description:productDescription.value,
        picture :localStorage.getItem('images')
    }
    products.push(product);
    localStorage.setItem("productList",JSON.stringify(products))
}
//--------------------------------\\
//------ upload image and save in local storage------//
productpicture.addEventListener('change',function(){
    const file = this.files[0];
    if(file){
        const reader = new FileReader()
        reader.addEventListener('load',function(){
            localStorage.setItem('images',this.result);
        })
        reader.readAsDataURL(file);
    }
})
//---------------------------------------------------\\

//--------display data in html document ------// 
function displayData(){
    var raws = '';
    for(var i =0 ; i<products.length; i++){
        raws +=`
        <div class="col-md-4">
            <div class="card">
                <img src="${products[i].picture}" id=${i} class="pic" alt="">
                <h4> name  : <span class="fs-5">${products[i].name}</span></h2>
                <h4> price : <span class="fs-5">${products[i].Price} $</span></h3>
                <h4> desc  :  <span class="fs-5">${products[i].description}</span></h4>
                <div class="bin" onclick="deleteRow(${i})" title="delet Element"><i class="fas fa-trash text-white"></i></div>
            </div>
        </div>
        `
    }
    displayRow.innerHTML = raws;
}
//----------------------------------------------\\
// ------- clear data from inpuyt ------------------//

function clearData(){
    for(var i = 0 ;i<inputs.length ; i++){
        if(inputs[i].value !=""){
            inputs[i].value = ""
        }
    }
}
function deleteRow(index){
    products.splice(index,1)
    displayData();
    localStorage.setItem("productList",JSON.stringify(products))
}
//---search input and style -------\\ 

let searchInput = document.getElementById("search");
let inputIcon   = document.getElementById("icon"); 
//style---//
inputIcon.onclick =function(){
    searchInput.classList.add('overraidSearch');
    inputIcon.classList.add('d-none');
    searchInput.setAttribute("placeholder","search....")
}
//------//
//search input ----//
searchInput.onkeyup = function(){
    var raws = '';
    for(var i =0 ; i<products.length; i++){
        if(products[i].name.includes(this.value)){
        raws +=`
        <div class="col-md-4">
            <div class="card">
                <img src="${products[i].picture}" id=${i} class="pic" alt="">
                <h4> name  : <span class="fs-5">${products[i].name}</span></h2>
                <h4> price : <span class="fs-5">${products[i].Price} $</span></h3>
                <h4> desc  :  <span class="fs-5">${products[i].description}</span></h4>
                <button onclick="deleteRow(${i})" id="del" class="btn btn-danger">delete</button>
            </div>
        </div>
        `
    }
    }
    displayRow.innerHTML = raws;
}
//----------------------\\\

//------ information-----\\\

let imgs=Array.from(document.querySelectorAll('.pic'));
let showInfo = document.getElementById('info');
let showPic  = document.getElementById('pic');
let infoName = document.getElementById("infoProductName");
let infoPrice = document.getElementById("infoProductPrice");
let infoDesc = document.getElementById("infoProductDesc");
    for(var i= 0 ; i<products.length; i++){
        imgs[i].onclick = function(){
            var id = this.getAttribute('id');
            showInfo.style.display = "flex";
            var imgSrc = this.getAttribute('src')
            showPic.src = imgSrc;
            infoName.innerHTML = products[id].name
            infoPrice.innerHTML = products[id].Price +"$"
            infoDesc.innerHTML = products[id].description
        }
    }
var close = document.getElementById('close');
close.onclick = function(){
    showInfo.style.display = "none"
}
//-----------------------------------////

var humBtn = document.getElementById('humBtn');
var nav = document.getElementById('nav');

humBtn.onclick= function(){
    nav.classList.toggle('tran')
}