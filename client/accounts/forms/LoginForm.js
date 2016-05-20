LoginForm = new SimpleSchema({
    email: {
        type: String,
        label: 'E-mail address / Username'
    },
    password: {
        type: String,
        label: 'Password',
        autoform: {
            type: 'password'
        }
    }
});