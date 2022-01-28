class Token {

	get name () {
		return this._name
	}

	get type() {
		return this._type
	}

	constructor(name, type) {
		this._name = name
		this._type = type
	}

}

module.exports = Token