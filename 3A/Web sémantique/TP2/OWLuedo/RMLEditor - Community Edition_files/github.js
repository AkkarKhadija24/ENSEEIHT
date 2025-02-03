
/**
 * Class containing calls to the Github wrapper API (link see README)
 */
class Github {

    /**
     * Returns the redirection link for authentication to github. Should be opened in a new window.
     */
    getGithubAuthLink() {
        return `${APPLICATION_CONFIG.githubAPI.url}/auth`
    }

    /**
     * Fetches the list of repositories of the currently authenticated user.
     * @returns A promise (for async use) resolving to an array of repositories, or rejecting to an error.
     */
    async getRepos() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${APPLICATION_CONFIG.githubAPI.url}/repos`,
                type: "get",
                success: (data) => resolve(data),
                error: err => reject(err),
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("gh-token")}`
                }
            })
        })
    }

    /**
     * Fetches the list of branches for the specified repository.
     * 
     * @param repo_name The repository name you want to fetch branches from.
     * @param repo_owner The repository's owner (needed for uniquely identifying repositories).
     * @returns A promise (for async use) resolving to an array of branches, or rejecting to an error.
     */
    async getBranches(repo_name, repo_owner) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${APPLICATION_CONFIG.githubAPI.url}/repos/branches/${repo_owner}/${repo_name}`,
                type: "get",
                success: (data) => resolve(data),
                error: err => reject(err),
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("gh-token")}`
                }
            })
        })
    }


    /**
     * Fetches the contents of the repository at specified path. If the path is a file, returns content; if the path is a directory, returns the directory listing.
     * 
     * @param repo_name The repository name you want to fetch branches from.
     * @param repo_owner The repository's owner (needed for uniquely identifying repositories).
     * @param branch The branch on which the path should be evaluated. Defaults to master.
     * @param path The path in the repository that needs to be explored. Defaults to /.
     * @returns A promise (for async use) resolving to either a file object with content or an array containing the directory listing, or rejecting to an error.
     */
    async getContents(repo_name, repo_owner, branch="", path="") {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${APPLICATION_CONFIG.githubAPI.url}/repos/${repo_owner}/${repo_name}/${branch}?path=${path}`,
                type: "get",
                success: (data) => resolve(data),
                error: err => reject(err),
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("gh-token")}`
                }   
            })
        })
    }


    /**
     * Changes the content of the file at specified repository, branch, path. Creates file if it does not exist.
     * 
     * @param repo_name The repository name you want to fetch branches from.
     * @param repo_owner The repository's owner (needed for uniquely identifying repositories).
     * @param branch The branch on which the path should be evaluated. Defaults to master.
     * @param path The path in the repository that needs to be explored. Defaults to /.
     * @returns A promise (for async use) resolving on success, or rejecting to an error.
     */
    async postFile(repo_name, repo_owner, branch, path, content) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${APPLICATION_CONFIG.githubAPI.url}/file/${repo_owner}/${repo_name}/${branch}`,
                type: "post",
                success: () => resolve(),
                error: err => reject(err),
                data: JSON.stringify({path, content: btoa(content)}),
                contentType: 'application/json; charset=utf-8',
                headers: {
                    "Authorization": `bearer ${localStorage.getItem("gh-token")}`
                }
            })
        })
    }
    
    /**
     * Gets a Github auth token using the one-time code.
     * 
     * @param code The authentication code received from Github.
     * @returns A promise (for async use) resolving on success, or rejecting to an error.
     */
    async authenticate(code) {
        return new Promise((resolve, reject) => {
            const success = (data) => {
                localStorage.setItem("gh-token", data.token);
                localStorage.setItem("gh-username", data.name);
                resolve();
            }

            $.ajax({
                url: `${APPLICATION_CONFIG.githubAPI.url}/auth/code?code=${code}`,
                type: "get",
                success,
                error: err => reject(err),
                contentType: 'application/json; charset=utf-8',
            })
        })
    }
    
    /**
     * Unlinks the currently linked github account.
     */
    unlink() {
        localStorage.setItem("gh-token", "")
    }
}

// Exposing singleton
const GithubAPI = new Github();