// Application Initialization
console.log('🌟 Starting Financial Planner initialization...');

// Global app instance
let app;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('📄 DOM Content Loaded');
        
        // Create app instance
        app = new FinancialPlannerApp();
        
        // Make globally accessible for debugging
        window.app = app;
        
        // Initialize app
        await app.init();
        
        console.log('🎉 Financial Planner started successfully!');
        console.log('💡 Debug commands:');
        console.log('   - app: Access main app instance');
        console.log('   - debugApp(): Show app statistics');
        console.log('   - restoreScroll(): Emergency scroll fix');
        console.log('   - app.exportData(): Export all data');
        console.log('   - app.clearAllData(): Clear all data (with confirmation)');
        
    } catch (error) {
        console.error('💥 Failed to start Financial Planner:', error);
        
        // Show error notification if possible
        if (window.app && window.app.notificationManager) {
            window.app.notificationManager.error('Error al iniciar la aplicación');
        } else {
            alert('Error al iniciar la aplicación. Por favor recarga la página.');
        }
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && window.app) {
        // Page became visible, refresh current tab
        window.app.tabManager.refreshCurrentTab();
        console.log('🔄 Page visible, refreshed current tab');
    }
});

// Handle before unload (save any pending data)
window.addEventListener('beforeunload', () => {
    if (window.app && window.app.dataManager) {
        window.app.dataManager.saveAll();
        console.log('💾 Data saved before page unload');
    }
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('🚨 Global error:', event.error);
    
    if (window.app && window.app.notificationManager) {
        window.app.notificationManager.error('Se produjo un error inesperado');
    }
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 Unhandled promise rejection:', event.reason);
    
    if (window.app && window.app.notificationManager) {
        window.app.notificationManager.error('Error en operación asíncrona');
    }
});

console.log('✅ Initialization script loaded');
