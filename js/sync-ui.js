// Sync UI Manager - Handles the sync interface
console.log('🔄 Loading sync UI manager...');

// Wait for Firebase sync to be available
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initializeSyncUI();
    }, 2000); // Wait for Firebase to initialize
});

function initializeSyncUI() {
    console.log('🔄 Initializing sync UI...');
    
    // Get UI elements
    const syncToggle = document.getElementById('syncToggle');
    const syncNowBtn = document.getElementById('syncNowBtn');
    const forceSyncBtn = document.getElementById('forceSyncBtn');
    const uploadDataBtn = document.getElementById('uploadDataBtn');

    if (syncToggle) {
        // Load sync state
        const syncEnabled = localStorage.getItem('firebase_sync_enabled') === 'true';
        syncToggle.checked = syncEnabled;

        syncToggle.addEventListener('change', (e) => {
            const enabled = e.target.checked;
            localStorage.setItem('firebase_sync_enabled', enabled.toString());
            
            if (enabled) {
                enableSync();
            } else {
                disableSync();
            }
        });
    }

    if (syncNowBtn) {
        syncNowBtn.addEventListener('click', async () => {
            await syncAllData();
        });
    }

    if (forceSyncBtn) {
        forceSyncBtn.addEventListener('click', async () => {
            await forceSyncFromRemote();
        });
    }

    if (uploadDataBtn) {
        uploadDataBtn.addEventListener('click', async () => {
            await uploadAllData();
        });
    }

    // Update sync status
    updateSyncStatus();
}

async function enableSync() {
    try {
        console.log('🔄 Enabling sync...');
        // Try to authenticate
        if (window.firebaseSync) {
            await window.firebaseSync.setSyncEnabled(true);
        }
        updateSyncStatus();
        console.log('✅ Sync enabled');
    } catch (error) {
        console.error('❌ Error enabling sync:', error);
    }
}

function disableSync() {
    console.log('❌ Disabling sync...');
    if (window.firebaseSync) {
        window.firebaseSync.setSyncEnabled(false);
    }
    updateSyncStatus();
    console.log('❌ Sync disabled');
}

async function syncAllData() {
    if (!window.firebaseSync) {
        alert('Firebase sync not available. Please wait for initialization.');
        return;
    }

    try {
        console.log('🔄 Syncing all data...');
        const success = await window.firebaseSync.syncAllData();
        if (success) {
            updateSyncStatus();
            console.log('✅ All data synced successfully');
            alert('Data synced successfully!');
        } else {
            alert('Sync failed');
        }
    } catch (error) {
        console.error('❌ Sync error:', error);
        alert('Sync failed: ' + error.message);
    }
}

async function forceSyncFromRemote() {
    if (!window.firebaseSync) {
        alert('Firebase sync not available. Please wait for initialization.');
        return;
    }

    try {
        console.log('🔄 Force syncing from remote...');
        const success = await window.firebaseSync.forceSyncFromRemote();
        if (success) {
            updateSyncStatus();
            console.log('✅ Force sync completed');
            alert('Data downloaded successfully!');
            // Refresh the current tab
            if (window.app && window.app.currentTab) {
                window.app.loadTabData(window.app.currentTab);
            }
        } else {
            alert('Force sync failed');
        }
    } catch (error) {
        console.error('❌ Force sync error:', error);
        alert('Force sync failed: ' + error.message);
    }
}

async function uploadAllData() {
    if (!window.firebaseSync) {
        alert('Firebase sync not available. Please wait for initialization.');
        return;
    }

    try {
        console.log('🔄 Uploading all data...');
        const success = await window.firebaseSync.syncAllData();
        if (success) {
            updateSyncStatus();
            console.log('✅ Data uploaded successfully');
            alert('Data uploaded successfully!');
        } else {
            alert('Upload failed');
        }
    } catch (error) {
        console.error('❌ Upload error:', error);
        alert('Upload failed: ' + error.message);
    }
}

function updateSyncStatus() {
    const syncStatusText = document.getElementById('syncStatusText');
    const lastSyncTime = document.getElementById('lastSyncTime');
    const userIdDisplay = document.getElementById('userIdDisplay');
    const deviceIdDisplay = document.getElementById('deviceIdDisplay');
    const lastSyncDisplay = document.getElementById('lastSyncDisplay');
    const cloudIcon = document.getElementById('cloudIcon');

    if (window.firebaseSync && window.firebaseSync.isAuthenticated) {
        if (syncStatusText) syncStatusText.textContent = 'Connected';
        if (userIdDisplay) userIdDisplay.textContent = window.firebaseSync.userId.substring(0, 8) + '...';
        if (cloudIcon) cloudIcon.className = 'fas fa-cloud';
    } else {
        if (syncStatusText) syncStatusText.textContent = 'Not connected';
        if (userIdDisplay) userIdDisplay.textContent = 'Not authenticated';
        if (cloudIcon) cloudIcon.className = 'fas fa-cloud-slash';
    }

    if (deviceIdDisplay) {
        deviceIdDisplay.textContent = getDeviceId();
    }

    const lastSync = localStorage.getItem('last_sync_time');
    if (lastSync) {
        const syncDate = new Date(lastSync);
        if (lastSyncTime) lastSyncTime.textContent = 'Last sync: ' + syncDate.toLocaleString();
        if (lastSyncDisplay) lastSyncDisplay.textContent = syncDate.toLocaleString();
    } else {
        if (lastSyncTime) lastSyncTime.textContent = 'Never synced';
        if (lastSyncDisplay) lastSyncDisplay.textContent = 'Never';
    }
}

function getDeviceId() {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
        deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
}

console.log('✅ Sync UI manager loaded successfully');
