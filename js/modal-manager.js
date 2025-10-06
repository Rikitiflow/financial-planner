// Modal Manager - Handles all modal operations
console.log('🔲 Loading modal manager...');

class ModalManager {
    constructor() {
        this.activeModals = new Set();
        this.setupModalEventListeners();
        Utils.log('Modal manager initialized', 'success');
    }

    setupModalEventListeners() {
        // Setup close button listeners for all modals
        document.addEventListener('click', (e) => {
            // Close button clicked
            if (e.target.matches('.modal-close, [id*="close"], [id*="cancel"]')) {
                e.preventDefault();
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.close(modal.id);
                }
            }
            
            // Click outside modal to close
            if (e.target.classList.contains('modal')) {
                this.close(e.target.id);
            }
        });

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModals.size > 0) {
                const lastModal = Array.from(this.activeModals).pop();
                this.close(lastModal);
            }
        });

        Utils.log('Modal event listeners setup', 'debug');
    }

    open(modalId, options = {}) {
        Utils.log(`Opening modal: ${modalId}`, 'debug');
        
        const modal = document.getElementById(modalId);
        if (!modal) {
            Utils.log(`Modal not found: ${modalId}`, 'error');
            return false;
        }

        // Reset form if it exists
        const form = modal.querySelector('form');
        if (form && options.resetForm !== false) {
            form.reset();
        }

        // Set modal title if provided
        if (options.title) {
            const titleElement = modal.querySelector('.modal-title, h2, h3');
            if (titleElement) {
                titleElement.textContent = options.title;
            }
        }

        // Populate dropdowns if callback provided
        if (options.populateCallback && typeof options.populateCallback === 'function') {
            options.populateCallback();
        }

        // Show modal
        modal.style.display = 'flex';
        this.activeModals.add(modalId);

        // Disable body scroll
        if (this.activeModals.size === 1) {
            document.body.style.overflow = 'hidden';
        }

        // Focus first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input, select, textarea');
            if (firstInput) {
                firstInput.focus();
            }
        }, 100);

        Utils.log(`Modal opened: ${modalId}`, 'success');
        return true;
    }

    close(modalId) {
        Utils.log(`Closing modal: ${modalId}`, 'debug');
        
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }

        this.activeModals.delete(modalId);

        // Restore body scroll if no modals are open
        if (this.activeModals.size === 0) {
            document.body.style.overflow = '';
            document.body.style.overflowY = 'auto';
        }

        Utils.log(`Modal closed: ${modalId}`, 'success');
        return true;
    }

    closeAll() {
        Utils.log('Closing all modals', 'debug');
        
        this.activeModals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
            }
        });

        this.activeModals.clear();
        document.body.style.overflow = '';
        document.body.style.overflowY = 'auto';

        Utils.log('All modals closed', 'success');
    }

    isOpen(modalId) {
        return this.activeModals.has(modalId);
    }

    getActiveModals() {
        return Array.from(this.activeModals);
    }

    // Specific modal opening methods
    openTransaction(editMode = false, transactionId = null) {
        const title = editMode ? 'Editar Movimiento' : 'Agregar Movimiento';
        
        this.open('transactionModal', {
            title: title,
            populateCallback: () => {
                this.populateTransactionDropdowns();
                if (editMode && transactionId) {
                    this.populateTransactionForm(transactionId);
                }
            }
        });
    }

    openTransfer(editMode = false, transferId = null) {
        const title = editMode ? 'Editar Transferencia' : 'Nueva Transferencia';
        
        this.open('transferModal', {
            title: title,
            populateCallback: () => {
                this.populateTransferDropdowns();
                if (editMode && transferId) {
                    this.populateTransferForm(transferId);
                }
            }
        });
    }

    openPerson(editMode = false, personId = null) {
        const title = editMode ? 'Editar Persona' : 'Agregar Persona';
        
        this.open('personModal', {
            title: title,
            populateCallback: () => {
                if (editMode && personId) {
                    this.populatePersonForm(personId);
                }
            }
        });
    }

    openAccount(editMode = false, accountId = null) {
        const title = editMode ? 'Editar Cuenta' : 'Agregar Cuenta';
        
        this.open('accountModal', {
            title: title,
            populateCallback: () => {
                this.populateAccountDropdowns();
                if (editMode && accountId) {
                    this.populateAccountForm(accountId);
                }
            }
        });
    }

    openCategory(editMode = false, categoryId = null) {
        const title = editMode ? 'Editar Categoría' : 'Agregar Categoría';
        
        this.open('categoryModal', {
            title: title,
            populateCallback: () => {
                if (editMode && categoryId) {
                    this.populateCategoryForm(categoryId);
                }
            }
        });
    }

    // Dropdown population methods
    populateTransactionDropdowns() {
        if (window.app && window.app.dataManager) {
            this.populateSelect('transactionAccount', window.app.dataManager.get('accounts'), 'Seleccionar cuenta');
            this.populateSelect('transactionCategory', window.app.dataManager.get('categories'), 'Seleccionar categoría');
            this.populateSelect('transactionPerson', window.app.dataManager.get('people'), 'Seleccionar persona');
        }
    }

    populateTransferDropdowns() {
        if (window.app && window.app.dataManager) {
            const accounts = window.app.dataManager.get('accounts');
            this.populateSelect('fromAccount', accounts, 'Cuenta origen');
            this.populateSelect('toAccount', accounts, 'Cuenta destino');
        }
    }

    populateAccountDropdowns() {
        if (window.app && window.app.dataManager) {
            this.populateSelect('accountPerson', window.app.dataManager.get('people'), 'Seleccionar persona');
        }
    }

    populateSelect(selectId, items, placeholder) {
        const select = document.getElementById(selectId);
        if (select) {
            select.innerHTML = `<option value="">${placeholder}</option>`;
            items.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.name;
                select.appendChild(option);
            });
        }
    }

    // Form population methods (for editing)
    populateTransactionForm(transactionId) {
        // TODO: Implement transaction form population
        Utils.log(`Populating transaction form: ${transactionId}`, 'debug');
    }

    populateTransferForm(transferId) {
        // TODO: Implement transfer form population
        Utils.log(`Populating transfer form: ${transferId}`, 'debug');
    }

    populatePersonForm(personId) {
        // TODO: Implement person form population
        Utils.log(`Populating person form: ${personId}`, 'debug');
    }

    populateAccountForm(accountId) {
        // TODO: Implement account form population
        Utils.log(`Populating account form: ${accountId}`, 'debug');
    }

    populateCategoryForm(categoryId) {
        // TODO: Implement category form population
        Utils.log(`Populating category form: ${categoryId}`, 'debug');
    }
}

console.log('✅ Modal manager loaded successfully');
