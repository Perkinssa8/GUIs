// to navigate through all the tags, use the hotkey 'ctrl+d'


document.getElementById("fruits").addEventListener("change", (e) => {
    console.log(e.target.value);
  }); // here, the value is the string/text, but the innerHTML is the text and the value is specified in the tag
  // i.e. user selects 'strawberry', but you could make the return value as '63' or something
  

  // radio buttons must have the same name to be grouped together i.e. name='group 1'
// use the 'checked' attribute to set the default value of the radio button (stands for checked=true)

  const radios = document.getElementsByClassName("radio");
  
// can use radios.forEach(radio => radio.addEventListener("change", () => console.log("Radio was changed")))
// but only if radios is an array, doesn't work for HTMLCollection

  for (const radio of radios) {
    radio.addEventListener("change", () => console.log("Radio was changed"))
  }

  // other getElementsBy methods: getElementsByClassName, getElementsByTagName, getElementsByName, 
  // and getElementById (which returns a single element, not a collection)
  