const form = document.getElementById("my-form"); // uses this getElementById method because we labeled the wrapper
// now i can access the form and all of its elements i.e. form.email, form.password, form.phone, form.fruits
// make sure you have a name attribute on each input element so that you can access it through the form object later
form.addEventListener("submit",  (e) => {
  e.preventDefault(); // prevents the submission as a request to the server (we don't want that, it is weird)
  console.log(e.target.email.value);
  console.log(e.target.password.value);
  console.log(e.target.phone.value);
  console.log(e.target.fruits.value);
  console.log("form was submitted");
});

// use a form element to wrap things. This is a container for things the user fills out.
// buttons inside of a form element will automatically submit the form when clicked, unless you specify the type as 'button'(its default is 'submit')