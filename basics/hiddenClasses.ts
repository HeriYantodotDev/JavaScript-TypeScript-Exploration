// hidden classes

function Product(a: number, b: number) {
  this.a = a;
  this.b = b;
}

const instance1 = new Product(1,2);
const instance2 = new Product(10,20);

instance1.a = 100;
instance1.b = 200;

instance2.b = 2000;
instance2.a = 1000;

/*
  this is going to slow down the compiler. 
*/