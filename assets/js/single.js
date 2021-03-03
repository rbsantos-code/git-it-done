var issueContainerEl = document.querySelector("#issues-container");


var getReposIssues = function (repo) {
    console.log(repo);

    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to dom function - 6.3.5
                displayIssues(data);
            });
        }
        else {
            alert("There was a problem with your request!");
        }
    });
};

var displayIssues = function(issues) {
    // repo has no open issues
    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users tot he issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // Display the data 6.3.5
        // Create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);

        // append <a> elements to page
        issueContainerEl.appendChild(issueEl);
    }
};

getReposIssues("facebook/react");