import fs from "fs";
import path from "path";

const questionNumber = process.argv[2];
const loadSample = process.argv[3] === "test" || process.argv[3] === "sample";

if (!questionNumber) {
  console.error(
    "Please provide a question number as your first arguement on the CLI command. You can use a number and a letter for each part, like 1a or 2b."
  );
  process.exit(1);
}

let qFunc: (data: string) => void = (data: string) => {};
let data: string = "";

try {
  const qPart = questionNumber.slice(-1);
  const qNumber = questionNumber.slice(0, -1);

  const { default: func } = await import(
    path.resolve(`./dist/questions/${qNumber}/${qNumber}${qPart}.js`)
  );

  qFunc = func;

  const dataPath = loadSample
    ? `./src/data/${qNumber}.sample.txt`
    : `./src/data/${qNumber}.txt`;

  data = fs.readFileSync(path.resolve(dataPath), "utf-8").trim();
} catch (error) {
  console.error(`No code found for question ${questionNumber}`);
}

try {
  const startTime = Date.now();
  await qFunc(data);
  const endTime = Date.now();
  console.log(`Execution time: ${endTime - startTime}ms`);
} catch (err) {
  console.error(err);
}
