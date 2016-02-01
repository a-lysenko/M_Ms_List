
module.exports = function(mongoose) {
    var menteeSchema = mongoose.Schema({
        name: {type: String, default: ''},
        surname: {type: String, default: ''},
        mail: {type: String, default: ''},
        phone: {type: String, default: ''},
        photoURL: {type: String, default: ''}
    });

    var mentorSchema = mongoose.Schema({
        name: {type: String, default: ''},
        surname: {type: String, default: ''},
        mail: {type: String, default: ''},
        phone: {type: String, default: ''},
        photoURL: {type: String, default: ''},
        mentees: {type: [mongoose.Schema.ObjectId], default: []}
    });

    Mentee = mongoose.model('mentees', menteeSchema);
    Mentor = mongoose.model('mentors', mentorSchema);

    return {
        Mentee: Mentee,
        Mentor: Mentor
    };
};

