// Simple Initialization - Works immediately
console.log('🌟 Simple initialization starting...');

let simpleApp;

document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded - starting simple app...');
    
    try {
        // Create simple app
        simpleApp = new SimpleFinancialPlanner();
        
        // Make globally accessible
        window.simpleApp = simpleApp;
        window.app = simpleApp; // For compatibility
        
        // Show dashboard by default
        simpleApp.showTab('dashboard');
        
        // Show data summary
        console.log('📊 Checking existing data...');
        simpleApp.showAllData();
        
        // Debug: Check all elements
        console.log('🔍 Checking HTML elements...');
        simpleApp.debugElements();
        
        console.log('🎉 Simple app started successfully!');
        console.log('💡 Available commands:');
        console.log('   - simpleApp or app: Access app');
        console.log('   - restoreScroll(): Fix scroll');
        console.log('   - showAllData(): Show all localStorage data');
        
        simpleApp.showNotification('Aplicación iniciada correctamente');
        
    } catch (error) {
        console.error('💥 Error starting simple app:', error);
        alert('Error al iniciar la aplicación: ' + error.message);
    }
});

console.log('✅ Simple initialization loaded');
