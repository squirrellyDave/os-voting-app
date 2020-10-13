pipeline { 
    environment { 
        registry = "bl00na/os-voting-app-vote-python" 
        registryCredential = 'dockerhub_credentials' 
        dockerImage = '' 
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
                    dockerImage = docker.build("bl00na/os-voting-app-vote-python -f ./vote/Dockerfile ./vote");                    
                }
            } 
        }
        stage('Deploying images') { 
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