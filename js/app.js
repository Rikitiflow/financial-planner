// Main Application - Coordinates all managers and handles main app logic
console.log('🚀 Loading main application...');

class FinancialPlannerApp {
    constructor() {
        Utils.log('Initializing Financial Planner App', 'info');
        
        // Initialize managers
        this.dataManager = new DataManager();
        this.modalManager = new ModalManager();
        this.tabManager = new TabManager();
        this.notificationManager = new NotificationManager();
        
        // App state
        this.language = localStorage.getItem(CONFIG.STORAGE_KEYS.LANGUAGE) || CONFIG.DEFAULT_LANGUAGE;
        this.isInitialized = false;
        
        Utils.log('App instance created successfully', 'success');
    }

    async init() {
        try {
            Utils.log('Starting app initialization...', 'info');
            
            // Force restore scroll
            this.forceRestoreScroll();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Apply translations
            this.applyTranslations();
            
            // Show default tab
            this.tabManager.showTab('dashboard');
            
            // Mark as initialized
            this.isInitialized = true;
            
            Utils.log('App initialized successfully!', 'success');
            this.notificationManager.success('Aplicación iniciada correctamente');
            
        } catch (error) {
            Utils.log(`Error initializing app: ${error.message}`, 'error');
            this.notificationManager.error('Error al iniciar la aplicación');
        }
    }

    setupEventListeners() {
        Utils.log('Setting up main event listeners', 'debug');
        
        // Dashboard buttons
        this.setupButton('addMovement', () => {
            Utils.log('Add Movement clicked', 'debug');
            this.modalManager.openTransaction();
        });

        this.setupButton('transfer', () => {
            Utils.log('Transfer clicked', 'debug');
            this.modalManager.openTransfer();
        });

        // Create buttons
        this.setupButton('createTransaction', () => {
            Utils.log('Create Transaction clicked', 'debug');
            this.modalManager.openTransaction();
        });

        this.setupButton('createPerson', () => {
            Utils.log('Create Person clicked', 'debug');
            this.modalManager.openPerson();
        });

        this.setupButton('createAccount', () => {
            Utils.log('Create Account clicked', 'debug');
            this.modalManager.openAccount();
        });

        this.setupButton('createCategory', () => {
            Utils.log('Create Category clicked', 'debug');
            this.modalManager.openCategory();
        });

        this.setupButton('createTransfer', () => {
            Utils.log('Create Transfer clicked', 'debug');
            this.modalManager.openTransfer();
        });

        // Settings button
        this.setupButton('settingsBtn', () => {
            Utils.log('Settings clicked', 'debug');
            this.modalManager.open('settingsModal');
        });

        // Form submissions
        this.setupFormSubmissions();

        // Language selector
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.language;
            languageSelect.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }

        Utils.log('Main event listeners setup complete', 'success');
    }

    setupButton(id, callback) {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                callback();
            });
            Utils.log(`Button "${id}" configured`, 'debug');
        } else {
            Utils.log(`Button "${id}" not found`, 'warning');
        }
    }

    setupFormSubmissions() {
        // Transaction form
        const transactionForm = document.getElementById('transactionForm');
        if (transactionForm) {
            transactionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveTransaction(new FormData(transactionForm));
            });
        }

        // Transfer form
        const transferForm = document.getElementById('transferForm');
        if (transferForm) {
            transferForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveTransfer(new FormData(transferForm));
            });
        }

        // Person form
        const personForm = document.getElementById('personForm');
        if (personForm) {
            personForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.savePerson(new FormData(personForm));
            });
        }

        // Account form
        const accountForm = document.getElementById('accountForm');
        if (accountForm) {
            accountForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveAccount(new FormData(accountForm));
            });
        }

        // Category form
        const categoryForm = document.getElementById('categoryForm');
        if (categoryForm) {
            categoryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveCategory(new FormData(categoryForm));
            });
        }

        Utils.log('Form submissions setup complete', 'debug');
    }

    // Save methods
    saveTransaction(formData) {
        try {
            const transaction = {
                description: formData.get('description'),
                amount: parseFloat(formData.get('amount')),
                type: formData.get('type'),
                category: formData.get('category'),
                account: formData.get('account'),
                person: formData.get('person'),
                date: formData.get('date') || new Date().toISOString().split('T')[0]
            };

            // Validate required fields
            if (!transaction.description || !transaction.amount || !transaction.type) {
                this.notificationManager.error('Por favor completa todos los campos requeridos');
                return;
            }

            this.dataManager.add('transactions', transaction);
            this.modalManager.close('transactionModal');
            this.notificationManager.success('Movimiento guardado exitosamente');
            this.tabManager.refreshCurrentTab();

        } catch (error) {
            Utils.log(`Error saving transaction: ${error.message}`, 'error');
            this.notificationManager.error('Error al guardar el movimiento');
        }
    }

    saveTransfer(formData) {
        try {
            const transfer = {
                fromAccount: formData.get('fromAccount'),
                toAccount: formData.get('toAccount'),
                amount: parseFloat(formData.get('amount')),
                description: formData.get('description'),
                date: formData.get('date') || new Date().toISOString().split('T')[0]
            };

            // Validate required fields
            if (!transfer.fromAccount || !transfer.toAccount || !transfer.amount) {
                this.notificationManager.error('Por favor completa todos los campos requeridos');
                return;
            }

            if (transfer.fromAccount === transfer.toAccount) {
                this.notificationManager.error('Las cuentas de origen y destino deben ser diferentes');
                return;
            }

            this.dataManager.add('transfers', transfer);
            this.modalManager.close('transferModal');
            this.notificationManager.success('Transferencia guardada exitosamente');
            this.tabManager.refreshCurrentTab();

        } catch (error) {
            Utils.log(`Error saving transfer: ${error.message}`, 'error');
            this.notificationManager.error('Error al guardar la transferencia');
        }
    }

    savePerson(formData) {
        try {
            const person = {
                name: formData.get('name').trim()
            };

            if (!person.name) {
                this.notificationManager.error('El nombre es requerido');
                return;
            }

            this.dataManager.add('people', person);
            this.modalManager.close('personModal');
            this.notificationManager.success('Persona guardada exitosamente');
            this.tabManager.refreshCurrentTab();

        } catch (error) {
            Utils.log(`Error saving person: ${error.message}`, 'error');
            this.notificationManager.error('Error al guardar la persona');
        }
    }

    saveAccount(formData) {
        try {
            const account = {
                name: formData.get('name').trim(),
                type: formData.get('type'),
                person: formData.get('person'),
                initialBalance: parseFloat(formData.get('initialBalance')) || 0
            };

            if (!account.name || !account.type) {
                this.notificationManager.error('Nombre y tipo son requeridos');
                return;
            }

            this.dataManager.add('accounts', account);
            this.modalManager.close('accountModal');
            this.notificationManager.success('Cuenta guardada exitosamente');
            this.tabManager.refreshCurrentTab();

        } catch (error) {
            Utils.log(`Error saving account: ${error.message}`, 'error');
            this.notificationManager.error('Error al guardar la cuenta');
        }
    }

    saveCategory(formData) {
        try {
            const category = {
                name: formData.get('name').trim(),
                icon: formData.get('icon') || 'fas fa-tag',
                type: formData.get('type') || 'expense'
            };

            if (!category.name) {
                this.notificationManager.error('El nombre es requerido');
                return;
            }

            this.dataManager.add('categories', category);
            this.modalManager.close('categoryModal');
            this.notificationManager.success('Categoría guardada exitosamente');
            this.tabManager.refreshCurrentTab();

        } catch (error) {
            Utils.log(`Error saving category: ${error.message}`, 'error');
            this.notificationManager.error('Error al guardar la categoría');
        }
    }

    // Language management
    changeLanguage(newLanguage) {
        Utils.log(`Changing language to: ${newLanguage}`, 'debug');
        
        this.language = newLanguage;
        localStorage.setItem(CONFIG.STORAGE_KEYS.LANGUAGE, newLanguage);
        
        this.applyTranslations();
        this.modalManager.close('settingsModal');
        this.notificationManager.success(`Idioma cambiado a ${newLanguage === 'es' ? 'Español' : 'English'}`);
    }

    applyTranslations() {
        const translations = TRANSLATIONS[this.language] || TRANSLATIONS[CONFIG.DEFAULT_LANGUAGE];
        
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                element.textContent = translations[key];
            }
        });

        Utils.log(`Translations applied for language: ${this.language}`, 'debug');
    }

    // Utility methods
    forceRestoreScroll() {
        document.body.style.overflow = '';
        document.body.style.overflowY = 'auto';
        document.documentElement.style.overflow = '';
        document.documentElement.style.overflowY = 'auto';
        Utils.log('Scroll forcefully restored', 'debug');
    }

    // Public API methods
    getStats() {
        return this.dataManager.getStats();
    }

    exportData() {
        const data = {
            transactions: this.dataManager.get('transactions'),
            transfers: this.dataManager.get('transfers'),
            people: this.dataManager.get('people'),
            accounts: this.dataManager.get('accounts'),
            categories: this.dataManager.get('categories'),
            budgets: this.dataManager.get('budgets'),
            exportDate: new Date().toISOString(),
            version: CONFIG.VERSION
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `financial-planner-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        this.notificationManager.success('Datos exportados exitosamente');
    }

    clearAllData() {
        if (confirm('¿Estás seguro de que quieres eliminar todos los datos? Esta acción no se puede deshacer.')) {
            this.dataManager.clearAll();
            this.tabManager.refreshCurrentTab();
            this.notificationManager.warning('Todos los datos han sido eliminados');
        }
    }
}

// Emergency functions (accessible from console)
window.restoreScroll = function() {
    document.body.style.overflow = '';
    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflow = '';
    document.documentElement.style.overflowY = 'auto';
    console.log('🆘 Emergency scroll restore executed');
};

window.debugApp = function() {
    if (window.app) {
        console.log('📊 App Stats:', window.app.getStats());
        console.log('📑 Current Tab:', window.app.tabManager.getCurrentTab());
        console.log('🔔 Active Modals:', window.app.modalManager.getActiveModals());
        console.log('🌐 Language:', window.app.language);
    } else {
        console.log('❌ App not initialized');
    }
};

console.log('✅ Main application loaded successfully');
