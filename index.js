const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios');
const createHTML = require ('create-html');
let color;

inquirer
    .prompt([
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your favorite color (red, green, blue, or purple)?",
        name: "color"
    }
    ]).then(function(response) {
    color = response.color.toLowerCase();
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
        const cssLink = color + ".css";
        console.log("css link: " + cssLink);
    
        var html = createHTML({        
            title: 'GitHub Info',
            css: cssLink,
            lang: 'en',
            head: '<meta charset="UTF-8"> <title>GitHub Profile</title> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"> <link rel="stylesheet" href="red.css">',
            body: `<div class = "container">
            <div class = "row">
                <div class="card mb-3 mx-auto">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${pictureURL}" class="card-img-top bioImg" alt="avatar">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body mainColor">
                                <h5 class="card-title">My name is ${fullName}</h5>
                                <p class="card-text">${bio}</p>
                                <p class = "card-text">${location}</p>
                                <a href="${profileURL}" class="btn btn-primary btnColor">GitHub</a>
                                <a href="${blogURL}" class="btn btn-primary btnColor">Blog</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class ="row">
                <div class = "col-md-4">
                    <div class="card">
                        <div class="card-body bodyColor">
                            <h5 class="card-title">Public Repositories</h5>
                            <p class="card-text">${repo}</p>
                        </div>
                    </div>
                </div>
                <div class = "col-md-4">
                    <div class="card">
                        <div class="card-body bodyColor">
                            <h5 class="card-title">Followers</h5>
                            <p class="card-text">${followers}</p>
                        </div>
                    </div>
                </div>
                <div class = "col-md-4">
                    <div class="card" >
                        <div class="card-body bodyColor">
                            <h5 class="card-title">Following</h5>
                            <p class="card-text">${following}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        })
        fs.writeFile('index.html', html, function (err) {
            if (err) console.log(err)
        })
    })
    .catch(error => {
        console.log(error);
    });

  });
