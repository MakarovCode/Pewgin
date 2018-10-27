chrome.runtime.sendMessage({"message": "activate_icon"});

window.onload = function(){
  console.log("Let's do this everybody!");
  var url = window.location.href.split("/")[4];
  var button = document.getElementsByClassName("ytd-subscribe-button-renderer")[0];
  if (button == null){
    CheckAge();
    return;
  }
  var status = button.getAttribute("subscribed");


  if ((url=="UC-lHJZR3Gqxm24_Vd_AJ5Yw" || url=="PewDiePie") && status == null){
    console.log("2");
    button.click();
  }
  else if (window.location.href.indexOf("www.youtube.com") != -1 && (url !="UC-lHJZR3Gqxm24_Vd_AJ5Yw" || url !="PewDiePie")){
    console.log("1");
    CheckAge();
  }
  else if (window.location.href.indexOf("www.youtube.com") != -1){
    console.log("3");
    var owner = document.querySelector("#owner-name>a");
    if (owner == null){
      CheckAge();
      return;
    }
    if (owner.innerHTML == "PewDiePie" && status == null){
      button.click();
    }
    else{
      CheckAge();
    }
  }
}

function CheckAge(){
  var isNineYearsOld = localStorage.getItem("is-9-years-old");

  if (isNineYearsOld == null || isNineYearsOld == "null"){
    localStorage.setItem("is-9-years-old", true);
    window.location.href = "https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw";
  }
}
