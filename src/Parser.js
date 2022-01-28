const Lexer = require('./Lexer')
const Node = require('./Node')



class Parser {

	constructor(tokens) {
		this._tokens = null;
		this._ast = new Node();
		this._cursor = 0;
		this._tokens = tokens;
	}

	parser() {	

		if(this._cursor < this._tokens.length ){
			if(this._tokens[this._cursor].name == ')') return true;
		}
		if(this._cursor < this._tokens.length ){
			if(this._tokens[this._cursor].name == '(') this.parseParenthese();
			if(this._cursor < this._tokens.length){
				if(this._tokens[this._cursor].type == 'NUMBER') this.parseNumber(this._tokens[this._cursor]);
				if(this._cursor < this._tokens.length){
					if(this._tokens[this._cursor].type == 'SYMBOLP1') this.parseSymbolePrioriteS(this._tokens[this._cursor]);
					else if(this._tokens[this._cursor].type == 'SYMBOLP2') this.parseSymbolePrioriteM(this._tokens[this._cursor]);
				}
			}
			
		}
		return true;
	}
	
	parseNumber(element){ 
		//Rempli dans les noeud enfants si le noeud principal est déjà rempli
		if(this._ast.right instanceof Node){
			if( !this._ast.right.isNotNull()){
				this._ast.right.setLeftOrRight(parseFloat(element.name));
				this._cursor += 1;
				return;
			} 
		}
		this._ast.setLeftOrRight(parseFloat(element.name));
		this._cursor += 1;
	}

	parseSymbolePrioriteS(element){
		//Création d'un nouveau parent si le noeud principal est rempli
		if(this._ast.isNotNull()){
			let newNode = new Node();
			newNode.setLeft(this._ast);
			this._ast = newNode;
		}
		this._ast.setOperation(element.name);
		this._cursor += 1;
		this.parser();
	}

	parseSymbolePrioriteM(element){

		//Création d'un noeud enfant si le noeud principal est rempli
		if(this._ast.isNotNull()){
			let rightElement = this._ast.right;
			let newNode = new Node();
			newNode.setLeft(rightElement);
			newNode.setOperation(element.name);
			this._ast.setRight(newNode);
			this._cursor += 1;
			this.parser();
		}
		else{
			this._ast.setOperation(element.name);
			this._cursor += 1;
			this.parser();
		}
	}

	parseParenthese(){

		//Création d'un nouveau parser spécial pour le calcul dans la parenthèse
		let newParse = new Parser(this._tokens);
		newParse._cursor = this._cursor + 1;
		newParse.parser();
		let subNode = newParse._ast;

		//Rempli dans le noeud droit si possible
		if(this._ast.right instanceof Node){
			if(!this._ast.right.isNotNull()){
				this._ast.right.setLeftOrRight(subNode);
			}
		}
		else{
			this._ast.setLeftOrRight(subNode);
		}
		this._cursor = newParse._cursor+1;
		this.parser()
	}

	resolve(){
		return this._ast.getValue();
	}
	
}

module.exports = Parser