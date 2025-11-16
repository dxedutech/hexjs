# Go 언어를 사용하여 기본 빌드 환경을 설정합니다.
# FROM golang:1.21.4-bullseye

# 작업 디렉토리 설정
# WORKDIR /

# Go 모듈 파일과 소스 파일을 복사
# COPY go.mod ./
# COPY go.sum ./
# RUN go mod download

# COPY . .

# 빌드 명령 실행
# RUN go build -o main .

# 실행 명령
# CMD ["./main"]

# 1. 빌드용 이미지
FROM golang:1.21.4-bullseye AS builder

WORKDIR /app

# Go 모듈 복사 및 다운로드
COPY go.mod go.sum ./
RUN go mod download

# 소스 코드 복사
COPY . .

# 빌드
RUN go build -o main .

# 2. 실행용 경량 이미지
FROM alpine:latest

WORKDIR /app

# 인증서 설치 (MongoDB Atlas TLS 필요)
RUN apk add --no-cache ca-certificates

# 빌드된 바이너리와 정적 파일 복사
COPY --from=builder /app/main .
COPY --from=builder /app/www ./www

# 환경변수 기본값 (Cloud Run이 PORT를 지정)
ENV PORT=8080

# 실행
CMD ["./main"]
