// Firebase Simple Integration - Works without ES6 modules
console.log('🔥 Loading Firebase simple integration...');

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8r6olB67MWifBPVtyt72QAHIVkWhStqA",
    authDomain: "financial-planner-bba37.firebaseapp.com",
    projectId: "financial-planner-bba37",
    storageBucket: "financial-planner-bba37.firebasestorage.app",
    messagingSenderId: "1035058509819",
    appId: "1:1035058509819:web:785dd8584f95f0d811bd5e",
    measurementId: "G-M24XYZD0EW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Global Firebase sync manager
window.FirebaseSync = {
    isAuthenticated: false,
    userId: null,
    syncEnabled: false,
    lastSyncTime: null,

    // Initialize authentication
    async initAuth() {
        try {
            // Listen for auth state changes
            auth.onAuthStateChanged((user) => {
                if (user) {
                    this.isAuthenticated = true;
                    // Use a shared user ID for all devices
                    this.userId = this.getSharedUserId();
                    console.log('User authenticated: ' + user.uid);
                    console.log('Using shared ID: ' + this.userId);
                    this.updateUI();
                } else {
                    this.isAuthenticated = false;
                    this.userId = null;
                    console.log('User not authenticated');
                    this.updateUI();
                }
            });

            // Try to sign in anonymously
            await auth.signInAnonymously();
        } catch (error) {
            console.error('Firebase auth error: ' + error.message);
        }
    },

    // Get shared user ID for all devices
    getSharedUserId() {
        let sharedId = localStorage.getItem('shared_user_id');
        if (!sharedId) {
            // Create a shared ID based on a fixed string
            sharedId = 'financial_planner_shared_user';
            localStorage.setItem('shared_user_id', sharedId);
        }
        return sharedId;
    },

    // Enable/disable sync
    setSyncEnabled(enabled) {
        this.syncEnabled = enabled;
        localStorage.setItem('firebase_sync_enabled', enabled.toString());
        console.log(`Sync ${enabled ? 'enabled' : 'disabled'}`);
        this.updateUI();
    },

    // Sync all data
    async syncAllData() {
        if (!this.isAuthenticated) {
            alert('Please enable sync first');
            return false;
        }

        try {
            console.log('Starting sync...');
            const userId = this.userId;
            const dataTypes = ['transactions', 'transfers', 'people', 'accounts', 'categories', 'budgets', 'savedFilters'];
            
            for (const dataType of dataTypes) {
                console.log(`Syncing ${dataType}...`);
                const data = this.getLocalData(dataType);
                console.log(`Data for ${dataType}:`, data);
                
                await db.collection('users').doc(userId).collection('data').doc(dataType).set({
                    data: data,
                    lastModified: Date.now(),
                    deviceId: this.getDeviceId()
                });
                console.log(`${dataType} synced successfully`);
            }

            this.lastSyncTime = new Date().toISOString();
            localStorage.setItem('last_sync_time', this.lastSyncTime);
            console.log('All data synced successfully');
            this.updateUI();
            return true;
        } catch (error) {
            console.error('Sync error details:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            alert('Sync failed: ' + error.message + ' (Code: ' + error.code + ')');
            return false;
        }
    },

    // Force sync from remote
    async forceSyncFromRemote() {
        if (!this.isAuthenticated) {
            alert('Please enable sync first');
            return false;
        }

        try {
            console.log('Starting force sync from remote...');
            const userId = this.userId;
            const dataTypes = ['transactions', 'transfers', 'people', 'accounts', 'categories', 'budgets', 'savedFilters'];
            
            for (const dataType of dataTypes) {
                console.log(`Downloading ${dataType}...`);
                const doc = await db.collection('users').doc(userId).collection('data').doc(dataType).get();
                if (doc.exists) {
                    const remoteData = doc.data();
                    console.log(`Remote data for ${dataType}:`, remoteData);
                    this.setLocalData(dataType, remoteData.data || []);
                    console.log(`${dataType} downloaded successfully`);
                } else {
                    console.log(`No remote data found for ${dataType}`);
                }
            }

            this.lastSyncTime = new Date().toISOString();
            localStorage.setItem('last_sync_time', this.lastSyncTime);
            console.log('Force sync completed');
            this.updateUI();
            
            // Refresh the current tab
            if (window.app && window.app.currentTab) {
                window.app.loadTabData(window.app.currentTab);
            }
            return true;
        } catch (error) {
            console.error('Force sync error details:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            alert('Force sync failed: ' + error.message + ' (Code: ' + error.code + ')');
            return false;
        }
    },

    // Get local data
    getLocalData(dataType) {
        const storageKey = this.getStorageKey(dataType);
        const data = localStorage.getItem(storageKey);
        return data ? JSON.parse(data) : [];
    },

    // Set local data
    setLocalData(dataType, data) {
        const storageKey = this.getStorageKey(dataType);
        localStorage.setItem(storageKey, JSON.stringify(data));
    },

    // Get storage key
    getStorageKey(dataType) {
        const keys = {
            'transactions': 'transactions',
            'transfers': 'transfers',
            'people': 'people',
            'accounts': 'accounts',
            'categories': 'categories',
            'budgets': 'budgets',
            'savedFilters': 'savedFilters'
        };
        return keys[dataType] || dataType;
    },

    // Get device ID
    getDeviceId() {
        let deviceId = localStorage.getItem('device_id');
        if (!deviceId) {
            deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('device_id', deviceId);
        }
        return deviceId;
    },

    // Update UI
    updateUI() {
        const syncStatusText = document.getElementById('syncStatusText');
        const lastSyncTime = document.getElementById('lastSyncTime');
        const userIdDisplay = document.getElementById('userIdDisplay');
        const deviceIdDisplay = document.getElementById('deviceIdDisplay');
        const lastSyncDisplay = document.getElementById('lastSyncDisplay');
        const cloudIcon = document.getElementById('cloudIcon');

        if (this.isAuthenticated) {
            if (syncStatusText) syncStatusText.textContent = 'Connected';
            if (userIdDisplay) userIdDisplay.textContent = this.userId.substring(0, 8) + '...';
            if (cloudIcon) cloudIcon.className = 'fas fa-cloud';
        } else {
            if (syncStatusText) syncStatusText.textContent = 'Not connected';
            if (userIdDisplay) userIdDisplay.textContent = 'Not authenticated';
            if (cloudIcon) cloudIcon.className = 'fas fa-cloud-slash';
        }

        if (deviceIdDisplay) {
            deviceIdDisplay.textContent = this.getDeviceId();
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
};

console.log('✅ Firebase simple integration loaded successfully');
