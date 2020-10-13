pipeline { 
    environment { 
        registryVotePython = "bl00na/os-voting-app-vote-python" 
        registryCredentials = 'dockerhub_credentials' 
        dockerImageVotePython = '' 
    }
    agent any 
    stages { 
        stage('Cloning Git repository') { 
            steps { 
                git 'https://github.com/bl00na/os-voting-app.git' 
            }
        } 
        stage('Initializing Docker') {
            steps {
                script { 
                    def dockerHome = tool 'DockerInstallation'
                    env.PATH = "${dockerHome}/bin:${env.PATH}"
                }
            }
        }
        stage('Building images') { 
            steps { 
                script { 
                    dockerImageVotePython = docker.build("bl00na/os-voting-app-vote-python", "-f ./vote/Dockerfile ./vote"); 
                }
            } 
        }
        stage('Deploying images') { 
            steps { 
                script { 
                    docker.withRegistry('', registryCredentials) { 
                        dockerImageVotePython.push() 
                    }
                } 
            }
        } 
        stage('Cleaning up') { 
            steps { 
                sh "docker rmi $registryVotePython" 
            }
        } 
    }
}