const calculateTotals = (groupData) => {
	
	let totals = initData(groupData)

	groupData.expenses.map(expense => {
		expense.details.map(expenseItem => {
			totals = totals.map(person => {
				if (person.id === expenseItem.person) {
					return {
						...person,
						totalSpending: person.totalSpending + expenseItem.share,
						balance: person.balance + expenseItem.balance
					}
				} else {
					return person
				}
			})			
		})
	})

	return totals
}

const initData = (groupData) => {
	
	return groupData.people.map(person => {
		return {
			...person,
			totalSpending: 0,
			balance: 0
		}
	})

}

export default calculateTotals