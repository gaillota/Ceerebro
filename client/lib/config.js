//Meteor.startup(function() {
//    return SEO.config({
//        title: 'Ceerebro',
//        meta: {
//            'description': 'Ceerebro is a secure credentials storage platform',
//            'viewport': 'width=device-width, initial-scale=1, maximum-scale=1',
//            'mobile-web-app-capable': 'yes',
//            'apple-mobile-web-app-capable': 'yes'
//        },
//        link: {
//            'icon': 'favicon.png',
//            'apple-touch-icon': 'apple-touch-icon-precomposed.png',
//            'manifest': 'manifest.json'
//        }
//    });
//});

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

// Hide spinner for NProgress bar
NProgress.configure({
    showSpinner: false
});