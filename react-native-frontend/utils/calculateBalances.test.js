import calculateBalances from './calculateBalances'

describe('test calculateBalances with 1 expense and a group of 3 people', () => {

	let groupData
    
	beforeEach(() => {
		groupData = {
			people: [
				{ id: 'u1' },
				{ id: 'u2' },
				{ id: 'u3' }
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

		const result = calculateBalances(groupData)

		expect(result).toEqual([
			{ debtor: { id: 'u2' }, creditor: { id: 'u1' }, balance: -2000 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u1' }, balance: -2000 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u3' }, balance: 0 },
			{ debtor: { id: 'u2' }, creditor: { id: 'u3' }, balance: 0 }
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

		const result = calculateBalances(groupData)

		expect(result).toEqual([
			{ debtor: { id: 'u2' }, creditor: { id: 'u1' }, balance: -3000 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u1' }, balance: -1000 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u3' }, balance: 0 },
			{ debtor: { id: 'u2' }, creditor: { id: 'u3' }, balance: 0 }
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

		const result = calculateBalances(groupData)

		expect(result).toEqual([
			{ debtor: { id: 'u2' }, creditor: { id: 'u1' }, balance: -1000 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u1' }, balance: -2000 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u3' }, balance: 0 },
			{ debtor: { id: 'u2' }, creditor: { id: 'u3' }, balance: 0 }
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

		const result = calculateBalances(groupData)

		expect(result).toEqual([
			{ debtor: { id: 'u2' }, creditor: { id: 'u1' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u1' }, balance: -1000 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u2' }, balance: -1000 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u3' }, balance: 0 },
			{ debtor: { id: 'u2' }, creditor: { id: 'u3' }, balance: 0 }
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

		const result = calculateBalances(groupData)

		expect(result).toEqual([
			{ debtor: { id: 'u2' }, creditor: { id: 'u1' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u1' }, balance: -2000 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u3' }, balance: 0 },
			{ debtor: { id: 'u2' }, creditor: { id: 'u3' }, balance: 0 }
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

		const result = calculateBalances(groupData)

		expect(result).toEqual([
			{ debtor: { id: 'u2' }, creditor: { id: 'u1' }, balance: -1500 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u1' }, balance: -1500 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u3' }, balance: 0 },
			{ debtor: { id: 'u2' }, creditor: { id: 'u3' }, balance: 0 }
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

		const result = calculateBalances(groupData)

		expect(result).toEqual([
			{ debtor: { id: 'u2' }, creditor: { id: 'u1' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u1' }, balance: -1000 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u2' }, balance: -500 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u3' }, balance: 0 },
			{ debtor: { id: 'u2' }, creditor: { id: 'u3' }, balance: 0 }
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

		const result = calculateBalances(groupData)

		expect(result).toEqual([
			{ debtor: { id: 'u2' }, creditor: { id: 'u1' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u1' }, balance: -1000 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u3' }, balance: 0 },
			{ debtor: { id: 'u2' }, creditor: { id: 'u3' }, balance: 0 }
		])		
	})
})

describe('test calculateBalances with multiple expenses and a group of 3 people', () => {

	let groupData
    
	beforeEach(() => {
		groupData = {
			people: [
				{ id: 'u1' },
				{ id: 'u2' },
				{ id: 'u3' }
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

		const result = calculateBalances(groupData)

		expect(result).toEqual([
			{ debtor: { id: 'u2' }, creditor: { id: 'u1' }, balance: -1000 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u1' }, balance: -3500 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u2' }, balance: -500 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u3' }, balance: 0 },
			{ debtor: { id: 'u2' }, creditor: { id: 'u3' }, balance: 0 }
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

		const result = calculateBalances(groupData)

		expect(result).toEqual([
			{ debtor: { id: 'u2' }, creditor: { id: 'u1' }, balance: -500 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u1' }, balance: -3000 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u2' }, balance: -500 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u3' }, balance: 0 },
			{ debtor: { id: 'u2' }, creditor: { id: 'u3' }, balance: 0 }
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

		const result = calculateBalances(groupData)

		expect(result).toEqual([
			{ debtor: { id: 'u2' }, creditor: { id: 'u1' }, balance: -500 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u1' }, balance: -1000 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u2' }, balance: 0 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u3' }, balance: 0 },
			{ debtor: { id: 'u2' }, creditor: { id: 'u3' }, balance: -500 }
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

		const result = calculateBalances(groupData)

		expect(result).toEqual([
			{ debtor: { id: 'u2' }, creditor: { id: 'u1' }, balance: 0 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u1' }, balance: -1000 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u2' }, balance: -1500 },
			{ debtor: { id: 'u3' }, creditor: { id: 'u2' }, balance: -500 },
			{ debtor: { id: 'u1' }, creditor: { id: 'u3' }, balance: 0 },
			{ debtor: { id: 'u2' }, creditor: { id: 'u3' }, balance: 0 }
		])		
	})
})