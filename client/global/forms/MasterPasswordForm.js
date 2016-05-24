MasterPasswordForm = new SimpleSchema({
    password: {
        type: String,
        label: "Your master password",
        autoform: {
            type: "password",
            autofocus: true
        }
    }
});