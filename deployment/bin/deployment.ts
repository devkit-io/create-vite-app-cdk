#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {PipelineStack} from '../lib/pipeline';
import {configuration as config} from "./config"

const app = new cdk.App();
new PipelineStack(app, `${config.repoName}-WebsitePipelineStack`, {
    env: { 
        account: config.account,
        region: config.region
    },
    repoOwner: config.repoOwner,
    repoName: config.repoName,
    branch: config.codeBranch,
    connectionArn: config.connectionArn,
    account: config.account,
    region: config.region,
});
