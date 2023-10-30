import {WebsiteStage} from "./stage";
import {Stack, StackProps} from "aws-cdk-lib";
import {Construct} from "constructs";
import {SelfMutatingPipeline} from "@devkit-io/constructs";

interface PipelineStackProps extends StackProps {
  repoName: string,
  repoOwner: string,
  branch: string,
  connectionArn: string,
  account: string,
  region: string;
}

export class PipelineStack extends Stack {

  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    const prod = new WebsiteStage(this, `${id}-ProdWebsite`, {
      env: {account: props.account, region: props.region}
    });

    new SelfMutatingPipeline(this, `${id}-SelfMutatingPipeline`, {
      sourceConnectionArn: props.connectionArn,
      repositoryName: `${props.repoOwner}/${props.repoName}`,
      branchName: props.branch,
      buildCommands: [
        'cd deployment/',
        'export npm_config_cache=/tmp/.npm', // simplifies local development to avoid root owned .npm cache
        'npm ci',
        'npm run build',
        'npx cdk synth'
      ],
      stages: [
        prod
        ]
    });
  }
}