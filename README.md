## Progress report emailer

A little tool to help send progress reports to students

## How to use

- run `yarn` to install dependencies
- run `yarn init-env` to create a .env file, fill the new .env file with the correct information
- create a `students.json` in the data directory. This should be the following structure:

```json
[
    {
        "name":"Homer Simpson",
        "email":"homer@nuclear.plant"
    },
    ...
]
```
- Move the reports created by the site into the folder `data/reports`
- run with `yarn start`