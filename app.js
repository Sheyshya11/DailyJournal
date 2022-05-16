//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var _ = require('lodash');

const ejs = require("ejs");

const homeStartingContent = "Welcome to Daily journal where you can record and track your daily activities";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


let posts=[];


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {

    res.render("home",{homeContent:homeStartingContent,postsContent:posts});
  

})

app.get('/posts/:postid', (req, res) => {
  const postidName= _.lowerCase(req.params.postid);
  
  posts.forEach(function(title)
  {
    const storedTitle=_.lowerCase(title.title);
    if (postidName===(storedTitle))
  {
    
    res.render("post",{postTitle:title.title,postContent:title.postContent})
  }
  
  })

  

})

app.get('/about', (req, res) => {
  res.render("about",{
    aboutContent:aboutContent});
})
app.get('/erase/:postid', (req, res) => {
  const postidName=  _.lowerCase(req.params.postid);
  
  posts.forEach(function(title)
  {
    const storedTitle=_.lowerCase(title.title);
    if (postidName===(storedTitle))
  {   const index=posts.indexOf(title)
    posts.splice(index,1)
   
    res.redirect("/");
}

})


 
})


app.get('/contact', (req, res) => {
  res.render("contact",{
    contactContent:contactContent});
})
app.get('/compose', (req, res) => {
  res.render("compose");
})
app.post('/compose', function (req, res) {
  
  const post={
    title:req.body.titleName,
    postContent:req.body.postContent
  }
  posts.push(post);
  res.redirect("/");


})

app.use(express.static("public"));















app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
