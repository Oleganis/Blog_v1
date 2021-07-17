//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// Load the full build.
const _ = require("lodash");

const homeStartingContent = "I‘d always heard your entire life flashes in front of your eyes the second before you die. First of all, that one second isn‘t a second at all. It stretches on forever like an ocean of time. For me, it was lying on my back at Boy Scout camp, watching falling stars, and yellow leaves from the maple trees that lined our street, or my grandmother‘s hands and the way her skin seemed like paper, and the first time I saw my cousin Tony‘s brand new Firebird, and Janie... And Janie... And... Carolyn. I guess I could be pretty pissed off about what happened to me but it‘s hard to stay mad when there‘s so much beauty in the world. Sometimes I feel like I‘m seeing it all at once and it‘s too much. My heart fills up like a balloon that‘s about to burst. And then I remember to relax and stop trying to hold onto it. And then it flows through me like rain. And I can‘t feel anything but grattitude for every single moment of my stupid little life. You have no idea what I‘m talking about, I‘m sure. But don‘t worry. You will someday.";
const aboutContent = "My name is Lester Burnham. This is my neighborhood. This is my street. This is my life. I am 42 years old. In less than a year, I will be dead. Of course, I don't know that yet, and in a way, I'm dead already. Look at me, jerking off in the shower. This will be the high point of my day. It's all downhill from here. That's my wife Carolyn. See the way the handle on those pruning shears match her gardening clogs? That's not an accident. That's our neighbor, Jim, and that's his lover, Jim...Man, I get exhausted just watching her. She wasn't always like this. She used to be happy. We used to be happy. My daughter, Jane. Only child. Janie's a pretty typical teenager - angry, insecure, confused. I wish I could tell her that's all going to pass, but I don't want to lie to her...Both my wife and daughter think I'm this gigantic loser. And they're right. I have lost something. I'm not exactly sure what it is, but I know I didn't always feel this -- sedated. But you know what? It's never too late to get it back";
const contactContent = "Well, I'm sure there have been amazing technological advances in the industry, but surely you must have some sort of training program. It seems unfair to presume I won't be able to learn.";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get('/', function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get('/about', function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get('/contact', function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get('/compose', function(req, res) {
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
  const url = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);
    if (url === storedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      })
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
