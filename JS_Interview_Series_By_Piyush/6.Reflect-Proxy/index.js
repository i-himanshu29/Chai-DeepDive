const p1 = {
  fname: "Piyush",
  lname: "Garg",
  age: 18,
};

const p1Proxy = new Proxy(p1, {
  get(target, prop) {
    console.log("target", { target, prop });
    // if (prop in target) return target[prop];
    if (prop in target) return Reflect.get(target,prop);
    return false;
  },
  set(target, prop, value) {
    if (!(prop in target)) throw new Error(`${prop} does not exists`);
    switch (prop) {
      case "fname":
      case "lname":
        if (typeof value !== "string")
          throw new Error(`${prop} must be a string`);
        break;
      case "age":
        if (typeof value !== "number")
          throw new Error(`${prop} must be a number`);
        if (value <= 0) throw new Error(`${prop} must be > zero`);
    }
    Reflect.set(target , prop , value);
    // target[prop] = value;
  },
});

// p1Proxy.age = -10;
p1Proxy.age = 10;
console.log(p1Proxy.age);
console.log(p1Proxy.fname);
console.log(p1Proxy.lname);
