export const compareDateDescending = (a, b) => {
		
	const dateA = a.dateTime.valueOf()
	const dateB = b.dateTime.valueOf()
    
	if (dateA < dateB) {
		return 1
	}
	if (dateA > dateB) {
		return -1
	}
    
	return 0
}

export const compareDateAscending = (a, b) => {
		
	const dateA = a.dateTime.valueOf()
	const dateB = b.dateTime.valueOf()
    
	if (dateA < dateB) {
		return -1
	}
	if (dateA > dateB) {
		return 1
	}
    
	return 0
}

export const compareDescriptionAscending = (a, b) => {
	
	if (a.description < b.description) {
		return -1
	}
	if (a.description > b.description) {
		return 1
	}
    
	return 0
}
