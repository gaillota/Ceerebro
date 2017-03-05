import {Blaze} from 'meteor/blaze';

export const Modal = {
    autofocus: false,
    $currentModal: null,
    show(modalName, data, options = {}) {
        const body = document.body;
        const modal = Blaze.renderWithData(modalName, data, body);
        const $modal = modal._domrange.$('.modal');

        if (this.autofocus) {
            $modal.on('shown.bs.modal', (e) => $modal.find('[autofocus]').focus());
        }

        console.log('$modal object', $modal);

        $modal.on('hidden.bs.modal', (e) => {
            console.log('modal hidden');
            Blaze.remove(modal);
            this.$currentModal = null;
        });

        this.$currentModal = $modal;
        $modal.modal(options);
    },
    hide(template) {
        if (template && template instanceof Blaze.TemplateInstance) {
            template.$('.modal').modal('hide');
        } else if (this.$currentModal) {
            console.log('hidding modal');
            this.$currentModal.modal('hide');
        }
    }
};
