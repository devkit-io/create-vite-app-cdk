import {DockerImage, Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {StaticSiteBase} from "@devkit-io/constructs";
import * as path from "path";
import {Source} from "aws-cdk-lib/aws-s3-deployment";

export interface DeploymentStackProps extends StackProps {
  envVars?: Record<string, string>,
}

export class DeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props: DeploymentStackProps) {
    super(scope, id, props);

    const codeAsset = Source.asset(path.join(__dirname, '../../source'), {
      bundling: {
        user: 'root',
        image: DockerImage.fromRegistry(`node:20`),
        command: [
          'bash', '-c', [
            'npm install',
            `NODE_ENV=production npm run build`,
            'cp -au dist/* /asset-output',
          ].join(" && ")
        ],
        environment: {
          GENERATE_SOURCEMAP: 'false'
        }
      }
    });

    new StaticSiteBase(this, 'StaticSite', {
      sourceAsset: codeAsset,
    })
  }
}