let users = ["p4ntz", "OgamingSC2", "slayerage", "freecodecamp", "timmac", "habathcx", "RobotCaleb", "clintstevens"];
let offline = [];
let numUsers = users.length;
let counter = 0;

function getOfflineUsers() {
  //with this code it logs offline channels multiple times, which requires a workaround. I can't figure out why this is. If we push the offline users into the empty arrays one at a time, why would console.log(data) return multiple objects of the same channel? My only guess is that it's because we are dealing with live information and not strings.
    offline.forEach(function(channel) {
    $.getJSON("https://wind-bow.glitch.me/twitch-api/channels/" + channel + "?callback=?", function(data) {

      var logo;
      var link = data.url;

      if (data.logo !== null) {
        logo = data.logo;
      }
    
    $("#streamList").append("<li><img src='" + logo + "'> <a href='" + link + "'>" + data.name + "</a> is offline</li>");
    });
  });
}

users.forEach(function(channel) {
  $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + channel + "?callback=?", function(data) {

    var index = users.indexOf(channel);

    // console.log(index);
    console.log(data);

    if (data.stream === null) {
      offline.push(users.splice(index, 1));
      // console.log(channel);
      // console.log(users);
    } else {

      var logo;
      var link = data.stream.channel.url;

      if (data.stream.channel.logo !== null) {
        logo = data.stream.channel.logo;
      }

      $("#streamList").append("<li><img src='" + logo + "'> <a href='" + link + "'>" + data.stream.channel.display_name + "</a> is online!</li>");
    }
    counter++;
    if (counter == numUsers) {
      getOfflineUsers();     
    }
  });
});