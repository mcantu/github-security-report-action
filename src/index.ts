import ReportGenerator from './ReportGenerator';

import * as core from '@actions/core';
import { Octokit } from '@octokit/rest';

async function run(): Promise<void> {
  try {
    const token = getRequiredInputValue('token');
    const githubApiUrl = getRequiredInputValue('githubApiUrl');

    const generator = new ReportGenerator({
      repository: getRequiredInputValue('repository'),
      octokit: new Octokit({auth: token, baseUrl: githubApiUrl}),

      sarifReportDirectory: getRequiredInputValue('sarifReportDir'),
      outputDirectory: getRequiredInputValue('outputDir'),

      templating: {
        name: getRequiredInputValue('template')
      }
    });

    const file = await generator.run();
    console.log(file);
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();

function getRequiredInputValue(key: string): string {
  return core.getInput(key, {required: true});
}
