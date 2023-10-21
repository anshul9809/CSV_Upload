document.getElementById("formFile").onchange = function() {
    console.log("i'm trigerred");
    document.getElementById("file-name").innerHTML = this.files[0].name;
  };