# 🗺 Deep Path
## _A very simple object proxy for deep string paths_

Deeply nested object data can get unreadable pretty quick. It also can be problematic if accessing data with dot or bracket notation in multiple places in your code and the shape of the data changes. Currently bracket notation accepts strings of a single key but there would be a lot of useful things you could do if it accepted a string of the path. Some simple examples might be:

```
 const obj = {
    name: {
        fName: "John",
        lName: "Smith"
    }
}
obj["name.fName"] = "Jane";
const path = "name.fName";
obj[path] = "Jane";
obj[path] = obj[path] + "y"; // value becomes Janey
obj["name.fName"] = "Jane";
```

In scenarios where you have nested JSON you could more easily dynamically construct the path for accessing your data. Also, it would allow you to store deeply nested paths in variables so that you didn’t repeat the path constantly and had a single source of truth. So instead of having obj.users[0].userInfo.name.firstName throughout your code you could have the following:
```
const firstName = (index) => `users.${index}.userInfo.name.firstName`;

let name = obj[firstName(0)];
obj[firstName(0)] = "Jane";
```

To install"
```
npm install https://github.com/robertpage/deep-path.git
```

To use import deepPath then:
```
const obj = deepPath({
    name: {
        fName: "John",
        lName: "Smith"
    }
});
```
Your object now accepts string paths.

## _Important_
If you use bracket notation and your key has brackets and/or "." in it but is not intended to be a nested path things will explode!