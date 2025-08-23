# Go 언어를 사용하여 기본 빌드 환경을 설정합니다.
FROM golang:1.21.4-bullseye

# 작업 디렉토리 설정
WORKDIR /

# Go 모듈 파일과 소스 파일을 복사
COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY . .

# 빌드 명령 실행
RUN go build -o main .

# 실행 명령
EXPOSE 8080
CMD ["./main"]