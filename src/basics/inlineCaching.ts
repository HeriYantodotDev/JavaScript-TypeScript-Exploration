/* eslint-disable no-console */
// inline caching

interface Product {
  id: number;
  name: string;
}

function findProduct(product: Product) {
  return `found ${product.id} ${product.name}`;
}

const productData: Product = {
  id: 5,
  name: 'Dongle X',
};

console.log(findProduct(productData));

/* 
If we will run it again and again,
it's better if we just replace it with 
'found 5 Dongle X' 
*/