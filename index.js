import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import { Octokit } from "@octokit/core";


const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.get("/searchUser/:username", async (req, res) => {
  try {
    let { username } = req.params;
    const octokit = new Octokit({
      auth: process.env.GIT_PAT,
    });
    const sort = "&sort=followers&order=desc";

    let queryString = "q=" + encodeURIComponent(username);

    const result = await octokit.request(
      `GET /search/users?${queryString}${sort}`,
      {}
    );
    console.log(result);
      res.status(result.status ).json(result.data);
  } catch (error) {
    console.log(`Error! Status: ${error.status}. Message: ${error.message}`)
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
