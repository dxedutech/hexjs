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