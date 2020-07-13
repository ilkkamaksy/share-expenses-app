import * as Contacts from 'expo-contacts'

const getContactsFromDevice = async () => {
	const { status } = await Contacts.requestPermissionsAsync()
	if (status === 'granted') {
		const { data } = await Contacts.getContactsAsync({
			fields: [Contacts.Fields.Name],
		})

		return data
	}
}

export default {
	getContactsFromDevice
}

