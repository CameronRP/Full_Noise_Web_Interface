var path = require('path');
var config = require('../config/config')

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('home.pug', {
      'api': config.server.api,
    });
  });

  app.get('/get_audio_recordings', function(req, res) {
    res.render('getAudioRecordings.pug', {
      'api': config.server.api,
    });
  });

  app.get('/get_ir_video_recordings', function(req, res) {
    res.render('getIrVideoRecordings.pug', {
      'api': config.server.api,
    });
  });

  app.get('/register', function(req, res) {
    console.log(config.server.api);
    res.render('register.pug', {
      'api': config.server.api,
    });
  });

  app.get('/user_home', function(req, res) {
    res.render('userHome.pug', {
      'api': config.server.api,
    });
  });

  app.get('/get_thermal_video_recordings', function(req, res) {
    res.render('getThermalVideoRecordings.pug', {
      'api': config.server.api,
    });
  });

  app.get('/ping', function(req, res) {
    res.end("pong...");
  });

  app.get('/login', function(req, res) {
    res.render('login.pug', {
      'api': config.server.api,
    });
  });

  app.get('/new_group', function(req, res) {
    res.render('newGroup.pug', {
      'api': config.server.api,
    });
  });

  app.get('/view_audio_recording/:id', function(req, res) {
    res.render('viewAudioRecording.pug', {
      'api': config.server.api,
      'id': req.params.id,
    });
  });

  app.get('/view_ir_video_recording/:id', function(req, res) {
    res.render('viewIrVideoRecording.pug', {
      'api': config.server.api,
      'id': req.params.id,
    });
  });

  app.get('/view_thermal_video_recording/:id', function(req, res) {
    res.render('viewThermalVideoRecording.pug', {
      'api': config.server.api,
      'id': req.params.id,
     });
  });

  app.get('/view_ir_and_thermal/:irId/:thermalId', function(req, res) {
    res.render('viewIrAndThermal.pug', {
      'api': config.server.api,
      'irId': req.params.irId,
      'thermalId': req.params.thermalId,
    });
  });
};
