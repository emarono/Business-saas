let products = JSON.parse(localStorage.getItem('products')||'[]');
let credits = JSON.parse(localStorage.getItem('credits')||'[]');
let sales = 0;

function showTab(t){
  document.querySelectorAll('.tab').forEach(e=>e.classList.add('hidden'));
  document.getElementById(t).classList.remove('hidden');
}
function save(){localStorage.setItem('products',JSON.stringify(products));localStorage.setItem('credits',JSON.stringify(credits)); render()}
function addProduct(){
  products.push({name:pName.value,qty:+pQty.value,price:+pPrice.value,expiry:pExpiry.value});
  pName.value='';pQty.value='';pPrice.value=''; save();
}
function addCredit(){
  credits.push({name:fName.value,amount:+fAmount.value}); fName.value='';fAmount.value=''; save();
}
function makeSale(){
  let p = products.find(x=>x.name==saleProduct.value);
  if(!p||p.qty<saleQty.value) return alert('No stock');
  p.qty-=saleQty.value; sales+=p.price*saleQty.value;
  document.getElementById('receipt').innerHTML=`<h4>Receipt</h4><p>${p.name} x ${saleQty.value} = KES ${p.price*saleQty.value}</p><p>M-Pesa Confirmed</p>`;
  save();
}
function render(){
  productList.innerHTML=products.map((p,i)=>`<div>${p.name} - ${p.qty} left - KES ${p.price} ${new Date(p.expiry)<new Date()?'⚠️EXPIRED':''} ${p.qty<5?'🔴LOW':''}</div>`).join('');
  creditList.innerHTML=credits.map(c=>`<div>${c.name} owes KES ${c.amount}</div>`).join('');
  saleProduct.innerHTML=products.map(p=>`<option>${p.name}</option>`).join('');
  totalProducts.innerText=products.length;
  lowStock.innerText=products.filter(p=>p.qty<5).length;
  totalCredit.innerText='KES '+credits.reduce((a,b)=>a+b.amount,0);
  salesToday.innerText='Today: KES '+sales;
}
render();