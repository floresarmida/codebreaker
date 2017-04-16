# Codebreaker API | Info 310 - Paper 3

Demo: [Student Server](http://students.washington.edu/rykeller/codebreaker/) and [a sample query](http://138.68.21.112/v1/codebreaker?caesar=FYAI%20RFC%20NJYLCR)

This is a cipher codebreaker (for Caesar Transposition) API I've developed. Solving this in a python or java CLI tool wasn't going to be as fun, and I wanted to sharpen up my fullstack skills for my new job, so I decided to do this. To make it easy to grade, I heavily commented the codebreaking process in the server and created a web-client that both renders decryptions and logs the request/results to the web console.

### API Server
Built using go / golang, files of interest are:

main.go
: Initializes the server, environment, routes requests for codebreaking to the API handler

handlers/codebreaker.go
: This is where decryption occurs, and errors are handled if the request is ridiculous.

Although not good practice, I also included my dockerfile (available on the hub as rykeller/codebreakerapi)

### Web Client
Front-end for testing API calls, renders everything in a somewhat pretty format and gives some API documentation and test cases.

Uses React & Redux if you're curious, the code may look a little strange because state and functions are abstracted out of components and are connected via higher order components (containers)

---

Please be advised that I'll probably take the web client down once this is graded for a class I'm taking
