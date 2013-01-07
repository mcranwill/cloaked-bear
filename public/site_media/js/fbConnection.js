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

if(typeof jQuery == 'undefined'){
        alert("jQuery not loaded");
}else{
        alert("jQuery loaded");
}

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

function dispFriends(){
        if(friendsObj.length > 0){
                for(var i = 0; i<friendsObj.length;i++){
                        console.log(friendsObj[i]);
                }
        }else{
                console.log("Friends List is empty");
        }
};
