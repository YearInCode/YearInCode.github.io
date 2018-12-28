from github import Github
import github
import os
import datetime
from flask import Flask
app = Flask(__name__)


g = Github()
# g = Github(os.environ["user"], os.environ["password"])

# user = g.get_user()

yearStart = datetime.datetime(2018, 1, 1, 0, 0, 0, 0)


@app.route("/authenticate", methods=['GET', 'POST'])
def authenticate():
    token = request.form['token']
    g = Github(token)


@app.route("/get_highest_starred_repo_created", methods=['GET'])
def get_highest_starred_repo_created():
    user = g.get_user()
    highestStars = -1
    highestRepo = ""
    for repo in user.get_repos():
        if repo.stargazers_count > highestStars:
            highestStars = repo.stargazers_count
            highestRepo = repo.name
    
    return(str(highestStars), highestRepo)



@app.route("/get_first_repo_created", methods=['GET'])
def get_first_repo_created():
    user = g.get_user()
    earliestRepo = github.Repository.Repository
    earliestTime = datetime.datetime(2900, 12, 30)
    for repo in user.get_repos():
        if repo.created_at > yearStart:
            if repo.created_at < earliestTime:
                earliestRepo = repo
                earliestTime = repo.created_at
    return earliestRepo.name

@app.route("/get_num_repos_created", methods=['GET'])
def get_num_repos_created():
    user = g.get_user()
    num_repos = 0
    for repo in user.get_repos():
        if repo.created_at > yearStart:
            num_repos += 1
    return str(num_repos)

@app.route("/get_favorite_languages", methods=['GET'])
def get_favorite_languages():
    user = g.get_user()
    languages = []
    num_occurences = []
    for repo in user.get_repos():
        if repo.language not in languages:
            languages.append(repo.language)
            num_occurences.append(1)
        else:
            idx = languages.index(repo.language)
            num_occurences[idx] += 1
    languages_with_occurences = sorted(zip(languages, num_occurences), key=lambda x: x[1], reverse=True)
    
    return [i[0] for i in languages_with_occurences]

@app.route("/get_recommended_repos", methods=['GET'])
def get_recommended_repos():
    user = g.get_user()
    repositories = g.search_repositories(query='language:' + get_favorite_languages()[0], sort="stars", order="desc")
    recommended_repos = []
    for repo in  repositories[:10]:
        recommended_repos.append(repo.name)
    return recommended_repos

@app.route("/get_tastebreaker_repos", methods=['GET'])
def get_tastebreaker_repos():
    user = g.get_user()
    tastebreaker_repos = []
    repositories_a = g.search_repositories(query='good-first-issues:>3 language:' + get_favorite_languages()[1])
    repositories_b = g.search_repositories(query='good-first-issues:>3 language:' + get_favorite_languages()[2])
    
    for repo in repositories_a[:5]:
        tastebreaker_repos.append(repo.name)
    for repo in repositories_b[:5]:
        tastebreaker_repos.append(repo.name)

    return tastebreaker_repos



@app.route("/get_recommended_contribution_repos", methods=['GET'])
def get_recommended_contribution_repos():
    user = g.get_user()
    recommended_contribution_repos = []
    repositories = g.search_repositories(query='good-first-issues:>3 language:' + get_favorite_languages()[0])
    for repo in repositories[:10]:
        recommended_contribution_repos.append(repo.name)
    return recommended_contribution_repos


@app.route("/get_best_starred_repos", methods=['GET'])
def get_best_starred_repos():
    user = g.get_user()
    starred_list = []
    starred_repos = user.get_starred()
    for repo in starred_repos:
        starred_list.append((repo.name, repo.stargazers_count))
    starred_list = sorted(starred_list, key=lambda x: x[1], reverse=True)
    return [i[0] for i in starred_list[:10]]



