// Additional JS functions here
window.fbAsyncInit = function() {
	FB.init({
		appId      : '394113410672123', // App ID
		channelUrl : '//localhost:5000/channel.html', // Channel File
		status     : true, // check login status
		cookie     : true, // enable cookies to allow the server to access the session
		xfbml      : true  // parse XFBML
	});
	// Additional init code here
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
		//	connected
		//      testAPI();
	        document.getElementById('fb-logout').style.display = 'block';
		//      alert('WE are connected');
		} else if (response.status === 'not_authorized') {
		//	not_authorized
	        login();
		} else {
		        alert('WE are not logged in');   // not_logged_in
		        login();
		        document.getElementById('fb-logout').style.display = 'block';
  		}
	});
};

$(document).ready(function(){
	var theChosenFriend = '';
	$('#gameForm').ready(function(){
		$('#gameForm').hide();
	});
	$('#theChosenOne').ready(function(){
		$('#theChosenOne').hide();
	});
});

/*if(typeof jQuery == 'undefined'){
        alert("jQuery not loaded");
}else{
        alert("jQuery loaded");
}*/

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
    });
}
function logout() {
    FB.logout(function(response) {
        console.log('User is now logged out');
    });
}
function login() {
  FB.login(function(response) {
      if (response.authResponse) {
          // connected
              testAPI();
      } else {
          // cancelled
      }
  });
}
// Load the SDK Asynchronously
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
 }(document));
var friendsObj = new Array();

function getFriends(){
        FB.api('/me/friends', function(response){
                friendsObj = new Array();
                for (var i =0; i < response.data.length;i++){
                        friendsObj.push(response.data[i]);
                }
        });
};

function randFriend(){
	return friendsObj[Math.floor(Math.random()*friendsObj.length)];
};

//var csrftoken = $.cookie('csrftoken');
// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
function sameOrigin(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
            // Send the token to same-origin, relative URLs only.
            // Send the token only if the method warrants CSRF protection
            // Using the CSRFToken value acquired earlier
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

$(document).ready(function(){
	var result = '';
	var test = '';
	$('#gameForm').submit(function(event){		
		event.preventDefault();
		$("select option:selected").each(function(){
			test = $(this).text()
			if($(this).text() == theChosenFriend.name){
				result = 'pass';
			}else{
				result = 'fail';
			}
		});
		alert(result + ' '+ test + ' ' + theChosenFriend.name);
		$.ajax({
        	url: "/friendID/allFriends.html",
		type: 'POST',
		data: {
			'result':result
		},
		success: function(results) {
    			alert(results);
		}
		});
		return false;
	});
});

/*	$.ajax(
		type:"POST",
		url: "http://127.0.0.1:5000/friendID/allFriends.html",
		dataType: 'json',
		data: {result:result},
	);*/
/*	$.getJSON('http://127.0.0.1:5000/friendID/process.html', {result: result}, function(data ){
		alert(data);
		console.log(data);
	})
.success(function() {console.log('second success'); alert("second success"); })
.error(function() { alert("error"); })
.complete(function() { alert("complete"); });*/
function myGame(){
	$(document).ready(function(){
		$('#gameForm').show();
	});
	//choose 4 random friends
	var optionFriends = new Array();
		if(friendsObj.length > 3){
			for(var i=0;i<4;i++){
				var item = this.randFriend();
				//ensure unique elements
				while(optionFriends.indexOf(item)>=0){
					var item = this.randFriend();
				}
				optionFriends.push(item);
			}
			if(optionFriends.length ==4){
				for(var is=0;is<4;is++){
					console.log(optionFriends[is]);
				}
				//continue
				//Display profile pic of one of them
				theChosenFriend = optionFriends[Math.floor(Math.random()*optionFriends.length)];
				console.log(theChosenFriend);
				$('#theChosenOne').text(theChosenFriend.name)
				var call = '/' + theChosenFriend.id + '/picture?width=200&height=200';
				FB.api(call,function(response){
					var picHolder = document.getElementById('profilePic');
					console.log(response.data);
					picHolder.src = response.data.url;
				});
				var select = document.getElementById('picOptions');
				for (var ise=0;ise<optionFriends.length;ise++){
					select.options.add(new Option(optionFriends[ise].name,ise));
				}
			}else{
				return false;
			}
		}else{
			//Print error message that you have no friends and to 
			//try to update your friends list with the convenient button.
			alert("You cannot play the game now because you do not have enough friends.\nPlease update your" +
			"friendslist with the convenient button and try again later");
			return false;
		}
	//create and display radio buttons for all of the 4 choices.
	//process form submission and check the user's response.
};

function dispFriends(){
        if(friendsObj.length > 0){
                for(var i = 0; i<friendsObj.length;i++){
                        console.log(friendsObj[i]);
                }
        }else{
                console.log("Friends List is empty");
        }
};
