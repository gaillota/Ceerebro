CredentialsForm = new SimpleSchema({
    domain: {
        type: String,
        label: 'Domain',
        autoform: {
            autofocus: true,
            autocomplete: false
        }
    },
    identifier: {
        type: String,
        label: 'Identifier',
        autoform: {
            autocomplete: false
        }
    },
    password: {
        type: String,
        label: 'Password',
        autoform: {
            type: 'password',
            autocomplete: false
        }
    }
});