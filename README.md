# angular-aws-serverless-app

`angular-aws-serverless-app` is an application I developed for my bachelor thesis "**Cloud computing : study & development of a Serverless application**", available [here](https://sonar.rero.ch/documents/315005/files/MemoireJackBarker20210701_1735.pdf?download) (french).

The purpose of this project was to deepen my understanding of cloud technologies from a developer's perspective by developing a simple **webchat app** using AWS Serverless services.

*Disclaimer : the aim of this project was to learn more about AWS cloud services in a practical way, not to demonstrate general coding best practices. Many improvements should be made to the code quality and security aspects of this project in a production context.*

## Architecture

![Architecture](https://i.imgur.com/1mxlY1a.png)

The project uses various AWS services in order to implement functionalities such as creating an account, user lookup, sending and receiving messages, and uploading a profile picture.

* **Cognito** is used to manage the app users.
* **S3** is used to host the Angular application as well as store user profile pictures.
* **API Gateway** is used as an HTTP gateway for REST type requests and as a Websocket gateway for real-time message transmission.
* **Lambda** (Serverless Functions) is used to handle both HTTP and Websocket requests and make resquests to the database.
* **DynamoDB** is used to store data (e.g. messages, user preferences).

## Continuous integration (currently inactive)

![enter image description here](https://i.imgur.com/on3HfRw.png)

The source code for the Angular project is hosted in a **CodeCommit** repository.

As new code is pushed to the main branch, the **CodeBuild** service detects the new changes and rebuilds the application using `` ng build ``.
 
 **CodePipeline** is used to deploy the newly built Angular code to the S3 bucket hosting the frontend.

## Directory structure

* **`src`** contains the Angular code:
	* `src\app\adapters` contains data adapters used to convert data formats,
	* `src\app\components` contains the angular components used to build the UI components and related behaviors,
	* `src\app\services` contains code modules reponsible to make requests to the backend (API Gateway urls),
	* `src\app\types` contains TypeScript interface files.

* **`lambda`** contains the JavaScript functions as they ~~are~~ were deployed to AWS Lambda.
