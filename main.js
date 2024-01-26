import algoliasearch from "algoliasearch";

const client = algoliasearch("NIUD9BXSLA", "40fc5439985b895e7e3230c212c9c58e");
const index = client.initIndex("search_engine");


let data = [];

fetch('https://fakestoreapi.com/products').then(res => res.json()).then(json =>{
    data = json;
    //console.log(data);
})


document.querySelector('.searchInput').addEventListener('keyup', () =>{

    let searchTerm = document.querySelector('.searchInput').value;
    let results = [];
    if(String(searchTerm).trim().length > 0) {
        index.search(searchTerm).then((response) => { 
            removeElements()
            renderProducts(response.hits); 
        }).catch(err => { 
            console.log(err); 
        }); 
        }else{
            removeElements()
        }
})

function renderProducts(products){
    
    products.forEach(product =>{
        insertSingleProduct(product);
    })
}
 

const productsContain = document.querySelector('.prodcts');
  

function removeElements() {
    //console.log('removing elements')
    productsContain.innerHTML = '';
}

let totalProductsList = document.querySelector('.prodcts');



function insertSingleProduct(product){
    
    let resultDiv = document.createElement('div');
    let resultImage = document.createElement('img');
    let resultTitle = document.createElement('h4');
    let resultPrice = document.createElement('p');
    let purchaseButton = document.createElement('button');

    resultImage.src = product.image;
    resultTitle.innerText = product.title;
    resultPrice.innerText = product.price;
    purchaseButton.textContent = 'Purchase'

    resultDiv.appendChild(resultImage);
    resultDiv.appendChild(resultTitle);
    resultDiv.appendChild(resultPrice);
    resultDiv.appendChild(purchaseButton);
    totalProductsList.appendChild(resultDiv);
}

function addNewProduct() {
    index.saveObject({
    objectID : 876,
    "id": 1,
    "title": "Cynohub <> JavaScript Project",
    "price": 109.95,
    "description": "This is an algolia based project, where we learn how to use search",
    "category": "development",
    "image": "https://picsum.photos/200",
    "rating": {
    "rate": 5,
    "count": 120
    }
    }).then(response=>{ 
    console.log(response) 
    })

}
addNewProduct()

