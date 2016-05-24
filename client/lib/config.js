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

NProgress.configure({
    showSpinner: false
});