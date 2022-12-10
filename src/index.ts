import commandLineArgs, { CommandLineOptions } from "command-line-args";
import commandLineUsage,{ Section } from 'command-line-usage';
import  { hinge_match } from './interfaces/hinge';
import * as fs from 'fs';
import path from "path";

interface chatModel{
  body:string;
  timestamp:Date;
  name:string;
}

const optionList =  [
  {
    name: 'input',
    description: 'The input chat files to process',
    type: String,
    multiple: true,
    defaultOption: true,
    alias: 'i',
    typeLabel: '{underline file} ...'
  },
  {
    name: 'output',
    description: 'The output of the merged chat json',
    type: String,
    alias: 'o',
    typeLabel: '{underline file} ...'
  },
  {
    name: 'help',
    description: 'Print this usage guide.',
    alias: 'h',
    type: Boolean
  }
];

const sections:Section[] = [
  {
    header: 'Hinge Merge',
    content: 'Merges two hinge match chats together.'
  },
  {
    header: 'Options',
    optionList:optionList
  }
];

const options:CommandLineOptions = commandLineArgs(optionList);
if(options["help"]){
  const usage = commandLineUsage(sections)  
  console.log(usage);
  process.exit();
}

//console.log(options);

let mergedChat:chatModel[] = [];

if(options['input']){
  const inputs:string[] = options['input'];

  const chats = inputs.map(input => {
    console.log(`parsing: "${input}" ...`)
    const rawdata = fs.readFileSync(input, 'utf8')
    var fileName = path.parse(input);

    const match:hinge_match = JSON.parse(rawdata);

    return match.chats.map<chatModel>(chat => {
      return {
        body:chat.body,
        timestamp:chat.timestamp,
        name:fileName.name
      }
    });
  })
  

  mergedChat = [].concat.apply([],chats)
    .sort((a, b) => dateSort(a.timestamp, b.timestamp));

  for(const chat of mergedChat){
    //console.log(`${chat.name} (${(new Date(chat.timestamp))}): ${chat.body}`);
  }
}

if(options['output']){
  fs.writeFile(
    options['output'], 
    JSON.stringify(mergedChat, null, 4), 
    err => {
      if (err) {
        throw err;
      }
      console.log(`wrote chat json output to "${options['output']}"`);
    });
}

function dateSort(a:Date,b:Date){
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}