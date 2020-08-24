export const emailValidator = (email = '') => {
	const re = /\S+@\S+\.\S+/
  
	if (!email || email.length <= 0) return false
	if (!re.test(email)) return false
  
	return true
}
  
export const passwordValidator = (password = '') => {
	if (!password || password.length < 4) return false

	return true
}
  