class Auth {
	constructor() {
		this.token = null
	}
    
	setToken(newToken) {
		this.token = `bearer ${newToken}`
	}
    
	getToken() {
		return this.token
	}
}

const auth = new Auth()

export default auth