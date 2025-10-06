// Simplified Financial Planner - Immediate Working Version
console.log('🚀 Loading simplified app...');

// Simple app that works immediately
class SimpleFinancialPlanner {
    constructor() {
        console.log('📱 Creating simple app...');
        this.currentTab = 'dashboard';
        this.setupEventListeners();
        this.restoreScroll();
        console.log('✅ Simple app ready!');
    }

    setupEventListeners() {
        console.log('🎯 Setting up simple event listeners...');

        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = e.currentTarget.getAttribute('data-tab');
                console.log('🔄 Tab clicked:', tabName);
                this.showTab(tabName);
            });
        });

        // All buttons that should open modals
        const buttonMappings = {
            'addMovement': 'movementModal',
            'transfer': 'transferModal', 
            'createMovement': 'movementModal',
            'createTransaction': 'transferModal',
            'createPerson': 'personModal',
            'createAccount': 'accountModal',
            'createCategory': 'categoryModal',
            'settingsBtn': 'settingsModal'
        };

        Object.entries(buttonMappings).forEach(([buttonId, modalId]) => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    console.log(`🔓 Opening modal: ${modalId}`);
                    this.openModal(modalId);
                });
                console.log(`✅ Button "${buttonId}" → "${modalId}"`);
            } else {
                console.warn(`⚠️ Button "${buttonId}" not found`);
            }
        });

        // Close buttons for all modals
        document.querySelectorAll('.modal-close, [id*="close"], [id*="cancel"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const modal = btn.closest('.modal');
                if (modal) {
                    console.log(`🔒 Closing modal: ${modal.id}`);
                    this.closeModal(modal.id);
                }
            });
        });

        // Form submissions
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('📝 Form submitted:', form.id);
                this.handleFormSubmit(form);
            });
        });

        // Language selector
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                console.log('🌐 Language changed:', e.target.value);
                this.showNotification(`Idioma cambiado a ${e.target.value}`);
            });
        }

        // Add sample data button (for testing)
        this.addSampleDataButton();

        console.log('✅ Simple event listeners ready!');
    }

    addSampleDataButton() {
        // Add a button to create sample data for testing
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) {
            const modalBody = settingsModal.querySelector('.modal-body');
            if (modalBody) {
                const sampleDataSection = document.createElement('div');
                sampleDataSection.className = 'settings-section';
                sampleDataSection.innerHTML = `
                    <h4>Datos de Prueba</h4>
                    <button id="createSampleData" class="btn-primary" style="width: 100%; margin-top: 8px;">
                        Crear Datos de Ejemplo
                    </button>
                    <button id="clearAllData" class="btn-danger" style="width: 100%; margin-top: 8px;">
                        Limpiar Todos los Datos
                    </button>
                `;
                modalBody.appendChild(sampleDataSection);

                // Add event listeners
                document.getElementById('createSampleData')?.addEventListener('click', () => {
                    this.createSampleData();
                });

                document.getElementById('clearAllData')?.addEventListener('click', () => {
                    this.clearAllData();
                });
            }
        }
    }

    createSampleData() {
        console.log('🎯 Creating sample data...');

        // Create sample people
        const samplePeople = [
            { id: 'person1', name: 'Juan Pérez', createdAt: new Date().toISOString() },
            { id: 'person2', name: 'María García', createdAt: new Date().toISOString() }
        ];

        // Create sample accounts
        const sampleAccounts = [
            { id: 'account1', name: 'Cuenta Corriente', type: 'checking', person: 'person1', initialBalance: 1000, createdAt: new Date().toISOString() },
            { id: 'account2', name: 'Tarjeta de Crédito', type: 'credit', person: 'person1', initialBalance: 0, createdAt: new Date().toISOString() },
            { id: 'account3', name: 'Ahorros', type: 'savings', person: 'person2', initialBalance: 500, createdAt: new Date().toISOString() }
        ];

        // Create sample categories
        const sampleCategories = [
            { id: 'cat1', name: 'Alimentación', icon: 'fas fa-utensils', type: 'expense', createdAt: new Date().toISOString() },
            { id: 'cat2', name: 'Transporte', icon: 'fas fa-car', type: 'expense', createdAt: new Date().toISOString() },
            { id: 'cat3', name: 'Entretenimiento', icon: 'fas fa-gamepad', type: 'expense', createdAt: new Date().toISOString() },
            { id: 'cat4', name: 'Salario', icon: 'fas fa-money-bill-wave', type: 'income', createdAt: new Date().toISOString() },
            { id: 'cat5', name: 'Hogar', icon: 'fas fa-home', type: 'expense', createdAt: new Date().toISOString() }
        ];

        // Create sample transactions
        const today = new Date();
        const sampleTransactions = [
            {
                id: 'trans1',
                description: 'Supermercado',
                amount: 85.50,
                type: 'expense',
                category: 'cat1',
                account: 'account1',
                person: 'person1',
                date: today.toISOString().split('T')[0],
                createdAt: new Date().toISOString()
            },
            {
                id: 'trans2',
                description: 'Gasolina',
                amount: 45.00,
                type: 'expense',
                category: 'cat2',
                account: 'account2',
                person: 'person1',
                date: new Date(today.getTime() - 86400000).toISOString().split('T')[0],
                createdAt: new Date().toISOString()
            },
            {
                id: 'trans3',
                description: 'Cine',
                amount: 25.00,
                type: 'expense',
                category: 'cat3',
                account: 'account1',
                person: 'person2',
                date: new Date(today.getTime() - 172800000).toISOString().split('T')[0],
                createdAt: new Date().toISOString()
            },
            {
                id: 'trans4',
                description: 'Salario Mensual',
                amount: 2500.00,
                type: 'income',
                category: 'cat4',
                account: 'account1',
                person: 'person1',
                date: new Date(today.getTime() - 259200000).toISOString().split('T')[0],
                createdAt: new Date().toISOString()
            },
            {
                id: 'trans5',
                description: 'Electricidad',
                amount: 120.00,
                type: 'expense',
                category: 'cat5',
                account: 'account1',
                person: 'person1',
                date: new Date(today.getTime() - 345600000).toISOString().split('T')[0],
                createdAt: new Date().toISOString()
            }
        ];

        // Create sample budgets
        const sampleBudgets = [
            { id: 'budget1', categoryId: 'cat1', amount: 300, createdAt: new Date().toISOString() },
            { id: 'budget2', categoryId: 'cat2', amount: 200, createdAt: new Date().toISOString() },
            { id: 'budget3', categoryId: 'cat3', amount: 100, createdAt: new Date().toISOString() },
            { id: 'budget5', categoryId: 'cat5', amount: 150, createdAt: new Date().toISOString() }
        ];

        // Save all sample data
        localStorage.setItem('people', JSON.stringify(samplePeople));
        localStorage.setItem('accounts', JSON.stringify(sampleAccounts));
        localStorage.setItem('categories', JSON.stringify(sampleCategories));
        localStorage.setItem('transactions', JSON.stringify(sampleTransactions));
        localStorage.setItem('budgets', JSON.stringify(sampleBudgets));

        this.showNotification('¡Datos de ejemplo creados exitosamente!');
        this.closeModal('settingsModal');
        
        // Refresh current tab
        this.loadTabData(this.currentTab);
    }

    clearAllData() {
        if (confirm('¿Estás seguro de que quieres eliminar todos los datos? Esta acción no se puede deshacer.')) {
            const keys = ['transactions', 'transfers', 'people', 'accounts', 'categories', 'budgets'];
            keys.forEach(key => {
                localStorage.removeItem(key);
            });
            
            this.showNotification('Todos los datos han sido eliminados');
            this.closeModal('settingsModal');
            
            // Refresh current tab
            this.loadTabData(this.currentTab);
        }
    }

    showTab(tabName) {
        console.log(`🔄 Showing tab: ${tabName}`);

        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.style.display = 'none';
            tab.classList.remove('active');
        });

        // Remove active from nav
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show target tab
        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.style.display = 'block';
            targetTab.classList.add('active');
            console.log(`✅ Tab "${tabName}" shown`);
        } else {
            console.error(`❌ Tab "${tabName}" not found`);
        }

        // Activate nav tab
        const navTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (navTab) {
            navTab.classList.add('active');
        }

        this.currentTab = tabName;
        
        // Load data for the tab
        this.loadTabData(tabName);
    }

    loadTabData(tabName) {
        console.log(`📊 Loading data for tab: ${tabName}`);
        
        switch(tabName) {
            case 'dashboard':
                this.loadDashboardData();
                break;
            case 'movements':
                this.loadMovementsData();
                break;
            case 'people':
                this.loadPeopleData();
                break;
            case 'accounts':
                this.loadAccountsData();
                break;
            case 'categories':
                this.loadCategoriesData();
                break;
            case 'transactions':
                this.loadTransactionsData();
                break;
            case 'budgets':
                this.loadBudgetsData();
                break;
            case 'calendar':
                this.loadCalendarData();
                break;
        }
    }

    loadDashboardData() {
        // Load transactions for dashboard
        const transactions = this.getData('transactions');
        console.log(`📊 Dashboard: ${transactions.length} transactions`);
        
        // Update balance cards
        let income = 0, expense = 0;
        transactions.forEach(t => {
            const amount = parseFloat(t.amount) || 0;
            if (t.type === 'income') income += amount;
            else if (t.type === 'expense') expense += amount;
        });
        
        // Add initial balance from accounts
        const accounts = this.getData('accounts');
        const initialBalance = accounts.reduce((sum, account) => {
            return sum + (parseFloat(account.initialBalance) || 0);
        }, 0);
        
        const totalBalance = initialBalance + income - expense;
        
        const incomeEl = document.getElementById('totalIncome');
        const expenseEl = document.getElementById('totalExpense');
        const balanceEl = document.getElementById('totalBalance');
        
        if (incomeEl) incomeEl.textContent = `$${(initialBalance + income).toFixed(2)}`;
        if (expenseEl) expenseEl.textContent = `$${expense.toFixed(2)}`;
        if (balanceEl) balanceEl.textContent = `$${totalBalance.toFixed(2)}`;
        
        // Load recent transactions
        const recentTransactions = transactions.slice(-5).reverse();
        this.displayList('recentTransactionsList', recentTransactions, 'movement');
        
        // Load chart
        this.loadExpenseChart();
    }

    loadMovementsData() {
        const transactions = this.getData('transactions');
        console.log(`📊 Movements: ${transactions.length} transactions`);
        
        // Update balance cards in movements page
        let income = 0, expense = 0;
        transactions.forEach(t => {
            const amount = parseFloat(t.amount) || 0;
            if (t.type === 'income') income += amount;
            else if (t.type === 'expense') expense += amount;
        });
        
        // Update movements balance cards
        const movIncomeEl = document.querySelector('#movements .income .card-amount');
        const movExpenseEl = document.querySelector('#movements .expense .card-amount');
        const movBalanceEl = document.querySelector('#movements .balance .card-amount');
        
        if (movIncomeEl) movIncomeEl.textContent = `$${income.toFixed(2)}`;
        if (movExpenseEl) movExpenseEl.textContent = `$${expense.toFixed(2)}`;
        if (movBalanceEl) movBalanceEl.textContent = `$${(income - expense).toFixed(2)}`;
        
        this.displayList('allMovementsList', transactions, 'movement');
    }

    loadPeopleData() {
        const people = this.getData('people');
        console.log(`📊 People: ${people.length} people`);
        this.displayList('peopleGrid', people, 'person');
    }

    loadAccountsData() {
        const accounts = this.getData('accounts');
        console.log(`📊 Accounts: ${accounts.length} accounts`);
        this.displayList('accountsGrid', accounts, 'account');
    }

    loadCategoriesData() {
        const categories = this.getData('categories');
        console.log(`📊 Categories: ${categories.length} categories`);
        this.displayList('categoriesGrid', categories, 'category');
    }

    loadTransactionsData() {
        const transfers = this.getData('transfers');
        console.log(`📊 Transactions: ${transfers.length} transfers`);
        this.displayList('transactionsGrid', transfers, 'transfer');
    }

    loadBudgetsData() {
        const budgets = this.getData('budgets');
        const categories = this.getData('categories');
        const transactions = this.getData('transactions');
        
        console.log(`📊 Budgets: ${budgets.length} budgets, ${categories.length} categories`);
        
        if (categories.length === 0) {
            const container = document.getElementById('budgetsGrid');
            if (container) {
                container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Primero crea algunas categorías para poder establecer presupuestos</p>';
            }
            return;
        }
        
        // Create budget cards for each category
        let html = '';
        categories.forEach(category => {
            // Find budget for this category
            const budget = budgets.find(b => b.categoryId === category.id);
            const projected = budget ? parseFloat(budget.amount) || 0 : 0;
            
            // Calculate real spending for this category this month
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            
            console.log(`📊 Calculating budget for category: ${category.name} (ID: ${category.id})`);
            
            const categoryTransactions = transactions.filter(t => {
                const matchesCategory = t.category === category.id;
                const isExpense = t.type === 'expense';
                const tDate = new Date(t.date);
                const isCurrentMonth = tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
                
                if (matchesCategory && isExpense && isCurrentMonth) {
                    console.log(`  - Found transaction: ${t.description} - $${t.amount}`);
                }
                
                return matchesCategory && isExpense && isCurrentMonth;
            });
            
            const real = categoryTransactions.reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
            
            console.log(`  - Total real spending: $${real.toFixed(2)}`);
            
            // Calculate percentage
            let percentage = 0;
            let percentageColor = '#34c759';
            let percentageText = '';
            
            if (projected > 0) {
                percentage = (real / projected) * 100;
                if (percentage <= 100) {
                    percentageColor = '#34c759';
                    percentageText = `${percentage.toFixed(1)}% del presupuesto`;
                } else {
                    percentageColor = '#ff3b30';
                    percentageText = `${(percentage - 100).toFixed(1)}% sobre presupuesto`;
                }
            }
            
            html += `
                <div style="background: #2c2c2e; padding: 20px; border-radius: 12px; border: 1px solid #3c3c3e;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                        <i class="${category.icon || 'fas fa-tag'}" style="color: #007aff; font-size: 20px;"></i>
                        <h3 style="margin: 0; color: white;">${category.name}</h3>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                        <div>
                            <label style="color: #666; font-size: 12px; display: block; margin-bottom: 4px;">Proyectado</label>
                            <input type="number" value="${projected}" 
                                   onchange="app.updateBudget('${category.id}', this.value)"
                                   style="width: 100%; padding: 8px; background: #1c1c1e; border: 1px solid #3c3c3e; border-radius: 6px; color: white;">
                        </div>
                        <div>
                            <label style="color: #666; font-size: 12px; display: block; margin-bottom: 4px;">Real</label>
                            <input type="number" value="${real.toFixed(2)}" readonly
                                   style="width: 100%; padding: 8px; background: #0c0c0c; border: 1px solid #3c3c3e; border-radius: 6px; color: #666;">
                        </div>
                    </div>
                    
                    ${projected > 0 ? `
                        <div style="text-align: center; color: ${percentageColor}; font-weight: bold; font-size: 14px;">
                            ${percentageText}
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        const container = document.getElementById('budgetsGrid');
        if (container) {
            container.innerHTML = html;
        }
    }

    getData(key) {
        const data = localStorage.getItem(key);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (e) {
                console.error(`Error parsing ${key}:`, e);
                return [];
            }
        }
        return [];
    }

    displayList(containerId, items, type) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container ${containerId} not found`);
            return;
        }

        if (items.length === 0) {
            container.innerHTML = `<p style="text-align: center; color: #666; padding: 20px;">No hay ${type}s registrados</p>`;
            return;
        }

        let html = '';
        items.forEach(item => {
            html += `<div style="background: #2c2c2e; padding: 15px; margin: 10px 0; border-radius: 8px; border: 1px solid #3c3c3e;">`;
            
            if (type === 'movement') {
                // Get related data
                const categories = this.getData('categories');
                const accounts = this.getData('accounts');
                const people = this.getData('people');
                
                const category = categories.find(c => c.id === item.category);
                const account = accounts.find(a => a.id === item.account);
                const person = people.find(p => p.id === item.person);
                
                // Debug logging
                console.log(`Movement: ${item.description}`, {
                    categoryId: item.category,
                    accountId: item.account,
                    personId: item.person,
                    foundCategory: category?.name,
                    foundAccount: account?.name,
                    foundPerson: person?.name
                });
                
                html += `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="flex: 1;">
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                                <i class="${category?.icon || 'fas fa-tag'}" style="color: #007aff; font-size: 16px;"></i>
                                <strong>${item.description || 'Sin descripción'}</strong>
                                <span style="background: ${item.type === 'income' ? '#34c759' : '#ff3b30'}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; text-transform: uppercase;">
                                    ${item.type === 'income' ? 'Ingreso' : 'Gasto'}
                                </span>
                            </div>
                            <div style="color: #666; font-size: 12px; display: flex; flex-wrap: wrap; gap: 8px;">
                                <span style="display: flex; align-items: center; gap: 4px;">
                                    <i class="fas fa-calendar" style="font-size: 10px;"></i>
                                    ${item.date || 'Sin fecha'}
                                </span>
                                ${category ? `
                                    <span style="display: flex; align-items: center; gap: 4px;">
                                        <i class="${category.icon}" style="font-size: 10px;"></i>
                                        ${category.name}
                                    </span>
                                ` : '<span style="color: #ff3b30;">Sin categoría</span>'}
                                ${account ? `
                                    <span style="display: flex; align-items: center; gap: 4px;">
                                        <i class="fas fa-credit-card" style="font-size: 10px;"></i>
                                        ${account.name}
                                    </span>
                                ` : '<span style="color: #ff3b30;">Sin cuenta</span>'}
                                ${person ? `
                                    <span style="display: flex; align-items: center; gap: 4px;">
                                        <i class="fas fa-user" style="font-size: 10px;"></i>
                                        ${person.name}
                                    </span>
                                ` : ''}
                            </div>
                        </div>
                        <div style="font-size: 18px; font-weight: bold; color: ${item.type === 'income' ? '#34c759' : '#ff3b30'};">
                            ${item.type === 'income' ? '+' : '-'}$${Math.abs(item.amount || 0).toFixed(2)}
                        </div>
                    </div>
                `;
            } else if (type === 'person') {
                html += `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <strong>${item.name || 'Sin nombre'}</strong>
                        <div style="display: flex; gap: 8px;">
                            <button onclick="app.editItem('people', '${item.id}')" style="background: #007aff; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">✏️ Editar</button>
                            <button onclick="app.deleteItem('people', '${item.id}')" style="background: #ff3b30; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">🗑️ Eliminar</button>
                        </div>
                    </div>
                `;
            } else if (type === 'account') {
                html += `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>${item.name || 'Sin nombre'}</strong>
                            <div style="color: #666; font-size: 14px;">Tipo: ${item.type || 'No especificado'}</div>
                            <div style="color: #007aff;">Balance: $${(item.initialBalance || 0).toFixed(2)}</div>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <button onclick="app.editItem('accounts', '${item.id}')" style="background: #007aff; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">✏️ Editar</button>
                            <button onclick="app.deleteItem('accounts', '${item.id}')" style="background: #ff3b30; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">🗑️ Eliminar</button>
                        </div>
                    </div>
                `;
            } else if (type === 'category') {
                html += `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="${item.icon || 'fas fa-tag'}" style="color: #007aff;"></i>
                            <strong>${item.name || 'Sin nombre'}</strong>
                            <span style="background: #007aff; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
                                ${item.type || 'expense'}
                            </span>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <button onclick="app.editItem('categories', '${item.id}')" style="background: #007aff; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">✏️ Editar</button>
                            <button onclick="app.deleteItem('categories', '${item.id}')" style="background: #ff3b30; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">🗑️ Eliminar</button>
                        </div>
                    </div>
                `;
            } else if (type === 'transfer') {
                html += `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>${item.description || 'Transferencia'}</strong>
                            <div style="color: #666; font-size: 14px;">
                                ${item.fromAccount || 'Cuenta origen'} → ${item.toAccount || 'Cuenta destino'}
                            </div>
                            <div style="color: #666; font-size: 14px;">${item.date || 'Sin fecha'}</div>
                        </div>
                        <div style="font-size: 18px; font-weight: bold; color: #007aff;">
                            $${(item.amount || 0).toFixed(2)}
                        </div>
                    </div>
                `;
            } else {
                html += `<pre>${JSON.stringify(item, null, 2)}</pre>`;
            }
            
            html += `</div>`;
        });

        container.innerHTML = html;
    }

    editItem(dataType, itemId) {
        console.log(`✏️ Edit ${dataType} item: ${itemId}`);
        
        const item = this.getData(dataType).find(i => i.id === itemId);
        if (!item) {
            this.showNotification('Elemento no encontrado');
            return;
        }

        switch(dataType) {
            case 'people':
                this.editPerson(item);
                break;
            case 'accounts':
                this.editAccount(item);
                break;
            case 'categories':
                this.editCategory(item);
                break;
            default:
                this.showNotification(`Editar ${dataType} - Funcionalidad pendiente`);
        }
    }

    editPerson(person) {
        // Open person modal in edit mode
        this.openModal('personModal');
        
        // Populate form with existing data
        const nameInput = document.getElementById('personName');
        if (nameInput) {
            nameInput.value = person.name || '';
        }

        // Change modal title
        const modalTitle = document.getElementById('personModalTitle');
        if (modalTitle) {
            modalTitle.textContent = 'Editar Persona';
        }

        // Store edit mode data
        this.editingItem = { type: 'people', id: person.id };
    }

    editAccount(account) {
        // Open account modal in edit mode
        this.openModal('accountModal');
        
        // Populate form with existing data
        const nameInput = document.getElementById('accountName');
        const personSelect = document.getElementById('accountPerson');
        const typeSelect = document.getElementById('accountType');
        const balanceInput = document.getElementById('accountBalance');
        
        if (nameInput) nameInput.value = account.name || '';
        if (personSelect) personSelect.value = account.person || '';
        if (typeSelect) typeSelect.value = account.type || '';
        if (balanceInput) balanceInput.value = account.initialBalance || 0;

        // Change modal title
        const modalTitle = document.getElementById('accountModalTitle');
        if (modalTitle) {
            modalTitle.textContent = 'Editar Cuenta';
        }

        // Store edit mode data
        this.editingItem = { type: 'accounts', id: account.id };
    }

    editCategory(category) {
        // Open category modal in edit mode
        this.openModal('categoryModal');
        
        // Populate form with existing data
        const nameInput = document.getElementById('categoryName');
        if (nameInput) {
            nameInput.value = category.name || '';
        }

        // Select the icon
        setTimeout(() => {
            if (category.icon) {
                this.selectIcon(category.icon);
            }
        }, 100);

        // Change modal title
        const modalTitle = document.getElementById('categoryModalTitle');
        if (modalTitle) {
            modalTitle.textContent = 'Editar Categoría';
        }

        // Store edit mode data
        this.editingItem = { type: 'categories', id: category.id };
    }

    deleteItem(dataType, itemId) {
        console.log(`🗑️ Delete ${dataType} item: ${itemId}`);
        
        if (confirm(`¿Estás seguro de que quieres eliminar este elemento?`)) {
            const data = this.getData(dataType);
            const filteredData = data.filter(item => item.id !== itemId);
            
            localStorage.setItem(dataType, JSON.stringify(filteredData));
            this.showNotification(`Elemento eliminado exitosamente`);
            
            // Refresh current tab
            this.loadTabData(this.currentTab);
        }
    }

    updateBudget(categoryId, amount) {
        console.log(`💰 Update budget for category ${categoryId}: ${amount}`);
        
        const budgets = this.getData('budgets');
        const existingBudgetIndex = budgets.findIndex(b => b.categoryId === categoryId);
        
        if (existingBudgetIndex >= 0) {
            budgets[existingBudgetIndex].amount = parseFloat(amount) || 0;
        } else {
            budgets.push({
                id: Date.now().toString(),
                categoryId: categoryId,
                amount: parseFloat(amount) || 0,
                createdAt: new Date().toISOString()
            });
        }
        
        localStorage.setItem('budgets', JSON.stringify(budgets));
        this.showNotification('Presupuesto actualizado');
        
        // Refresh budgets display
        setTimeout(() => this.loadBudgetsData(), 100);
    }

    loadCalendarData() {
        console.log('📅 Loading calendar data...');
        
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        
        // Update year display
        const yearTitle = document.querySelector('#calendar .calendar-title');
        if (yearTitle) {
            yearTitle.textContent = currentYear.toString();
        }
        
        // Generate year grid
        const yearGrid = document.getElementById('yearGrid');
        if (yearGrid) {
            let html = '';
            const months = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ];
            
            months.forEach((month, index) => {
                const isCurrentMonth = index === currentMonth;
                html += `
                    <div class="month-card ${isCurrentMonth ? 'current' : ''}" 
                         onclick="app.showCalendarMonth(${index})"
                         style="background: ${isCurrentMonth ? '#007aff' : '#2c2c2e'}; 
                                color: ${isCurrentMonth ? 'white' : '#ffffff'}; 
                                padding: 20px; 
                                border-radius: 8px; 
                                text-align: center; 
                                cursor: pointer; 
                                border: 1px solid #3c3c3e;
                                transition: all 0.2s ease;">
                        <h3 style="margin: 0 0 8px 0;">${month}</h3>
                        <div style="font-size: 14px; opacity: 0.8;">
                            ${this.getMonthSummary(index, currentYear)}
                        </div>
                    </div>
                `;
            });
            
            yearGrid.innerHTML = html;
        }
        
        this.showNotification('Calendario actualizado al año ' + currentYear);
    }

    getMonthSummary(month, year) {
        const transactions = this.getData('transactions');
        
        const monthTransactions = transactions.filter(t => {
            const tDate = new Date(t.date);
            return tDate.getMonth() === month && tDate.getFullYear() === year;
        });
        
        let income = 0, expense = 0;
        monthTransactions.forEach(t => {
            const amount = parseFloat(t.amount) || 0;
            if (t.type === 'income') income += amount;
            else if (t.type === 'expense') expense += amount;
        });
        
        if (monthTransactions.length === 0) {
            return 'Sin movimientos';
        }
        
        return `${monthTransactions.length} movimientos<br>Balance: $${(income - expense).toFixed(0)}`;
    }

    showCalendarMonth(monthIndex) {
        console.log(`📅 Show calendar month: ${monthIndex}`);
        
        const currentYear = new Date().getFullYear();
        const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        
        // Hide year view, show month view
        document.getElementById('yearView').classList.remove('active');
        document.getElementById('monthView').classList.add('active');
        
        // Update title
        const calendarTitle = document.getElementById('calendarTitle');
        if (calendarTitle) {
            calendarTitle.textContent = `${monthNames[monthIndex]} ${currentYear}`;
        }
        
        // Show back button
        const backBtn = document.getElementById('calendarBackBtn');
        if (backBtn) {
            backBtn.style.display = 'flex';
            backBtn.onclick = () => this.showCalendarYear();
        }
        
        // Generate month calendar
        this.generateMonthCalendar(monthIndex, currentYear);
        
        this.showNotification(`Mostrando ${monthNames[monthIndex]} ${currentYear}`);
    }

    showCalendarYear() {
        // Hide month view, show year view
        document.getElementById('monthView').classList.remove('active');
        document.getElementById('yearView').classList.add('active');
        
        // Update title
        const calendarTitle = document.getElementById('calendarTitle');
        if (calendarTitle) {
            calendarTitle.textContent = new Date().getFullYear().toString();
        }
        
        // Hide back button
        const backBtn = document.getElementById('calendarBackBtn');
        if (backBtn) {
            backBtn.style.display = 'none';
        }
        
        this.loadCalendarData();
    }

    generateMonthCalendar(month, year) {
        const monthGrid = document.getElementById('monthGrid');
        if (!monthGrid) return;
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        const transactions = this.getData('transactions');
        
        let html = '';
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            html += '<div class="calendar-day empty"></div>';
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
            // Get transactions for this day
            const dayTransactions = transactions.filter(t => t.date === dateStr);
            
            let income = 0, expense = 0;
            dayTransactions.forEach(t => {
                const amount = parseFloat(t.amount) || 0;
                if (t.type === 'income') income += amount;
                else if (t.type === 'expense') expense += amount;
            });
            
            const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
            
            html += `
                <div class="calendar-day ${isToday ? 'today' : ''}" onclick="app.showCalendarDay('${dateStr}')">
                    <div class="day-number">${day}</div>
                    ${dayTransactions.length > 0 ? `
                        <div class="day-summary">
                            ${income > 0 ? `<div class="day-income">+$${income.toFixed(0)}</div>` : ''}
                            ${expense > 0 ? `<div class="day-expense">-$${expense.toFixed(0)}</div>` : ''}
                        </div>
                    ` : ''}
                </div>
            `;
        }
        
        monthGrid.innerHTML = html;
        
        // Add CSS for month calendar if not exists
        if (!document.getElementById('monthCalendarStyles')) {
            const style = document.createElement('style');
            style.id = 'monthCalendarStyles';
            style.textContent = `
                .month-grid {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 1px;
                    background: #3c3c3e;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .calendar-day {
                    background: #2c2c2e;
                    min-height: 80px;
                    padding: 8px;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                    display: flex;
                    flex-direction: column;
                }
                .calendar-day:hover {
                    background: #3c3c3e;
                }
                .calendar-day.today {
                    background: #007aff;
                    color: white;
                }
                .calendar-day.empty {
                    background: #1c1c1e;
                    cursor: default;
                }
                .day-number {
                    font-weight: bold;
                    margin-bottom: 4px;
                }
                .day-summary {
                    font-size: 10px;
                    margin-top: auto;
                }
                .day-income {
                    color: #34c759;
                }
                .day-expense {
                    color: #ff3b30;
                }
                .calendar-view {
                    display: none;
                }
                .calendar-view.active {
                    display: block;
                }
            `;
            document.head.appendChild(style);
        }
    }

    showCalendarDay(dateStr) {
        console.log(`📅 Show calendar day: ${dateStr}`);
        
        const transactions = this.getData('transactions');
        const dayTransactions = transactions.filter(t => t.date === dateStr);
        
        if (dayTransactions.length === 0) {
            this.showNotification('No hay movimientos en este día');
            return;
        }
        
        // Hide month view, show day view
        document.getElementById('monthView').classList.remove('active');
        document.getElementById('dayView').classList.add('active');
        
        // Update title
        const dayTitle = document.getElementById('dayTitle');
        if (dayTitle) {
            const date = new Date(dateStr);
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            dayTitle.textContent = date.toLocaleDateString('es-ES', options);
        }
        
        // Calculate day totals
        let income = 0, expense = 0;
        dayTransactions.forEach(t => {
            const amount = parseFloat(t.amount) || 0;
            if (t.type === 'income') income += amount;
            else if (t.type === 'expense') expense += amount;
        });
        
        // Update day summary
        const dayIncomeEl = document.getElementById('dayIncome');
        const dayExpenseEl = document.getElementById('dayExpense');
        if (dayIncomeEl) dayIncomeEl.textContent = `$${income.toFixed(2)}`;
        if (dayExpenseEl) dayExpenseEl.textContent = `$${expense.toFixed(2)}`;
        
        // Show transactions
        const dayTransactionsEl = document.getElementById('dayTransactions');
        if (dayTransactionsEl) {
            this.displayList('dayTransactions', dayTransactions, 'movement');
        }
        
        // Update back button
        const backBtn = document.getElementById('calendarBackBtn');
        if (backBtn) {
            backBtn.style.display = 'flex';
            const backText = document.getElementById('calendarBackText');
            if (backText) backText.textContent = 'Mes';
            backBtn.onclick = () => {
                document.getElementById('dayView').classList.remove('active');
                document.getElementById('monthView').classList.add('active');
                if (backText) backText.textContent = 'Año';
            };
        }
        
        this.showNotification(`Mostrando movimientos del ${dayTitle?.textContent || dateStr}`);
    }

    debugElements() {
        console.log('🔍 Debug: Checking all elements...');
        
        // Check buttons
        const buttons = ['addMovement', 'transfer', 'createMovement', 'createPerson', 'createAccount', 'createCategory', 'settingsBtn'];
        buttons.forEach(id => {
            const el = document.getElementById(id);
            console.log(`🔘 Button ${id}: ${el ? '✅ Found' : '❌ Missing'}`);
        });
        
        // Check modals
        const modals = ['movementModal', 'transferModal', 'personModal', 'accountModal', 'categoryModal', 'settingsModal'];
        modals.forEach(id => {
            const el = document.getElementById(id);
            console.log(`🔲 Modal ${id}: ${el ? '✅ Found' : '❌ Missing'}`);
        });
        
        // Check containers
        const containers = ['recentTransactionsList', 'allMovementsList', 'peopleGrid', 'accountsGrid', 'categoriesGrid', 'transactionsGrid', 'budgetsGrid'];
        containers.forEach(id => {
            const el = document.getElementById(id);
            console.log(`📦 Container ${id}: ${el ? '✅ Found' : '❌ Missing'}`);
        });
        
        // Check balance elements
        const balanceElements = ['totalIncome', 'totalExpense', 'totalBalance'];
        balanceElements.forEach(id => {
            const el = document.getElementById(id);
            console.log(`💰 Balance ${id}: ${el ? '✅ Found' : '❌ Missing'}`);
        });
    }

    openModal(modalId) {
        console.log(`🔓 Opening modal: ${modalId}`);
        const modal = document.getElementById(modalId);
        if (modal) {
            // Populate dropdowns and setup modal content
            this.setupModalContent(modalId);
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            console.log(`✅ Modal "${modalId}" opened`);
            
            // Focus first input
            setTimeout(() => {
                const firstInput = modal.querySelector('input, select, textarea');
                if (firstInput) {
                    firstInput.focus();
                }
            }, 100);
        } else {
            console.error(`❌ Modal "${modalId}" not found`);
        }
    }

    setupModalContent(modalId) {
        switch(modalId) {
            case 'movementModal':
                this.setupMovementModal();
                break;
            case 'accountModal':
                this.setupAccountModal();
                break;
            case 'transferModal':
                this.setupTransferModal();
                break;
            case 'categoryModal':
                this.setupCategoryModal();
                break;
        }
    }

    setupMovementModal() {
        // Populate account dropdown
        const accountSelect = document.getElementById('movementAccount');
        if (accountSelect) {
            const accounts = this.getData('accounts');
            accountSelect.innerHTML = '<option value="">Seleccionar cuenta</option>';
            accounts.forEach(account => {
                const option = document.createElement('option');
                option.value = account.id;
                option.textContent = account.name;
                accountSelect.appendChild(option);
            });
        }

        // Populate category dropdown
        const categorySelect = document.getElementById('movementCategory');
        if (categorySelect) {
            const categories = this.getData('categories');
            categorySelect.innerHTML = '<option value="">Seleccionar categoría</option>';
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        }

        // Set default date
        const dateInput = document.getElementById('movementDate');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }

        // Setup type buttons
        this.setupTypeButtons();
    }

    setupAccountModal() {
        // Populate person dropdown
        const personSelect = document.getElementById('accountPerson');
        if (personSelect) {
            const people = this.getData('people');
            personSelect.innerHTML = '<option value="">Seleccionar persona</option>';
            people.forEach(person => {
                const option = document.createElement('option');
                option.value = person.id;
                option.textContent = person.name;
                personSelect.appendChild(option);
            });
        }
    }

    setupTransferModal() {
        // Populate account dropdowns
        const accounts = this.getData('accounts');
        
        const fromAccountSelect = document.getElementById('transferFromAccount');
        if (fromAccountSelect) {
            fromAccountSelect.innerHTML = '<option value="">Cuenta origen</option>';
            accounts.forEach(account => {
                const option = document.createElement('option');
                option.value = account.id;
                option.textContent = account.name;
                fromAccountSelect.appendChild(option);
            });
        }

        const toAccountSelect = document.getElementById('transferToAccount');
        if (toAccountSelect) {
            toAccountSelect.innerHTML = '<option value="">Cuenta destino</option>';
            accounts.forEach(account => {
                const option = document.createElement('option');
                option.value = account.id;
                option.textContent = account.name;
                toAccountSelect.appendChild(option);
            });
        }

        // Set default date
        const dateInput = document.getElementById('transferDate');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
    }

    setupCategoryModal() {
        // Setup icon selector
        this.setupIconSelector();
    }

    setupTypeButtons() {
        const typeButtons = document.querySelectorAll('.type-btn');
        typeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Remove active from all buttons
                typeButtons.forEach(b => b.classList.remove('active'));
                // Add active to clicked button
                btn.classList.add('active');
            });
        });
    }

    setupIconSelector() {
        const iconSelector = document.getElementById('iconSelector');
        if (!iconSelector) return;

        const icons = [
            'fas fa-shopping-cart', 'fas fa-utensils', 'fas fa-car', 'fas fa-home',
            'fas fa-heart', 'fas fa-gamepad', 'fas fa-book', 'fas fa-music',
            'fas fa-plane', 'fas fa-gift', 'fas fa-coffee', 'fas fa-tshirt',
            'fas fa-gas-pump', 'fas fa-pills', 'fas fa-dumbbell', 'fas fa-dog',
            'fas fa-mobile-alt', 'fas fa-laptop', 'fas fa-tv', 'fas fa-couch'
        ];

        let html = '';
        icons.forEach(icon => {
            html += `
                <div class="icon-option" data-icon="${icon}" onclick="app.selectIcon('${icon}')">
                    <i class="${icon}"></i>
                </div>
            `;
        });

        iconSelector.innerHTML = html;

        // Add CSS for icon selector if not exists
        if (!document.getElementById('iconSelectorStyles')) {
            const style = document.createElement('style');
            style.id = 'iconSelectorStyles';
            style.textContent = `
                .icon-selector {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
                    gap: 8px;
                    max-height: 200px;
                    overflow-y: auto;
                    padding: 8px;
                    border: 1px solid #3c3c3e;
                    border-radius: 8px;
                    background: #1c1c1e;
                }
                .icon-option {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border: 1px solid #3c3c3e;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    background: #2c2c2e;
                }
                .icon-option:hover {
                    background: #3c3c3e;
                    border-color: #007aff;
                }
                .icon-option.selected {
                    background: #007aff;
                    border-color: #007aff;
                    color: white;
                }
                .icon-option i {
                    font-size: 16px;
                }
            `;
            document.head.appendChild(style);
        }
    }

    selectIcon(iconClass) {
        // Remove selected from all icons
        document.querySelectorAll('.icon-option').forEach(icon => {
            icon.classList.remove('selected');
        });
        
        // Add selected to clicked icon
        const selectedIcon = document.querySelector(`[data-icon="${iconClass}"]`);
        if (selectedIcon) {
            selectedIcon.classList.add('selected');
        }
    }

    resetIconSelector() {
        document.querySelectorAll('.icon-option').forEach(icon => {
            icon.classList.remove('selected');
        });
    }

    loadExpenseChart() {
        const canvas = document.getElementById('categoryChart');
        if (!canvas) {
            console.warn('Chart canvas not found');
            return;
        }

        const transactions = this.getData('transactions');
        const categories = this.getData('categories');
        
        // Filter only expense transactions
        const expenses = transactions.filter(t => t.type === 'expense');
        
        if (expenses.length === 0) {
            // Show message when no expenses
            const chartContainer = canvas.parentElement;
            chartContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">No hay gastos para mostrar</p>';
            return;
        }

        // Group expenses by category
        const categoryExpenses = {};
        expenses.forEach(expense => {
            const categoryId = expense.category;
            const amount = parseFloat(expense.amount) || 0;
            
            if (!categoryExpenses[categoryId]) {
                categoryExpenses[categoryId] = 0;
            }
            categoryExpenses[categoryId] += amount;
        });

        // Prepare chart data
        const labels = [];
        const data = [];
        const colors = [
            '#007aff', '#34c759', '#ff3b30', '#ff9500', '#af52de',
            '#ff2d92', '#ffcc00', '#5ac8fa', '#ff6b6b', '#4ecdc4'
        ];

        Object.entries(categoryExpenses).forEach(([categoryId, amount], index) => {
            const category = categories.find(c => c.id === categoryId);
            const categoryName = category ? category.name : 'Sin categoría';
            
            labels.push(categoryName);
            data.push(amount);
        });

        // Destroy existing chart if it exists
        if (window.categoryChartInstance) {
            window.categoryChartInstance.destroy();
        }

        // Create new chart
        const ctx = canvas.getContext('2d');
        window.categoryChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, data.length),
                    borderWidth: 2,
                    borderColor: '#1a1a1a'
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
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                            }
                        }
                    }
                },
                elements: {
                    arc: {
                        borderWidth: 2
                    }
                }
            }
        });

        console.log('📊 Expense chart loaded successfully');
    }

    closeModal(modalId) {
        console.log(`🔒 Closing modal: ${modalId}`);
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
        this.restoreScroll();
        console.log(`✅ Modal "${modalId}" closed`);
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        console.log('📝 Form data:', data);
        
        // Handle different form types
        switch(form.id) {
            case 'movementForm':
                this.saveMovement(data);
                break;
            case 'personForm':
                this.savePerson(data);
                break;
            case 'accountForm':
                this.saveAccount(data);
                break;
            case 'categoryForm':
                this.saveCategory(data);
                break;
            case 'transferForm':
                this.saveTransfer(data);
                break;
            default:
                console.log('Unknown form type:', form.id);
        }
        
        // Close the modal
        const modal = form.closest('.modal');
        if (modal) {
            this.closeModal(modal.id);
        }
    }

    saveMovement(data) {
        console.log('💰 Saving movement:', data);
        
        // Get form values
        const account = document.getElementById('movementAccount')?.value;
        const type = document.querySelector('.type-btn.active')?.dataset.type || 'expense';
        const amount = document.getElementById('movementAmount')?.value;
        const description = document.getElementById('movementDescription')?.value;
        const category = document.getElementById('movementCategory')?.value;
        const date = document.getElementById('movementDate')?.value || new Date().toISOString().split('T')[0];
        
        if (!account || !amount || !description || !category) {
            this.showNotification('Por favor completa todos los campos requeridos');
            return;
        }
        
        const movement = {
            id: Date.now().toString(),
            account: account,
            type: type,
            amount: parseFloat(amount),
            description: description,
            category: category,
            date: date,
            createdAt: new Date().toISOString()
        };
        
        // Save to localStorage
        const transactions = this.getData('transactions');
        transactions.push(movement);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        
        this.showNotification('Movimiento guardado exitosamente');
        this.loadTabData(this.currentTab);
        
        // Reset form
        document.getElementById('movementForm').reset();
        document.getElementById('movementDate').value = new Date().toISOString().split('T')[0];
    }

    savePerson(data) {
        console.log('👤 Saving person:', data);
        
        const name = document.getElementById('personName')?.value?.trim();
        
        if (!name) {
            this.showNotification('El nombre es requerido');
            return;
        }
        
        const people = this.getData('people');
        
        if (this.editingItem && this.editingItem.type === 'people') {
            // Edit mode
            const index = people.findIndex(p => p.id === this.editingItem.id);
            if (index !== -1) {
                people[index] = {
                    ...people[index],
                    name: name,
                    updatedAt: new Date().toISOString()
                };
                this.showNotification('Persona actualizada exitosamente');
            }
            this.editingItem = null;
        } else {
            // Create mode
            const person = {
                id: Date.now().toString(),
                name: name,
                createdAt: new Date().toISOString()
            };
            people.push(person);
            this.showNotification('Persona guardada exitosamente');
        }
        
        localStorage.setItem('people', JSON.stringify(people));
        this.loadTabData(this.currentTab);
        
        // Reset form and modal title
        document.getElementById('personForm').reset();
        const modalTitle = document.getElementById('personModalTitle');
        if (modalTitle) {
            modalTitle.textContent = 'Agregar Persona';
        }
    }

    saveAccount(data) {
        console.log('🏦 Saving account:', data);
        
        const name = document.getElementById('accountName')?.value?.trim();
        const person = document.getElementById('accountPerson')?.value;
        const type = document.getElementById('accountType')?.value;
        const balance = document.getElementById('accountBalance')?.value || '0';
        
        if (!name || !type) {
            this.showNotification('Nombre y tipo son requeridos');
            return;
        }
        
        const accounts = this.getData('accounts');
        
        if (this.editingItem && this.editingItem.type === 'accounts') {
            // Edit mode
            const index = accounts.findIndex(a => a.id === this.editingItem.id);
            if (index !== -1) {
                accounts[index] = {
                    ...accounts[index],
                    name: name,
                    person: person,
                    type: type,
                    initialBalance: parseFloat(balance),
                    updatedAt: new Date().toISOString()
                };
                this.showNotification('Cuenta actualizada exitosamente');
            }
            this.editingItem = null;
        } else {
            // Create mode
            const account = {
                id: Date.now().toString(),
                name: name,
                person: person,
                type: type,
                initialBalance: parseFloat(balance),
                createdAt: new Date().toISOString()
            };
            accounts.push(account);
            this.showNotification('Cuenta guardada exitosamente');
        }
        
        localStorage.setItem('accounts', JSON.stringify(accounts));
        this.loadTabData(this.currentTab);
        
        // Reset form and modal title
        document.getElementById('accountForm').reset();
        const modalTitle = document.getElementById('accountModalTitle');
        if (modalTitle) {
            modalTitle.textContent = 'Agregar Cuenta';
        }
    }

    saveCategory(data) {
        console.log('🏷️ Saving category:', data);
        
        const name = document.getElementById('categoryName')?.value?.trim();
        const selectedIcon = document.querySelector('.icon-option.selected');
        const icon = selectedIcon ? selectedIcon.dataset.icon : 'fas fa-tag';
        
        if (!name) {
            this.showNotification('El nombre es requerido');
            return;
        }
        
        const categories = this.getData('categories');
        
        if (this.editingItem && this.editingItem.type === 'categories') {
            // Edit mode
            const index = categories.findIndex(c => c.id === this.editingItem.id);
            if (index !== -1) {
                categories[index] = {
                    ...categories[index],
                    name: name,
                    icon: icon,
                    updatedAt: new Date().toISOString()
                };
                this.showNotification('Categoría actualizada exitosamente');
            }
            this.editingItem = null;
        } else {
            // Create mode
            const category = {
                id: Date.now().toString(),
                name: name,
                icon: icon,
                type: 'expense',
                createdAt: new Date().toISOString()
            };
            categories.push(category);
            this.showNotification('Categoría guardada exitosamente');
        }
        
        localStorage.setItem('categories', JSON.stringify(categories));
        this.loadTabData(this.currentTab);
        
        // Reset form and modal title
        document.getElementById('categoryForm').reset();
        this.resetIconSelector();
        const modalTitle = document.getElementById('categoryModalTitle');
        if (modalTitle) {
            modalTitle.textContent = 'Agregar Categoría';
        }
    }

    saveTransfer(data) {
        console.log('🔄 Saving transfer:', data);
        
        const fromAccount = document.getElementById('transferFromAccount')?.value;
        const toAccount = document.getElementById('transferToAccount')?.value;
        const amount = document.getElementById('transferAmount')?.value;
        const description = document.getElementById('transferDescription')?.value;
        const date = document.getElementById('transferDate')?.value || new Date().toISOString().split('T')[0];
        
        if (!fromAccount || !toAccount || !amount) {
            this.showNotification('Por favor completa todos los campos requeridos');
            return;
        }
        
        if (fromAccount === toAccount) {
            this.showNotification('Las cuentas de origen y destino deben ser diferentes');
            return;
        }
        
        const transfer = {
            id: Date.now().toString(),
            fromAccount: fromAccount,
            toAccount: toAccount,
            amount: parseFloat(amount),
            description: description,
            date: date,
            createdAt: new Date().toISOString()
        };
        
        const transfers = this.getData('transfers');
        transfers.push(transfer);
        localStorage.setItem('transfers', JSON.stringify(transfers));
        
        this.showNotification('Transferencia guardada exitosamente');
        this.loadTabData(this.currentTab);
        
        // Reset form
        document.getElementById('transferForm').reset();
        document.getElementById('transferDate').value = new Date().toISOString().split('T')[0];
    }

    restoreScroll() {
        document.body.style.overflow = '';
        document.body.style.overflowY = 'auto';
        document.documentElement.style.overflow = '';
        document.documentElement.style.overflowY = 'auto';
    }

    showNotification(message) {
        console.log(`📢 Notification: ${message}`);
        
        // Remove existing notifications
        document.querySelectorAll('.simple-notification').forEach(n => n.remove());
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'simple-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2c2c2e;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Show
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Hide
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Emergency functions
window.restoreScroll = function() {
    document.body.style.overflow = '';
    document.body.style.overflowY = 'auto';
    document.documentElement.style.overflow = '';
    document.documentElement.style.overflowY = 'auto';
    console.log('🆘 Emergency scroll restored');
};

window.showAllData = function() {
    const keys = ['transactions', 'transfers', 'people', 'accounts', 'categories', 'budgets'];
    keys.forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
            try {
                const parsed = JSON.parse(data);
                console.log(`📊 ${key}:`, parsed);
            } catch (e) {
                console.log(`❌ Error parsing ${key}:`, e);
            }
        } else {
            console.log(`📭 ${key}: No data`);
        }
    });
};

console.log('✅ Simplified app loaded successfully');
