// Autoform error hook
AutoForm.addHooks(null, {
    onError: function (formType, error) {
        //Alert is already displayed on form
        if (formType == 'pre-submit validation') {
            return;
        }

        throwAlert(error.reason);
    }
});

NProgress.configure({
    showSpinner: false
});