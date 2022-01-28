const TokenType = require('./TokenType')
const Token = require('./Token')

class Lexer {

	constructor() {
		this._src = ''
		this._cursor = 0
		this._currentWord = ''
		this._tokens = []
	}

	get current() {
		return this._src[this._cursor]
	}

	test(c) {
		if (this.current === c) {
			return true;
		} else {
			return false;
		}
	}

	consume() {
		this._currentWord += this.current
		this._cursor++;
	}

	produce(type) {
		this._tokens.push(new Token(this._currentWord, type))
		this.cleanCurrentWord()
	}

	cleanCurrentWord() {
		this._currentWord = ''
	}

	// digit = 0 | 1 | 2 | 3 ....
	testDigit() {
		if ("0123456789".includes(this.current)) return true;
		return false
	}

	// [0-9]+
	parseNumber() {
		if (!this.testDigit()) return false;
		do {
			this.consume()
		} while (this.testDigit())

		// production of number
		this.produce(TokenType.NUMBER)
		return true
	}

	// symbol = '+' | '-' | '*' | '/' | '%' | '(' | ')'
	testSymbolP1() {
		if ("+-".includes(this.current)) return true;
		return false
	}

	testSymbolP2() {
		if ("*/%".includes(this.current)) return true;
		return false
	}

	testParenthese() {
		if ("()".includes(this.current)) return true;
		return false
	}

	parseSymbolP1() {
		if (this.testSymbolP1()) this.consume()
		else return false

		this.produce(TokenType.SYMBOLP1)
		return true
	}
	parseSymbolP2() {
		if (this.testSymbolP2()) this.consume()
		else return false

		this.produce(TokenType.SYMBOLP2)
		return true
	}

	parseParenthese(){
		if (this.testParenthese()) this.consume()
		else return false

		this.produce(TokenType.PARENTHESE)
		return true
	}

	// space = ' ' | '\t' | '\n' | '\l' | '\r' | '\0'
	testSpace() {
		if (" \t\n\l\r\0".includes(this.current)) return true;
		return false
	}

	avoidSpace() {
		while (this.testSpace()) {
			this.consume()
			this.cleanCurrentWord()
		}

		return this.current != undefined
	}

	// parser = (number | symbol | space)*
	parse(src) {
		this._src = src

		while (this.parseNumber() || this.parseSymbolP1() || this.parseSymbolP2()|| this.parseParenthese() || this.avoidSpace()) {
			// nothing to do, consume already done in functions
		}

		return this._tokens
	}

}

module.exports = Lexer