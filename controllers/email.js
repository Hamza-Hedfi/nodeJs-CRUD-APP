const Email = require('../models/email');

exports.getAddEmail = (req, res, next) => {
  res.render('edit-email', {
    pageTitle: 'Add Email',
    path: '/add-email',
    editing: false
  });
};

exports.postAddEmail = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const _email = new Email(
    name,
    email,
  );
  _email
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Email');
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditEmail = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const mailId = req.params.emailId;
  Email.findById(mailId)
    .then(email => {
      if (!email) {
        return res.redirect('/');
      }
      res.render('edit-email', {
        pageTitle: 'Edit Email',
        path: '/edit-email',
        editing: editMode,
        email: email
      });
    })
    .catch(err => console.log(err));
};

exports.postEditEmail = (req, res, next) => {
  const mailId = req.body.emailId;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;

  const email = new Email(
    updatedName,
    updatedEmail,
    mailId
  );
  email
    .save()
    .then(result => {
      console.log('UPDATED EMAIL!');
      res.redirect('/');
    })
    .catch(err => console.log(err));
};

exports.getEmails = (req, res, next) => {
  Email.fetchAll()
    .then(emails => {
      res.render('index', {
        mails: emails,
        pageTitle: 'Admin Emails',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteEmail = (req, res, next) => {
  const mailId = req.body.emailId;
  Email.deleteById(mailId)
    .then(() => {
      console.log('DESTROYED EMAIL');
      res.redirect('/');
    })
    .catch(err => console.log(err));
};
