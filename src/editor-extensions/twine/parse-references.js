export default text => {
	console.log('Reference parser', text);
	return text.match(/--.*?--/g) || [];
};
