# requirments/steup
- node v17.4.0
- `npm install`

# building

`npx tsc`

will build index.ts file and output to `.\dist\index.js`

# usage

## Show Help

`node .\dist\index.js --help`

## Merge 2 chat json files and output json 

`node .\dist\index.js --input INPUT_FILE_A --input INPUT_FILE_B --output OUTPUT_FILE`

note: each json file should adhere to the hinge_match interface


```
interface hinge_match{
  chats:chat[];
  match:match[];
  we_met:we_met[];
}
```