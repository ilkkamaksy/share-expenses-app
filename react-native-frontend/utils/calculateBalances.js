const calculateBalances = (groupData) => {
	
	let groupBalanceData = initData(groupData) 

	groupData.expenses.map(expense => {
			
		const creditors = expense.details.filter(expenseItem => expenseItem.balance > 0)
			
		expense.details.map(expenseItem => {
				
			if (expenseItem.balance < 0) {
					
				creditors.forEach(creditor => {
						
					const debtorBalanceData = findDataItemByCreditorAndDebtor(groupBalanceData, creditor.person, expenseItem.person)
					const creditorReference = findDataItemByCreditorAndDebtor(groupBalanceData, expenseItem.person, creditor.person)

					let balance = debtorBalanceData.balance - Math.min(Math.abs(creditor.balance), Math.abs(expenseItem.balance))

					// if creditor is in debt to current debtor, update creditor balance in reference field
					if (creditorReference.balance < 0 && balance < 0) {
							
						groupBalanceData = groupBalanceData.map(dataItem => 
							dataItem.creditor.id === creditorReference.creditor.id && dataItem.debtor.id === creditorReference.debtor.id 
								? updateBalanceDataItem(dataItem, dataItem.balance - balance) 
								: dataItem
						)

						balance = balance - creditorReference.balance
					}

					groupBalanceData = groupBalanceData.map(dataItem => 
						dataItem.debtor.id === debtorBalanceData.debtor.id && dataItem.creditor.id === debtorBalanceData.creditor.id 
							? updateBalanceDataItem(debtorBalanceData, balance)
							: dataItem
					)
				})
					
			}
		})
	}) 

	return groupBalanceData
}

const initData = (group) => {
		
	let initialData = [] 
	
	group.people.map(creditor => {	
		let temp = []		
		group.people.forEach(debtor => {
			if (debtor.id === creditor.id) {
				return
			}

			temp = [...temp, {
				debtor,
				creditor,
				balance: 0,
			}]
			
		})
		initialData = [...initialData, ...temp]
	})

	return initialData
}

const findDataItemByCreditorAndDebtor = (balanceData, creditorId, debtorId) => {
	return balanceData.find(balanceDataItem => 
		balanceDataItem.debtor.id === debtorId 
		&& balanceDataItem.creditor.id === creditorId)
}

const updateBalanceDataItem = (balanceDataItem, balance) => {
	return {
		...balanceDataItem,
		balance: Math.min(balance, 0)
	}
}

export default calculateBalances