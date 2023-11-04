# Create-Vite-App AWS CI/CD Pipeline Starter Kit

## Overview

This repository is a starter kit designed to bootstrap a Continuous Integration/Continuous Deployment (CI/CD) pipeline for a `create-vite-app` application using AWS services. It leverages the AWS Cloud Development Kit (CDK) to provision and configure the necessary infrastructure with minimal effort.

## Prerequisites

Ensure you have the following prerequisites met before proceeding:

- AWS CLI installed and configured with the required permissions.
- Node.js and npm installed.
- AWS CDK installed.
- Access to the AWS CodeCommit repository or your choice of source control service.

## Repository Structure

- `/deployment`: Contains the CDK templates for deploying the CI/CD pipeline.
- `/source`: Contains the source code of the `create-vite-app` application.

## Configuration

Customize the deployment by setting your configuration in `deployment/config.ts`:

```javascript
export const configuration = {
  repoOwner: "__REPO_OWNER__", // Your repository owner (username or organization)
  repoName: "__REPO_NAME__", // The repository name for your `create-vite-app` application
  codeBranch: "__CODE_BRANCH__", // The branch that triggers the CI/CD pipeline
  connectionArn: "__CONNECTION_ARN__", // ARN for AWS CodeStar Connections (for GitHub, Bitbucket, etc.)
  account: "__ACCOUNT__", // Your AWS Account ID
  region: "__REGION__", // AWS Region where the pipeline will be deployed
};
```

## Deployment Steps

To deploy the CI/CD pipeline, follow these steps:

1. Change into the deployment directory:

    ```sh
    cd deployment
    ```

2. Install the necessary npm packages:

    ```sh
    npm install
    ```

3. Bootstrap the CDK if you haven't done so already:

    ```sh
    cdk bootstrap
    ```

4. Deploy the stack with CDK:

    ```sh
    cdk deploy
    ```

This will set up the CI/CD pipeline, which includes steps for building the application, running tests, and deploying it to the target environment.

## Application Development

Develop your `create-vite-app` application in the `/source` directory. When you push changes to the configured branch, the CI/CD pipeline will automatically pick up the changes, build, test, and deploy your application according to the defined workflow.

## Support

For issues, questions, or requests for new features, please open an issue in the repository.

## Contributing

We welcome contributions to improve this starter kit. Please fork the repository, make your changes, and submit a pull request with a clear explanation of your improvements.

## License

This project is licensed under the MIT License. See the LICENSE file in the repository for full details.
