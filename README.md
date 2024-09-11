# Go Starter

Here you can easily get started with [Go](https://go.dev/) and experiment. Make sure to Fork this template by clicking the button in the top right corner!

Check [the Dockerfile](./.devcontainer/Dockerfile) to see how we configure the container of this sandbox. You can simply edit it yourself and the container will rebuild. Make sure to fork the sandbox first by clicking "Fork" in the top left corner.


git add -A | git add .
git commit -m "240903"
git push origin main

git pull

git reset
\\This undoes the last commit and keeps the changes in the working directory, but unstages them.

git init
git config --global user.name "Your Name"
git config --global user.email your.email@example.com

git config --list


git config --global core.autocrlf
git config --global core.autocrlf input


.gitattributes
- * text=auto 

\\ Line Ending Normalization:
On Windows, text files typically use carriage return and line feed (
CRLF
) for line endings, while Unix-based systems (like Linux and macOS) use just line feed (
LF
). By setting
text=auto
, Git will convert line endings to
LF
in the repository and convert them back to the appropriate format for the user's operating system when checking out files.

\\ Cross-Platform Compatibility:
This setting helps maintain consistency in text files across different operating systems(window, mac...), reducing issues related to line endings when collaborating with others.






Google Kubernetes Engine(GKE)에서 Go 언어와 MongoDB를 사용하여 서비스를 구축하는 전체 방향과 예시 코드를 제공하겠습니다. 이 과정은 다음 단계로 나눌 수 있습니다.

1. 환경 설정
GCP 프로젝트 생성: Google Cloud Console에서 새로운 프로젝트를 생성합니다.
GKE 클러스터 생성: GCP Console 또는
gcloud
CLI를 사용하여 GKE 클러스터를 생성합니다.
kubectl 설치: Kubernetes 클러스터와 상호작용하기 위해
kubectl
을 설치합니다.


2. MongoDB 설정
MongoDB를 GKE에서 실행하기 위해 StatefulSet을 사용할 수 있습니다. MongoDB의 Helm Chart를 사용하면 쉽게 배포할 수 있습니다.

# Helm 설치 (설치되어 있지 않은 경우)
curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash

# MongoDB Helm Chart 추가
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# MongoDB 설치
helm install my-mongo bitnami/mongodb


3. Go 애플리케이션 개발
Go 애플리케이션을 작성하여 MongoDB와 상호작용합니다. 아래는 간단한 예시 코드입니다.

// main.go
package main

import (
    "context"
    "fmt"
    "log"
    "net/http"
    "os"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func connectMongoDB() {
    var err error
    mongoURI := os.Getenv("MONGODB_URI")
    client, err = mongo.Connect(context.TODO(), options.Client().ApplyURI(mongoURI))
    if err != nil {
        log.Fatal(err)
    }
}

func handler(w http.ResponseWriter, r *http.Request) {
    collection := client.Database("testdb").Collection("testcollection")
    // MongoDB 작업 수행
    // 예: collection.InsertOne(context.TODO(), bson.M{"name": "example"})
    fmt.Fprintf(w, "Hello, MongoDB!")
}

func main() {
    connectMongoDB()
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}


4. Dockerfile 작성
Go 애플리케이션을 Docker 이미지로 빌드하기 위한 Dockerfile을 작성합니다.

# Dockerfile
FROM golang:1.20 AS builder
WORKDIR /app
COPY . .
RUN go mod init example.com/myapp
RUN go build -o myapp .

FROM gcr.io/distroless/base
COPY --from=builder /app/myapp /myapp
CMD ["/myapp"]


5. Docker 이미지 빌드 및 GCR에 푸시
# Docker 이미지 빌드
docker build -t gcr.io/YOUR_PROJECT_ID/myapp .

# GCR에 로그인
gcloud auth configure-docker

# Docker 이미지 푸시
docker push gcr.io/YOUR_PROJECT_ID/myapp


6. Kubernetes 배포 파일 작성
Go 애플리케이션을 GKE에 배포하기 위한 Kubernetes 배포 파일을 작성합니다.

# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: gcr.io/YOUR_PROJECT_ID/myapp
        ports:
        - containerPort: 8080
        env:
        - name: MONGODB_URI
          value: "mongodb://my-mongo:27017"
---
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: myapp


7. Kubernetes에 배포
# Kubernetes 클러스터에 배포
kubectl apply -f deployment.yaml


8. 서비스 확인
GKE에서 서비스가 생성되면, 외부 IP를 통해 애플리케이션에 접근할 수 있습니다.

kubectl get services
이 과정을 통해 GKE에서 Go 언어와 MongoDB를 사용하는 서비스를 구축할 수 있습니다. 각 단계에서 발생할 수 있는 문제를 해결하기 위해 GCP 문서와 Kubernetes 문서를 참고하는 것이 좋습니다.