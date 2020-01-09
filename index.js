const inquirer = require("inquirer");
const fs = require("fs");

inquirer
.prompt([
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your favorite color?",
        name: "color"
    }
]).then(function(response) {
    const axios = require('axios');
      axios.get('https://api.github.com/users/' + response.name + '?API_KEY=1f86a572b3e7bb32c847079099968c367910692a')
      .then(response => {
        //get data from api
        //key: 1f86a572b3e7bb32c847079099968c367910692a
        console.log(response)
        let fullName = response.data.name;
        console.log("Full Name: " + fullName);
        let location = response.data.location;
        console.log("Location: " + location);
        let pictureURL = response.data.avatar_url;
        console.log("Avatar URL: " + pictureURL);
        let profileURL = response.data.url;
        console.log("Profile URL: " + profileURL);
        let blogURL = response.data.blog;
        console.log("Blog URL: " + blogURL);
        let bio = response.data.bio;
        console.log("Bio: " + bio);
        let repo = response.data.public_repos;
        console.log("Repositories: " + repo);
        let followers = response.data.followers;
        console.log("Followers: " + followers);
        let following = response.data.following;
        console.log("Following: " + following);
    })
    .catch(error => {
        console.log(error);
    });
    // fs.appendFile(response.name+".txt", JSON.stringify(response), function(err) {

    //     if (err) {
    //       return console.log(err);
    //     }
    //     console.log(response);
    //     console.log("Success!");
      
    //   });
  });