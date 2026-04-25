pipeline {
    agent any

    environment {
        IMAGE_NAME = 'zoople-devops-workshop-vijin:latest'
        CONTAINER_NAME = 'sreeharirmohan'
        APP_PORT = '3000'
        DOMAIN = 'sreeharirmohan.workshop.zoople.in'
        NGINX_DIR = '/home/ubuntu/nginx'
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

                echo "===== DEBUG INFO ====="
                whoami
                pwd
                ls -la /var/lib/jenkins
                ls -la $NGINX_DIR || true

                if [ ! -d "$NGINX_DIR" ]; then
                  echo "❌ nginx dir missing"
                  exit 1
                fi

                cd $NGINX_DIR

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
