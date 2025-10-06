// Configuration and Constants
console.log('📋 Loading config...');

const CONFIG = {
    APP_NAME: 'Financial Planner',
    VERSION: '1.0.0',
    DEFAULT_LANGUAGE: 'es',
    STORAGE_KEYS: {
        LANGUAGE: 'language',
        TRANSACTIONS: 'transactions',
        TRANSFERS: 'transfers',
        PEOPLE: 'people',
        ACCOUNTS: 'accounts',
        CATEGORIES: 'categories',
        BUDGETS: 'budgets',
        FILTERS: 'savedFilters'
    },
    NOTIFICATION_DURATION: 3000,
    DEBUG: true
};

const TRANSLATIONS = {
    es: {
        dashboard: 'Dashboard',
        movements: 'Movimientos',
        people: 'Personas',
        accounts: 'Cuentas',
        categories: 'Categorías',
        transactions: 'Transacciones',
        budgets: 'Presupuestos',
        calendar: 'Calendario',
        settings: 'Ajustes',
        language: 'Idioma',
        income: 'Ingresos',
        expenses: 'Gastos',
        balance: 'Balance',
        addTransaction: 'Agregar Movimiento',
        addTransfer: 'Nueva Transferencia',
        addPerson: 'Agregar Persona',
        addAccount: 'Agregar Cuenta',
        addCategory: 'Agregar Categoría',
        save: 'Guardar',
        cancel: 'Cancelar',
        delete: 'Eliminar',
        edit: 'Editar',
        close: 'Cerrar'
    },
    en: {
        dashboard: 'Dashboard',
        movements: 'Movements',
        people: 'People',
        accounts: 'Accounts',
        categories: 'Categories',
        transactions: 'Transactions',
        budgets: 'Budgets',
        calendar: 'Calendar',
        settings: 'Settings',
        language: 'Language',
        income: 'Income',
        expenses: 'Expenses',
        balance: 'Balance',
        addTransaction: 'Add Movement',
        addTransfer: 'New Transfer',
        addPerson: 'Add Person',
        addAccount: 'Add Account',
        addCategory: 'Add Category',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        close: 'Close'
    }
};

// Utility functions
const Utils = {
    log: (message, type = 'info') => {
        if (CONFIG.DEBUG) {
            const emoji = {
                info: 'ℹ️',
                success: '✅',
                warning: '⚠️',
                error: '❌',
                debug: '🔍'
            };
            console.log(`${emoji[type]} ${message}`);
        }
    },

    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    formatCurrency: (amount) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    },

    formatDate: (date) => {
        return new Intl.DateTimeFormat('es-ES').format(new Date(date));
    }
};

console.log('✅ Config loaded successfully');
