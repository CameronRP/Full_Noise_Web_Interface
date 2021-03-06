var user = {};

user.logout = function() {
  localStorage.removeItem('userData');
  localStorage.removeItem('JWT');
  window.location.reload(false);
}

user.login = function(passwordElement, usernameElement) {
  var password = document.getElementById('inputPassword').value;
  var username = document.getElementById('inputUsername').value;

  $.ajax({
    url: api + '/authenticate_user',
    type: 'post',
    data: "password=" + password + "&username=" + username,
    success: function(res) {
      localStorage.setItem('JWT', res.token);
      localStorage.setItem('userData', JSON.stringify(res.userData));
      window.location.assign("/user_home");
    },
    error: function(res) {
      document.getElementById('inputUsername').value = '';
      document.getElementById('inputPassword').value = '';
      var messages = JSON.parse(res.responseText).messages.join('.');
      console.log(messages);
      window.alert(messages);
      document.getElementById('messages').innerHTML = messages;
    }
  });
}

user.register = function(passEle1, passEle2, usernameEle) {

  // Check that username and password are valid.
  if (passEle1.value != passEle2.value) {
    passEle1.value = "";
    passEle2.value = "";
    window.alert("Passwords don't match.");
    return;
  }
  if (passEle1.value.length < 5) {
    passEle1.value = "";
    passEle2.value = "";
    window.alert("Password not long enough.");
    return;
  }

  if (usernameEle.value.length < 5) {
    passEle1.value = "";
    passEle2.value = "";
    window.alert("Username not long enough.");
    return;
  }
  $.ajax({
    url: api + '/api/v1/Users',
    type: 'post',
    data: "password=" + password.value + "&username=" + username.value,
    success: function() {
      localStorage.setItem('userData', JSON.stringify(res.userData));
      localStorage.setItem('JWT', res.token);
      window.location.assign("/user_home");
    },
    error: function() {
      console.log("Error");
      console.log(res);
    }
  });
}

user.getData = function() {
  if (user.isLoggedIn())
    return JSON.parse(localStorage.getItem('userData'));
  else
    return null;
}

user.get = function(field) {
  if (user.isLoggedIn() == false)
    return null;
  else
    return user.getData()[field]
}

user.isLoggedIn = function() {
  if (JSON.parse(localStorage.getItem('userData')))
    return true;
  else
    return false;
}

// Returns the JSON Web Token
user.getJWT = function() {
  return localStorage.getItem('JWT');
}

user.updateUserData = function() {
  if (!user.isLoggedIn)
    return;

  $.ajax({
    url: api + '/api/v1/users',
    type: 'get',
    headers: { 'Authorization': user.getJWT() },
    success: function(res) {
      localStorage.setItem('userData', JSON.stringify(res.userData));
      window.location.assign('/user_home');
    },
    error: function(err) {
      console.log(err);
      window.alert('Error with loading user data.');
    }
  });
}
