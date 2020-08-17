export default function (string) {
	return string
		.toString() // Cast to string
		.toLowerCase() // Convert the string to lowercase letters
		.trim() // Remove whitespace from both sides of a string
		.replace(/\s/g, '-') // Replace each space with -
		.replace(
			/[^\w\-\u00b4\u00C0-\u00C4\u00c7\u00C9-\u00CA\u00CD\u00D3-\u00D6\u00DA\u00DC\u00E0-\u00E4\u00E7\u00E9-\u00EA\u00ED\u00F3-\u00F6\u00FA\u00FC]+/g,
			'',
		); // Removes all chars that aren't words, -, ´ or some latin characters (À Á Â Ã Ç É Ê Í Ó Ô Õ Ú à á â ã ç é ê í ó ô õ ú)
}
