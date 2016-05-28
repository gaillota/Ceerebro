LoginForm = new SimpleSchema({
    email: {
        type: String,
        label: 'E-mail address / Username',
        autoform: {
            type: 'email',
            autofocus: true
        }
    },
    password: {
        type: String,
        label: 'Password',
        autoform: {
            type: 'password'
        }
    }
    //remember: {
    //    type: Boolean,
    //    label: 'Remember me',
    //    autoform: {
    //        type: 'boolean-checkbox'
    //    }
    //}
});