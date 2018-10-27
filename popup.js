let buttonSearch = document.getElementById('button-search');
let inputSearch = document.getElementById('input-search');

buttonSearch.onclick = function(element) {

  var search_term = encodeURIComponent(inputSearch.value).replace(/%20/g, "+");
  $.get("https://simoncorreaocampo.000webhostapp.com/fetch.php?search_term="+search_term, function(data){
    $("#yt-hack-cont").append(data);
    RenderYoutubeVideos(data);
  });

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code:
        'console.log("'+search_term+'");'
      }
    );
  });
};

function RenderYoutubeVideos(data){
  $("#yt-hack-cont").append(data);
  var videosCont = $("#yt-videos");
  $("#yt-hack-cont").find(".yt-thumb-simple").each(function(i, e){
    if (i <= 10){
      var yt_id = $(this).parent().parent().prop("href").split("/watch?v=")[1];
      videosCont.append('<div class="video-cont"><iframe width="560" height="315" src="https://www.youtube.com/embed/'+yt_id+'" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><button type="button" class="ext-button" id="btn-'+yt_id+'"><img src="images/ext.png"></button></div>');
      document.getElementById('btn-'+yt_id).onclick = function(){
        ExtendVideo(this);
      }
    }
  });
  $("#yt-hack-cont").empty();
}

function ExtendVideo(e){
  var id = $(e).prop("id");
  var videoCont = $(e).parent();

  videoCont.find("iframe")[0].width = "300";
  videoCont.find("iframe")[0].height = "200";
  videoCont.find("#"+id).css({"display": "none"});

  var remove_action = 'var el = this.parentNode;el.parentNode.removeChild(el);';
  var remove_all_actions = 'var paras = document.getElementsByClassName("yt-frame-pewgin");while(paras[0]){paras[0].parentNode.removeChild(paras[0])}';

  var html = '<div id="yt-frame-'+id+'" class="yt-frame-pewgin" style="position: fixed; top: 100px; right: 40px; width: 300px; height: 200px;">'+videoCont.html()+'<button type="button" onclick="'+remove_action+'" style="position: absolute; top: -20px; left: -20px; width: 30px; height: 30px;">X</button></div>'

  videoCont.find("iframe")[0].width = "560";
  videoCont.find("iframe")[0].height = "315";
  videoCont.find("#btn-"+id).css({"display": "inline-block"});

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: remove_all_actions+"document.body.innerHTML += '"+html+"';"});
    });
}
//Unsubscribe from this channel
//count = document.getElementById("subscriber-count");count.innerHTML = "99,043,976 subscribers";
