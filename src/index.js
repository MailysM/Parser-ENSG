const Lexer = require('./Lexer')
const Parser = require('./Parser')
const Node = require('./Node.js')

//const src = '2 + ( 7 - 2 ) + 4 * 5'
//const src = '(5*(3+7))/(5*2-5)+3'
const src =  '4+6%4'
//const src = '1234'

const tokens = new Lexer().parse(src);


console.log("######## Calcul simple ########")
console.log(src)
console.log(tokens);
let ast = new Parser(tokens);
ast.parser();
console.log("######## Resultat ########")
console.log(ast.resolve());





