const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const uploadFile = require('express-fileupload');

const app = express();
app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(uploadFile());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info', { layout: 'dark'});
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.post('/contact/send-message', (req, res) => {

  const { author, sender, title, message } = req.body;
  const startup_image = req.files.file;

  if(author && sender && title && message && startup_image) {
    startup_image.mv(__dirname + '/public/' + startup_image.name, function(err) {
      if(err){
        console.log(err);
      }else{
        console.log("uploaded");
      }})
    res.render('contact', {isSent: true, file: startup_image.name});
  }
  else {
    res.render('contact', {isError: true})
  }
});;

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});