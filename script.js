// Financial Planner Application
console.log('Script loaded successfully!');

class FinancialPlanner {
    constructor() {
        this.language = localStorage.getItem('language') || 'es';
        this.transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        this.transfers = JSON.parse(localStorage.getItem('transfers')) || [];
        this.people = JSON.parse(localStorage.getItem('people')) || [];
        this.accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        this.categories = JSON.parse(localStorage.getItem('categories')) || [];
        this.budgets = JSON.parse(localStorage.getItem('budgets')) || [];
        this.currentTab = 'dashboard';
        this.editingMode = false;
        this.editingTransactionId = null;
        this.editingPersonId = null;
        this.editingAccountId = null;
        this.editingCategoryId = null;
        this.editingBudgetId = null;
        this.editingTransferId = null;
        this.editingTransfersMode = false;
        this.deleteItemId = null;
        this.deleteItemType = null;
        this.categoryChart = null;
        this.selectedMonth = '';
        this.selectedYear = '';
        this.savedFilters = JSON.parse(localStorage.getItem('savedFilters')) || {
            accounts: [],
            categories: [],
            people: [],
            types: []
        };
        
        // Calendar state
        this.currentCalendarYear = new Date().getFullYear();
        this.currentCalendarMonth = new Date().getMonth();
        this.currentCalendarDay = new Date().getDate();
        this.calendarView = 'year'; // 'year', 'month', 'day'
        
        this.normalizeStoredData();
        
        this.translations = {
            es: {
                dashboard: 'Dashboard',
                movements: 'Movimientos',
                people: 'Personas',
                accounts: 'Cuentas',
                categories: 'Categorías',
                income: 'Ingresos',
                expenses: 'Gastos',
                balance: 'Balance',
                quickActions: 'Acciones Rápidas',
                addMovement: 'Añadir Movimiento',
                transfer: 'Transferencia',
                recentMovements: 'Movimientos Recientes',
                filters: 'Filtros',
                editMovements: 'Editar',
                account: 'Cuenta',
                type: 'Tipo',
                amount: 'Cantidad',
                description: 'Descripción',
                category: 'Categoría',
                date: 'Fecha',
                cancel: 'Cancelar',
                save: 'Guardar',
                delete: 'Eliminar',
                edit: 'Editar',
                addPerson: 'Agregar Persona',
                addAccount: 'Agregar Cuenta',
                addCategory: 'Agregar Categoría',
                name: 'Nombre',
                email: 'Email',
                phone: 'Teléfono',
                accountName: 'Nombre de la Cuenta',
                person: 'Persona',
                accountType: 'Tipo de Cuenta',
                checking: 'Corriente',
                savings: 'Ahorros',
                credit: 'Crédito',
                initialBalance: 'Balance Inicial',
                categoryName: 'Nombre de la Categoría',
                categoryType: 'Tipo',
                icon: 'Icono',
                color: 'Color',
                selectAccount: 'Seleccionar cuenta',
                selectPerson: 'Seleccionar persona',
                selectCategory: 'Seleccionar categoría',
                expense: 'Gasto',
                settings: 'Ajustes',
                language: 'Idioma',
                spanish: 'Español',
                english: 'English',
                confirmDelete: 'Confirmar Eliminación',
                deleteMessage: '¿Estás seguro de que quieres eliminar este elemento?',
                searchMovements: 'Buscar movimientos...',
                transactions: 'Transferencias',
                calendar: 'Calendario',
                addTransaction: 'Nueva Transferencia',
                fromAccount: 'Cuenta Origen',
                toAccount: 'Cuenta Destino',
                editTransfer: 'Editar Transferencia',
                filterByDate: 'Filtrar por Fecha',
                expensesByCategory: 'Gastos por Categoría',
                allMonths: 'Todos los meses',
                allYears: 'Todos los años',
                january: 'Enero',
                february: 'Febrero',
                march: 'Marzo',
                april: 'Abril',
                may: 'Mayo',
                june: 'Junio',
                july: 'Julio',
                august: 'Agosto',
                september: 'Septiembre',
                october: 'Octubre',
                november: 'Noviembre',
                december: 'Diciembre',
                sunday: 'Dom',
                monday: 'Lun',
                tuesday: 'Mar',
                wednesday: 'Mié',
                thursday: 'Jue',
                friday: 'Vie',
                saturday: 'Sáb',
                budgets: 'Presupuestos',
                addBudget: 'Agregar Presupuesto',
                budgetAmount: 'Presupuesto Mensual',
                budgetType: 'Tipo de Presupuesto',
                editBudget: 'Editar Presupuesto',
                spent: 'Gastado',
                remaining: 'Restante',
                overBudget: 'Sobre Presupuesto',
                projected: 'Proyectado',
                real: 'Real'
            },
            en: {
                dashboard: 'Dashboard',
                movements: 'Movements',
                people: 'People',
                accounts: 'Accounts',
                categories: 'Categories',
                income: 'Income',
                expenses: 'Expenses',
                balance: 'Balance',
                quickActions: 'Quick Actions',
                addMovement: 'Add Movement',
                transfer: 'Transfer',
                recentMovements: 'Recent Movements',
                filters: 'Filters',
                editMovements: 'Edit',
                account: 'Account',
                type: 'Type',
                amount: 'Amount',
                description: 'Description',
                category: 'Category',
                date: 'Date',
                cancel: 'Cancel',
                save: 'Save',
                delete: 'Delete',
                edit: 'Edit',
                addPerson: 'Add Person',
                addAccount: 'Add Account',
                addCategory: 'Add Category',
                name: 'Name',
                email: 'Email',
                phone: 'Phone',
                accountName: 'Account Name',
                person: 'Person',
                accountType: 'Account Type',
                checking: 'Checking',
                savings: 'Savings',
                credit: 'Credit',
                initialBalance: 'Initial Balance',
                categoryName: 'Category Name',
                categoryType: 'Type',
                icon: 'Icon',
                color: 'Color',
                selectAccount: 'Select account',
                selectPerson: 'Select person',
                selectCategory: 'Select category',
                expense: 'Expense',
                settings: 'Settings',
                language: 'Language',
                spanish: 'Español',
                english: 'English',
                confirmDelete: 'Confirm Deletion',
                deleteMessage: 'Are you sure you want to delete this item?',
                searchMovements: 'Search movements...',
                transactions: 'Transactions',
                calendar: 'Calendar',
                addTransaction: 'New Transaction',
                fromAccount: 'From Account',
                toAccount: 'To Account',
                editTransfer: 'Edit Transfer',
                filterByDate: 'Filter by Date',
                expensesByCategory: 'Expenses by Category',
                allMonths: 'All months',
                allYears: 'All years',
                january: 'January',
                february: 'February',
                march: 'March',
                april: 'April',
                may: 'May',
                june: 'June',
                july: 'July',
                august: 'August',
                september: 'September',
                october: 'October',
                november: 'November',
                december: 'December',
                sunday: 'Sun',
                monday: 'Mon',
                tuesday: 'Tue',
                wednesday: 'Wed',
                thursday: 'Thu',
                friday: 'Fri',
                saturday: 'Sat',
                budgets: 'Budgets',
                addBudget: 'Add Budget',
                budgetAmount: 'Monthly Budget',
                budgetType: 'Budget Type',
                editBudget: 'Edit Budget',
                spent: 'Spent',
                remaining: 'Remaining',
                overBudget: 'Over Budget',
                projected: 'Projected',
                real: 'Real'
            }
        };
    }

    init() {
        console.log('Initializing FinancialPlanner...');
        // Force restore scroll on init
        this.forceRestoreScroll();
        this.setupEventListeners();
        this.translatePage();
        this.showTab('dashboard'); // Show dashboard by default
        console.log('FinancialPlanner initialized successfully!');
    }

    forceRestoreScroll() {
        document.body.style.overflow = '';
        document.body.style.overflowY = 'auto';
        document.documentElement.style.overflow = '';
        document.documentElement.style.overflowY = 'auto';
        console.log('Scroll forcefully restored');
    }

    updateUI() {
        // Basic UI update method
        console.log('Updating UI...');
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.getAttribute('data-tab');
                if (tabName) {
                    this.showTab(tabName);
                }
            });
        });

        // Dashboard buttons
        const addMovementBtn = document.getElementById('addMovement');
        console.log('addMovementBtn found:', !!addMovementBtn);
        if (addMovementBtn) {
            addMovementBtn.addEventListener('click', () => {
                console.log('Add movement clicked!');
                this.openTransactionModal();
            });
        }

        const transferBtn = document.getElementById('transfer');
        if (transferBtn) {
            transferBtn.addEventListener('click', () => this.openTransferModal());
        }

        // Transaction/Movement buttons
        const createTransactionBtn = document.getElementById('createTransaction');
        console.log('createTransactionBtn found:', !!createTransactionBtn);
        if (createTransactionBtn) {
            createTransactionBtn.addEventListener('click', () => {
                console.log('Create transaction clicked!');
                this.openTransactionModal();
            });
        }

        const closeTransactionModalBtn = document.getElementById('closeTransactionModal');
        if (closeTransactionModalBtn) {
            closeTransactionModalBtn.addEventListener('click', () => this.closeModal('transactionModal'));
        }

        const cancelTransactionBtn = document.getElementById('cancelTransaction');
        if (cancelTransactionBtn) {
            cancelTransactionBtn.addEventListener('click', () => this.closeModal('transactionModal'));
        }

        const transactionForm = document.getElementById('transactionForm');
        if (transactionForm) {
            transactionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveTransaction();
            });
        }

        // Transfer buttons
        const createTransferBtn = document.getElementById('createTransfer');
        if (createTransferBtn) {
            createTransferBtn.addEventListener('click', () => this.openTransferModal());
        }

        const closeTransferModalBtn = document.getElementById('closeTransferModal');
        if (closeTransferModalBtn) {
            closeTransferModalBtn.addEventListener('click', () => this.closeModal('transferModal'));
        }

        const cancelTransferBtn = document.getElementById('cancelTransfer');
        if (cancelTransferBtn) {
            cancelTransferBtn.addEventListener('click', () => this.closeModal('transferModal'));
        }

        const transferForm = document.getElementById('transferForm');
        if (transferForm) {
            transferForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveTransfer();
            });
        }

        // People buttons
        const createPersonBtn = document.getElementById('createPerson');
        if (createPersonBtn) {
            createPersonBtn.addEventListener('click', () => this.openPersonModal());
        }

        const closePersonModalBtn = document.getElementById('closePersonModal');
        if (closePersonModalBtn) {
            closePersonModalBtn.addEventListener('click', () => this.closeModal('personModal'));
        }

        const cancelPersonBtn = document.getElementById('cancelPerson');
        if (cancelPersonBtn) {
            cancelPersonBtn.addEventListener('click', () => this.closeModal('personModal'));
        }

        const personForm = document.getElementById('personForm');
        if (personForm) {
            personForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.savePerson();
            });
        }

        // Account buttons
        const createAccountBtn = document.getElementById('createAccount');
        if (createAccountBtn) {
            createAccountBtn.addEventListener('click', () => this.openAccountModal());
        }

        const closeAccountModalBtn = document.getElementById('closeAccountModal');
        if (closeAccountModalBtn) {
            closeAccountModalBtn.addEventListener('click', () => this.closeModal('accountModal'));
        }

        const cancelAccountBtn = document.getElementById('cancelAccount');
        if (cancelAccountBtn) {
            cancelAccountBtn.addEventListener('click', () => this.closeModal('accountModal'));
        }

        const accountForm = document.getElementById('accountForm');
        if (accountForm) {
            accountForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveAccount();
            });
        }

        // Category buttons
        const createCategoryBtn = document.getElementById('createCategory');
        if (createCategoryBtn) {
            createCategoryBtn.addEventListener('click', () => this.openCategoryModal());
        }

        const closeCategoryModalBtn = document.getElementById('closeCategoryModal');
        if (closeCategoryModalBtn) {
            closeCategoryModalBtn.addEventListener('click', () => this.closeModal('categoryModal'));
        }

        const cancelCategoryBtn = document.getElementById('cancelCategory');
        if (cancelCategoryBtn) {
            cancelCategoryBtn.addEventListener('click', () => this.closeModal('categoryModal'));
        }

        const categoryForm = document.getElementById('categoryForm');
        if (categoryForm) {
            categoryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveCategory();
            });
        }

        // Filter buttons
        const applyFiltersBtn = document.getElementById('applyFilters');
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => this.applyFilters());
        }

        const clearFiltersBtn = document.getElementById('clearFilters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => this.clearFilters());
        }

        // Date selectors
        const dashboardMonthSelect = document.getElementById('dashboardMonth');
        if (dashboardMonthSelect) {
            dashboardMonthSelect.addEventListener('change', () => this.updateDashboardChart());
        }

        const dashboardYearSelect = document.getElementById('dashboardYear');
        if (dashboardYearSelect) {
            dashboardYearSelect.addEventListener('change', () => this.updateDashboardChart());
        }

        const movementsMonthSelect = document.getElementById('movementsMonth');
        if (movementsMonthSelect) {
            movementsMonthSelect.addEventListener('change', () => this.updateMovements());
        }

        const movementsYearSelect = document.getElementById('movementsYear');
        if (movementsYearSelect) {
            movementsYearSelect.addEventListener('change', () => this.updateMovements());
        }

        // Modal event listeners (delete, settings, etc.)
        const confirmDeleteBtn = document.getElementById('confirmDelete');
        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', () => {
                this.deleteConfirmed();
            });
        }
        
        const cancelDeleteBtn = document.getElementById('cancelDelete');
        if (cancelDeleteBtn) {
            cancelDeleteBtn.addEventListener('click', () => {
                this.closeModal('deleteModal');
            });
        }
        
        const closeDeleteModalBtn = document.getElementById('closeDeleteModal');
        if (closeDeleteModalBtn) {
            closeDeleteModalBtn.addEventListener('click', () => {
                this.closeModal('deleteModal');
            });
        }
        
        // Settings modal event listeners
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.openModal('settingsModal');
            });
        }
        
        const closeSettingsModalBtn = document.getElementById('closeSettingsModal');
        if (closeSettingsModalBtn) {
            closeSettingsModalBtn.addEventListener('click', () => {
                this.closeModal('settingsModal');
            });
        }
        
        // Language selector
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
    }

    normalizeStoredData() {
        const ensureArray = (value) => {
            if (Array.isArray(value)) return value;
            if (value && typeof value === 'object') {
                return Object.values(value);
            }
            return [];
        };

        this.transactions = ensureArray(this.transactions);
        this.transfers = ensureArray(this.transfers);
        this.people = ensureArray(this.people);
        this.accounts = ensureArray(this.accounts);
        this.categories = ensureArray(this.categories);

        // Clean up undefined categories
        this.categories = this.categories.filter(category => 
            category && category.name && category.name !== 'undefined'
        );
    }

    translatePage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.dataset.translate;
            if (this.translations[this.language][key]) {
                element.textContent = this.translations[this.language][key];
            }
        });
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Quick action buttons
        const addMovementBtn = document.getElementById('addMovement');
        if (addMovementBtn) {
            addMovementBtn.addEventListener('click', () => this.openMovementModal());
        }
        
        const addTransferBtn = document.getElementById('addTransfer');
        if (addTransferBtn) {
            addTransferBtn.addEventListener('click', () => this.openTransferModal());
        }
        
        const createMovementBtn = document.getElementById('createMovement');
        if (createMovementBtn) {
            createMovementBtn.addEventListener('click', () => this.openMovementModal());
        }
        
        const createTransactionBtn = document.getElementById('createTransaction');
        if (createTransactionBtn) {
            createTransactionBtn.addEventListener('click', () => this.openTransferModal());
        }

        // FAB
        document.getElementById('fab').addEventListener('click', () => {
            if (this.currentTab === 'dashboard') {
                this.openMovementModal();
            } else if (this.currentTab === 'people') {
                this.openPersonModal();
            } else if (this.currentTab === 'accounts') {
                this.openAccountModal();
            } else if (this.currentTab === 'categories') {
                this.openCategoryModal();
            }
        });

        // Modal controls
        this.setupModalControls();

        // Search and filters
        document.getElementById('movementSearch').addEventListener('input', (e) => {
            this.filterMovements();
        });

        // Filters button
        const filtersBtn = document.getElementById('filtersBtn');
        if (filtersBtn) {
            filtersBtn.addEventListener('click', () => {
                this.toggleFilters();
            });
        }

        // Edit movements
        const editMovementsBtn = document.getElementById('editMovements');
        if (editMovementsBtn) {
            editMovementsBtn.addEventListener('click', () => {
                this.toggleEditMode();
            });
        }

        // Edit transfers - will be set up when switching to transactions tab

        // Settings
        document.getElementById('settingsBtn').addEventListener('click', () => {
            this.openSettingsModal();
        });

        // Language change
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }

        // Date selectors
        const dashboardMonthSelect = document.getElementById('dashboardMonthSelect');
        const dashboardYearSelect = document.getElementById('dashboardYearSelect');
        const movementsMonthSelect = document.getElementById('movementsMonthSelect');
        const movementsYearSelect = document.getElementById('movementsYearSelect');

        if (dashboardMonthSelect) {
            dashboardMonthSelect.addEventListener('change', (e) => {
                this.selectedMonth = e.target.value;
                this.updateChart();
            });
        }

        if (dashboardYearSelect) {
            dashboardYearSelect.addEventListener('change', (e) => {
                this.selectedYear = e.target.value;
                this.updateChart();
            });
        }

        if (movementsMonthSelect) {
            movementsMonthSelect.addEventListener('change', (e) => {
                this.selectedMonth = e.target.value;
                this.filterMovements();
            });
        }

        if (movementsYearSelect) {
            movementsYearSelect.addEventListener('change', (e) => {
                this.selectedYear = e.target.value;
                this.filterMovements();
            });
        }
        
        // Calendar event listeners
        document.getElementById('calendarBackBtn')?.addEventListener('click', () => this.navigateCalendarBack());
        document.getElementById('calendarPrevBtn')?.addEventListener('click', () => this.navigateCalendarPrev());
        document.getElementById('calendarNextBtn')?.addEventListener('click', () => this.navigateCalendarNext());

        // Date picker buttons
        document.getElementById('datePickerBtn').addEventListener('click', () => {
            document.getElementById('movementDate').showPicker();
        });
        
        document.getElementById('transferDatePickerBtn').addEventListener('click', () => {
            document.getElementById('transferDate').showPicker();
        });
    }

    setupModalControls() {
        // Movement modal
        document.getElementById('closeMovementModal').addEventListener('click', () => {
            this.closeModal('movementModal');
        });
        document.getElementById('cancelMovement').addEventListener('click', () => {
            this.closeModal('movementModal');
        });
        document.getElementById('movementForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveMovement();
        });

        // Person modal
        document.getElementById('createPerson').addEventListener('click', () => this.openPersonModal());
        document.getElementById('closePersonModal').addEventListener('click', () => {
            this.closeModal('personModal');
        });
        document.getElementById('cancelPerson').addEventListener('click', () => {
            this.closeModal('personModal');
        });
        document.getElementById('personForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePerson();
        });

        // Account modal
        const createAccountBtn = document.getElementById('createAccount');
        if (createAccountBtn) {
            createAccountBtn.addEventListener('click', () => this.openAccountModal());
        }
        
        const closeAccountModalBtn = document.getElementById('closeAccountModal');
        if (closeAccountModalBtn) {
            closeAccountModalBtn.addEventListener('click', () => {
                this.closeModal('accountModal');
            });
        }
        
        const cancelAccountBtn = document.getElementById('cancelAccount');
        if (cancelAccountBtn) {
            cancelAccountBtn.addEventListener('click', () => {
                this.closeModal('accountModal');
            });
        }
        
        const accountForm = document.getElementById('accountForm');
        if (accountForm) {
            accountForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveAccount();
            });
        }

        // Category modal
        document.getElementById('createCategory').addEventListener('click', () => this.openCategoryModal());
        document.getElementById('closeCategoryModal').addEventListener('click', () => {
            this.closeModal('categoryModal');
        });
        document.getElementById('cancelCategory').addEventListener('click', () => {
            this.closeModal('categoryModal');
        });
        document.getElementById('categoryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveCategory();
        });

        // Transfer modal
        document.getElementById('closeTransferModal').addEventListener('click', () => {
            this.closeModal('transferModal');
        });
        document.getElementById('cancelTransfer').addEventListener('click', () => {
            this.closeModal('transferModal');
        });
        document.getElementById('transferForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTransfer();
        });


        // Settings modal
        document.getElementById('closeSettingsModal').addEventListener('click', () => {
            this.closeModal('settingsModal');
        });

        // Delete confirmation modal
        document.getElementById('confirmDelete').addEventListener('click', () => {
            this.deleteConfirmed();
        });

        // Delete modal
        document.getElementById('closeDeleteModal').addEventListener('click', () => {
            this.closeModal('deleteModal');
        });
        document.getElementById('cancelDelete').addEventListener('click', () => {
            this.closeModal('deleteModal');
        });
        document.getElementById('confirmDelete').addEventListener('click', () => {
            this.confirmDelete();
        });

        // Type selector
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
                e.target.closest('.type-btn').classList.add('active');
            });
        });

        // Close modals on backdrop click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    switchTab(tabName) {
        // Update navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');

        this.currentTab = tabName;

        // Update FAB icon
        const fab = document.getElementById('fab');
        if (tabName === 'dashboard') {
            fab.innerHTML = '<i class="fas fa-plus"></i>';
        } else if (tabName === 'people') {
            fab.innerHTML = '<i class="fas fa-user-plus"></i>';
        } else if (tabName === 'accounts') {
            fab.innerHTML = '<i class="fas fa-credit-card"></i>';
        } else if (tabName === 'categories') {
            fab.innerHTML = '<i class="fas fa-tag"></i>';
        } else {
            fab.style.display = 'none';
        }

        // Load tab-specific data
        this.loadTabData(tabName);
    }

    loadTabData(tabName) {
        switch (tabName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'movements':
                this.updateMovements();
                break;
            case 'people':
                this.updatePeople();
                break;
            case 'accounts':
                this.updateAccounts();
                break;
            case 'categories':
                this.updateCategories();
                break;
            case 'transactions':
                this.updateTransactions();
                this.setupTransactionsEventListeners();
                break;
            case 'calendar':
                this.updateCalendar();
                break;
        }
    }

    loadData() {
        this.updateDashboard();
        this.updateMovements();
        this.updatePeople();
        this.updateAccounts();
        this.updateCategories();
        this.populateSelects();
        this.setupFilters();
    }

    updateUI() {
        this.updateDashboard();
        this.updateMovements();
        this.updateBudgets();
        this.updateTransactions();
    }

    updateDashboard() {
        this.updateBalanceCards();
        this.updateRecentMovements();
    }

    updateBalanceCards() {
        const totals = this.calculateTotals();
        
        // Add animation to balance cards
        const balanceCards = document.querySelectorAll('.balance-card');
        balanceCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-fade-in-up');
        });
        
        document.getElementById('totalIncome').textContent = this.formatCurrency(totals.income);
        document.getElementById('totalExpense').textContent = this.formatCurrency(totals.expense);
        document.getElementById('totalBalance').textContent = this.formatCurrency(totals.balance);
        
        // Remove animation classes after completion
        setTimeout(() => {
            balanceCards.forEach(card => {
                card.classList.remove('animate-fade-in-up');
                card.style.animationDelay = '';
            });
        }, 600);
    }

    resetDashboard() {
        document.getElementById('totalIncome').textContent = this.formatCurrency(0);
        document.getElementById('totalExpense').textContent = this.formatCurrency(0);
        document.getElementById('totalBalance').textContent = this.formatCurrency(0);
    }

    calculateTotals() {
        // Calculate from transactions
        const income = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        // Add initial balances from accounts
        const initialBalance = this.accounts
            .reduce((sum, account) => sum + (account.initialBalance || 0), 0);

        return {
            income: income + initialBalance,
            expense,
            balance: income + initialBalance - expense
        };
    }

    calculateFilteredTotals(transactions = null) {
        const movements = transactions || this.transactions;
        
        const income = movements
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expense = movements
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        // Add initial balances from accounts (only when showing all transactions)
        const initialBalance = transactions === null ? 
            this.accounts.reduce((sum, account) => sum + (account.initialBalance || 0), 0) : 0;

        return {
            income: income + initialBalance,
            expense,
            balance: income + initialBalance - expense
        };
    }

    updateRecentMovements() {
        const recentMovements = this.transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        const container = document.getElementById('recentTransactionsList');
        container.innerHTML = '';

        if (recentMovements.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-receipt"></i>
                    <h3>No hay movimientos</h3>
                    <p>Agrega tu primer movimiento para comenzar</p>
                </div>
            `;
            return;
        }

        recentMovements.forEach(transaction => {
            const account = this.getAccountById(transaction.accountId);
            const category = this.getCategoryById(transaction.categoryId);
            const person = this.getPersonById(account?.personId);
            const transactionElement = this.createMovementElement(transaction, account, category, person);
            container.appendChild(transactionElement);
        });
    }

    updateMovements() {
        const container = document.getElementById('allMovementsList');
        if (!container) return;
        
        container.innerHTML = '';

        if (this.transactions.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-receipt"></i>
                    <h3>No hay movimientos</h3>
                    <p>Agrega tu primer movimiento para comenzar</p>
                </div>
            `;
            // Still show balance even with no transactions
            this.updateMovementsBalance();
            return;
        }

        this.transactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach((transaction, index) => {
                const account = this.getAccountById(transaction.accountId);
                const category = this.getCategoryById(transaction.categoryId);
                const person = this.getPersonById(account?.personId);
                const transactionElement = this.createMovementElement(transaction, account, category, person);
                
                // Add staggered animation delay
                transactionElement.style.animationDelay = `${index * 0.05}s`;
                
                container.appendChild(transactionElement);
            });
            
        // Setup filters when updating movements
        this.setupFilters();
        // Update balance display immediately
        this.updateMovementsBalance();
    }

    createMovementElement(transaction, account, category, person) {
        const div = document.createElement('div');
        div.className = 'transaction-item animate-fade-in-up';
        div.dataset.transactionId = transaction.id;
        
        div.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-icon ${transaction.type}" style="background-color: ${category?.color}20; color: ${category?.color}">
                    <i class="${category?.icon || 'fas fa-circle'}"></i>
                </div>
                <div class="transaction-details">
                    <h4>${transaction.description}</h4>
                    <p>${category?.name || 'Sin categoría'} • <span class="transaction-date">${this.formatDate(transaction.date)}</span></p>
                </div>
            </div>
            <div class="transaction-amount-section">
                <div class="transaction-account">${account?.name || 'Sin cuenta'}</div>
                <div class="transaction-person">${person?.name || 'Sin persona'}</div>
                <div class="transaction-amount ${transaction.type}">
                    ${transaction.type === 'income' ? '+' : '-'}${this.formatCurrency(transaction.amount)}
                </div>
            </div>
        `;

        if (this.editingMode) {
            const editActions = document.createElement('div');
            editActions.className = 'edit-actions';
            editActions.innerHTML = `
                <button class="edit-action edit" onclick="app.editMovement('${transaction.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="edit-action delete" onclick="app.deleteMovement('${transaction.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            div.appendChild(editActions);
        }

        return div;
    }

    filterMovements() {
        const searchInput = document.getElementById('movementSearch');
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const activeFilters = this.getActiveFilters();

        const filteredTransactions = this.transactions.filter(transaction => {
            const matchesSearch = !searchTerm || transaction.description.toLowerCase().includes(searchTerm);
            
            const matchesAccount = !activeFilters.accounts.length || activeFilters.accounts.includes(transaction.accountId);
            const matchesCategory = !activeFilters.categories.length || activeFilters.categories.includes(transaction.categoryId);
            const matchesType = !activeFilters.types.length || activeFilters.types.includes(transaction.type);
            
            // People filtering
            let matchesPerson = true;
            if (activeFilters.people.length > 0) {
                const account = this.getAccountById(transaction.accountId);
                matchesPerson = account && activeFilters.people.includes(account.personId);
            }
            
            // Date filtering
            let matchesDate = true;
            if (this.selectedMonth) {
                const transactionMonth = new Date(transaction.date).getMonth() + 1;
                matchesDate = matchesDate && transactionMonth.toString() === this.selectedMonth;
            }
            if (this.selectedYear) {
                const transactionYear = new Date(transaction.date).getFullYear();
                matchesDate = matchesDate && transactionYear.toString() === this.selectedYear;
            }
            
            return matchesSearch && matchesAccount && matchesCategory && matchesType && matchesPerson && matchesDate;
        });

        const container = document.getElementById('allMovementsList');
        if (!container) return;
        
        container.innerHTML = '';

        if (filteredTransactions.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No se encontraron movimientos</h3>
                    <p>Intenta con otros filtros de búsqueda</p>
                </div>
            `;
            return;
        }

        filteredTransactions
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(transaction => {
                const account = this.getAccountById(transaction.accountId);
                const category = this.getCategoryById(transaction.categoryId);
                const person = this.getPersonById(account?.personId);
                const transactionElement = this.createMovementElement(transaction, account, category, person);
                container.appendChild(transactionElement);
            });

        this.updateMovementsBalance(filteredTransactions);
    }

    getActiveFilters() {
        const filters = {
            accounts: [],
            categories: [],
            people: [],
            types: []
        };

        document.querySelectorAll('.filter-option input[type="checkbox"]:checked').forEach(checkbox => {
            const filterType = checkbox.dataset.filterType;
            const filterValue = checkbox.dataset.filterValue;
            if (filters[filterType]) {
                filters[filterType].push(filterValue);
            }
        });

        return filters;
    }

    saveCurrentFilters() {
        this.savedFilters = this.getActiveFilters();
        localStorage.setItem('savedFilters', JSON.stringify(this.savedFilters));
    }

    resetFilters() {
        // Reset saved filters
        this.savedFilters = {
            accounts: [],
            categories: [],
            people: [],
            types: []
        };
        localStorage.setItem('savedFilters', JSON.stringify(this.savedFilters));
        
        // Check all checkboxes
        document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
        });
        
        // Update movements
        this.filterMovements();
        this.showNotification('Filtros restablecidos');
    }

    updateMovementsBalance(transactions = null) {
        const totals = this.calculateFilteredTotals(transactions);
        
        document.getElementById('movementsTotalIncome').textContent = this.formatCurrency(totals.income);
        document.getElementById('movementsTotalExpense').textContent = this.formatCurrency(totals.expense);
        document.getElementById('movementsTotalBalance').textContent = this.formatCurrency(totals.balance);
    }

    setupFilters() {
        const container = document.getElementById('filtersGrid');
        if (!container) return;
        
        container.innerHTML = '';

        // Account filters
        if (this.accounts.length > 0) {
            const accountFilter = document.createElement('div');
            accountFilter.className = 'filter-group';
            accountFilter.innerHTML = `
                <h5 class="filter-title">Cuentas</h5>
                <div class="filter-options" id="accountFilters">
                    ${this.accounts.map(account => {
                        const isChecked = this.savedFilters.accounts.length === 0 || this.savedFilters.accounts.includes(account.id);
                        return `
                            <label class="filter-option">
                                <input type="checkbox" data-filter-type="accounts" data-filter-value="${account.id}" ${isChecked ? 'checked' : ''}>
                                <span class="checkmark"></span>
                                <span class="filter-text">${account.name}</span>
                            </label>
                        `;
                    }).join('')}
                </div>
            `;
            container.appendChild(accountFilter);
        }

        // Category filters
        if (this.categories.length > 0) {
            const categoryFilter = document.createElement('div');
            categoryFilter.className = 'filter-group';
            categoryFilter.innerHTML = `
                <h5 class="filter-title">Categorías</h5>
                <div class="filter-options" id="categoryFilters">
                    ${this.categories.map(category => {
                        const isChecked = this.savedFilters.categories.length === 0 || this.savedFilters.categories.includes(category.id);
                        return `
                            <label class="filter-option">
                                <input type="checkbox" data-filter-type="categories" data-filter-value="${category.id}" ${isChecked ? 'checked' : ''}>
                                <span class="checkmark"></span>
                                <span class="filter-text">${category.name}</span>
                            </label>
                        `;
                    }).join('')}
                </div>
            `;
            container.appendChild(categoryFilter);
        }

        // People filters
        if (this.people.length > 0) {
            const peopleFilter = document.createElement('div');
            peopleFilter.className = 'filter-group';
            peopleFilter.innerHTML = `
                <h5 class="filter-title">Personas</h5>
                <div class="filter-options" id="peopleFilters">
                    ${this.people.map(person => {
                        const isChecked = this.savedFilters.people.length === 0 || this.savedFilters.people.includes(person.id);
                        return `
                            <label class="filter-option">
                                <input type="checkbox" data-filter-type="people" data-filter-value="${person.id}" ${isChecked ? 'checked' : ''}>
                                <span class="checkmark"></span>
                                <span class="filter-text">${person.name}</span>
                            </label>
                        `;
                    }).join('')}
                </div>
            `;
            container.appendChild(peopleFilter);
        }

        // Type filters
        const typeFilter = document.createElement('div');
        typeFilter.className = 'filter-group';
        const incomeChecked = this.savedFilters.types.length === 0 || this.savedFilters.types.includes('income');
        const expenseChecked = this.savedFilters.types.length === 0 || this.savedFilters.types.includes('expense');
        
        typeFilter.innerHTML = `
            <h5 class="filter-title">Tipos</h5>
            <div class="filter-options" id="typeFilters">
                <label class="filter-option">
                    <input type="checkbox" data-filter-type="types" data-filter-value="income" ${incomeChecked ? 'checked' : ''}>
                    <span class="checkmark"></span>
                    <span class="filter-text">Ingresos</span>
                </label>
                <label class="filter-option">
                    <input type="checkbox" data-filter-type="types" data-filter-value="expense" ${expenseChecked ? 'checked' : ''}>
                    <span class="checkmark"></span>
                    <span class="filter-text">Gastos</span>
                </label>
            </div>
        `;
        container.appendChild(typeFilter);

        // Add reset filters button
        const resetButton = document.createElement('div');
        resetButton.className = 'filter-reset';
        resetButton.innerHTML = `
            <button class="btn-secondary reset-filters-btn" id="resetFilters">
                <i class="fas fa-undo"></i>
                <span>Restablecer Filtros</span>
            </button>
        `;
        container.appendChild(resetButton);

        // Add event listeners to filters
        container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.saveCurrentFilters();
                this.filterMovements();
            });
        });

        // Add event listener to reset button
        const resetBtn = document.getElementById('resetFilters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetFilters();
            });
        }
    }

    toggleEditMode() {
        this.editingMode = !this.editingMode;
        const editBtn = document.getElementById('editMovements');
        
        if (editBtn) {
            if (this.editingMode) {
                editBtn.innerHTML = '<i class="fas fa-check"></i> <span>Finalizar</span>';
                editBtn.classList.add('btn-primary');
                editBtn.classList.remove('btn-secondary');
            } else {
                editBtn.innerHTML = '<i class="fas fa-edit"></i> <span>Editar</span>';
                editBtn.classList.add('btn-secondary');
                editBtn.classList.remove('btn-primary');
            }
        }

        this.updateMovements();
    }

    setupTransactionsEventListeners() {
        const editTransfersBtn = document.getElementById('editTransfers');
        if (editTransfersBtn && !editTransfersBtn.hasAttribute('data-listener-added')) {
            editTransfersBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleEditTransfersMode();
            });
            editTransfersBtn.setAttribute('data-listener-added', 'true');
        }
    }

    // Calendar Methods
    updateCalendar() {
        this.updateCalendarTitle();
        this.updateCalendarNavigation();
        
        switch (this.calendarView) {
            case 'year':
                this.showYearView();
                break;
            case 'month':
                this.showMonthView();
                break;
            case 'day':
                this.showDayView();
                break;
        }
    }

    updateCalendarTitle() {
        const titleElement = document.getElementById('calendarTitle');
        if (!titleElement) return;

        switch (this.calendarView) {
            case 'year':
                titleElement.textContent = this.currentCalendarYear.toString();
                break;
            case 'month':
                const monthKeys = ['january', 'february', 'march', 'april', 'may', 'june',
                                 'july', 'august', 'september', 'october', 'november', 'december'];
                const monthName = this.translations[this.language][monthKeys[this.currentCalendarMonth]];
                titleElement.textContent = `${monthName} ${this.currentCalendarYear}`;
                break;
            case 'day':
                const date = new Date(this.currentCalendarYear, this.currentCalendarMonth, this.currentCalendarDay);
                titleElement.textContent = date.toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                break;
        }
    }

    updateCalendarNavigation() {
        const backBtn = document.getElementById('calendarBackBtn');
        const backText = document.getElementById('calendarBackText');
        
        if (this.calendarView === 'year') {
            backBtn.style.display = 'none';
        } else {
            backBtn.style.display = 'flex';
            backText.textContent = this.calendarView === 'month' ? 'Year' : 'Month';
        }
    }

    showYearView() {
        this.switchCalendarView('yearView');
        this.renderYearGrid();
    }

    renderYearGrid() {
        const yearGrid = document.getElementById('yearGrid');
        if (!yearGrid) return;

        yearGrid.innerHTML = '';
        const monthKeys = ['january', 'february', 'march', 'april', 'may', 'june',
                          'july', 'august', 'september', 'october', 'november', 'december'];

        for (let month = 0; month < 12; month++) {
            const monthData = this.getMonthData(this.currentCalendarYear, month);
            
            const monthCard = document.createElement('div');
            monthCard.className = 'month-card animate-fade-in-up';
            monthCard.style.animationDelay = `${month * 0.05}s`;
            monthCard.dataset.month = month;
            
            const monthName = this.translations[this.language][monthKeys[month]];
            const incomeLabel = this.translations[this.language]['income'];
            const expensesLabel = this.translations[this.language]['expenses'];
            
            monthCard.innerHTML = `
                <div class="month-card-header">
                    <h3 class="month-name">${monthName}</h3>
                </div>
                <div class="month-summary">
                    <div class="month-income">
                        <span class="amount">${this.formatCurrency(monthData.income)}</span>
                        <span class="label">${incomeLabel}</span>
                    </div>
                    <div class="month-expense">
                        <span class="amount">${this.formatCurrency(monthData.expense)}</span>
                        <span class="label">${expensesLabel}</span>
                    </div>
                </div>
            `;

            monthCard.addEventListener('click', () => {
                this.currentCalendarMonth = month;
                this.calendarView = 'month';
                this.updateCalendar();
            });

            yearGrid.appendChild(monthCard);
        }
    }

    getMonthData(year, month) {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0);
        
        let income = 0;
        let expense = 0;

        this.transactions.forEach(transaction => {
            const transactionDate = new Date(transaction.date);
            if (transactionDate >= startDate && transactionDate <= endDate) {
                if (transaction.type === 'income') {
                    income += transaction.amount;
                } else {
                    expense += transaction.amount;
                }
            }
        });

        return { income, expense };
    }

    showMonthView() {
        this.switchCalendarView('monthView');
        this.renderMonthGrid();
    }

    renderMonthGrid() {
        const monthGrid = document.getElementById('monthGrid');
        if (!monthGrid) return;

        monthGrid.innerHTML = '';
        
        const firstDay = new Date(this.currentCalendarYear, this.currentCalendarMonth, 1);
        const lastDay = new Date(this.currentCalendarYear, this.currentCalendarMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const today = new Date();
        
        for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dayData = this.getDayData(currentDate);
            const isCurrentMonth = currentDate.getMonth() === this.currentCalendarMonth;
            const isToday = currentDate.toDateString() === today.toDateString();
            
            const dayCell = document.createElement('div');
            dayCell.className = 'day-cell animate-fade-in';
            dayCell.style.animationDelay = `${i * 0.01}s`;
            
            if (!isCurrentMonth) dayCell.classList.add('other-month');
            if (isToday) dayCell.classList.add('today');
            
            dayCell.innerHTML = `
                <div class="day-number">${currentDate.getDate()}</div>
                <div class="day-amounts">
                    ${dayData.income > 0 ? `<div class="day-income-amount">+${this.formatCurrency(dayData.income)}</div>` : ''}
                    ${dayData.expense > 0 ? `<div class="day-expense-amount">-${this.formatCurrency(dayData.expense)}</div>` : ''}
                </div>
            `;

            if (isCurrentMonth && (dayData.income > 0 || dayData.expense > 0)) {
                dayCell.addEventListener('click', () => {
                    this.currentCalendarDay = currentDate.getDate();
                    this.calendarView = 'day';
                    this.updateCalendar();
                });
            }

            monthGrid.appendChild(dayCell);
        }
    }

    getDayData(date) {
        const dateStr = date.toISOString().split('T')[0];
        let income = 0;
        let expense = 0;

        this.transactions.forEach(transaction => {
            if (transaction.date === dateStr) {
                if (transaction.type === 'income') {
                    income += transaction.amount;
                } else {
                    expense += transaction.amount;
                }
            }
        });

        return { income, expense };
    }

    showDayView() {
        this.switchCalendarView('dayView');
        this.renderDayView();
    }

    renderDayView() {
        const selectedDate = new Date(this.currentCalendarYear, this.currentCalendarMonth, this.currentCalendarDay);
        const dateStr = selectedDate.toISOString().split('T')[0];
        
        // Update day title
        const dayTitle = document.getElementById('dayTitle');
        if (dayTitle) {
            dayTitle.textContent = selectedDate.toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }

        // Get day transactions
        const dayTransactions = this.transactions.filter(transaction => transaction.date === dateStr);
        
        let income = 0;
        let expense = 0;
        
        dayTransactions.forEach(transaction => {
            if (transaction.type === 'income') {
                income += transaction.amount;
            } else {
                expense += transaction.amount;
            }
        });

        // Update summary
        document.getElementById('dayIncome').textContent = this.formatCurrency(income);
        document.getElementById('dayExpense').textContent = this.formatCurrency(expense);

        // Render transactions list
        const dayTransactionsContainer = document.getElementById('dayTransactions');
        if (!dayTransactionsContainer) return;

        dayTransactionsContainer.innerHTML = '';

        if (dayTransactions.length === 0) {
            dayTransactionsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-day"></i>
                    <h3>Sin movimientos</h3>
                    <p>No hay transacciones registradas para este día</p>
                </div>
            `;
            return;
        }

        dayTransactions.forEach((transaction, index) => {
            const account = this.getAccountById(transaction.accountId);
            const category = this.getCategoryById(transaction.categoryId);
            const person = this.getPersonById(account?.personId);
            
            const transactionElement = this.createMovementElement(transaction, account, category, person);
            transactionElement.style.animationDelay = `${index * 0.05}s`;
            dayTransactionsContainer.appendChild(transactionElement);
        });
    }

    switchCalendarView(viewId) {
        // Hide all views
        document.querySelectorAll('.calendar-view').forEach(view => {
            view.classList.remove('active');
        });
        
        // Show selected view with animation
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.add('active');
        }
    }

    // Navigation methods
    navigateCalendarBack() {
        if (this.calendarView === 'day') {
            this.calendarView = 'month';
        } else if (this.calendarView === 'month') {
            this.calendarView = 'year';
        }
        this.updateCalendar();
    }

    navigateCalendarPrev() {
        switch (this.calendarView) {
            case 'year':
                this.currentCalendarYear--;
                break;
            case 'month':
                this.currentCalendarMonth--;
                if (this.currentCalendarMonth < 0) {
                    this.currentCalendarMonth = 11;
                    this.currentCalendarYear--;
                }
                break;
            case 'day':
                const currentDate = new Date(this.currentCalendarYear, this.currentCalendarMonth, this.currentCalendarDay);
                currentDate.setDate(currentDate.getDate() - 1);
                this.currentCalendarYear = currentDate.getFullYear();
                this.currentCalendarMonth = currentDate.getMonth();
                this.currentCalendarDay = currentDate.getDate();
                break;
        }
        this.updateCalendar();
    }

    navigateCalendarNext() {
        switch (this.calendarView) {
            case 'year':
                this.currentCalendarYear++;
                break;
            case 'month':
                this.currentCalendarMonth++;
                if (this.currentCalendarMonth > 11) {
                    this.currentCalendarMonth = 0;
                    this.currentCalendarYear++;
                }
                break;
            case 'day':
                const currentDate = new Date(this.currentCalendarYear, this.currentCalendarMonth, this.currentCalendarDay);
                currentDate.setDate(currentDate.getDate() + 1);
                this.currentCalendarYear = currentDate.getFullYear();
                this.currentCalendarMonth = currentDate.getMonth();
                this.currentCalendarDay = currentDate.getDate();
                break;
        }
        this.updateCalendar();
    }

    toggleEditTransfersMode() {
        this.editingTransfersMode = !this.editingTransfersMode;
        
        const editBtn = document.getElementById('editTransfers');
        
        if (editBtn) {
            if (this.editingTransfersMode) {
                editBtn.innerHTML = '<i class="fas fa-check"></i> <span>Finalizar</span>';
                editBtn.classList.add('btn-primary');
                editBtn.classList.remove('btn-secondary');
            } else {
                editBtn.innerHTML = '<i class="fas fa-edit"></i> <span>Editar</span>';
                editBtn.classList.add('btn-secondary');
                editBtn.classList.remove('btn-primary');
            }
        }

        this.updateTransactions();
    }

    editMovement(transactionId) {
        const transaction = this.transactions.find(t => t.id === transactionId);
        if (!transaction) return;

        this.editingTransactionId = transactionId;
        this.openMovementModal(transaction.type, transaction);
    }

    deleteMovement(transactionId) {
        this.deleteItemId = transactionId;
        this.deleteItemType = 'transaction';
        this.openModal('deleteModal');
    }

    editTransfer(transferId) {
        const transfer = this.transfers.find(t => t.id === transferId);
        if (!transfer) return;

        this.editingTransferId = transferId;
        this.openTransferModal(transfer);
    }

    deleteTransfer(transferId) {
        this.deleteItemId = transferId;
        this.deleteItemType = 'transfer';
        this.openModal('deleteModal');
    }

    updatePeople() {
        const container = document.getElementById('peopleGrid');
        container.innerHTML = '';

        if (this.people.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <h3>No hay personas</h3>
                    <p>Agrega la primera persona</p>
                </div>
            `;
            return;
        }

        this.people.forEach(person => {
            const personElement = document.createElement('div');
            personElement.className = 'person-card';
            personElement.innerHTML = `
                <div class="card-title">${person.name}</div>
                <div class="card-actions">
                    <button class="btn-secondary" onclick="app.editPerson('${person.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-danger" onclick="app.deletePerson('${person.id}')">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            container.appendChild(personElement);
        });
    }

    updateAccounts() {
        const container = document.getElementById('accountsGrid');
        container.innerHTML = '';

        if (this.accounts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-credit-card"></i>
                    <h3>No hay cuentas</h3>
                    <p>Agrega la primera cuenta</p>
                </div>
            `;
            return;
        }

        this.accounts.forEach(account => {
            const person = this.getPersonById(account.personId);
            const balance = this.calculateAccountBalance(account.id);
            
            const accountElement = document.createElement('div');
            accountElement.className = 'account-card';
            accountElement.innerHTML = `
                <div class="card-title">${account.name}</div>
                <div class="card-subtitle">${person?.name || 'Sin persona'}</div>
                <div class="account-balance ${balance >= 0 ? 'positive' : 'negative'}">
                    ${this.formatCurrency(balance)}
                </div>
                <div class="card-actions">
                    <button class="btn-secondary" onclick="app.editAccount('${account.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-danger" onclick="app.deleteAccount('${account.id}')">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            container.appendChild(accountElement);
        });
    }

    calculateAccountBalance(accountId) {
        const account = this.getAccountById(accountId);
        if (!account) return 0;

        // Start with initial balance
        let balance = account.initialBalance || 0;

        // Add transactions
        const transactionBalance = this.transactions
            .filter(t => t.accountId === accountId)
            .reduce((sum, t) => {
                if (account.type === 'credit') {
                    return sum + (t.type === 'expense' ? t.amount : -t.amount);
                } else {
                    return sum + (t.type === 'income' ? t.amount : -t.amount);
                }
            }, 0);

        // Add transfers (money coming in and going out)
        const transferBalance = this.transfers.reduce((sum, transfer) => {
            if (transfer.toAccountId === accountId) {
                // Money coming in
                if (account.type === 'credit') {
                    // For credit accounts, incoming money reduces the debt
                    return sum - transfer.amount;
                } else {
                    return sum + transfer.amount;
                }
            } else if (transfer.fromAccountId === accountId) {
                // Money going out
                if (account.type === 'credit') {
                    // For credit accounts, outgoing money increases the debt
                    return sum + transfer.amount;
                } else {
                    return sum - transfer.amount;
                }
            }
            return sum;
        }, 0);

        return balance + transactionBalance + transferBalance;
    }

    updateCategories() {
        const container = document.getElementById('categoriesGrid');
        container.innerHTML = '';

        if (this.categories.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tags"></i>
                    <h3>No hay categorías</h3>
                    <p>Agrega la primera categoría</p>
                </div>
            `;
            return;
        }

        this.categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category-card';
            categoryElement.innerHTML = `
                <div class="category-icon">
                    <i class="${category.icon}"></i>
                </div>
                <div class="card-title">${category.name}</div>
                <div class="card-actions">
                    <button class="btn-secondary" onclick="app.editCategory('${category.id}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-danger" onclick="app.deleteCategory('${category.id}')">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
            container.appendChild(categoryElement);
        });
    }

    populateSelects() {
        // Movement account select
        const accountSelect = document.getElementById('movementAccount');
        if (accountSelect) {
            accountSelect.innerHTML = '<option value="" data-translate="selectAccount">Seleccionar cuenta</option>';
            this.accounts.forEach(account => {
                const option = document.createElement('option');
                option.value = account.id;
                option.textContent = account.name;
                accountSelect.appendChild(option);
            });
        }

        // Movement category select
        const categorySelect = document.getElementById('movementCategory');
        if (categorySelect) {
            categorySelect.innerHTML = '<option value="" data-translate="selectCategory">Seleccionar categoría</option>';
            this.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        }

        // Account person select
        const personSelect = document.getElementById('accountPerson');
        if (personSelect) {
            personSelect.innerHTML = '<option value="" data-translate="selectPerson">Seleccionar persona</option>';
            this.people.forEach(person => {
                const option = document.createElement('option');
                option.value = person.id;
                option.textContent = person.name;
                personSelect.appendChild(option);
            });
        }
    }

    // Método para actualizar selects cuando se abren modales
    updateSelects() {
        this.populateSelects();
    }

    openMovementModal(type = 'expense', transaction = null) {
        const modal = document.getElementById('movementModal');
        const form = document.getElementById('movementForm');
        const title = document.getElementById('movementModalTitle');

        // Reset form
        form.reset();
        document.getElementById('movementDate').value = new Date().toISOString().split('T')[0];

        // Update selects
        this.updateSelects();

        if (transaction) {
            // Edit mode
            document.getElementById('movementAccount').value = transaction.accountId;
            document.getElementById('movementAmount').value = transaction.amount;
            document.getElementById('movementDescription').value = transaction.description;
            document.getElementById('movementCategory').value = transaction.categoryId;
            document.getElementById('movementDate').value = transaction.date;
            
            // Set type
            document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-type="${transaction.type}"]`).classList.add('active');
            
            title.textContent = 'Editar Movimiento';
        } else {
            // Create mode
            document.querySelectorAll('.type-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector(`[data-type="${type}"]`).classList.add('active');
            
            title.textContent = 'Agregar Movimiento';
        }

        modal.classList.add('active');
    }

    openPersonModal(person = null) {
        const modal = document.getElementById('personModal');
        const form = document.getElementById('personForm');
        const title = document.getElementById('personModalTitle');

        if (!modal || !form || !title) return;

        form.reset();

        if (person) {
            const personName = document.getElementById('personName');
            if (personName) personName.value = person.name;
            title.textContent = 'Editar Persona';
        } else {
            title.textContent = 'Agregar Persona';
        }

        modal.classList.add('active');
    }

    openAccountModal(account = null) {
        const modal = document.getElementById('accountModal');
        const form = document.getElementById('accountForm');
        const title = document.getElementById('accountModalTitle');

        if (!modal || !form || !title) return;

        form.reset();
        this.updateSelects();

        if (account) {
            const accountName = document.getElementById('accountName');
            const accountPerson = document.getElementById('accountPerson');
            const accountType = document.getElementById('accountType');
            const accountBalance = document.getElementById('accountBalance');
            
            if (accountName) accountName.value = account.name;
            if (accountPerson) accountPerson.value = account.personId;
            if (accountType) accountType.value = account.type;
            if (accountBalance) accountBalance.value = account.initialBalance || 0;
            title.textContent = 'Editar Cuenta';
        } else {
            title.textContent = 'Agregar Cuenta';
        }

        modal.classList.add('active');
    }

    openCategoryModal(category = null) {
        const modal = document.getElementById('categoryModal');
        const form = document.getElementById('categoryForm');
        const title = document.getElementById('categoryModalTitle');

        if (!modal || !form || !title) return;

        form.reset();

        if (category) {
            const categoryName = document.getElementById('categoryName');
            if (categoryName) categoryName.value = category.name;
            title.textContent = 'Editar Categoría';
        } else {
            title.textContent = 'Agregar Categoría';
        }

        this.populateIconSelector(category?.icon);
        modal.classList.add('active');
    }

    populateIconSelector(selectedIcon = null) {
        const container = document.getElementById('iconSelector');
        if (!container) return;
        
        const icons = [
            'fas fa-home', 'fas fa-car', 'fas fa-utensils', 'fas fa-shopping-bag',
            'fas fa-heart', 'fas fa-graduation-cap', 'fas fa-bolt', 'fas fa-film',
            'fas fa-briefcase', 'fas fa-laptop', 'fas fa-chart-line', 'fas fa-store',
            'fas fa-plus', 'fas fa-minus', 'fas fa-wallet', 'fas fa-credit-card',
            'fas fa-coffee', 'fas fa-gamepad', 'fas fa-music', 'fas fa-book',
            'fas fa-dumbbell', 'fas fa-plane', 'fas fa-bus', 'fas fa-taxi',
            'fas fa-gift', 'fas fa-star', 'fas fa-trophy', 'fas fa-medal',
            'fas fa-phone', 'fas fa-envelope', 'fas fa-calendar', 'fas fa-clock',
            'fas fa-camera', 'fas fa-paint-brush', 'fas fa-tools', 'fas fa-wrench',
            'fas fa-hammer', 'fas fa-screwdriver', 'fas fa-puzzle-piece', 'fas fa-dice',
            'fas fa-gem', 'fas fa-motorcycle', 'fas fa-euro-sign', 'fas fa-tshirt', 'fas fa-globe'
        ];

        container.innerHTML = '';
        icons.forEach((icon, index) => {
            const iconOption = document.createElement('div');
            const isSelected = selectedIcon === icon || (!selectedIcon && index === 0);
            iconOption.className = `icon-option ${isSelected ? 'selected' : ''}`;
            iconOption.innerHTML = `<i class="${icon}"></i>`;
            iconOption.addEventListener('click', () => {
                container.querySelectorAll('.icon-option').forEach(opt => opt.classList.remove('selected'));
                iconOption.classList.add('selected');
            });
            container.appendChild(iconOption);
        });
    }

    openSettingsModal() {
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.language;
        }
        this.openModal('settingsModal');
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            // Add scale animation to modal content
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.classList.add('animate-scale-in');
                // Remove animation class after animation completes
                setTimeout(() => {
                    modalContent.classList.remove('animate-scale-in');
                }, 200);
            }
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    saveMovement() {
        const movementAccount = document.getElementById('movementAccount');
        const movementAmount = document.getElementById('movementAmount');
        const movementDescription = document.getElementById('movementDescription');
        const movementCategory = document.getElementById('movementCategory');
        const movementDate = document.getElementById('movementDate');
        const activeTypeBtn = document.querySelector('.type-btn.active');

        if (!movementAccount || !movementAmount || !movementDescription || !movementCategory || !movementDate || !activeTypeBtn) {
            this.showNotification('Por favor completa todos los campos');
            return;
        }

        const movement = {
            id: this.editingTransactionId || Date.now().toString(),
            accountId: movementAccount.value,
            type: activeTypeBtn.dataset.type,
            amount: parseFloat(movementAmount.value),
            description: movementDescription.value,
            categoryId: movementCategory.value,
            date: movementDate.value,
            createdAt: this.editingTransactionId ? 
                this.transactions.find(t => t.id === this.editingTransactionId)?.createdAt || new Date().toISOString() : 
                new Date().toISOString()
        };

        if (this.editingTransactionId) {
            const index = this.transactions.findIndex(t => t.id === this.editingTransactionId);
            if (index !== -1) {
                this.transactions[index] = movement;
            }
            this.editingTransactionId = null;
        } else {
            this.transactions.push(movement);
        }

        this.saveData();
        this.updateUI();
        this.updateChart();
        this.populateYearSelectors();
        this.closeModal('movementModal');
        this.showNotification('Movimiento guardado exitosamente');
    }

    savePerson() {
        const personName = document.getElementById('personName');
        if (!personName || !personName.value.trim()) {
            this.showNotification('Por favor ingresa un nombre');
            return;
        }

        // Check if we're editing an existing person
        const personModalTitle = document.getElementById('personModalTitle');
        const isEditing = personModalTitle && personModalTitle.textContent === 'Editar Persona';

        if (isEditing && this.editingPersonId) {
            // Update existing person
            const personIndex = this.people.findIndex(p => p.id === this.editingPersonId);
            if (personIndex !== -1) {
                this.people[personIndex].name = personName.value.trim();
            }
            this.editingPersonId = null;
        } else {
            // Create new person
            const person = {
                id: Date.now().toString(),
                name: personName.value.trim(),
                createdAt: new Date().toISOString()
            };
            this.people.push(person);
        }

        this.saveData();
        this.updatePeople();
        this.populateSelects();
        this.closeModal('personModal');
        this.showNotification('Persona guardada exitosamente');
    }

    saveAccount() {
        const accountName = document.getElementById('accountName');
        const accountPerson = document.getElementById('accountPerson');
        const accountType = document.getElementById('accountType');
        const accountBalance = document.getElementById('accountBalance');

        if (!accountName || !accountPerson || !accountType) {
            this.showNotification('Por favor completa todos los campos');
            return;
        }

        // Check if we're editing an existing account
        const accountModalTitle = document.getElementById('accountModalTitle');
        const isEditing = accountModalTitle && accountModalTitle.textContent === 'Editar Cuenta';

        if (isEditing && this.editingAccountId) {
            // Update existing account
            const accountIndex = this.accounts.findIndex(a => a.id === this.editingAccountId);
            if (accountIndex !== -1) {
                this.accounts[accountIndex] = {
                    ...this.accounts[accountIndex],
                    name: accountName.value,
                    personId: accountPerson.value,
                    type: accountType.value,
                    initialBalance: parseFloat(accountBalance?.value || 0)
                };
            }
            this.editingAccountId = null;
        } else {
            // Create new account
            const account = {
                id: Date.now().toString(),
                name: accountName.value,
                personId: accountPerson.value,
                type: accountType.value,
                initialBalance: parseFloat(accountBalance?.value || 0),
                createdAt: new Date().toISOString()
            };
            this.accounts.push(account);
        }

        this.saveData();
        this.updateAccounts();
        this.populateSelects();
        this.updateUI(); // Update dashboard to reflect new balance
        this.closeModal('accountModal');
        this.showNotification('Cuenta guardada exitosamente');
    }

    saveCategory() {
        const categoryName = document.getElementById('categoryName');
        if (!categoryName || !categoryName.value.trim()) {
            this.showNotification('Por favor ingresa un nombre para la categoría');
            return;
        }

        const selectedIconElement = document.querySelector('.icon-option.selected i');
        if (!selectedIconElement) {
            this.showNotification('Por favor selecciona un icono');
            return;
        }
        
        const selectedIcon = selectedIconElement.className;
        
        // Check if we're editing an existing category
        const categoryModalTitle = document.getElementById('categoryModalTitle');
        const isEditing = categoryModalTitle && categoryModalTitle.textContent === 'Editar Categoría';

        if (isEditing && this.editingCategoryId) {
            // Update existing category
            const categoryIndex = this.categories.findIndex(c => c.id === this.editingCategoryId);
            if (categoryIndex !== -1) {
                this.categories[categoryIndex] = {
                    ...this.categories[categoryIndex],
                    name: categoryName.value.trim(),
                    icon: selectedIcon
                };
            }
            this.editingCategoryId = null;
        } else {
            // Create new category
            const category = {
                id: Date.now().toString(),
                name: categoryName.value.trim(),
                icon: selectedIcon,
                createdAt: new Date().toISOString()
            };
            this.categories.push(category);
        }

        this.saveData();
        this.updateCategories();
        this.populateSelects();
        this.setupFilters();
        this.closeModal('categoryModal');
        this.showNotification('Categoría guardada exitosamente');
    }

    saveData() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
        localStorage.setItem('transfers', JSON.stringify(this.transfers));
        localStorage.setItem('people', JSON.stringify(this.people));
        localStorage.setItem('accounts', JSON.stringify(this.accounts));
        localStorage.setItem('categories', JSON.stringify(this.categories));
        localStorage.setItem('language', this.language);
    }

    changeLanguage(lang) {
        this.language = lang;
        this.translatePage();
        this.saveData();
        this.showNotification('Idioma cambiado exitosamente');
    }

    editPerson(personId) {
        const person = this.people.find(p => p.id === personId);
        if (person) {
            this.editingPersonId = personId;
            this.openPersonModal(person);
        }
    }

    deletePerson(personId) {
        this.deleteItemId = personId;
        this.deleteItemType = 'person';
        this.openModal('deleteModal');
    }

    editAccount(accountId) {
        const account = this.accounts.find(a => a.id === accountId);
        if (account) {
            this.editingAccountId = accountId;
            this.openAccountModal(account);
        }
    }

    deleteAccount(accountId) {
        this.deleteItemId = accountId;
        this.deleteItemType = 'account';
        this.openModal('deleteModal');
    }

    editCategory(categoryId) {
        const category = this.categories.find(c => c.id === categoryId);
        if (category) {
            this.editingCategoryId = categoryId;
            this.openCategoryModal(category);
        }
    }

    deleteCategory(categoryId) {
        this.deleteItemId = categoryId;
        this.deleteItemType = 'category';
        this.openModal('deleteModal');
    }

    confirmDelete() {
        if (this.deleteItemType === 'transaction') {
            this.transactions = this.transactions.filter(t => t.id !== this.deleteItemId);
            this.updateUI();
        } else if (this.deleteItemType === 'transfer') {
            this.transfers = this.transfers.filter(t => t.id !== this.deleteItemId);
            this.updateTransactions();
            this.updateAccounts();
            this.updateUI();
        } else if (this.deleteItemType === 'person') {
            this.people = this.people.filter(p => p.id !== this.deleteItemId);
            this.updatePeople();
            this.populateSelects();
        } else if (this.deleteItemType === 'account') {
            this.accounts = this.accounts.filter(a => a.id !== this.deleteItemId);
            this.updateAccounts();
            this.populateSelects();
            this.updateUI();
        } else if (this.deleteItemType === 'category') {
            this.categories = this.categories.filter(c => c.id !== this.deleteItemId);
            this.updateCategories();
            this.populateSelects();
            this.setupFilters();
        }

        this.saveData();
        this.closeModal('deleteModal');
        this.showNotification('Elemento eliminado exitosamente');
    }

    getAccountById(id) {
        return this.accounts.find(a => a.id === id);
    }

    getPersonById(id) {
        return this.people.find(p => p.id === id);
    }

    getCategoryById(id) {
        return this.categories.find(c => c.id === id);
    }

    formatCurrency(amount, currency = 'EUR') {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount)) return '0.00 €';
        
        const formatted = numAmount.toFixed(2);
        return formatted + ' €';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    openTransferModal(transfer = null) {
        const modal = document.getElementById('transferModal');
        const form = document.getElementById('transferForm');
        const title = document.getElementById('transferModalTitle');
        
        if (!modal || !form) return;
        
        form.reset();
        const transferDate = document.getElementById('transferDate');
        if (transferDate) {
            transferDate.value = new Date().toISOString().split('T')[0];
        }
        
        this.populateTransferSelects();

        if (transfer) {
            // Edit mode
            const transferFromAccount = document.getElementById('transferFromAccount');
            const transferToAccount = document.getElementById('transferToAccount');
            const transferAmount = document.getElementById('transferAmount');
            const transferCurrency = document.getElementById('transferCurrency');
            const transferDescription = document.getElementById('transferDescription');
            
            if (transferFromAccount) transferFromAccount.value = transfer.fromAccountId;
            if (transferToAccount) transferToAccount.value = transfer.toAccountId;
            if (transferAmount) transferAmount.value = transfer.amount;
            if (transferCurrency) transferCurrency.value = transfer.currency || 'EUR';
            if (transferDescription) transferDescription.value = transfer.description;
            if (transferDate) transferDate.value = transfer.date;
            
            if (title) title.textContent = 'Editar Transferencia';
        } else {
            // Create mode
            if (title) title.textContent = 'Nueva Transferencia';
        }
        
        modal.classList.add('active');
    }

    populateTransferSelects() {
        const fromSelect = document.getElementById('transferFromAccount');
        const toSelect = document.getElementById('transferToAccount');
        
        if (fromSelect) {
            fromSelect.innerHTML = '<option value="" data-translate="selectAccount">Seleccionar cuenta</option>';
            this.accounts.forEach(account => {
                const fromOption = document.createElement('option');
                fromOption.value = account.id;
                fromOption.textContent = account.name;
                fromSelect.appendChild(fromOption);
            });
        }
        
        if (toSelect) {
            toSelect.innerHTML = '<option value="" data-translate="selectAccount">Seleccionar cuenta</option>';
            this.accounts.forEach(account => {
                const toOption = document.createElement('option');
                toOption.value = account.id;
                toOption.textContent = account.name;
                toSelect.appendChild(toOption);
            });
        }
    }

    saveTransfer() {
        const transferFromAccount = document.getElementById('transferFromAccount');
        const transferToAccount = document.getElementById('transferToAccount');
        const transferAmount = document.getElementById('transferAmount');
        const transferCurrency = document.getElementById('transferCurrency');
        const transferDescription = document.getElementById('transferDescription');
        const transferDate = document.getElementById('transferDate');

        if (!transferFromAccount || !transferToAccount || !transferAmount || !transferDescription || !transferDate) {
            this.showNotification('Por favor completa todos los campos');
            return;
        }
        
        if (this.editingTransferId) {
            // Update existing transfer
            const transferIndex = this.transfers.findIndex(t => t.id === this.editingTransferId);
            if (transferIndex !== -1) {
                this.transfers[transferIndex] = {
                    ...this.transfers[transferIndex],
                    fromAccountId: transferFromAccount.value,
                    toAccountId: transferToAccount.value,
                    amount: parseFloat(transferAmount.value),
                    currency: transferCurrency?.value || 'EUR',
                    description: transferDescription.value,
                    date: transferDate.value
                };
            }
            this.editingTransferId = null;
        } else {
            // Create new transfer
            const transfer = {
                id: Date.now().toString(),
                fromAccountId: transferFromAccount.value,
                toAccountId: transferToAccount.value,
                amount: parseFloat(transferAmount.value),
                currency: transferCurrency?.value || 'EUR',
                description: transferDescription.value,
                date: transferDate.value,
                createdAt: new Date().toISOString()
            };
            this.transfers.push(transfer);
        }

        this.saveData();
        this.updateTransactions();
        this.updateAccounts(); // Update account balances
        this.updateUI(); // Update dashboard
        this.closeModal('transferModal');
        this.showNotification('Transferencia guardada exitosamente');
    }

    updateTransactions() {
        const container = document.getElementById('transactionsGrid');
        if (!container) return;
        
        container.innerHTML = '';

        if (this.transfers.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exchange-alt"></i>
                    <h3>No hay transferencias</h3>
                    <p>Agrega la primera transferencia</p>
                </div>
            `;
            return;
        }

        this.transfers
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(transfer => {
                const fromAccount = this.getAccountById(transfer.fromAccountId);
                const toAccount = this.getAccountById(transfer.toAccountId);
                const fromPerson = this.getPersonById(fromAccount?.personId);
                const toPerson = this.getPersonById(toAccount?.personId);
                
                const transferElement = document.createElement('div');
                transferElement.className = 'transfer-card';
                transferElement.dataset.transferId = transfer.id;
                transferElement.innerHTML = `
                    <div class="transfer-header">
                        <div class="transfer-icon">
                            <i class="fas fa-exchange-alt"></i>
                        </div>
                        <div class="transfer-title">
                            <h4>${transfer.description}</h4>
                            <span class="transfer-date">${this.formatDate(transfer.date)}</span>
                        </div>
                        <div class="transfer-amount">
                            ${this.formatCurrency(transfer.amount, transfer.currency)}
                        </div>
                    </div>
                    <div class="transfer-flow">
                        <div class="transfer-account from">
                            <div class="account-info">
                                <i class="fas fa-credit-card"></i>
                                <div>
                                    <strong>${fromAccount?.name || 'Sin cuenta'}</strong>
                                    <small>${fromPerson?.name || 'Sin persona'}</small>
                                </div>
                            </div>
                            <div class="account-balance negative">
                                -${this.formatCurrency(transfer.amount, transfer.currency)}
                            </div>
                        </div>
                        <div class="transfer-arrow">
                            <i class="fas fa-arrow-right"></i>
                        </div>
                        <div class="transfer-account to">
                            <div class="account-info">
                                <i class="fas fa-credit-card"></i>
                                <div>
                                    <strong>${toAccount?.name || 'Sin cuenta'}</strong>
                                    <small>${toPerson?.name || 'Sin persona'}</small>
                                </div>
                            </div>
                            <div class="account-balance positive">
                                +${this.formatCurrency(transfer.amount, transfer.currency)}
                            </div>
                        </div>
                    </div>
                `;

                if (this.editingTransfersMode) {
                    const editActions = document.createElement('div');
                    editActions.className = 'edit-actions';
                    editActions.innerHTML = `
                        <button class="edit-action edit" onclick="app.editTransfer('${transfer.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="edit-action delete" onclick="app.deleteTransfer('${transfer.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                    transferElement.appendChild(editActions);
                }

                container.appendChild(transferElement);
            });
    }

    toggleFilters() {
        const filtersSection = document.getElementById('filtersSection');
        const filtersBtn = document.getElementById('filtersBtn');
        
        if (!filtersSection || !filtersBtn) return;
        
        if (filtersSection.style.display === 'none' || filtersSection.style.display === '') {
            filtersSection.style.display = 'block';
            filtersBtn.classList.add('active');
        } else {
            filtersSection.style.display = 'none';
            filtersBtn.classList.remove('active');
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #34c759;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    populateYearSelectors() {
        const currentYear = new Date().getFullYear();
        const years = [];
        
        // Get years from transactions
        this.transactions.forEach(transaction => {
            const year = new Date(transaction.date).getFullYear();
            if (!years.includes(year)) {
                years.push(year);
            }
        });
        
        // Add current year if not present
        if (!years.includes(currentYear)) {
            years.push(currentYear);
        }
        
        // Sort years in descending order
        years.sort((a, b) => b - a);
        
        // Populate dashboard year selector
        const dashboardYearSelect = document.getElementById('dashboardYearSelect');
        if (dashboardYearSelect) {
            // Keep the "Todos los años" option
            const allYearsOption = dashboardYearSelect.querySelector('option[value=""]');
            dashboardYearSelect.innerHTML = '';
            if (allYearsOption) {
                dashboardYearSelect.appendChild(allYearsOption);
            }
            
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                dashboardYearSelect.appendChild(option);
            });
        }
        
        // Populate movements year selector
        const movementsYearSelect = document.getElementById('movementsYearSelect');
        if (movementsYearSelect) {
            // Keep the "Todos los años" option
            const allYearsOption = movementsYearSelect.querySelector('option[value=""]');
            movementsYearSelect.innerHTML = '';
            if (allYearsOption) {
                movementsYearSelect.appendChild(allYearsOption);
            }
            
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                movementsYearSelect.appendChild(option);
            });
        }
    }

    initializeChart() {
        const ctx = document.getElementById('categoryChart');
        if (!ctx) return;

        this.categoryChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [],
                    borderWidth: 0,
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#ffffff',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${new Intl.NumberFormat('es-ES', {
                                    style: 'currency',
                                    currency: 'EUR'
                                }).format(value)} (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '60%',
                animation: {
                    animateRotate: true,
                    duration: 1000
                }
            }
        });

        this.updateChart();
    }

    updateChart() {
        if (!this.categoryChart) return;

        // Filter transactions by selected month/year (only expenses)
        let filteredTransactions = this.transactions.filter(t => t.type === 'expense');

        if (this.selectedMonth) {
            filteredTransactions = filteredTransactions.filter(t => {
                const transactionMonth = new Date(t.date).getMonth() + 1;
                return transactionMonth.toString() === this.selectedMonth;
            });
        }

        if (this.selectedYear) {
            filteredTransactions = filteredTransactions.filter(t => {
                const transactionYear = new Date(t.date).getFullYear();
                return transactionYear.toString() === this.selectedYear;
            });
        }

        // Group by category
        const categoryData = {};
        filteredTransactions.forEach(transaction => {
            const category = this.getCategoryById(transaction.categoryId);
            const categoryName = category?.name || 'Sin categoría';
            
            if (!categoryData[categoryName]) {
                categoryData[categoryName] = 0;
            }
            categoryData[categoryName] += transaction.amount;
        });

        // Prepare chart data
        const labels = Object.keys(categoryData);
        const data = Object.values(categoryData);
        
        // Generate colors (different shades of red for expenses)
        const colors = labels.map((_, index) => {
            const hue = 0; // Red hue
            const saturation = 70 + (index * 10) % 30; // Vary saturation
            const lightness = 40 + (index * 15) % 40; // Vary lightness
            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        });

        // Update chart
        this.categoryChart.data.labels = labels;
        this.categoryChart.data.datasets[0].data = data;
        this.categoryChart.data.datasets[0].backgroundColor = colors;
        this.categoryChart.update();
    }

    // Budget Management Methods

    updateBudgets() {
        const container = document.getElementById('budgetsGrid');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.categories.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tags"></i>
                    <h3>No hay categorías</h3>
                    <p>Crea categorías primero para poder gestionar presupuestos</p>
                </div>
            `;
            return;
        }
        
        // Create a card for each category
        this.categories.forEach(category => {
            const realAmount = this.calculateSpentAmount(category.id, 'expense');
            const budget = this.budgets.find(b => b.categoryId === category.id) || { amount: 0 };
            const projectedAmount = budget.amount || 0;
            
            let percentage = 0;
            let percentageColor = 'var(--text-secondary)';
            let percentageText = '';
            
            if (projectedAmount > 0) {
                percentage = (realAmount / projectedAmount) * 100;
                if (percentage <= 100) {
                    percentageColor = 'var(--accent-green)';
                    percentageText = `${percentage.toFixed(1)}%`;
                } else {
                    percentageColor = 'var(--accent-red)';
                    percentageText = `+${(percentage - 100).toFixed(1)}%`;
                }
            }
            
            const budgetCard = document.createElement('div');
            budgetCard.className = 'budget-card animate-fade-in-up';
            budgetCard.innerHTML = `
                <div class="budget-card-header">
                    <div class="budget-category-icon" style="background: ${this.getCategoryColor(category.icon, 'expense')}">
                        <i class="${category.icon}"></i>
                    </div>
                    <h3 class="budget-category-name">${category.name}</h3>
                    ${projectedAmount > 0 ? `<div class="budget-percentage" style="color: ${percentageColor}">${percentageText}</div>` : ''}
                </div>
                
                <div class="budget-inputs">
                    <div class="budget-input-group">
                        <label>${this.translations[this.language]['projected']}</label>
                        <input type="number" 
                               class="budget-projected-input" 
                               value="${projectedAmount}" 
                               step="0.01" 
                               min="0"
                               data-category-id="${category.id}"
                               onchange="app.updateBudgetAmount('${category.id}', this.value)">
                    </div>
                    
                    <div class="budget-input-group">
                        <label>${this.translations[this.language]['real']}</label>
                        <input type="number" 
                               class="budget-real-input" 
                               value="${realAmount.toFixed(2)}" 
                               readonly>
                    </div>
                </div>
            `;
            
            container.appendChild(budgetCard);
        });
    }

    updateBudgetAmount(categoryId, amount) {
        const numAmount = parseFloat(amount) || 0;
        
        // Find existing budget or create new one
        let budget = this.budgets.find(b => b.categoryId === categoryId);
        
        if (budget) {
            budget.amount = numAmount;
        } else {
            budget = {
                id: Date.now().toString(),
                categoryId,
                amount: numAmount,
                currency: 'EUR',
                type: 'expense',
                createdAt: new Date().toISOString()
            };
            this.budgets.push(budget);
        }
        
        this.saveData();
        this.updateBudgets(); // Refresh to show updated percentage
    }

    calculateSpentAmount(categoryId, type) {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        return this.transactions.reduce((total, transaction) => {
            const transactionDate = new Date(transaction.date);
            if (transactionDate.getMonth() === currentMonth && 
                transactionDate.getFullYear() === currentYear &&
                transaction.categoryId === categoryId &&
                transaction.type === type) {
                return total + transaction.amount;
            }
            return total;
        }, 0);
    }

    getCategoryColor(icon, type) {
        // Generate color based on icon and type
        const colors = {
            expense: ['#FF3B30', '#FF6B6B', '#FF8E8E', '#FFA8A8'],
            income: ['#34C759', '#5DD579', '#7DE394', '#9CEAAE']
        };
        
        const colorArray = colors[type] || colors.expense;
        const hash = icon.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        
        return colorArray[Math.abs(hash) % colorArray.length];
    }

    createBudgetChart(budgetId, budget, spent) {
        const canvas = document.getElementById(`budgetChart${budgetId}`);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const remaining = Math.max(0, budget.amount - spent);
        const overSpent = Math.max(0, spent - budget.amount);
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: overSpent > 0 ? 
                    [this.translations[this.language]['spent'], this.translations[this.language]['overBudget']] :
                    [this.translations[this.language]['spent'], this.translations[this.language]['remaining']],
                datasets: [{
                    data: overSpent > 0 ? [budget.amount, overSpent] : [spent, remaining],
                    backgroundColor: overSpent > 0 ? 
                        ['#FF6B6B', '#FF3B30'] : 
                        [this.getCategoryColor(budget.categoryId, budget.type), '#E5E5EA'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                cutout: '70%'
            }
        });
    }

    deleteBudget(budgetId) {
        this.budgets = this.budgets.filter(b => b.id !== budgetId);
        this.saveData();
        this.updateBudgets();
        this.showNotification('Presupuesto eliminado exitosamente');
    }

    // Transactions Management
    updateTransactions() {
        const container = document.getElementById('transactionsGrid');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.transfers.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exchange-alt"></i>
                    <h3>No hay transferencias</h3>
                    <p>Crea tu primera transferencia entre cuentas</p>
                </div>
            `;
            return;
        }
        
        this.transfers.forEach(transfer => {
            const fromAccount = this.accounts.find(a => a.id === transfer.fromAccountId);
            const toAccount = this.accounts.find(a => a.id === transfer.toAccountId);
            
            if (!fromAccount || !toAccount) return;
            
            const transferCard = document.createElement('div');
            transferCard.className = 'transaction-card animate-fade-in-up';
            transferCard.innerHTML = `
                <div class="transaction-header">
                    <div class="transaction-info">
                        <div class="transaction-accounts">
                            <span class="from-account">${fromAccount.name}</span>
                            <i class="fas fa-arrow-right transaction-arrow"></i>
                            <span class="to-account">${toAccount.name}</span>
                        </div>
                        <div class="transaction-amount">${this.formatCurrency(transfer.amount)}</div>
                    </div>
                    <div class="transaction-date">${new Date(transfer.date).toLocaleDateString()}</div>
                </div>
                ${transfer.description ? `<div class="transaction-description">${transfer.description}</div>` : ''}
                <div class="transaction-actions">
                    <button class="btn-icon" onclick="app.editTransfer('${transfer.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="app.confirmDelete('${transfer.id}', 'transfer')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            container.appendChild(transferCard);
        });
    }

    editTransfer(transferId) {
        const transfer = this.transfers.find(t => t.id === transferId);
        if (!transfer) return;
        
        this.editingTransferId = transferId;
        
        // Populate form with transfer data
        document.getElementById('transferFromAccount').value = transfer.fromAccountId;
        document.getElementById('transferToAccount').value = transfer.toAccountId;
        document.getElementById('transferAmount').value = transfer.amount;
        document.getElementById('transferDescription').value = transfer.description || '';
        document.getElementById('transferDate').value = transfer.date;
        
        // Update modal title
        document.getElementById('transferModalTitle').textContent = this.translations[this.language]['editTransfer'] || 'Editar Transferencia';
        
        this.openModal('transferModal');
    }

    // Data Management Methods
    saveData() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
        localStorage.setItem('transfers', JSON.stringify(this.transfers));
        localStorage.setItem('people', JSON.stringify(this.people));
        localStorage.setItem('accounts', JSON.stringify(this.accounts));
        localStorage.setItem('categories', JSON.stringify(this.categories));
        localStorage.setItem('budgets', JSON.stringify(this.budgets));
        localStorage.setItem('language', this.language);
    }

    confirmDelete(itemId, itemType) {
        this.deleteItemId = itemId;
        this.deleteItemType = itemType;
        this.openModal('deleteModal');
    }

    deleteConfirmed() {
        if (this.deleteItemType === 'budget') {
            this.deleteBudget(this.deleteItemId);
        } else if (this.deleteItemType === 'transfer') {
            this.deleteTransfer(this.deleteItemId);
        } else if (this.deleteItemType === 'movement' || this.deleteItemType === 'transaction') {
            this.deleteMovement(this.deleteItemId);
        }
        
        this.closeModal('deleteModal');
    }

    deleteTransfer(transferId) {
        this.transfers = this.transfers.filter(t => t.id !== transferId);
        this.saveData();
        this.updateTransactions();
        this.showNotification('Transferencia eliminada exitosamente');
    }

    // Modal Management Methods
    openModal(modalId) {
        console.log('Opening modal:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            // Only hide overflow if modal is actually opened
            document.body.style.overflow = 'hidden';
            console.log('Modal opened successfully:', modalId);
        } else {
            console.error('Modal not found:', modalId);
        }
    }

    closeModal(modalId) {
        console.log('Closing modal:', modalId);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
        // Always restore scroll
        document.body.style.overflow = '';
        document.body.style.overflowY = 'auto';
        console.log('Modal closed and scroll restored');
    }

    deleteMovement(movementId) {
        this.transactions = this.transactions.filter(t => t.id !== movementId);
        this.saveData();
        this.updateUI();
        this.showNotification('Movimiento eliminado exitosamente');
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    changeLanguage(newLanguage) {
        this.language = newLanguage;
        localStorage.setItem('language', newLanguage);
        this.translatePage();
        this.updateUI(); // Refresh UI to apply translations
        this.closeModal('settingsModal');
        this.showNotification(this.translations[newLanguage]['language'] + ' actualizado');
    }

    translatePage() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[this.language] && this.translations[this.language][key]) {
                element.textContent = this.translations[this.language][key];
            }
        });
        
        // Update language selector
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.language;
        }
    }

    // Modal opening methods
    openTransactionModal() {
        console.log('openTransactionModal called!');
        this.editingMode = false;
        this.editingTransactionId = null;
        
        const modalTitle = document.getElementById('transactionModalTitle');
        console.log('transactionModalTitle found:', !!modalTitle);
        
        if (modalTitle) {
            modalTitle.textContent = this.translations[this.language]['addTransaction'] || 'Agregar Movimiento';
        }
        
        const form = document.getElementById('transactionForm');
        console.log('transactionForm found:', !!form);
        
        if (form) {
            form.reset();
        }
        
        this.populateTransactionAccounts();
        this.populateTransactionCategories();
        this.populateTransactionPeople();
        this.openModal('transactionModal');
    }

    populateTransactionAccounts() {
        const accountSelect = document.getElementById('transactionAccount');
        if (accountSelect) {
            accountSelect.innerHTML = '<option value="">Seleccionar cuenta</option>';
            this.accounts.forEach(account => {
                const option = document.createElement('option');
                option.value = account.id;
                option.textContent = account.name;
                accountSelect.appendChild(option);
            });
        }
    }

    populateTransactionCategories() {
        const categorySelect = document.getElementById('transactionCategory');
        if (categorySelect) {
            categorySelect.innerHTML = '<option value="">Seleccionar categoría</option>';
            this.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        }
    }

    populateTransactionPeople() {
        const personSelect = document.getElementById('transactionPerson');
        if (personSelect) {
            personSelect.innerHTML = '<option value="">Seleccionar persona</option>';
            this.people.forEach(person => {
                const option = document.createElement('option');
                option.value = person.id;
                option.textContent = person.name;
                personSelect.appendChild(option);
            });
        }
    }

    populateTransferAccounts() {
        const fromAccountSelect = document.getElementById('fromAccount');
        const toAccountSelect = document.getElementById('toAccount');
        
        if (fromAccountSelect) {
            fromAccountSelect.innerHTML = '<option value="">Cuenta origen</option>';
            this.accounts.forEach(account => {
                const option = document.createElement('option');
                option.value = account.id;
                option.textContent = account.name;
                fromAccountSelect.appendChild(option);
            });
        }
        
        if (toAccountSelect) {
            toAccountSelect.innerHTML = '<option value="">Cuenta destino</option>';
            this.accounts.forEach(account => {
                const option = document.createElement('option');
                option.value = account.id;
                option.textContent = account.name;
                toAccountSelect.appendChild(option);
            });
        }
    }

    populateAccountPeople() {
        const personSelect = document.getElementById('accountPerson');
        if (personSelect) {
            personSelect.innerHTML = '<option value="">Seleccionar persona</option>';
            this.people.forEach(person => {
                const option = document.createElement('option');
                option.value = person.id;
                option.textContent = person.name;
                personSelect.appendChild(option);
            });
        }
    }

    openTransferModal() {
        console.log('openTransferModal called!');
        this.editingTransfersMode = false;
        this.editingTransferId = null;
        
        const modalTitle = document.getElementById('transferModalTitle');
        if (modalTitle) {
            modalTitle.textContent = this.translations[this.language]['addTransfer'] || 'Nueva Transferencia';
        }
        
        const form = document.getElementById('transferForm');
        if (form) {
            form.reset();
        }
        
        this.populateTransferAccounts();
        this.openModal('transferModal');
    }

    openPersonModal() {
        console.log('openPersonModal called!');
        this.editingMode = false;
        this.editingPersonId = null;
        
        const modalTitle = document.getElementById('personModalTitle');
        if (modalTitle) {
            modalTitle.textContent = this.translations[this.language]['addPerson'] || 'Agregar Persona';
        }
        
        const form = document.getElementById('personForm');
        if (form) {
            form.reset();
        }
        
        this.openModal('personModal');
    }

    openAccountModal() {
        console.log('openAccountModal called!');
        this.editingMode = false;
        this.editingAccountId = null;
        
        const modalTitle = document.getElementById('accountModalTitle');
        if (modalTitle) {
            modalTitle.textContent = this.translations[this.language]['addAccount'] || 'Agregar Cuenta';
        }
        
        const form = document.getElementById('accountForm');
        if (form) {
            form.reset();
        }
        
        this.populateAccountPeople();
        this.openModal('accountModal');
    }

    openCategoryModal() {
        console.log('openCategoryModal called!');
        this.editingMode = false;
        this.editingCategoryId = null;
        
        const modalTitle = document.getElementById('categoryModalTitle');
        if (modalTitle) {
            modalTitle.textContent = this.translations[this.language]['addCategory'] || 'Agregar Categoría';
        }
        
        const form = document.getElementById('categoryForm');
        if (form) {
            form.reset();
        }
        
        this.openModal('categoryModal');
    }

    // Show tab method
    showTab(tabName) {
        console.log('Showing tab:', tabName);
        
        // Remove active class from all tab contents
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // Remove active class from all nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected tab content
        const selectedTab = document.getElementById(tabName);
        console.log('Selected tab element found:', !!selectedTab);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        // Add active class to selected nav tab
        const selectedNavTab = document.querySelector(`[data-tab="${tabName}"]`);
        console.log('Selected nav tab found:', !!selectedNavTab);
        if (selectedNavTab) {
            selectedNavTab.classList.add('active');
        }

        this.currentTab = tabName;
        console.log('Successfully switched to tab:', tabName);
    }

    // Save methods for forms
    saveTransaction() {
        console.log('saveTransaction called');
        // TODO: Implement transaction saving logic
        this.closeModal('transactionModal');
        this.showNotification('Movimiento guardado exitosamente');
    }

    saveTransfer() {
        console.log('saveTransfer called');
        // TODO: Implement transfer saving logic
        this.closeModal('transferModal');
        this.showNotification('Transferencia guardada exitosamente');
    }

    savePerson() {
        console.log('savePerson called');
        // TODO: Implement person saving logic
        this.closeModal('personModal');
        this.showNotification('Persona guardada exitosamente');
    }

    saveAccount() {
        console.log('saveAccount called');
        // TODO: Implement account saving logic
        this.closeModal('accountModal');
        this.showNotification('Cuenta guardada exitosamente');
    }

    saveCategory() {
        console.log('saveCategory called');
        // TODO: Implement category saving logic
        this.closeModal('categoryModal');
        this.showNotification('Categoría guardada exitosamente');
    }

    // Filter methods
    applyFilters() {
        console.log('applyFilters called');
        // TODO: Implement filter logic
        this.showNotification('Filtros aplicados');
    }

    clearFilters() {
        console.log('clearFilters called');
        // TODO: Implement clear filter logic
        this.showNotification('Filtros limpiados');
    }
}

// Add CSS for notifications and modals
const style = document.createElement('style');
style.textContent = `
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        align-items: center;
        justify-content: center;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        padding: 12px 20px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1001;
        max-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded!');
    app = new FinancialPlanner();
    console.log('FinancialPlanner instance created!');
    app.init();
});

// Emergency scroll restore function (can be called from console)
window.restoreScroll = function() {
    document.body.style.overflow = '';
    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflow = '';
    document.documentElement.style.overflowY = 'auto';
    console.log('Emergency scroll restore executed');
};