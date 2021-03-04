var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");



var formSubmitHandler = function(event) {
    event.preventDefault();
    
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};


// this function will accept both the array of repo data and the term we searched for as parameters - 6.2.5
var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);

    // check if api returned any repos - 6.2.6
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm; 
    
    // DISPLAY repo data to the page
    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        // 6.4.3 - we changed createElement from "div" to "a"
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // 6.4.3 - add setAttribute for "a" element
        // links homepage.js to single.js 
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);




        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);


        // show the number of issues with a little icon next to the number - 6.2.5
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classlist = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        //append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};



var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the url
    fetch(apiUrl).then(function(response) {
       if (response.ok) {
           response.json().then(function(data) {
               displayRepos(data, user);
           });
       } else {
           alert("Error: " + response.statusText);
       }
    })
    .catch(function(error) {
        // Notice this '.catch()' getting chained onto the end of the '.then()' method
        alert("Unable to connect to GitHub");
    });

};

userFormEl.addEventListener("submit", formSubmitHandler);

