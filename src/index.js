const Lexer = require('./Lexer')
const Parser = require('./Parser')
const Node = require('./Node.js')

//const src = '2 + ( 7 - 2 ) + 4 * 5'
const src = '(5*(3+7))/(5*2-5)'
//const src = '1234'

const tokens = new Lexer().parse(src);


console.log("######## Calcul simple ########")
console.log(src)
console.log(tokens);
let ast = new Parser(tokens);
ast.parser();
console.log("######## Resultat ########")
console.log(ast.resolve());

//Creation Node
function creationNode(left,right,operation){
    let node = new Node();
    node.setLeft(left);
    node.setRight(right);
    node.setOperation(operation);
    return node;
}

// //Test Node
// let node1 = creationNode(4,5,'*');
// let node2 = creationNode(7,2,'-');
// let node3 = creationNode(node2,3,"*");
// let node4 = creationNode(node1,node3,"+");

// console.log(node4.getValue());




