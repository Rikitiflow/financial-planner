// Tab Manager - Handles navigation between tabs
console.log('📑 Loading tab manager...');

class TabManager {
    constructor() {
        this.currentTab = 'dashboard';
        this.setupTabEventListeners();
        Utils.log('Tab manager initialized', 'success');
    }

    setupTabEventListeners() {
        // Setup navigation tab listeners
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = e.currentTarget.getAttribute('data-tab');
                if (tabName) {
                    this.showTab(tabName);
                }
            });
        });

        Utils.log('Tab event listeners setup', 'debug');
    }

    showTab(tabName) {
        Utils.log(`Switching to tab: ${tabName}`, 'debug');
        
        // Validate tab exists
        const targetTab = document.getElementById(tabName);
        if (!targetTab) {
            Utils.log(`Tab not found: ${tabName}`, 'error');
            return false;
        }

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
            tab.style.display = 'none';
        });

        // Remove active class from all nav tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected tab
        targetTab.classList.add('active');
        targetTab.style.display = 'block';

        // Activate corresponding nav tab
        const navTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (navTab) {
            navTab.classList.add('active');
        }

        // Update current tab
        this.currentTab = tabName;

        // Call tab-specific initialization
        this.initializeTab(tabName);

        Utils.log(`Successfully switched to tab: ${tabName}`, 'success');
        return true;
    }

    initializeTab(tabName) {
        // Call specific initialization methods based on tab
        switch (tabName) {
            case 'dashboard':
                this.initializeDashboard();
                break;
            case 'movements':
                this.initializeMovements();
                break;
            case 'people':
                this.initializePeople();
                break;
            case 'accounts':
                this.initializeAccounts();
                break;
            case 'categories':
                this.initializeCategories();
                break;
            case 'transactions':
                this.initializeTransactions();
                break;
            case 'budgets':
                this.initializeBudgets();
                break;
            case 'calendar':
                this.initializeCalendar();
                break;
            default:
                Utils.log(`No initialization method for tab: ${tabName}`, 'debug');
        }
    }

    // Tab initialization methods
    initializeDashboard() {
        Utils.log('Initializing dashboard', 'debug');
        
        // Update balance cards
        this.updateBalanceCards();
        
        // Update recent transactions
        this.updateRecentTransactions();
        
        // Update chart if exists
        this.updateDashboardChart();
    }

    initializeMovements() {
        Utils.log('Initializing movements', 'debug');
        
        // Update movements list
        this.updateMovementsList();
        
        // Update balance sidebar
        this.updateMovementsBalance();
    }

    initializePeople() {
        Utils.log('Initializing people', 'debug');
        this.updatePeopleList();
    }

    initializeAccounts() {
        Utils.log('Initializing accounts', 'debug');
        this.updateAccountsList();
    }

    initializeCategories() {
        Utils.log('Initializing categories', 'debug');
        this.updateCategoriesList();
    }

    initializeTransactions() {
        Utils.log('Initializing transactions', 'debug');
        this.updateTransactionsList();
    }

    initializeBudgets() {
        Utils.log('Initializing budgets', 'debug');
        this.updateBudgetsList();
    }

    initializeCalendar() {
        Utils.log('Initializing calendar', 'debug');
        this.updateCalendar();
    }

    // Update methods for each tab
    updateBalanceCards() {
        if (!window.app || !window.app.dataManager) return;

        const transactions = window.app.dataManager.get('transactions');
        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach(transaction => {
            const amount = parseFloat(transaction.amount) || 0;
            if (transaction.type === 'income') {
                totalIncome += amount;
            } else if (transaction.type === 'expense') {
                totalExpense += amount;
            }
        });

        const balance = totalIncome - totalExpense;

        // Update DOM elements
        const incomeElement = document.getElementById('totalIncome');
        const expenseElement = document.getElementById('totalExpense');
        const balanceElement = document.getElementById('totalBalance');

        if (incomeElement) incomeElement.textContent = Utils.formatCurrency(totalIncome);
        if (expenseElement) expenseElement.textContent = Utils.formatCurrency(totalExpense);
        if (balanceElement) balanceElement.textContent = Utils.formatCurrency(balance);
    }

    updateRecentTransactions() {
        if (!window.app || !window.app.dataManager) return;

        const transactions = window.app.dataManager.get('transactions')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

        const container = document.getElementById('recentTransactionsList');
        if (!container) return;

        if (transactions.length === 0) {
            container.innerHTML = '<p class="empty-state">No hay movimientos recientes</p>';
            return;
        }

        container.innerHTML = transactions.map(transaction => `
            <div class="transaction-item">
                <div class="transaction-info">
                    <span class="transaction-description">${transaction.description || 'Sin descripción'}</span>
                    <span class="transaction-date">${Utils.formatDate(transaction.createdAt)}</span>
                </div>
                <span class="transaction-amount ${transaction.type}">
                    ${transaction.type === 'income' ? '+' : '-'}${Utils.formatCurrency(Math.abs(transaction.amount))}
                </span>
            </div>
        `).join('');
    }

    updateDashboardChart() {
        // TODO: Implement chart update
        Utils.log('Dashboard chart update not implemented yet', 'debug');
    }

    updateMovementsList() {
        // TODO: Implement movements list update
        Utils.log('Movements list update not implemented yet', 'debug');
    }

    updateMovementsBalance() {
        // TODO: Implement movements balance update
        Utils.log('Movements balance update not implemented yet', 'debug');
    }

    updatePeopleList() {
        // TODO: Implement people list update
        Utils.log('People list update not implemented yet', 'debug');
    }

    updateAccountsList() {
        // TODO: Implement accounts list update
        Utils.log('Accounts list update not implemented yet', 'debug');
    }

    updateCategoriesList() {
        // TODO: Implement categories list update
        Utils.log('Categories list update not implemented yet', 'debug');
    }

    updateTransactionsList() {
        // TODO: Implement transactions list update
        Utils.log('Transactions list update not implemented yet', 'debug');
    }

    updateBudgetsList() {
        // TODO: Implement budgets list update
        Utils.log('Budgets list update not implemented yet', 'debug');
    }

    updateCalendar() {
        // TODO: Implement calendar update
        Utils.log('Calendar update not implemented yet', 'debug');
    }

    // Utility methods
    getCurrentTab() {
        return this.currentTab;
    }

    refreshCurrentTab() {
        this.initializeTab(this.currentTab);
    }
}

console.log('✅ Tab manager loaded successfully');
