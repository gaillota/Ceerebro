Template.credentials.helpers({
    credentials: function() {
        return Credentials.find({}, {
            sort: {
                createdAt: -1
            }
        });
    }
});