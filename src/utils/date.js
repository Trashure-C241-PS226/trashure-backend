function dateID() {
    const date = new Date();
	const formattedDate = date.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }).replace(/\s+/g, '').replace(/\//g, '-');

	return formattedDate;
}

export { dateID };
