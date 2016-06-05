var scrollTriggerHeight = 100;
var credentialsIncrement = 10;

Template.credentials.hooks({
    created: function() {
        var self = this;

        self.limit = new ReactiveVar(credentialsIncrement);
        self.autorun(function() {
            Meteor.subscribe('credentials', self.limit.get());
        });
    },
    rendered: function() {
        var self = this;

        $(window).scroll(function() {
            // Fetch more credentials when scroll enters the last 100 px
            if ($(window).scrollTop() + $(window).height() > $(document).height() - scrollTriggerHeight) {
                increaseCredentials(self);
            }
        });
    }
});

Template.credentials.helpers({
    countCredentials: function() {
        return Counts.get('totalCredentials');
    },
    credentials: function() {
        return Credentials.find({
            owner: Meteor.userId()
        }, {
            sort: {
                domain: 1
            }
        });
    },
    editButtonState: function() {
        return Session.get('masterKey') ? '' : 'disabled';
    },
    hasMoreCredentials: function() {
        return Credentials.find({ owner: Meteor.userId() }).count() < Counts.get('totalCredentials');
    }
});

Template.credentials.events({
    'click .js-credentials-see': function() {
        var masterKey = Session.get('masterKey');
        if (!masterKey) {
            Session.set('passwordOnHold', this._id);
            Modal.show('masterPasswordModal');
            return;
        }

        Modal.show('showCredentialsModal', this._id);
    },
    'click .js-credentials-remove': function() {
        if (confirm('Are you sure ?')) {
            Meteor.call('removeCredentials', this._id, function(error) {
                if (error) {
                    toastr.error(error.toString());
                }
            });
        }
    },
    'click .js-more': function(event, template) {
        event.preventDefault();

        increaseCredentials(template);
    }
});

function increaseCredentials(template) {
    if (template.limit.get() < Counts.get('totalCredentials')) {
        template.limit.set(template.limit.get() + credentialsIncrement);
    }
}