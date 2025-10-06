// Simplified Financial Planner - Fixed Version
console.log('🚀 Loading fixed simplified app...');

class SimpleFinancialPlanner {
    constructor() {
        console.log('📱 Creating simple app...');
        this.currentTab = 'dashboard';
        this.editingItem = null;
        this.setupEventListeners();
        this.restoreScroll();
        console.log('✅ Simple app ready!');
    }

    setupEventListeners() {
        console.log('🎯 Setting up event listeners...');

        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = e.currentTarget.getAttribute('data-tab');
                console.log('🔄 Tab clicked:', tabName);
                this.showTab(tabName);
            });
        });

        // Modal buttons
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

        // Close buttons
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

        // Add sample data button
        this.addSampleDataButton();

        console.log('✅ Event listeners ready!');
    }

    addSampleDataButton() {
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

                document.getElementById('createSampleData')?.addEventListener('click', () => {
                    this.createSampleData();
                });

                document.getElementById('clearAllData')?.addEventListener('click', () => {
                    this.clearAllData();
                });
            }
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
        const transactions = this.getData('transactions');
        console.log(`📊 Dashboard: ${transactions.length} transactions`);
        
        // Update balance cards
        let income = 0, expense = 0;
        transactions.forEach(t => {
            const amount = parseFloat(t.amount) || 0;
            if (t.type === 'income') income += amount;
            else if (t.type === 'expense') expense += amount;
        });
        
        const totalBalance = income - expense;
        
        const incomeEl = document.getElementById('totalIncome');
        const expenseEl = document.getElementById('totalExpense');
        const balanceEl = document.getElementById('totalBalance');
        
        if (incomeEl) incomeEl.textContent = `$${income.toFixed(2)}`;
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
            const budget = budgets.find(b => b.categoryId === category.id);
            const projected = budget ? parseFloat(budget.amount) || 0 : 0;
            
            // Calculate real spending for this category this month
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            
            const real = transactions
                .filter(t => t.category === category.id && t.type === 'expense')
                .filter(t => {
                    const tDate = new Date(t.date);
                    return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
                })
                .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
            
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

    loadCalendarData() {
        console.log('📅 Loading calendar data...');
        
        const currentYear = new Date().getFullYear();
        
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
                const isCurrentMonth = index === new Date().getMonth();
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
        this.showNotification(`Funcionalidad de vista mensual pendiente`);
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
                const categories = this.getData('categories');
                const accounts = this.getData('accounts');
                const people = this.getData('people');
                
                const category = categories.find(c => c.id === item.category);
                const account = accounts.find(a => a.id === item.account);
                const person = people.find(p => p.id === item.person);
                
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
                            <button onclick="app.editItem('accounts', '${item.id}')" style="background: #ff3b30; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">🗑️ Eliminar</button>
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
        this.showNotification(`Editar ${dataType} - Funcionalidad pendiente`);
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

    openModal(modalId) {
        console.log(`🔓 Opening modal: ${modalId}`);
        const modal = document.getElementById(modalId);
        if (modal) {
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
        
        const description = document.getElementById('movementDescription')?.value;
        const amount = document.getElementById('movementAmount')?.value;
        const type = document.querySelector('.type-btn.active')?.dataset.type || 'expense';
        const date = document.getElementById('movementDate')?.value || new Date().toISOString().split('T')[0];
        
        if (!description || !amount) {
            this.showNotification('Por favor completa todos los campos requeridos');
            return;
        }
        
        const movement = {
            id: Date.now().toString(),
            description: description,
            amount: parseFloat(amount),
            type: type,
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
        
        const person = {
            id: Date.now().toString(),
            name: name,
            createdAt: new Date().toISOString()
        };
        
        const people = this.getData('people');
        people.push(person);
        localStorage.setItem('people', JSON.stringify(people));
        
        this.showNotification('Persona guardada exitosamente');
        this.loadTabData(this.currentTab);
        
        // Reset form
        document.getElementById('personForm').reset();
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
        
        const account = {
            id: Date.now().toString(),
            name: name,
            person: person,
            type: type,
            initialBalance: parseFloat(balance),
            createdAt: new Date().toISOString()
        };
        
        const accounts = this.getData('accounts');
        accounts.push(account);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        
        this.showNotification('Cuenta guardada exitosamente');
        this.loadTabData(this.currentTab);
        
        // Reset form
        document.getElementById('accountForm').reset();
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
        
        const category = {
            id: Date.now().toString(),
            name: name,
            icon: icon,
            type: 'expense',
            createdAt: new Date().toISOString()
        };
        
        const categories = this.getData('categories');
        categories.push(category);
        localStorage.setItem('categories', JSON.stringify(categories));
        
        this.showNotification('Categoría guardada exitosamente');
        this.loadTabData(this.currentTab);
        
        // Reset form
        document.getElementById('categoryForm').reset();
        this.resetIconSelector();
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

    resetIconSelector() {
        document.querySelectorAll('.icon-option').forEach(icon => {
            icon.classList.remove('selected');
        });
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

    showAllData() {
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
}

console.log('✅ Fixed simplified app loaded successfully');
