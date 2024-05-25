// let user = {
//   firstName: "John",
//   sayHi() {
//     console.log(this)
//     console.log(`Hello, ${this.firstName}!`);
//   }
// };

// setTimeout(function ()  {
//   console.log(this)
// }, 1000);
// ////////////////////////////////////////////////////////////////
// function f1() {
//   this.yen = 'yen';
//   console.log(this.yen);
//   console.log(this);
// }
// function f(x) {
//   return function (x) {
//     x();
//   }
// }
// const func = f(f1);
// func();
// console.log(func.yen);
// console.log(func.yen);
console.log('hi')
setTimeout(() => console.log(1) ,1)
setTimeout(() => console.log(2) ,2)
console.log('microTask')
console.log('hello')
// queueMicrotask(() => {
//   console.log('This is a microtask');
// });

// console.log('This is a normal task');
// class chỉ có getter và setter khác với class có thêm properties(như java) ở chỗ The important difference of class fields is that they are set on individual objects, not User.prototype:
// function f(phrase) {
//   return class {
//     sayHi() { console.log(phrase); }
//   };
// }

// class User extends f("Hello") { }// class được return từ hàm phải có {} để ngụ ý class không cần tên

// new User().sayHi(); // Hello
// con kế thừa cha thì phải có từ khóa super trước khi dùng this =))
// const source = { name: 'yen', age: { value: 1 } }
// const target = structuredClone(source) // structuredClone rất mạnh
// console.log(target.age)
// console.log(source.age === target.age)
