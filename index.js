
const express = require("express");
const cors = require("cors");
const app = express();
const member = require('./controllers/members.controller');
const profile = require('./controllers/profile.controller');
const article = require('./controllers/article.controller');
const multerMiddleware = require('./middleware/multerMiddleware');


var corsOptions = {
       origin: "https://securitycam.herokuapp.com"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
       extended: true
}));
app.use(function (req, res, next) {
       res.header(
              "Access-Control-Allow-Headers",
              "x-access-token, Origin, Content-Type, Accept"
       );
       next();
});

// fileUploadMiddleware("image", app)

app.get('/', (req, res, next) => {
       res.status(200).json({
              status: 'success',
              data: {
                     name: 'securitycam API',
                     version: '0.1.0'
              }
       });

});

app.post('/article', [multerMiddleware.single('image')], async (req, res, next) => {
       try {
              const result = await article.save(req.body, req.file);
              res.status(200).json({
                     status: 'success',
                     data: result
              });
       } catch (error) {
              res.status(400).json({
                     status: 'error',
                     error: error
              });
       }

});

app.post('/profile', async (req, res, next) => {
       try {
              const result = await profile.save(req.body);
              res.status(200).json({
                     status: 'success',
                     data: result
              });
       } catch (error) {
              res.status(400).json({
                     status: 'error',
                     error: error
              });
       }
});

app.post('/member', [multerMiddleware.single('photo')], async (req, res, next) => {
       try {
              const result = await member.save(req.body, req.file);
              res.status(200).json({
                     status: 'success',
                     data: result
              });
       } catch (error) {
              res.status(400).json({
                     status: 'error',
                     error: error
              });
       }
});

app.put('/member/:id', async (req, res, next) => {
       try {
              const result = await member.update(req.body, req.params.id);
              res.status(200).json({
                     status: 'success',
                     data: result
              });
       } catch (error) {
              res.status(400).json({
                     status: 'error',
                     error: error
              });
       }
});

const port = 8080;

app.listen(port, () => {
       console.log(`server running in port ${port}`);
});
