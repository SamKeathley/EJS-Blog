//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Gunwalls Barbary Coast hogshead keel topmast gun tackle grog blossom skysail transom. Clap of thunder lateen sail quarterdeck cackle fruit ahoy mizzen brigantine yawl run a rig rutters. Sink me bring a spring upon her cable hardtack sloop fluke topsail chase yard wench deadlights. Black jack chantey long clothes draft scuppers jack matey lanyard crimp bounty. Aft gangplank provost gally cackle fruit chantey gangway Corsair take a caulk walk the plank.";
const aboutContent = "Spike pink yardarm sutler me crow's nest lass square-rigged hulk bilge. Brigantine scurvy broadside jolly boat nipperkin clipper hornswaggle hulk main sheet holystone. Reef case shot American Main splice the main brace bowsprit snow trysail gun man-of-war spike. Shiver me timbers tackle hulk fluke port ballast no prey, no pay walk the plank plunder pinnace. Mutiny take a caulk clap of thunder Chain Shot smartly sutler reef yard hornswaggle spyglass. ";
const contactContent = "Hail-shot mutiny lookout spyglass crow's nest long boat gaff spirits piracy Spanish Main. Nelsons folly bilge haul wind Jolly Roger cog quarter gibbet fathom Arr Jack Tar. Carouser loaded to the gunwalls driver rigging brigantine grog marooned haul wind hornswaggle rope's end. Careen yawl grapple ho Corsair doubloon coxswain Jack Ketch spirits cutlass. Plate Fleet poop deck Buccaneer American Main Jack Ketch tackle squiffy Privateer yard code of conduct.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res) {
  res.render("home", {
    startingHome: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {startingAbout: aboutContent});
});

app.get("/contact", function(req, res) {
  res.render("contact", {startingContact: contactContent});
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    };
  });

});

app.listen(3000, function() {
  console.log("Server started on http://localhost:3000");
});
