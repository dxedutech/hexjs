# Go Starter

Here you can easily get started with [Go](https://go.dev/) and experiment. Make sure to Fork this template by clicking the button in the top right corner!

Check [the Dockerfile](./.devcontainer/Dockerfile) to see how we configure the container of this sandbox. You can simply edit it yourself and the container will rebuild. Make sure to fork the sandbox first by clicking "Fork" in the top left corner.


git add -A | git add .
git commit -m "240903"
git push origin main

git pull

git reset
\\ This undoes the last commit and keeps the changes in the working directory, but unstages them.

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





~$ ssh user@hostname

## no matching host key type found. Their offer: ssh-rsa
## ssh 사용시 옵션으로 ssh-rsa 활성화한다.

~$ ssh -o "HostKeyAlgorithms ssh-rsa" user@hostname

## 새로운 SSH 키를 생성하기 전에  SSH 가 있는지 확인한다. 

~$ cat ~/.ssh/id_rsa.pub
~$ cat: /.../.ssh/id_rsa.pub: No such file or directory

## 위와 같이 나오면 SSH 키가 없으므로 SSH 키를 생성한다.

~$ 직접 ~/.ssh 디렉토리에서  확인할 수 있다.
~$ cd ~/.ssh
~$ ls

## SSH 키를 생성한다.
~$ ssh-keygen

## 디폴트 값인 is_rsa 이다. (GitLab 관련 이슈)
## 비밀번호는 입력하지 않아도 된다.

## 맥에서 다음과 같이 공개키를 복사할 수 있다
~$ pbcopy < ~/.ssh/id_rsa.pub

GqMZRnQ23a0kpJy7


## mongo local
& "C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe" --version
// uri := "mongodb+srv://myramyun:GqMZRnQ23a0kpJy7@myramyun.gszgkaq.mongodb.net/?retryWrites=true&w=majority&appName=myramyun"
$env:MONGO_URI="mongodb+srv://myramyun:GqMZRnQ23a0kpJy7@myramyun.gszgkaq.mongodb.net/?retryWrites=true&w=majority&appName=myramyun"
