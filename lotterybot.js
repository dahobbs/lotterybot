console.log("The bot is starting");

var Twit = require('twit');
var config  =  require('./config');
var T = new Twit(config);


var exec = require('child_process').exec;
var fs = require('fs');



//tweetIt();
var stream = T.stream('user');

stream.on('follow', followed);

function followed(eventMsg){
    var name = eventMsg.source.name;
    var screenName = eventMsg.source.screen_name;

    var tweet={
      status:'@' + screenName + ' Thanks for following me. Tweet me anytime to get a set of lottery numbers.'
    }

    T.post('statuses/update', tweet, tweeted);

}


var stream = T.stream('user');

stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg){
    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;

    console.log(replyto+' '+from);

    if(replyto === 'developSaturday'){
      var newTweet = '@' + from + ' Here are your lottery numbers: ';
      tweetIt(newTweet);
    }
}

// function tweetThis(txt){
//     var tweet={
//       status:txt
//     }
//     T.post('statuses/update',tweet,tweeted);

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function tweetIt(txt){
  var cmd = 'processing-java --sketch=`pwd`/random --run';
  exec(cmd, processing);

  function processing(){
    var filename = 'random/output.png';
    var params = {
      encoding: 'base64'

    }
    sleep(1000);
    var b64 = fs.readFileSync(filename,params);
    //need to upload image before actually tweeting
      T.post('media/upload', {media_data: b64}, uploaded);
      var delPic = 'rm random/output.png';
      exec(delPic);
  }



    function uploaded(err,data,response){
        //this is where i will tweet!
        var id = data.media_id_string;
        var tweet = {
          status : txt,
          media_ids: [id]
        }

      T.post('statuses/update', tweet, tweeted);
    }



}

function tweeted(err,data,response){
  if(err){
    console.log("something went wrong");
  }
  else{
    console.log("it worked!");
  }
}
