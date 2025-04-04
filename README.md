# 365Talents technical test

## Project Management

Open [slides.html](slides.html) file in a browser to visualize the presentation.

## Scripting

### Pre-requisites

- Node.js v22.14.0

### Installation

```bash
npm ci
```

### Run script

```bash
# For dev use
npm run dev

# For production use
npm run build
npm run start
```

The script will run and generate the Excel file in `output` folder.

### Run formatting, linting and tests

```bash
npm run format # Formatting
npm run lint # Linting
npm run test # Tests
```

### Project analysis

Two possible approaches:

#### The fastest

- We consider each line from the CSV as a composer, even if it's an aggregate of different composers.
- This makes the processing faster, but we don't protect against all duplicates if we want a list of each artist who is a composer.

#### The most precise (selected approach)

- We need to parse each line of the CSV to extract the different composers of each track.
- The result is thus more precise.
- However, there are problems with the initial list because there is no data normalization.
  - We are therefore forced to determine a list of rules to apply:
    - separate composers via different symbols (e.g. "&", ",", "-").
    - Some composers are recorded with mistakes in their names, which makes duplication inevitable.
    - Some symbols are used to split (e.g. "," and "/") but are also used in composer names (e.g. AC/DC).
    - We can therefore set up a kind of exclusion list to consider certain composers as valid and therefore should not be split.
    - The choice is made in this exercise not to look for all possible cases. In a real situation, we would need to agree upfront on data normalization.
    - In cases where normalization would not be possible, we would need to estimate the possibility of going through all specific cases.

In our case, not all users have been uniquely split across all lines because of this normalization problem.
