# Trivia!

You can view this project online here: <https://tandem-trivia-400.netlify.app>

## Guidelines & Requirements

Created for the Tandem Apprenticeship Program! The basic goal for this project is to create a trivia app from the provided questions. A player can view the questions and multiple choice answer options, the correct answer on submission, and their score.

### Assumptions

A round of trivia has 10 questions. Everything is multiple choice. The score does not have to update in real time - results can update on form submit, button click, or any other interaction.

### Acceptance Criteria

A user can view questions one at a time, all multiple choice. Questions should not repeat in a round. A user can only select one answer at a time from the provided possibilities. The correct answer must be revealed after the user has submitted their answer. Users can see their score at the end of the round.

### Future Improvements

This was my first React project! I'd been learning it recently, and this sounded like a perfect opportunity to build something with it. As such, I'm certain there are better ways to write functionality and/or organize my code. As I learn more, it would be nice to go back through and refactor or reorganize. Everything seems to work decently right now, but I would not be surprised to learn there might be better ways to do things. It was a great learning experience though, and I'm actually really proud of it right now!

I styled this off of [Typeform's form styles](https://www.typeform.com/templates/t/trivia/), because I love the way they look and act. However, I didn't have time to implement all the nice keyboard interactions for selecting items and progressing. So I would love to go back and add those things in.

I'd also like to show the question number on each page, so user's always know what number they're on and how far they have to go. Either the actual number or a progress bar would be really nice for this.

I'm also not sure why my landing pages are adding in a vertical scroll - all my debugging has turned up nothing. For now it's just a minor annoyance, but I'd really like to track that down and get rid of that, as it's not necessary.

I'd love to go through and add some tests to this. I think testing is really important and honestly could probably have made some of this easier to build and figure out - I just ran out of time. I think the size and scope of this project would be perfect for going through and adding tests in, to help me refactor and start to really understand some test suites.

## Build Scripts

> ✨ Bootstrapped with Create Snowpack App (CSA).

This project uses Snowpack and React. To run it locally, you'll want to run `npm install` first, then the `npm start` script will set up your dev server and let you see the project locally. This will run Snowpack with [this React template](https://github.com/snowpackjs/snowpack/tree/master/create-snowpack-app/app-template-react), which will add React, Snowpack, and some basic testing packages to your project. Then you should be good to go!

### npm start

Runs the app in the development mode.
Open <http://localhost:8080> to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" to your `snowpack.config.js` config file.

### npm test

Launches the application test runner.
Run with the `--watch` flag (`npm test -- --watch`) to run in interactive watch mode.
