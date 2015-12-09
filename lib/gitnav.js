'use strict';
const fs = require('fs');
const exec = require('child_process').execSync;


function gitnav(cmd) {
  const cwd = atom.project.getPaths()[0];
  const commitsFilename = cwd + '/.commits';

  if (!cwd) {
    throw new Error('no project');
  }

  function buildCommits () {
    console.log('building them commits');
    const commits = exec('git log --pretty=oneline', {cwd: cwd});
    console.log(commits);
    fs.writeFileSync(commitsFilename, commits);
  }

  if (!fs.existsSync(commitsFilename)) {
    buildCommits();
  }

  const commits = fs
    .readFileSync(commitsFilename)
    .toString()
    .split(/\n+/)
    .filter(function (s) { return s.trim() != '' })
    .map(function (s) { return s.split(/\s+/)[0] });

  console.log("them commits");
  console.log(commits);

  const currentCommit = exec('git rev-parse HEAD', {cwd: cwd}).toString().trim();

  const idx = commits.indexOf(currentCommit);

  let nextCommit = currentCommit;

  switch (cmd) {
    case "prev":
      if (idx < commits.length - 1) {
        nextCommit = commits[idx+1];
      }
      break;
    case "next":
      if (idx > 0) {
        nextCommit = commits[idx-1];
      }
      break;
    case "end":
      nextCommit = commits[0];
      break;
    case "start":
      nextCommit = commits[commits.length-1];
      break;
    case "build":
      buildCommits();
      break;
  }

  console.log(exec(`git reset HEAD --hard`, {cwd: cwd}))
  console.log(exec(`git checkout --detach ${nextCommit}`, {cwd: cwd}).toString().trim());
}

module.exports = gitnav
