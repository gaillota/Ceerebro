Template.masterKeyButton.events({
    'click .js-set-key': function(event) {
        event.preventDefault();
        Modal.show('masterPasswordModal');
    },
    'click .js-remove-key': function(event) {
        event.preventDefault();
        removeMasterKey();
    }
});