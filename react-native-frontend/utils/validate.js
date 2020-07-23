export const emailValidator = (email = '') => {
	const re = /\S+@\S+\.\S+/
  
	if (!email || email.length <= 0) return 'Email cannot be empty.'
	if (!re.test(email)) return 'Ooops! We need a valid email address.'
  
	return ''
}
  
export const passwordValidator = (password = '') => {
	if (!password || password.length <= 0) return 'Password cannot be empty.'
	if (password.length < 4) return 'Password has to contain at least 4 characters.'
  
	return ''
}
  