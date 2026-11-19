# Cube Lab

Cube Lab is a trainer for the 2x2 and 3x3 Rubik's Cube. A switch at the top changes the puzzle.

## Features

### 2x2

- Learn every CLL, EG-1, EG-2, and Ortega case. Each case has a diagram, a recognition tip, alternate algorithms, and a 3D cube that plays the algorithm.
- Mark each case as new, learning, learned, or mastered, and pick the algorithm you use. After timed solves, Cube Lab suggests moving a case up (or back down) when your times support it.
- Flashcards for recognition, either self-graded or timed, as a diagram or a 3D cube you turn.
- Case timer with three modes. Scramble times a real scramble into the case, Alg only times the algorithm from a short setup, and Attack times every algorithm in your chosen sets back to back.
- First side practice times a random scramble through the first face or layer and then shows the shortest one.
- One-look drill for reading the case before you start.

### 3x3

- Learn all 21 PLL, 57 OLL, and 41 F2L cases, plus the 16 cases of 2-look OLL and PLL.
- All 472 ZBLL cases (turn them on in Settings), sorted into the T, U, L, H, Pi, Sune, and Anti-Sune sets and then into groups of 12 that share a corner case.
- Flashcards with three modes: self-check, timed, and Pick the case (name it from a list). Show each case from the top, from two sides, or on a 3D cube you turn.
- One-look drill: predict the OLL your last pair leaves, the PLL your OLL leaves, or the ZBLL case, with full or 2-look options. Lookahead solves time F2L and how long you take to recognize each case.
- Case timer with Algs, Cross, and F2L practice. Cross practice lets you pick how many moves the best cross takes and shows that cross after you stop. F2L practice starts each scramble with the cross already solved.

### Both puzzles

- Full solve timer with WCA inspection, practice and competition sessions, and averages that follow WCA rules in competition sessions.
- Splits that record each step of a solve (first side and last layer on the 2x2; cross, F2L, OLL, and PLL on the 3x3).
- A target time for each session, a chart for each session, and a chart of your best and average for each day.
- An auto solver that shows a step-by-step solution for any scramble.
- Status filters in the case timer, flashcards, and recognition drill, so you can train any mix of unlearned, learning, learned, and mastered cases.
- Color neutral mode, which uses every color in case scrambles and practice modes.
- A backup code that moves all of your progress to another device.
- Import from and export to csTimer.
- Dark mode.

## Install and offline use

Cube Lab is an installable web app. Open it once with internet, then add it to your home screen. After that it opens and works with no connection, and your progress stays on the device. On iPhone, tap Share in Safari and then Add to Home Screen. On Android, open the Chrome menu and tap Install app (or Add to Home screen).

Updates install quietly. Each time Cube Lab opens online, the newest version downloads in the background and runs the next time you open it.

## Algorithm credits

The 2x2 algorithms come from CubingApp, Speedcube.com.au, SpeedCubeDB, and Speedcube.us. Cube Lab's own solver generated the few that none of those sites list.

The 3x3 algorithms come from SolveTheCube and from standard algorithms that most cubers learn. The ZBLL algorithms come from SpeedCubeDB, by way of the MIT-licensed [@moishy/algsets](https://github.com/moishy-r/moishy-cubing) collection. Cube Lab sorts each case into its set by checking its corners.

## License

MIT. See `LICENSE`.
