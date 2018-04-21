//All the channels stored in a variable
var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx",
  "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "RealKraftyy?","user_to_test"
];

//Api Call via bypass
var apiSegmentOne = "https://wind-bow.glitch.me/twitch-api/streams/";

//Freecodecamp api call
var freecodecampChecker = apiSegmentOne + channels[3];
$.getJSON(freecodecampChecker, function(data) {
  var streamStatus = data.stream;
  if (streamStatus === null) {
    console.log("Aint Wrking");
  } else {
    $(".fa-times-circle").css("color", "green"); // Correct method to change color of Css
  }
});

//Running for each itteration, this helped me to run the function channel by channel.
//https://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
function individualIteration(i) {
  return function() {};
}
$(document).ready(function() {
  for (var i = 0; i < channels.length; i++) {
    var apiSegmentTwo = apiSegmentOne + channels[i];
    $.getJSON(apiSegmentTwo, function(data) {
      var error = data.error;
      console.log(error);
      var intitalData = data.stream;
      // console.log(intitalData);
      var test = data._links.channel;
      var convertedUserName = test.split("/").pop();
      if (intitalData === null) {
        var spaceHolder = ' ';
        var info = data.stream;
        var gameName = "N/A..... offline";
        let status = "N/A..... offline";
        let viewers = "N/A..... offline";
        let logo = "N/A..... offline";
        let channelAddress = "N/A..... offline";
        //This writes the information to a card... I know that there is an easier way but I dont know it yet.
        $(".tab-main-content").append(
          `<div class='offline'>
            <button class="accordion" data-channel=${convertedUserName} data-collapse="closed">
              <i class="fa fa-window-close" aria-hidden="true"></i> ${convertedUserName} is offline.
            </button>
            <panel class="panel">
              <div class="container py-3">
                <div class="card">
                  <div class="row">
                    <div class="col-md-4">
                      <img src="https://farm5.staticflickr.com/4675/24807227997_48796d28ea.jpg">
                    </div>
                <div class="col-md-8">
                  <div class="card-block px-3">
                    <p>
                      Game Name: ${gameName}<br>
                      Current Game Status: ${status}<br>
                      Live Viewers: ${viewers}<br>
                      <a target="_blank" href="https://www.twitch.tv/${convertedUserName}">Link to Twitch channel <i class="fa fa-external-link" aria-hidden="true"></i></a>
                    </p>
                  </div>
                </div>
              </div>
            </panel>
          </div>`
        );
       }else{
        var user = data.stream.channel.display_name;
        var info = data.stream;
        var gameName = data.stream.channel.game;
        let status = data.stream.channel.status;
        let viewers = data.stream.viewers;
        let logo = data.stream.channel.logo;
        let channelAddress = data.stream.channel.url;
        //This writes the information to a card... I know that there is an easier way but I dont know it yet.
        $(".tab-main-content").append(
          `<div class="online">
            <button class="accordion" data-channel=${convertedUserName} data-collapse="closed">
             <i class="fa fa-television" aria-hidden="true"></i> ${convertedUserName}  is online.
             </button>
             <panel class="panel">
              <div class="container py-3">
                <div class="card">
                  <div class="row">
                    <div class="col-md-4">
                      <img src="${logo}">
                    </div>
                <div class="col-md-8">
              <div class="card-block px-3">
                <p>
                Game Name: ${gameName}<br>
                Current Game Status: ${status}<br>
                Live Viewers: ${viewers}<br>
                <a target="_blank" href="https://www.twitch.tv/${convertedUserName}">Link to Twitch channel <i class="fa fa-external-link" aria-hidden="true"></i></a>
              </p>
            </div>
          </div>
        </div>
      </panel>
    </div>`);
      }
    });
  }
});

//Click functions that make the Accordians
$(document.body).on("click", "button", function(event) {
      this.classList.toggle("active");
        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
})

//Toggle for all the channels, online channnels and offline channels
//When you click online it hides offline and shows online
$('#onlinetab').click(function(){
  $('.offline').hide();
  $('.online').show();
});
//When you click offline it hides online and shows offline
$('#offlinetab').click(function(){
  $('.online').hide();
  $('.offline').show();
});
//When you click all channels it shows both online and offline
$('#all-channels').click(function(){
  $('.online').show();
  $('.offline').show();
});
