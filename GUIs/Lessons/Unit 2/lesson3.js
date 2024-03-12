const input = document.getElementById("email-input");


input.addEventListener('blur', (event) => {
  console.log('blur event fired');
  const emailAdress = input.value;
  const errorDiv = document.getElementById("error-message");
  if (!emailAdress.includes('@')) {
    errorDiv.innerHTML = "Invalid email address";
  } else {
    errorDiv.innerHTML = "";
  }
});
// will say the email is invlaid if it does not contain an '@' symbol
// click on box, then click outside of box, console will show the text

//Event object will tell you about the event that just happened, changes occurred, etc.
input.addEventListener('input', (e) => { // e always stands for event
  console.log(e);
  const emailAdress = e.target.value; // can remain as input.value
  const errorDiv = document.getElementById("error-message");
  if (!emailAdress.includes('@')) {
    errorDiv.innerHTML = "Invalid email address";
  } else {
    errorDiv.innerHTML = "";
  }
});
