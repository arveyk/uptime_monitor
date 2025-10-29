import Imap from "imap";
import { inspect } from "util";
import dotenv from "dotenv";


console.log("Imap ok");
const TEST_EMAIL = "harveykisiangani@gmail.com";
const TEST_EMAIL_PWD = "brilliantinChrist!@&7";


const imap = new Imap({
  user: TEST_EMAIL,
  password: TEST_EMAIL_PWD,
  host: "imap.gmail.com",
  port: 993,
  tls: true
});

function openInbox(cb) {
  imap.openBox("INBOX", true, cb);
}

imap.once('ready', ()=> {
  openInbox((err, box)=> {
    if (err) throw err;

    let f = imap.seq.fetch('1:3', {
      bodies: 'HEADERS.FIELDS (FROM TO SUBJECT DATE)',
      struct: true
    });
    f.on('message', function(msg, seqno) {
      console.log("Message #%d", seqno);
      let prefix = '(#' + seqno + ') ';
      msg.on('body', (stream, info)=>{
        let buffer = '';
        stream.on('data', (chunk)=> {
	  buffer += chunk.toString('utf8');
	});
	stream.once('end', ()=> {
	  console.log(prefix + "Parsed Header: %s", inspect(Imap.parseHeader(buffer)))
	});
      });
      msg.once('attributes', function(attrs) {
        console.log(prefix + "Attributes: %s", inpect(attrs, false, 8));
      });
    });
    f.once('error', (err) => {
      console.log('Fetch error: ' + err);
    });
    f.once('end', ()=> {
      console.log('Done fetching all messages!');
      imap.end();
    });
  });
});

imap.once("error", (err) => {
  console.log(err);
});

imap.once("end",  ()=> {
  console.log("connnection ended");
})

imap.connect();
