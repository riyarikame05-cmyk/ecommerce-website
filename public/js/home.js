const products = [
{
name:"iPhone 16",
price:79999,
image:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
},
{
name:"Nike Shoes",
price:4999,
image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff"
},
{
name:"Laptop",
price:64999,
image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
},
{
name:"Headphones",
price:2999,
image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
}
];

const container =
document.getElementById("featuredProducts");

products.forEach(product=>{

container.innerHTML += `
<div class="product-card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<button>Add To Cart</button>

</div>
`;

});