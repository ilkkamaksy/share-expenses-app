import calculateTotals from './calculateTotals'

describe('test calculateTotals with 1 expense and a group of 3 people', () => {

	let groupData
    
	beforeEach(() => {
		groupData = {
			people: [
				{ id: 'u1', name: 'person 1' },
				{ id: 'u2', name: 'person 2' },
				{ id: 'u3', name: 'person 3' }
			],
			expenses: []
		}
		
	})

	it('should calculate 1 expense with 1 payers correctly - case 1', () => {

		groupData = {
			...groupData,
			expenses: groupData.expenses.concat({
				amount: 6000,
				details: [
					{ person: 'u1', share: 2000, paid: 6000, balance: 4000 },
					{ person: 'u2', share: 2000, paid: 0, balance: -2000 },
					{ person: 'u3', share: 2000, paid: 0, balance: -2000 }
				]
			})
		}

		const result = calculateTotals(groupData)

		expect(result).toEqual([
			{ id: 'u1', name: 'person 1', totalSpending: 2000, balance: 4000 },
			{ id: 'u2', name: 'person 2', totalSpending: 2000, balance: -2000 },
			{ id: 'u3', name: 'person 3', totalSpending: 2000, balance: -2000 },
		])		
	})

	it('should calculate 1 expense with 1 payers correctly - case 2', () => {

		groupData = {
			...groupData,
			expenses: groupData.expenses.concat({
				amount: 6000,
				details: [
					{ person: 'u1', share: 2000, paid: 6000, balance: 4000 },
					{ person: 'u2', share: 3000, paid: 0, balance: -3000 },
					{ person: 'u3', share: 1000, paid: 0, balance: -1000 }
				]
			})
		}

		const result = calculateTotals(groupData)

		expect(result).toEqual([
			{ id: 'u1', name: 'person 1', totalSpending: 2000, balance: 4000 },
			{ id: 'u2', name: 'person 2', totalSpending: 3000, balance: -3000 },
			{ id: 'u3', name: 'person 3', totalSpending: 1000, balance: -1000 },
		])		
	})

	it('should calculate 1 expense with 2 payers correctly - case 1', () => {

		groupData = {
			...groupData,
			expenses: groupData.expenses.concat({
				amount: 6000,
				details: [
					{ person: 'u1', share: 2000, paid: 5000, balance: 3000 },
					{ person: 'u2', share: 2000, paid: 1000, balance: -1000 },
					{ person: 'u3', share: 2000, paid: 0, balance: -2000 }
				]
			})
		}

		const result = calculateTotals(groupData)

		expect(result).toEqual([
			{ id: 'u1', name: 'person 1', totalSpending: 2000, balance: 3000 },
			{ id: 'u2', name: 'person 2', totalSpending: 2000, balance: -1000 },
			{ id: 'u3', name: 'person 3', totalSpending: 2000, balance: -2000 },
		])		
	})

	it('should calculate 1 expense with 2 payers correctly - case 2', () => {

		groupData = {
			...groupData,
			expenses: groupData.expenses.concat({
				amount: 6000,
				details: [
					{ person: 'u1', share: 2000, paid: 3000, balance: 1000 },
					{ person: 'u2', share: 2000, paid: 3000, balance: 1000 },
					{ person: 'u3', share: 2000, paid: 0, balance: -2000 }
				]
			})
		}

		const result = calculateTotals(groupData)

		expect(result).toEqual([
			{ id: 'u1', name: 'person 1', totalSpending: 2000, balance: 1000 },
			{ id: 'u2', name: 'person 2', totalSpending: 2000, balance: 1000 },
			{ id: 'u3', name: 'person 3', totalSpending: 2000, balance: -2000 },
		])		
	})
	
	it('should calculate 1 expense with 2 payers correctly - case 3', () => {

		groupData = {
			...groupData,
			expenses: groupData.expenses.concat({
				amount: 6000,
				details: [
					{ person: 'u1', share: 2000, paid: 4000, balance: 2000 },
					{ person: 'u2', share: 2000, paid: 2000, balance: 0 },
					{ person: 'u3', share: 2000, paid: 0, balance: -2000 }
				]
			})
		}

		const result = calculateTotals(groupData)

		expect(result).toEqual([
			{ id: 'u1', name: 'person 1', totalSpending: 2000, balance: 2000 },
			{ id: 'u2', name: 'person 2', totalSpending: 2000, balance: 0 },
			{ id: 'u3', name: 'person 3', totalSpending: 2000, balance: -2000 },
		])		
	})

	it('should calculate 1 expense with 3 payers correctly - case 1', () => {

		groupData = {
			...groupData,
			expenses: groupData.expenses.concat({
				amount: 6000,
				details: [
					{ person: 'u1', share: 2000, paid: 5000, balance: 3000 },
					{ person: 'u2', share: 2000, paid: 500, balance: -1500 },
					{ person: 'u3', share: 2000, paid: 500, balance: -1500 }
				]
			})
		}

		const result = calculateTotals(groupData)

		expect(result).toEqual([
			{ id: 'u1', name: 'person 1', totalSpending: 2000, balance: 3000 },
			{ id: 'u2', name: 'person 2', totalSpending: 2000, balance: -1500 },
			{ id: 'u3', name: 'person 3', totalSpending: 2000, balance: -1500 },
		])		
	})

	it('should calculate 1 expense with 3 payers correctly - case 2', () => {

		groupData = {
			...groupData,
			expenses: groupData.expenses.concat({
				amount: 6000,
				details: [
					{ person: 'u1', share: 2000, paid: 3000, balance: 1000 },
					{ person: 'u2', share: 2000, paid: 2500, balance: 500 },
					{ person: 'u3', share: 2000, paid: 500, balance: -1500 }
				]
			})
		}

		const result = calculateTotals(groupData)

		expect(result).toEqual([
			{ id: 'u1', name: 'person 1', totalSpending: 2000, balance: 1000 },
			{ id: 'u2', name: 'person 2', totalSpending: 2000, balance: 500 },
			{ id: 'u3', name: 'person 3', totalSpending: 2000, balance: -1500 },
		])		
	})

	it('should calculate 1 expense with 3 payers correctly - case 3', () => {

		groupData = {
			...groupData,
			expenses: groupData.expenses.concat({
				amount: 6000,
				details: [
					{ person: 'u1', share: 2000, paid: 3000, balance: 1000 },
					{ person: 'u2', share: 2000, paid: 2000, balance: 0 },
					{ person: 'u3', share: 2000, paid: 1000, balance: -1000 }
				]
			})
		}

		const result = calculateTotals(groupData)

		expect(result).toEqual([
			{ id: 'u1', name: 'person 1', totalSpending: 2000, balance: 1000 },
			{ id: 'u2', name: 'person 2', totalSpending: 2000, balance: 0 },
			{ id: 'u3', name: 'person 3', totalSpending: 2000, balance: -1000 },
		])		
	})
})

describe('test calculateTotals with multiple expenses and a group of 3 people', () => {

	let groupData
    
	beforeEach(() => {
		groupData = {
			people: [
				{ id: 'u1', name: 'person 1' },
				{ id: 'u2', name: 'person 2' },
				{ id: 'u3', name: 'person 3' }
			],
			expenses: []
		}
		
	})

	it('should calculate 2 expenses correctly', () => {

		groupData = {
			...groupData,
			expenses: [
				{
					amount: 6000,
					details: [
						{ person: 'u1', share: 2000, paid: 5000, balance: 3000 },
						{ person: 'u2', share: 2000, paid: 1000, balance: -1000 },
						{ person: 'u3', share: 2000, paid: 0, balance: -2000 }
					]
				},
				{
					amount: 6000,
					details: [
						{ person: 'u1', share: 2000, paid: 3500, balance: 1500 },
						{ person: 'u2', share: 2000, paid: 2500, balance: 500 },
						{ person: 'u3', share: 2000, paid: 0, balance: -2000 }
					]
				},
			]
		}

		const result = calculateTotals(groupData)

		expect(result).toEqual([
			{ id: 'u1', name: 'person 1', totalSpending: 4000, balance: 4500 },
			{ id: 'u2', name: 'person 2', totalSpending: 4000, balance: -500 },
			{ id: 'u3', name: 'person 3', totalSpending: 4000, balance: -4000 },
		])		
	})

	it('should calculate 3 expenses correctly', () => {

		groupData = {
			...groupData,
			expenses: [
				{
					amount: 6000,
					details: [
						{ person: 'u1', share: 2000, paid: 5000, balance: 3000 },
						{ person: 'u2', share: 2000, paid: 1000, balance: -1000 },
						{ person: 'u3', share: 2000, paid: 0, balance: -2000 }
					]
				},
				{
					amount: 6000,
					details: [
						{ person: 'u1', share: 2000, paid: 3500, balance: 1500 },
						{ person: 'u2', share: 2000, paid: 2500, balance: 500 },
						{ person: 'u3', share: 2000, paid: 0, balance: -2000 }
					]
				},
				{
					amount: 6000,
					details: [
						{ person: 'u1', share: 2000, paid: 1000, balance: -1000 },
						{ person: 'u2', share: 2000, paid: 2500, balance: 500 },
						{ person: 'u3', share: 2000, paid: 2500, balance: 500 }
					]
				},
			]
		}

		const result = calculateTotals(groupData)

		expect(result).toEqual([
			{ id: 'u1', name: 'person 1', totalSpending: 6000, balance: 3500 },
			{ id: 'u2', name: 'person 2', totalSpending: 6000, balance: 0 },
			{ id: 'u3', name: 'person 3', totalSpending: 6000, balance: -3500 },
		])		
	})

	it('should calculate 4 expenses correctly', () => {

		groupData = {
			...groupData,
			expenses: [
				{
					amount: 6000,
					details: [
						{ person: 'u1', share: 2000, paid: 5000, balance: 3000 },
						{ person: 'u2', share: 2000, paid: 1000, balance: -1000 },
						{ person: 'u3', share: 2000, paid: 0, balance: -2000 }
					]
				},
				{
					amount: 6000,
					details: [
						{ person: 'u1', share: 2000, paid: 3500, balance: 1500 },
						{ person: 'u2', share: 2000, paid: 2500, balance: 500 },
						{ person: 'u3', share: 2000, paid: 0, balance: -2000 }
					]
				},
				{
					amount: 6000,
					details: [
						{ person: 'u1', share: 2000, paid: 1000, balance: -1000 },
						{ person: 'u2', share: 2000, paid: 2500, balance: 500 },
						{ person: 'u3', share: 2000, paid: 2500, balance: 500 }
					]
				},
				{
					amount: 6000,
					details: [
						{ person: 'u1', share: 2000, paid: 0, balance: -2000 },
						{ person: 'u2', share: 2000, paid: 1000, balance: -1000 },
						{ person: 'u3', share: 2000, paid: 5000, balance: 3000 }
					]
				},
			]
		}

		const result = calculateTotals(groupData)

		expect(result).toEqual([
			{ id: 'u1', name: 'person 1', totalSpending: 8000, balance: 1500 },
			{ id: 'u2', name: 'person 2', totalSpending: 8000, balance: -1000 },
			{ id: 'u3', name: 'person 3', totalSpending: 8000, balance: -500 },
		])		
	})
	
	it('should calculate 5 expenses correctly', () => {

		groupData = {
			...groupData,
			expenses: [
				{
					amount: 6000,
					details: [
						{ person: 'u1', share: 2000, paid: 5000, balance: 3000 },
						{ person: 'u2', share: 2000, paid: 1000, balance: -1000 },
						{ person: 'u3', share: 2000, paid: 0, balance: -2000 }
					]
				},
				{
					amount: 6000,
					details: [
						{ person: 'u1', share: 2000, paid: 3500, balance: 1500 },
						{ person: 'u2', share: 2000, paid: 2500, balance: 500 },
						{ person: 'u3', share: 2000, paid: 0, balance: -2000 }
					]
				},
				{
					amount: 6000,
					details: [
						{ person: 'u1', share: 2000, paid: 1000, balance: -1000 },
						{ person: 'u2', share: 2000, paid: 2500, balance: 500 },
						{ person: 'u3', share: 2000, paid: 2500, balance: 500 }
					]
				},
				{
					amount: 6000,
					details: [
						{ person: 'u1', share: 2000, paid: 0, balance: -2000 },
						{ person: 'u2', share: 2000, paid: 1000, balance: -1000 },
						{ person: 'u3', share: 2000, paid: 5000, balance: 3000 }
					]
				},
				{
					amount: 6000,
					details: [
						{ person: 'u1', share: 2000, paid: 0, balance: -2000 },
						{ person: 'u2', share: 2000, paid: 5000, balance: 3000 },
						{ person: 'u3', share: 2000, paid: 1000, balance: -1000 }
					]
				},
			]
		}

		const result = calculateTotals(groupData)

		expect(result).toEqual([
			{ id: 'u1', name: 'person 1', totalSpending: 10000, balance: -500 },
			{ id: 'u2', name: 'person 2', totalSpending: 10000, balance: 2000 },
			{ id: 'u3', name: 'person 3', totalSpending: 10000, balance: -1500 },
		])		
	})
})