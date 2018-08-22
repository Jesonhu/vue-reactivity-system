let data = { price: 5, quantity: 2}

/** 通用值 */
let internalValue = data.price; 
Object.defineProperty(data, 'price', {
  get() {
    console.log(`Getting price: ${internalValue}`);
    return internalValue;
  },
  set(newVal) {
    console.log(`Setting price to ${newVal}`);
    internalValue = newVal;
  }
});

console.log( data.price ); // => 5
data.price = 10;
