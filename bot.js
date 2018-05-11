console.log("The bot is starting");

var Twit = require('twit');
var config  =  require('./config');
var T = new Twit(config);


/*setInterval(tweetIt, 1000 * 20){

    //do random stuff every time period
}

*/
//setting up a user stream

var exec = require('child_process').exec;
var fs = require('fs');



tweetIt();
//var stream = T.stream('user');

//stream.on('follow', followed);

/*function followed(eventMsg){
    var name = eventMsg.source.name;
    var screenName = eventMsg.source.screen_name;
    tweetIt('@' + screenName + ' Thanks for following me.');
}*/

function tweetIt(){
  var cmd = 'processing-java --sketch=`pwd`/dots --run';
  exec(cmd, processing);
  function processing(){
    var filename = 'dots/output.png';
    var params = {
      encoding: 'base64'

    }
    var b64 = fs.readFileSync(filename,params);
    //need to upload image before actually tweeting
      T.post('media/upload', {media_data: b64}, uploaded);
  }



    function uploaded(err,data,response){
        //this is where i will tweet!
        var id = data.media_id_string;
        var tweet = {
          status : 'random dots',
          media_ids: [id]
        }

      T.post('statuses/update', tweet, tweeted);
    }
    function tweeted(err,data,response){
      if(err){
        console.log("something went wrong");
      }
      else{
        console.log("it worked!");
      }
    }


}
