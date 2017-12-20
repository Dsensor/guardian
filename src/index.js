#!/usr/bin/env node
'use strict';
const program = require('commander');
const inquirer = require('inquirer');
const getIP = require('external-ip')();
const LKNconnect = require('./lkn-libptop.js');

program
    .version('0.0.1')
    .usage('[options] <LKN>')
    .description('Living Knowledge Network Protocol')
    .option('-a, --address [addr]', 'Node identity')
    .option('-p, --port [port]', 'Port to connect')
    .parse(process.argv);

if(!program.args.length) {
  program.help();
}
else
{
console.log('LKN: ' + program.args);
console.log('Address: ' + program.address);
console.log('Port: ' + program.port);
//console.log(program);
    var questions = [
      {
        type: 'input',
        name: 'incommand',
        message: '>>>'
      }
    ];

    ask();
};

function ask() {

  inquirer.prompt(questions).then(function (answers) {
    if(answers.incommand == 'exit')
    {
console.log('original exit');
      // need to exit the DHT
      process.exit(1);
    }
    else if(answers.incommand == 'lkn')
    {
console.log('connecting to Living Knowledge Network');
      lknConnect(program.address, program.port);
    }
    else if(answers.incommand == 'dialer')
    {
console.log('Dailing up LKN');
      lknDialer(program.address, program.port);
    }
    else if(answers.incommand == 'consensus')
    {
console.log('starting consensus science cycle');
      consensus();
    }
    else if(answers.incommand != 'lkn' || answers.incommand != 'consensus' || answers.incommand != 'exit' )
    {
console.log('Command not recognised, please use help');
      ask();
    }
    else
    {
console.log('Stopped:', output.join(', '));
      process.exit(1);
    }
  });
};

function lknConnect (addressIn, portIn) {
console.log(addressIn);
console.log(portIn);
  var portnumber = parseInt(portIn);
  var liveLKN = new LKNconnect('listen');

  ask();

};

function lknDialer (addressIn, portIn) {
//console.log(addressIn);
//console.log(portIn);
  var portnumber = parseInt(portIn);
  var liveLKNdialer = new LKNconnect('dialer');

  ask();

};

function consensus() {

  var questionseed = [
    {
      type: 'input',
      name: 'scicycleid',
      message: 'Enter ID of Science Cycle:'
    },
    {
      type: 'input',
      name: 'guardsig',
      message: 'Guaridan signature:'
    },
    {
      type: 'input',
      name: 'knowledgescript',
      message: 'Knowledge Script:'
    }

  ];
  inquirer.prompt(questionseed).then(function (answerseed) {

    var output = [];
    output.push(answerseed.scicycleid);
    output.push(answerseed.guardsig);
    output.push(answerseed.knowledgescript);
console.log('Consensus message formed');
console.log(output);
    if(answerseed.knowledgescript)
    {
      //  now send message to LKN
      lknMessage(output);

    }
  });

};

function lknMessage(seedIn) {
console.log('form Knowledge Scripting Language for Consensus Science Cycle');
  ask();

};
