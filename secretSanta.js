var nodemailer = require('nodemailer');
var _ = require('lodash');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

var namesOrdered = [["Sarah","email1"],
             ["Martha","email2"],
             ["Bridget","email3"],
             ["Eva","email4"],
             ["Naomi","email5"]];
var mapping = [[1,2],[2,3],[3,4],[4,0],[0,1]];

var names = _.shuffle(namesOrdered);

var arr = [];
var i;
for (i = 0; i < names.length; i++) {
    console.log(names[i][1] + '@gmail.com')
    console.log(names[i][0] + ' is giving to '+names[mapping[i][0]][0]+' and '+names[mapping[i][1]][0])

    var mailOptions = {
        from: 'brmhallsecretsanta@gmail.com',
        to: names[i][1] + '@gmail.com',
        subject: 'Secret Santa from Bridget',
        text: 'Hi there '+ names[i][0]+'! You are giving to ' + names[mapping[i][0]] +' and '+names[mapping[i][1]][0]
      };

      arr.push(mailOptions);
}

let secretSantaSummary = names[0][0] + ' is giving to ' + names[1][0] + ' and ' + names[2][0] + '\n';
secretSantaSummary += names[1][0] + ' is giving to ' + names[2][0] + ' and ' + names[3][0] + '\n';
secretSantaSummary += names[2][0] + ' is giving to ' + names[3][0] + ' and ' + names[4][0] + '\n';
secretSantaSummary += names[3][0] + ' is giving to ' + names[4][0] + ' and ' + names[0][0] + '\n';
secretSantaSummary += names[4][0] + ' is giving to ' + names[0][0] + ' and ' + names[1][0] + '\n';

console.log(secretSantaSummary);


var summaryEmail = {
    from: 'brmhallsecretsanta@gmail.com',
    to: 'bridget.hall1@gmail.com',
    subject: 'Secret Santa from Bridget',
    text: 'Hi Mum, Here is a list of the Secret Santas and who has who: \n ' + secretSantaSummary
};
var transporter;

readline.question('email password pls', password => {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'brmhallsecretsanta@gmail.com',
      pass: password
    }
  });

  transporter.sendMail(summaryEmail, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });

    arr.forEach(element => {
      transporter.sendMail(element, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
    });
  readline.close();

});


    
