pipeline { 
    environment { 
        registry = "bl00na/os-voting-app-vote-python" 
        registryCredential = 'dockerhub_credentials' 
        dockerImageVotePython = '' 
    }
    agent any 
    stages { 
        stage('Cloning Git repository') { 
            steps { 
                git 'https://github.com/bl00na/os-voting-app.git' 
            }
        } 
        stage('Building images') { 
            steps { 
                script { 
                    dockerImageVotePython = docker.build("bl00na/os-voting-app-vote-python -f ./vote/Dockerfile");                    
                }
            } 
        }
        stage('Deploying images') { 
            steps { 
                script { 
                    docker.withRegistry( '', registryCredential ) { 
                        dockerImageVotePython.push() 
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