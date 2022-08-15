const fs = require('fs');
const chalk = require('chalk');
const readline = require('readline');
const validator = require('validator');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

const dirPath = './data';

//checking directory
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

//cheking file exist or not
const nameFile = './data/contacts.json';
if (!fs.existsSync(nameFile)) {
  fs.writeFileSync(nameFile, '[]', 'utf-8');
}

// const question1 = () => {
//   return new Promise((resolve, rejects) => {
//     rl.question('Input Your Name :', (name) => {
//       resolve(name);
//     });
//   });
// };
// const question2 = () => {
//   return new Promise((resolve, rejects) => {
//     rl.question('Input Your Email :', (email) => {
//       resolve(email);
//     });
//   });
// };
// const question3 = () => {
//   return new Promise((resolve, rejects) => {
//     rl.question('Input Your Number :', (number) => {
//       resolve(number);
//     });
//   });
// };

// const TypeQuestion = (question) => {
//   return new Promise((resolve, rejects) => {
//     rl.question(question, (name) => {
//       resolve(name);
//     });
//   });
// };

//load contacts
const loadContact = () => {
  const readFile = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(readFile);
  return contacts;
};

//retrive data
const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.green.inverse.bold('List : Contact Phone.. '));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name}-${contact.number}`);
  });
};

//insert data
const addContact = (name, email, number) => {
  const contact = { name, email, number };
  const contacts = loadContact();
  //   const readFile = fs.readFileSync('data/contacts.json', 'utf-8');
  //   const contacts = JSON.parse(readFile);

  //check duplicate
  const checkName = contacts.find((contact) => contact.name === name);
  if (checkName) {
    console.log(
      chalk.red.inverse.bold(
        'Your Name Contact, is Exist, please use another name..'
      )
    );
    return false;
  }

  if (email) {
    if (!validator.isEmail(email)) {
      console.log(
        chalk.red.inverse.bold(
          'Your Email Contact, is not Valid, please use valid Email..'
        )
      );
      return false;
    }
  }
  if (!validator.isMobilePhone(number, 'id-ID')) {
    console.log(
      chalk.red.inverse.bold(
        'Your Number Phone Contact, is not Valid, please use valid Number Phone..'
      )
    );
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
  console.log(chalk.blue.inverse.bold('Thanks, Your Data Has been Added..!'));
  //   rl.close();
};

const detailContact = (name) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (!contact) {
    console.log(
      chalk.red.inverse.bold(`Opps..!  This Name ${name}  Not Found.. `)
    );
    return false;
  }
  console.log(chalk.green.inverse.bold('Data Found..!'));

  console.log(chalk.blue.inverse.bold(`Name : ${contact.name}`));
  console.log(chalk.blue.inverse.bold(`Email : ${contact.email}`));
  console.log(chalk.blue.inverse.bold(`Number : ${contact.number}`));
};

const deleteContact = (name) => {
  const contacts = loadContact();
  const newList = contacts.filter(
    (contact) => contact.name.toLowerCase() != name.toLowerCase()
  );
  if (contacts.length === newList.length) {
    console.log(
      chalk.red.inverse.bold(`Opps..!  This Name ${name}  Not Found.. `)
    );
    return false;
  }
  fs.writeFileSync('data/contacts.json', JSON.stringify(newList));
  console.log(
    chalk.blue.inverse.bold(`Success, This Contact ${name} Deleted..!`)
  );
};

module.exports = { listContact, addContact, detailContact, deleteContact };
