module.exports = function (app, mongoose) {
    var model = require('./model')(mongoose);

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    app.get('/get_AllMentors', function (req, res) {
        model.Mentor.find({}, function (err, docs) {
            res.send({mentors: docs, error: !!err});
        });
    });

    app.get('/get_Mentor/:id', function (req, res) {
        model.Mentor.findById(req.params['id'], function (err, doc) {
            res.send({mentor: doc, error: !!err});
        });
    });

    app.post('/add_Mentor', function (req, res) {
        var mentor = new model.Mentor(req.body);
        mentor.save(function (err, data) {
            res.json({err: err, data: data});
        });
        res.json({err: false, data: req.body});
    });


    app.get('/get_AllMentees', function (req, res) {
        model.Mentee.find({}, function (err, docs) {
            res.send({mentees: docs, error: !!err});
        });
    });

    app.get('/get_Mentee/:id', function (req, res) {
        model.Mentee.findById(req.params['id'], function (err, doc) {
            res.send({mentee: doc, error: !!err});
        });
    });

    app.post('/add_Mentee', function (req, res) {
        var mentee = new model.Mentee(req.body);
        mentee.save(function (err, data) {
            res.json({err: err, data: data});
        });
        res.json({err: false, data: req.body});
    });

    app.get('/get_MentorMentees', function (req, res) {
        var menteeIds;
        if (req.query.qty == 1) {
            menteeIds = [req.query.menteeIds];
        } else {
            menteeIds = req.query.menteeIds;
        }

        model.Mentee.find({_id: {$in: menteeIds}}, function (err, docs) {
            res.send({mentees: docs, error: err});
        });
    });


    app.post('/assign_Mentee', function (req, res) {
        var mentees = req.body.mentees;
        mentees.push(req.body.menteeId);

        model.Mentor.findByIdAndUpdate(req.body.mentorId, {$set: {mentees: mentees}}, function (err, doc) {
            res.send({mentor: doc, error: !!err});
        });
    });

    app.post('/unassign_Mentee', function (req, res) {
        var mentees = req.body.mentees;
        var ind = mentees.indexOf(req.body.menteeId);
        mentees.splice(ind, 1);

        model.Mentor.findByIdAndUpdate(req.body.mentorId, {$set: {mentees: mentees}}, function (err, doc) {
            res.send({mentor: doc, error: !!err});
        });
    });

    app.post('/menteeChangePhotoURL', function (req, res) {
        var photoURL = req.body.photoURL;

        model.Mentee.findByIdAndUpdate(req.body.objectId, {$set: {photoURL: photoURL}}, function (err, doc) {
            res.send({object: doc, error: !!err});
        });
    });

    app.post('/mentorChangePhotoURL', function (req, res) {
        var photoURL = req.body.photoURL;

        model.Mentor.findByIdAndUpdate(req.body.objectId, {$set: {photoURL: photoURL}}, function (err, doc) {
            res.send({object: doc, error: !!err});
        });
    });

    app.post('/validatePersonData', function (req, res) {
        var rexExpStartFromCapital = /^[A-Z]/;

        var name = req.body.personData.name || '';
        var surname = req.body.personData.surname || '';

        var nameIsValid = name && rexExpStartFromCapital.test(name);
        var surnameIsValid = surname && rexExpStartFromCapital.test(surname);

        if (!nameIsValid || !surnameIsValid) {
            return res.status(403).send({
                nameIsValid: nameIsValid,
                surnameIsValid: surnameIsValid
            });
        }

        res.send(req.body.personData);
    });



    app.get('*', function (req, res) {
        res.sendFile(process.cwd() + '/public/index.html'); // load our public/index.html file
    });
};
