const github = require("@actions/github");
const core = require("@actions/core");
const yaml = require("js-yaml");
const fs = require("fs");

async function run() {}
//blablabla
//why not!
try {
  token = core.getInput("github-token");
  files = core.getInput("files").split(",");
  //   TODO: verify the proper files were passed and learner didn't tamper with grading.yml

  const answers = {
    "stale-daily": "0 0 * * *",
    "stale-weekly": "0 0 * * MON",
    "stale-monthly": "0 0 1 * *",
  };

  files.forEach((file) => {
    const filename = file.replace(".yml", "");

    const doc = yaml.load(
      fs.readFileSync(
        `${process.env.GITHUB_WORKSPACE}/.github/workflows/${file}`,
        "utf8"
      )
    );
    // TODO: if desired keys dont' exist prevent failure but provide feedback
    if (answers[filename].trim() === doc.on.schedule[0].cron.trim()) {
      console.log("Equal... you pass");
    } else {
      console.log("you suck");
    }
  });
} catch (error) {
  core.setFailed(error);
}

run();

// Get document, or throw exception on error
try {
} catch (e) {
  console.log(e);
}
