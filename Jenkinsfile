pipeline {
    agent any

    environment {
        IMAGE_NAME = 'zoople-devops-workshop-vijin:latest'
        CONTAINER_NAME = 'vijin-app'
        APP_PORT = '3000'
        DOMAIN = 'workshop.zoople.in'
        NGINX_DIR = '/var/lib/jenkins/nginx'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                set -ex
                docker build -t $IMAGE_NAME .
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                set -ex

                docker rm -f $CONTAINER_NAME || true

                docker network inspect nginx-network >/dev/null 2>&1 || docker network create nginx-network

                docker run -d \
                  --name $CONTAINER_NAME \
                  --network nginx-network \
                  -p $APP_PORT:$APP_PORT \
                  --restart unless-stopped \
                  $IMAGE_NAME

                docker ps | grep $CONTAINER_NAME
                '''
            }
        }

        stage('Setup Nginx') {
            steps {
                sh '''
                set -ex

                echo "Current user: $(whoami)"
                echo "Current path: $(pwd)"
                echo "Home path: $HOME"

                echo "Checking nginx path: $NGINX_DIR"

                if [ ! -d "$NGINX_DIR" ]; then
                  echo "ERROR: $NGINX_DIR does not exist"
                  echo "Copy nginx folder once using:"
                  echo "sudo cp -r /home/ubuntu/nginx /var/lib/jenkins/nginx"
                  echo "sudo chown -R jenkins:jenkins /var/lib/jenkins/nginx"
                  exit 1
                fi

                ls -la "$NGINX_DIR"

                cd "$NGINX_DIR"

                chmod +x nginx.sh

                ./nginx.sh "$DOMAIN" "$CONTAINER_NAME" "$APP_PORT"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment completed successfully'
        }

        failure {
            echo '❌ Deployment failed'
        }
    }
}