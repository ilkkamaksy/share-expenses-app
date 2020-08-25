let APIURL = process.env.APIURL

if ( process.env.NODE_ENV === 'dev') {
	APIURL = process.env.DEV_APIURL
}

export default APIURL
