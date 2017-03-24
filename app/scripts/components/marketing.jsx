var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
var Wunderground = require('../models/wunderground').Wunderground;
var Header = require('./layouts/header.jsx').Header;
var User = require('../models/user').User;
var Footer = require('./layouts/footer.jsx').Footer;



class Marketing extends React.Component {
  constructor(props){
    super(props);
    var weather = new Wunderground;
    weather.fetch().then(()=>{
      this.setState({weather});
    })
    console.log(weather);
    this.state = {
      weather
    };

  }
  render(){
    var user = User.current();
    return(
      <div className="wrapper">

        <img className="lake5" src="./images/lake6.jpg" alt="" />
          <div className="col-md-12">
              { user ? <Header></Header> : null }
          </div>
      <div className="container">
        <div className="row">
            <span className="signup"><a href="#signup/"><button className="signup-btn btn btn-primary"><img src="./images/button-logo1.png"/>Sign Up</button></a></span>
              <span className="signin"><a href="#login/"><button className="signin-btn btn btn-primary"><img src="./images/button-logo1.png"/>Sign In</button></a></span>

    </div>
      <div className="row">
        <h1 className="current-weather text-center">Current Greenville SC Weather</h1>
        <div className="weather col-md-12">

          <span className="weather-span">Moon Phase<p>.75 Waxing</p></span>
          <span className="weather-span">
            Barometric Pressure
            <p>{this.state.weather.get('pressure_in')}</p>
            <p>{this.state.weather.get('pressure_trend') == "+" ? "Rising": 'Falling'}</p>
          </span>
          <span className="weather-span">Wind Dir<p>{this.state.weather.get('wind_dir')}</p></span>
          <span className="weather-span">Wind Speed<p>{this.state.weather.get('wind_mph')} mph</p></span>
          <span className="weather-span">Temperature<p>{this.state.weather.get('temp_f')}</p></span>
          <span className="weather-span"><img src={this.state.weather.get('icon_url')}/></span>

      </div>


      </div>


    <div className="container-fluid">
      <div className="row">

          <img className="logo-bottom" alt="Brand" src="images/logo1.png" />
            <a href="http://www.wunderground.com/US/SC/Greenville.html"><button className="signin-btn btn btn-primary forecast"><img src="./images/button-logo1.png"></img>Forecast</button></a>

      </div>
    </div>
    <div className="spacer">

    </div>
    <div className="row">
      <div className="col-md-4 hype">
        <h2>Fishing News</h2>
        <h3>Get To The Point For Pre-Spawners</h3>
          <p className="news">
            Roy Hawk’s an easy-going guy, but when it comes to pre-spawn fishing, he knows how to make his point. Focused on the natural staging areas, the Arizona pro knows that primary and secondary points, along with their related pockets and underwater structure, are critical for engaging fish that are staging for their forthcoming spawning migrations.
Essentially, as bass follow the lake’s natural contour, points serve as a crossroads between two distinct depth zones. Steeper points are usually best, as proximity to deep water allows fish to quickly adjust for weather changes. Hawk elaborates:
“You have these big schools out in the main channel of a lake and as you get closer to the spawn, those schools come in along the contours, or maybe some standing timber,” he said. “But then, those schools start to break up and they get into smaller packs of two to five fish and they set up on those secondary points.
“Lakes with high populations might have four to five secondary points inside a bay, each with a small cluster of fish. So you might have to go through the whole bay to determine the best one with only one or two good fish.”
If main-lake points are the exits off larger highways, secondary points mark the entrances to residential properties. This is where the spawning takes place, so Hawk focuses his pre-spawn efforts on those secondary points.
“Generally, the schools will become progressively smaller moving form main-lake points to secondary points. If you were out winter fishing last month and you found a school on a main-lake point, there might be 50 bass in it,” Hawk said. “A month later, the water has warmed up and now you’ve found those fish in a pocket on these secondary points and there may be five to 10 bass at the most.


Roy Hawk likes to rotate through a set of points because allowing the fish to reposition means more opportunity later.
“Sometimes there may only be one or two, depending on how far along they are in the spawn. They’ll start pairing up by two fish – a male and a female.”
Lake Layout
Notwithstanding lake-to-lake variances, Hawk said the most important criteria for selecting points is proximity to the fish’s seasonal objectives. Consider where they’re heading and which spots they’ll pass en route.
“The key thing is to look for points near great spawning areas,” he said. “You want to be near big flat areas, with some type of hard bottom associated with it. Also, the more cover you can find along these areas, the better – especially for largemouth. They like to spawn by something for spawning security and to provide their fry a place to hide.
“If I’m just running down the lake and looking at each cove, the one that has the best spawning area, those are the ones I’d want to go look at first for secondary points.”
What to Throw
During the transitional time of the pre-spawn movement, the fish can get a little moody. That’s why Hawk keeps a selection of baits handy. Testing different presentations helps him dial in what the fish want, but experience has taught him what to generally expect.
Crankbait - Hawk will throw medium- and deep-divers depending on the terrain and how far along the pre-spawners have progressed, but he’ll mostly go with baits that hit the 5- to 10-foot range like the Duo Realis M65 11A.
“In general settings, that’s going to be a really good target depth for secondary points as you move toward the spawn,” he said.


Secondary points outside the spawning pockets can offer stellar pre-spawn opportunity.
Rattlebait - Favoring the Duo Realis Vibration G-Fix Vibration 68, Hawk calls this category his “extraction tool” – something of a follow-up tactic to squeeze out a few more bites.
“What we’re doing is fishing it kind of slow; we throw it across a point and bring it up to the edge,” he explained. “We want to sneak it into place and then snap it. When we snap it, that’s what draws the strike.
“It’s a finessey hard-trigger kind of deal. I can go through an area with a crankbait, catch four or five and I can come back and extract three or for more with that lipless technique.”
Similar to “snapping a Trap” in which you intentionally snag hydrilla, milfoil, etc. with a lipless bait and then rip it free, Hawk’s extraction technique is based on the image of a lure’s sudden bolting motion.
Jerkbait - A good tool for earlier in the pre-spawn, baits like the Duo Realis 110 SP offer a good look in cooler water, whereas the crankbaits take over once the water temperature rises into the 50s.
Spinnerbait - Muddy, windy and/or warmer water makes this bold presentation the right call.
Swimbait - Basically an “anytime” bait, Hawk said you can fish smaller swimbaits at a creeping pace early, then bump up in size and increase the presentation pace closer to spawn. Going bigger and faster sometimes serves to draw out the big females and makes them disclose their position for easier targeting.
Jig - This is mostly a back-up bait for when those tough days (i.e. post-front) demand slower presentations. That being said, Hawk notes that there’s nothing wrong with pulling out the jig to pick apart a good spot – or simply clean up the area once the reaction bite fizzles.

Jerkbaits can be highly effective, especially in the cooler water of early pre-spawn.
Finesse rig - Dropshots and wacky-rigged Senkos; they’re the last resort, but when the lake turns stingy, a little finesse could earn you No. 5.
Proceed with Strategy
Whatever your bait choice, follow Hawk’s advice for a well-measured presentation: “As you move into secondary points, you have to be very precise,” Hawk said. “Casting angle becomes very important and being stealthy in clear water becomes a major factor.”
For one thing, fewer fish means less chance of catching one by dropping a lure into a general area. Moreover, think of this as calibrating a piece of machinery for repetitive movements of mass production.
“You want to try variety of different angles on each point,” he said. “A lot of times, if I’m working down a bank and targeting three or four of those points, I’ll turn back around and come back up from a different angle on each point to give them a different look.”
Hawk offers this closing tip:
“A lot of times, if you catch one or two fish off a spot, it really goes dead. Especially in really clear water, but also in off-colored water, they get conditioned and they stop biting. By rotating through spots, you’re going to utilize your time better.
“If you leave, let the fish reposition and then come back – you’ll have more success. You’ll have new fish that rolled in and got set up on that point, plus the ones that were there got repositioned in more favorable positions.”
          </p>
      </div>
      <div className="col-md-4 hype">
        <h3>User's Stories</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.  Lorem ipsum dolor sit am
            et, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
      </div>
      <div className="col-md-4 hype">
        <h3>The Hottest Lures!!</h3>
          <p>
            Speaking for myself, I love the soft plastics.  I was introduced to
            fishing with plastic worms when I was about 12 years old, and have been using
            them ever since!  Personally I love the feel of the hit on a plastic worm.
            And over the years I have been very succesfull fishing them.  With that being said
            what I have been using lately are the Zoom Trick worms.  I fish them using a Texas weedless
            rig but without the weight.  Because I dont use a weight I have to use a spinning reel (so I can cast it more than
            a few feet) LOL.  Anyway the trick worm is a floating worm, it will actually sink but will stay
            close to the surface if you provide a little action.  you just have to jerk your rod tip
            a couple of times and then reel in the slack, then repeat.  if the bass are aggressive they will
            break the water hitting them!!  Just remeber that it is a plastic and you do have to
            set the hook. Have fun and catch some Bass!!
          </p>

      </div>
    </div>
    <Footer></Footer>
  </div>
  </div>
     )
  }
};

module.exports = {
  Marketing
};
