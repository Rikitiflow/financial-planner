// Data Manager - Handles all data operations and localStorage
console.log('💾 Loading data manager...');

class DataManager {
    constructor() {
        this.data = {
            transactions: [],
            transfers: [],
            people: [],
            accounts: [],
            categories: [],
            budgets: [],
            filters: {
                accounts: [],
                categories: [],
                people: [],
                types: []
            }
        };
        
        this.loadAllData();
        Utils.log('Data manager initialized', 'success');
    }

    // Load all data from localStorage
    loadAllData() {
        Utils.log('Loading data from localStorage', 'debug');
        
        Object.keys(this.data).forEach(key => {
            const storageKey = CONFIG.STORAGE_KEYS[key.toUpperCase()] || key;
            const stored = localStorage.getItem(storageKey);
            
            if (stored) {
                try {
                    this.data[key] = JSON.parse(stored);
                    Utils.log(`Loaded ${key}: ${this.data[key].length || 'object'} items`, 'debug');
                } catch (error) {
                    Utils.log(`Error loading ${key}: ${error.message}`, 'error');
                    this.data[key] = Array.isArray(this.data[key]) ? [] : {};
                }
            }
        });
    }

    // Save specific data type
    save(dataType) {
        const storageKey = CONFIG.STORAGE_KEYS[dataType.toUpperCase()] || dataType;
        
        try {
            localStorage.setItem(storageKey, JSON.stringify(this.data[dataType]));
            Utils.log(`Saved ${dataType} to localStorage`, 'debug');
            return true;
        } catch (error) {
            Utils.log(`Error saving ${dataType}: ${error.message}`, 'error');
            return false;
        }
    }

    // Save all data
    saveAll() {
        let success = true;
        Object.keys(this.data).forEach(key => {
            if (!this.save(key)) {
                success = false;
            }
        });
        return success;
    }

    // Get data
    get(dataType) {
        return this.data[dataType] || [];
    }

    // Add item
    add(dataType, item) {
        if (!this.data[dataType]) {
            this.data[dataType] = [];
        }
        
        item.id = item.id || Utils.generateId();
        item.createdAt = item.createdAt || new Date().toISOString();
        
        this.data[dataType].push(item);
        this.save(dataType);
        
        Utils.log(`Added new ${dataType} item: ${item.id}`, 'success');
        return item;
    }

    // Update item
    update(dataType, id, updates) {
        const items = this.data[dataType];
        const index = items.findIndex(item => item.id === id);
        
        if (index !== -1) {
            items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
            this.save(dataType);
            Utils.log(`Updated ${dataType} item: ${id}`, 'success');
            return items[index];
        }
        
        Utils.log(`Item not found for update: ${dataType} ${id}`, 'warning');
        return null;
    }

    // Delete item
    delete(dataType, id) {
        const items = this.data[dataType];
        const index = items.findIndex(item => item.id === id);
        
        if (index !== -1) {
            const deleted = items.splice(index, 1)[0];
            this.save(dataType);
            Utils.log(`Deleted ${dataType} item: ${id}`, 'success');
            return deleted;
        }
        
        Utils.log(`Item not found for deletion: ${dataType} ${id}`, 'warning');
        return null;
    }

    // Find item by id
    findById(dataType, id) {
        return this.data[dataType].find(item => item.id === id);
    }

    // Filter items
    filter(dataType, filterFn) {
        return this.data[dataType].filter(filterFn);
    }

    // Clear all data (for testing/reset)
    clearAll() {
        Object.keys(CONFIG.STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(CONFIG.STORAGE_KEYS[key]);
        });
        
        this.data = {
            transactions: [],
            transfers: [],
            people: [],
            accounts: [],
            categories: [],
            budgets: [],
            filters: { accounts: [], categories: [], people: [], types: [] }
        };
        
        Utils.log('All data cleared', 'warning');
    }

    // Get statistics
    getStats() {
        return {
            transactions: this.data.transactions.length,
            transfers: this.data.transfers.length,
            people: this.data.people.length,
            accounts: this.data.accounts.length,
            categories: this.data.categories.length,
            budgets: this.data.budgets.length
        };
    }
}

console.log('✅ Data manager loaded successfully');
