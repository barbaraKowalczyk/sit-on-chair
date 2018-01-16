document.addEventListener('DOMContentLoaded', function (){

    //slider service

    var next_btn = document.getElementById("nextPicture");
    var prev_btn = document.getElementById("prevPicture");
    var pictures = document.querySelectorAll(".carousel-section");
    var index = 0;

    pictures[index].classList.add('visible');

    var check_index = function (i) {
        if (i>=pictures.length ){
            index=0;
        } else if (i<0){
            index=pictures.length-1;
        }
    }

    next_btn.addEventListener('click',function () {
        pictures[index].classList.remove('visible');
        index++;
        check_index(index);
        pictures[index].classList.add('visible');
        console.log(index);
    })

    prev_btn.addEventListener('click',function () {

        pictures[index].classList.remove('visible');
        index--;
        check_index(index);
        pictures[index].classList.add('visible');
    })

// ORDER CALCULATIONS

//Dropdowns
var chairDrop = document.querySelector('#chairType');
var materialDrop = document.querySelector('#chairMaterial');
var colorDrop = document.querySelector('#chairColor');
var transport = document.querySelector('#transportChair');

// Dropdown's values list

    var typesList = document.querySelector('#chairType ul');
    var materialsList =document.querySelector('#chairMaterial ul');
    var colorsList = document.querySelector('#chairColor ul');

    var types = document.querySelectorAll('#chairType ul li');
    var materials =document.querySelectorAll('#chairMaterial ul li');
    var colors = document.querySelectorAll('#chairColor ul li');

// Dropdown's selected values
    var typesLabel = document.querySelector('#chairType p');
    var materialsLabel = document.querySelector('#chairMaterial p');
    var colorsLabel = document.querySelector('#chairColor p');

// The list of prices of selected items
   function CurrentPrice (type,material,trans) {
        this.type = type;
        this.material = material;
        this.transport = trans;
        this.sum=0;
    };

    CurrentPrice.prototype.addPrices = function() {
        this.sum = this.material + this.type + this.transport;
    }

    var currentPrice = new CurrentPrice(0,0,0);



// A list of prices
    var prices = {
        clair:100,
        margarita:150,
        selena:80,
        tkanina:20,
        skora:50,
        kolor:0,
        transport:20
    }

//Summary - what is selected
var typeEl = document.getElementById('type');
var materialEl = document.getElementById('material');
var colorEl = document.getElementById('color');
var transportEl = document.getElementById('transport');

//Summary - the list of prices
var typePriceEl = document.getElementById('typePrice');
var materialPriceEl = document.getElementById('materialPrice');
var colorPriceEl = document.getElementById('colorPrice');
var transportPriceEl = document.getElementById('transportPrice');

// The sum in the summary
var priceEl = document.getElementById('price');




// events on user's choices that updates the summary
    chairDrop.addEventListener('click',function () {
        typesList.classList.toggle("hide");
    })

    types.forEach(function (item) {
        item.addEventListener('click', function () {
            //set value
            var selValue=this.textContent;
            typeEl.innerHTML= selValue;
            typesLabel.textContent = selValue;

            //set price
            var price = prices[this.dataset.type];
            typePriceEl.textContent =price;
            currentPrice.type = price;
            currentPrice.addPrices()
            priceEl.innerHTML = currentPrice.sum;
        })
    });


    materialDrop.addEventListener('click',function () {
        materialsList.classList.toggle("hide");
    })

    materials.forEach(function (item) {
        item.addEventListener('click', function () {
            //set value
            var selValue=this.textContent;
            materialEl.innerHTML= selValue;
            materialsLabel.textContent = selValue;

            //set price
            var price =  prices[this.dataset.material];
            materialPriceEl.textContent = price;
            currentPrice.material = price;
            currentPrice.addPrices();
            priceEl.innerHTML =  currentPrice.sum;
        })
    });

    colorDrop.addEventListener('click',function () {
        colorsList.classList.toggle("hide");
    })

    colors.forEach(function (item) {
        item.addEventListener('click', function () {
            //set value
            var selValue=this.textContent;
            colorEl.innerHTML= selValue;
            colorsLabel.textContent = selValue;


            //set price
            colorEl.innerHTML= this.textContent;
            colorPriceEl.textContent = 0;
            currentPrice.addPrices();
            priceEl.innerHTML = currentPrice.sum;
        })
    });

    transport.addEventListener('click',function () {
        if (transport.checked) {
            currentPrice.transport = prices["transport"];
            console.log( prices[transport]);
            transportEl.innerHTML= "transport";
            transportPriceEl.innerHTML = prices["transport"];
        } else {
            currentPrice.transport = 0;
            transportEl.innerHTML= "";
            transportPriceEl.innerHTML = "";
        }
        currentPrice.addPrices();
        priceEl.innerHTML =  currentPrice.sum;

    })

})

