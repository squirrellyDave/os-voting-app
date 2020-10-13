pipeline { 
    environment { 
        GIT_URL = 'https://github.com/bl00na/os-voting-app.git' 
        DOCKERHUB_CREDENTIALS = 'dockerhub_credentials' 
        
        REPO_VOTE_PYTHON = 'bl00na/os-voting-app-vote-python' 
        DOCKERFILE_PATH_VOTE_PYTHON = './vote/Dockerfile ./vote' 
        DOCKERIMAGE_VOTE_PYTHON = '' 
        
        REPO_VOTE_VUEJS = 'bl00na/os-voting-app-vote-vuejs' 
        DOCKERFILE_PATH_VOTE_VUEJS = './vote/Dockerfile-vuejs ./vote ' 
        DOCKERIMAGE_VOTE_VUEJS = '' 
        
        REPO_WORKER_JAVA = 'bl00na/os-voting-app-worker-java' 
        DOCKERFILE_PATH_WORKER_JAVA = './worker/Dockerfile ./worker' 
        DOCKERIMAGE_WORKER_JAVA = '' 

        REPO_WORKER_DOTNET = 'bl00na/os-voting-app-worker-dotnet' 
        DOCKERFILE_PATH_WORKER_DOTNET = './worker/Dockerfile-dotnet ./worker' 
        DOCKERIMAGE_WORKER_DOTNET = '' 
                
        REPO_RESULT_NODEJS = 'bl00na/os-voting-app-result-nodejs' 
        DOCKERFILE_PATH_RESULT_NODEJS = './result/Dockerfile ./result' 
        DOCKERIMAGE_RESULT_NODEJS = '' 
    }
    agent any 
    stages { 
        stage('Cloning Git Repository') { 
            steps { 
                git GIT_URL
            }
        } 
        stage('Building images') { 
            steps { 
                script {                     
                    DOCKERIMAGE_VOTE_PYTHON = docker.build bl00na/os-voting-app-vote-python -f ./vote/Dockerfile ./vote
                    rem DOCKERIMAGE_VOTE_PYTHON = docker.build -t REPO_VOTE_PYTHON -f DOCKERFILE_PATH_VOTE_PYTHON 
                    rem DOCKERIMAGE_VOTE_VUEJS = docker.build -t REPO_VOTE_VUEJS -f DOCKERFILE_PATH_VOTE_VUEJS 
                    rem DOCKERIMAGE_WORKER_JAVA = docker.build -t REPO_WORKER_JAVA -f DOCKERFILE_PATH_WORKER_JAVA 
                    rem DOCKERIMAGE_WORKER_DOTNET = docker.build -t REPO_WORKER_DOTNET -f DOCKERFILE_PATH_WORKER_DOTNET 
                    rem DOCKERIMAGE_RESULT_NODEJS = docker.build -t REPO_RESULT_NODEJS -f DOCKERFILE_PATH_RESULT_NODEJS 
                }
            } 
        }
        stage('Deploying images') { 
            steps { 
                script { 
                    docker.withRegistry('', DOCKERHUB_CREDENTIALS) { 
                        DOCKERIMAGE_VOTE_PYTHON.push() 
                        rem DOCKERIMAGE_VOTE_VUEJS.push() 
                        rem DOCKERIMAGE_WORKER_JAVA.push() 
                        rem DOCKERIMAGE_WORKER_DOTNET.push() 
                        rem DOCKERIMAGE_RESULT_NODEJS.push()
                    }
                } 
            }
        } 
        stage('Cleaning up') { 
            steps {                
                sh 'docker rmi $REPO_VOTE_PYTHON:latest' 
                rem sh 'docker rmi $REPO_VOTE_VUEJS:latest' 
                rem sh 'docker rmi $REPO_WORKER_JAVA:latest' 
                rem sh 'docker rmi $REPO_WORKER_DOTNET:latest' 
                rem sh 'docker rmi $REPO_RESULT_NODEJS:latest' 
            }
        } 
    }
}