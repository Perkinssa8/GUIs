const a = {name: "hello"}
const b = a;
b.name = "goodbye";
console.log(a.name); // world

function wrap(callback){
    console.log(`:) ${callback} :)`);
}

wrap(() => {"Hello World!"}); // :) () => {"Hello World!"} :)

const help = (arg1) => (arg2) => (arg3) => `${arg1} - ${arg2} - ${arg3}`;

console.log(help("Hello"));

// The three components of an HTML tag are: 
// The opening tag, the content, and the closing tag.


//The backbone of every User Interface (UI) is its structure, which is typically defined by HTML in web development. HTML provides the basic structure of sites, which is enhanced and modified by other technologies like CSS and JavaScript.