// Data Migration Script - Restore old data to new structure
console.log('🔄 Loading data migration...');

class DataMigration {
    constructor() {
        this.oldKeys = [
            'transactions',
            'transfers', 
            'people',
            'accounts',
            'categories',
            'budgets',
            'savedFilters'
        ];
    }

    migrateData() {
        console.log('🔄 Starting data migration...');
        let migratedCount = 0;

        this.oldKeys.forEach(key => {
            const oldData = localStorage.getItem(key);
            if (oldData) {
                try {
                    const parsedData = JSON.parse(oldData);
                    if (parsedData && (Array.isArray(parsedData) || typeof parsedData === 'object')) {
                        // Data already exists in correct format, no need to migrate
                        console.log(`✅ Data for ${key} already in correct format`);
                        migratedCount++;
                    }
                } catch (error) {
                    console.log(`⚠️ Error parsing ${key}:`, error);
                }
            } else {
                // Initialize empty data if none exists
                const emptyData = key === 'savedFilters' ? 
                    { accounts: [], categories: [], people: [], types: [] } : 
                    [];
                localStorage.setItem(key, JSON.stringify(emptyData));
                console.log(`📝 Initialized empty ${key}`);
            }
        });

        console.log(`✅ Migration completed. ${migratedCount} datasets processed.`);
        return migratedCount;
    }

    // Check if data exists
    hasData() {
        return this.oldKeys.some(key => {
            const data = localStorage.getItem(key);
            if (data) {
                try {
                    const parsed = JSON.parse(data);
                    return Array.isArray(parsed) ? parsed.length > 0 : Object.keys(parsed).length > 0;
                } catch {
                    return false;
                }
            }
            return false;
        });
    }

    // Get data summary
    getDataSummary() {
        const summary = {};
        this.oldKeys.forEach(key => {
            const data = localStorage.getItem(key);
            if (data) {
                try {
                    const parsed = JSON.parse(data);
                    summary[key] = Array.isArray(parsed) ? parsed.length : Object.keys(parsed).length;
                } catch {
                    summary[key] = 'Error';
                }
            } else {
                summary[key] = 0;
            }
        });
        return summary;
    }
}

// Auto-run migration
const migration = new DataMigration();
migration.migrateData();

console.log('✅ Data migration loaded successfully');
