//   TODO: verify the proper files were passed and learner didn't tamper with grading.yml
const yaml = require("js-yaml");
const fs = require("fs");
function run() {
  files = ["stale-daily.yml"];
  const answers = {
    "stale-daily": "0 0 * * *",
    "stale-weekly": "0 0 * * MON",
    "stale-monthly": "0 0 1 * *",
  };

  files.forEach((file) => {
    const filename = file.replace(".yml", "");
    console.log(filename);
    const doc = yaml.load(fs.readFileSync(`./${file}`, "utf8"));
    console.log(doc.on.schedule[0].cron);

    if (answers[filename].trim() === doc.on.schedule[0].cron.trim()) {
      console.log("Equal... you pass");
    } else {
      console.log("you suck");
    }
  });
}

run();
