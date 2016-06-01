// Autoform error hook
AutoForm.addHooks(null, {
    onError: function (formType, error) {
        //Alert is already displayed on form
        if (formType == 'pre-submit validation') {
            return;
        }

        notify(error.toString());
    }
});

// Hide spinner for NProgress bar
NProgress.configure({
    showSpinner: false
});