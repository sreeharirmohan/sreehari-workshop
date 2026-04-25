pipeline {
    agent any

    environment {
        USERNAME = 'vijin'
        IMAGE = "zoople-devops-workshop-${USERNAME}"
        DOMAIN = "${USERNAME}.workshop.zoople.in"
        CONTAINER = "${USERNAME}-app"
        PORT = "3000"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $IMAGE:latest ."
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    sh """
                    docker rm -f $CONTAINER || true

                    docker run -d \
                      --name $CONTAINER \
                      --network nginx-network \
                      -p $PORT:$PORT \
                      $IMAGE:latest
                    """
                }
            }
        }

        stage('Setup Nginx + SSL') {
            steps {
                script {
                    sh """
                    cd ~/nginx
                    ./nginx.sh $DOMAIN $CONTAINER $PORT
                    """
                }
            }
        }
    }
}