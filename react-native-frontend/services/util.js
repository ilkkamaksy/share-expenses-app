class Util {
	constructor() {
		this.token = null
	}
    
	setToken(newToken) {
		this.token = `bearer ${newToken}`
	}
}

const util = new Util()

export default util