let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')
// console.log(title,price,taxes,ads,discount,total,count,category,submit)

// Get Total
let toolBtn ="Create";
let tmp;
function TotalPrices(){
       if(price.value !=''){
           let result = +(+price.value + +taxes.value + +ads.value)- discount.value;
           total.innerHTML=result;
           total.style.backgroundColor="green"
       }else{
           total.innerHTML="";
           total.style.backgroundColor="darkred"
       }
}//TotalPrices()
// Create Products
let allProducts ;
if(localStorage.product !=null){
    allProducts = JSON.parse(localStorage.product)
}else{
    allProducts = [];
}//Create Products
submit.addEventListener('click',function(){
    let products = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value !="" && price.value !='' && category.value !=''){
        if(toolBtn==="Create"){
        if(products.count>1){
        for(let i=0; i<products.count;i++){
            allProducts.push(products)
        }
        }else{
        allProducts.push(products)
        
        }
        }else{
        allProducts[tmp]=products;
        toolBtn ="Create";
        submit.innerHTML="Create"
        count.style.display="block"
        total.style.backgroundColor="darkred"
        }
        
    }
    // Save LocalStorage
    localStorage.setItem("product",JSON.stringify(allProducts))
    clearProduct()
    showData()
})//Create Products
//clear inputs 
function clearProduct(){
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    count.value ='';
    category.value ='';
}//clearProduct
//read
function showData(){
    let table =``;
    for(let i =0; i < allProducts.length; i++){
        table += `
            <tr>
            <td>${i+1}</td>
            <td>${allProducts[i].title}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].taxes}</td>
            <td>${allProducts[i].ads}</td>
            <td>${allProducts[i].discount}</td>
            <td>${allProducts[i].total}</td>
            <td>${allProducts[i].category}</td>
            <td><button id="update"onclick="updateItem(${i})">Update</button></td>
            <td><button id="delete"onclick="deleteItem(${i})">Delete</button></td>
            </tr>`;
            let deleteAll = document.getElementById('deleteAll')
            if(allProducts.length>1){
                deleteAll.innerHTML =`
                <button onclick="deletebuttons()">Delete All (${allProducts.length })</button>
                `
            }else{
                deleteAll.innerHTML ="";
            }
    }
   let tbody = document.getElementById("tbody");
   tbody.innerHTML=table;
}//showData
showData()
//delete
function deleteItem(item){
    allProducts.splice(item,1)
    localStorage.product = JSON.stringify(allProducts)
    showData()
}//deleteItem()
function deletebuttons(){
    allProducts.splice(0)
    localStorage.clear
    localStorage.product = JSON.stringify(allProducts)
    showData()
}//deletebuttons()
//update
function updateItem(i){
    title.value =allProducts[i].title;
    price.value =allProducts[i].price;
    taxes.value =allProducts[i].taxes;
    ads.value =allProducts[i].ads;
    discount.value =allProducts[i].discount;
    count.style.display="none"
    TotalPrices()
    submit.innerHTML="Update"
    toolBtn =  "Update"
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}//updateItem
//seaerch
let searchMood ="Title";
function getSearchTitle(id){
    let Search = document.getElementById('search')

    // console.log(Search)
    if(id =='searchTitle'){
        searchMood ='Title';
    }else{
        searchMood ='Category';

    }
    Search.placeholder = "Search By "+ searchMood;
    Search.focus();
    // console.log(searchMood)
    Search.value='';
    showData()
}//getSearchTitle()
function searchInfo(value){
    let table='';
    for (let i = 0; i < allProducts.length; i++) {
    if(searchMood == "Title"){
        
            if(allProducts[i].title.includes(value.toLowerCase())){
            table += `
                <tr>
                <td>${i}</td>
                <td>${allProducts[i].title}</td>
                <td>${allProducts[i].price}</td>
                <td>${allProducts[i].taxes}</td>
                <td>${allProducts[i].ads}</td>
                <td>${allProducts[i].discount}</td>
                <td>${allProducts[i].total}</td>
                <td>${allProducts[i].category}</td>
                <td><button id="update"onclick="updateItem(${i})">Update</button></td>
                <td><button id="delete"onclick="deleteItem(${i})">Delete</button></td>
                </tr>`;
            }
    }else{
            if(allProducts[i].category.includes(value.toLowerCase())){
            table += `
                <tr>
                <td>${i}</td>
                <td>${allProducts[i].title}</td>
                <td>${allProducts[i].price}</td>
                <td>${allProducts[i].taxes}</td>
                <td>${allProducts[i].ads}</td>
                <td>${allProducts[i].discount}</td>
                <td>${allProducts[i].total}</td>
                <td>${allProducts[i].category}</td>
                <td><button id="update"onclick="updateItem(${i})">Update</button></td>
                <td><button id="delete"onclick="deleteItem(${i})">Delete</button></td>
                </tr>`;
            }
        
    }
    }
    let tbody = document.getElementById("tbody");
    tbody.innerHTML=table;
}// searchInf()


// let audio = document.getElementById('audio')

// function playAudio(){
//     let audio = new Audio("../2.mp3")
//     audio.loop = true
//     audio.play;
// }
// playAudio()


// var audio = document.getElementById("myAudio");

// // Check if the browser allows autoplay
// var promise = audio.play();

// if (promise !== undefined) {
//     promise.then(_ => {
//         // Autoplay started successfully
//         console.log("Autoplay started!");
//     }).catch(error => {
//         // Autoplay was prevented
//         console.error("Autoplay prevented:", error);
//         // You might want to provide a user interface element (e.g., play button) to start the audio
//     });
// }