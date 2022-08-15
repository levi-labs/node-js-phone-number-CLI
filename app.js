const yargs = require('yargs');
const {
  addContact,
  listContact,
  detailContact,
  deleteContact,
} = require('./contacts');

yargs
  .command({
    command: 'add',
    describe: 'Adding new Contact',
    builder: {
      name: {
        describe: 'Full Name',
        demandOption: true,
        type: 'string',
      },
      email: {
        describe: 'Email',
        demandOption: false,
        type: 'string',
      },
      number: {
        describe: 'Number Phone',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      addContact(argv.name, argv.email, argv.number);
      // const contact = {
      //   name: argv.name,
      //   email: argv.email,
      //   number: argv.number,
      // };
      //console.log(contact);
    },
  })
  .demandCommand();

//Retrive
yargs.command({
  command: 'list',
  describe: 'Retrive all data Name and Number Phone',
  handler() {
    listContact();
  },
});

//detail contact
yargs.command({
  command: 'detail',
  describe: 'Show Detail Contact',
  builder: {
    name: {
      describe: 'Full Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    detailContact(argv.name);
  },
});

yargs.command({
  command: 'delete',
  describe: 'delete contact',
  builder: {
    name: {
      describe: 'Full Name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    deleteContact(argv.name);
  },
});
yargs.parse();

// const { TypeQuestion, addContact } = require('./contacts');

// const main = async () => {
//   const name = await TypeQuestion('Input Your Name :');
//   const email = await TypeQuestion('Input Your Email :');
//   const number = await TypeQuestion('Input Your Number :');

//   addContact(name, email, number);
// };

// main();
// rl.question('Input Your Name :', (name) => {
//   rl.question('Input Number Phone', (number) => {
//     const contact = { name, number };
//     const readFile = fs.readFileSync('data/contacts.json', 'utf-8');
//     const contacts = JSON.parse(readFile);

//     contacts.push(contact);

//     fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
//     rl.close();
//   });
// });
