const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];
const selectedlinkbutton1 = document.getElementById('link-button1');
const selectedlinkbutton2 = document.getElementById('link-button2');
const selectedlinkbutton3 = document.getElementById('link-button3');
const selectedlinkbutton4 = document.getElementById('link-button4');
const selectedlinkbutton5 = document.getElementById('link-button5');
toggleButton.addEventListener('click', () => {
	navbarLinks.classList.toggle('active');
	console.log('clicked menu button');
});
selectedlinkbutton1.addEventListener('click', () => {
	navbarLinks.classList.toggle('active');
	console.log('option1 chosed');
});
selectedlinkbutton2.addEventListener('click', () => {
	navbarLinks.classList.toggle('active');
	console.log('option2 chosed');
});
selectedlinkbutton3.addEventListener('click', () => {
	navbarLinks.classList.toggle('active');
	console.log('option3 chosed');
});
selectedlinkbutton4.addEventListener('click', () => {
	navbarLinks.classList.toggle('active');
	console.log('option4 chosed');
});
selectedlinkbutton5.addEventListener('click', () => {
	navbarLinks.classList.toggle('active');
	console.log('option5 chosed');
});
