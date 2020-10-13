pipeline { 
    environment { 
        registry = "bl00na/os-voting-app-vote-python" 
        registryCredential = 'dockerhub_credentials' 
        dockerImage = '' 
    }
    agent any 
    stages { 
        stage('Cloning our Git') { 
            steps { 
                git 'https://github.com/bl00na/os-voting-app.git/vote' 
            }
        } 
        stage('Building our image') { 
            steps { 
                script { 
                    dockerImage = docker.build("-t bl00na/os-voting-app-vote-python -f ./vote/Dockerfile ./vote");                    
                }
            } 
        }
        stage('Deploy our image') { 
            steps { 
                script { 
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImage.push() 
                    }
                } 
            }
        } 
        stage('Cleaning up') { 
            steps { 
                sh "docker rmi $registry" 
            }
        } 
    }
}