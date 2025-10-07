// Simple Sync UI Manager
console.log('🔄 Loading simple sync UI manager...');

// Wait for Firebase to be available
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initializeSyncUI();
    }, 2000); // Wait for Firebase to initialize
});

// Also try to initialize when window loads
window.addEventListener('load', () => {
    setTimeout(() => {
        initializeSyncUI();
    }, 3000);
});

function initializeSyncUI() {
    console.log('🔄 Initializing simple sync UI...');
    
    // Get UI elements
    const syncToggle = document.getElementById('syncToggle');
    const syncNowBtn = document.getElementById('syncNowBtn');
    const forceSyncBtn = document.getElementById('forceSyncBtn');
    const uploadDataBtn = document.getElementById('uploadDataBtn');
    const setSharedIdBtn = document.getElementById('setSharedIdBtn');
    
    console.log('UI elements found:');
    console.log('- syncToggle:', !!syncToggle);
    console.log('- syncNowBtn:', !!syncNowBtn);
    console.log('- forceSyncBtn:', !!forceSyncBtn);
    console.log('- uploadDataBtn:', !!uploadDataBtn);
    console.log('- setSharedIdBtn:', !!setSharedIdBtn);

    if (syncToggle) {
        // Load sync state
        const syncEnabled = localStorage.getItem('firebase_sync_enabled') === 'true';
        syncToggle.checked = syncEnabled;

        syncToggle.addEventListener('change', (e) => {
            const enabled = e.target.checked;
            localStorage.setItem('firebase_sync_enabled', enabled.toString());
            
            if (window.FirebaseSync) {
                window.FirebaseSync.setSyncEnabled(enabled);
            }
        });
    }

    if (syncNowBtn) {
        syncNowBtn.addEventListener('click', async () => {
            if (window.FirebaseSync) {
                const success = await window.FirebaseSync.syncAllData();
                if (success) {
                    alert('Data synced successfully!');
                }
            } else {
                alert('Firebase sync not available');
            }
        });
    }

    if (forceSyncBtn) {
        forceSyncBtn.addEventListener('click', async () => {
            if (window.FirebaseSync) {
                const success = await window.FirebaseSync.forceSyncFromRemote();
                if (success) {
                    alert('Data downloaded successfully!');
                }
            } else {
                alert('Firebase sync not available');
            }
        });
    }

    if (uploadDataBtn) {
        uploadDataBtn.addEventListener('click', async () => {
            if (window.FirebaseSync) {
                const success = await window.FirebaseSync.syncAllData();
                if (success) {
                    alert('Data uploaded successfully!');
                }
            } else {
                alert('Firebase sync not available');
            }
        });
    }

    if (setSharedIdBtn) {
        console.log('Adding click listener to Set Shared ID button');
        setSharedIdBtn.addEventListener('click', () => {
            console.log('Set Shared ID button clicked!');
            const currentId = localStorage.getItem('shared_user_id') || 'financial_planner_shared_user';
            const newId = prompt('Enter shared user ID (same on all devices):', currentId);
            if (newId && newId.trim()) {
                localStorage.setItem('shared_user_id', newId.trim());
                alert('Shared ID updated! Please refresh the page.');
                location.reload();
            }
        });
    } else {
        console.error('Set Shared ID button not found!');
    }

    // Update sync status periodically
    setInterval(() => {
        if (window.FirebaseSync) {
            window.FirebaseSync.updateUI();
        }
    }, 1000);
}

console.log('✅ Simple sync UI manager loaded successfully');
