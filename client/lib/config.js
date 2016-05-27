Meteor.startup(function() {
    return SEO.config({
        title: 'Ceerebro',
        meta: {
            'description': 'Ceerebro is a secure credentials storage platform',
            'viewport': 'width=device-width, initial-scale=1, maximum-scale=1',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes'
        },
        link: {
            'icon': 'img/icons/favicon.ico',
            'apple-touch-icon': 'img/icons/favicon.ico',
            'manifest': 'manifest.json'
        }
    });
});

// Autoform error hook
AutoForm.addHooks(null, {
    onError: function (formType, error) {
        //Alert is already displayed on form
        if (formType == 'pre-submit validation') {
            return;
        }

        log(error);
        throwAlert(error.toString());
    }
});

// Hide spinner with for NProgress bar
NProgress.configure({
    showSpinner: false
});