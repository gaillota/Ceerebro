CredentialsForm = new SimpleSchema({
    domain: {
        type: String,
        label: 'Domain'
    },
    identifier: {
        type: String,
        label: 'Identifier'
    },
    password: {
        type: String,
        label: 'Password',
        autoform: {
            type: 'password'
        }
    }
});