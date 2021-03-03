var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limitWarning");

var getReposIssues = function (repo) {
    console.log(repo);

    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to dom function - 6.3.5
                displayIssues(data);

                // check if api has paginated issues (more) - 6.3.6
                if (response.headers.get("link")) {
                    displayWarning(repo);
                }
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

var displayWarning = function(repo) {
    // add text to warning container - 6.3.6
    limitWarningEl.textContent = "To see more than 30 issues, visit";

    // append link to warning container
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl);
};

getReposIssues("facebook/react");