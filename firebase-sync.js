// Firebase Sync Manager - Handles data synchronization with Firebase
console.log('🔄 Loading Firebase sync manager...');

class FirebaseSyncManager {
    constructor() {
        this.isAuthenticated = false;
        this.userId = null;
        this.syncEnabled = false;
        this.lastSyncTime = null;
        this.syncListeners = [];
        
        this.initAuth();
    }

    // Initialize authentication
    async initAuth() {
        try {
            // Listen for auth state changes
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.isAuthenticated = true;
                    this.userId = user.uid;
                    Utils.log('User authenticated: ' + user.uid, 'success');
                    this.setupRealtimeSync();
                } else {
                    this.isAuthenticated = false;
                    this.userId = null;
                    Utils.log('User not authenticated', 'warning');
                }
            });

            // Try to sign in anonymously
            await signInAnonymously(auth);
        } catch (error) {
            Utils.log('Firebase auth error: ' + error.message, 'error');
        }
    }

    // Enable/disable sync
    setSyncEnabled(enabled) {
        this.syncEnabled = enabled;
        localStorage.setItem('firebase_sync_enabled', enabled.toString());
        
        if (enabled && this.isAuthenticated) {
            this.setupRealtimeSync();
        } else {
            this.removeSyncListeners();
        }
        
        Utils.log(`Sync ${enabled ? 'enabled' : 'disabled'}`, 'info');
    }

    // Check if sync is enabled
    isSyncEnabled() {
        return localStorage.getItem('firebase_sync_enabled') === 'true';
    }

    // Setup real-time sync
    setupRealtimeSync() {
        if (!this.isAuthenticated || !this.syncEnabled) return;

        // Sync each data type
        Object.keys(CONFIG.STORAGE_KEYS).forEach(key => {
            const dataType = key.toLowerCase();
            const docRef = doc(db, 'users', this.userId, 'data', dataType);
            
            // Listen for changes from other devices
            const unsubscribe = onSnapshot(docRef, (doc) => {
                if (doc.exists()) {
                    const remoteData = doc.data();
                    this.handleRemoteData(dataType, remoteData);
                }
            }, (error) => {
                Utils.log(`Sync error for ${dataType}: ${error.message}`, 'error');
            });

            this.syncListeners.push(unsubscribe);
        });

        Utils.log('Real-time sync setup complete', 'success');
    }

    // Handle data received from remote
    handleRemoteData(dataType, remoteData) {
        const localData = dataManager.get(dataType);
        const remoteTimestamp = remoteData.lastModified || 0;
        const localTimestamp = this.getLocalTimestamp(dataType);

        // Only update if remote data is newer
        if (remoteTimestamp > localTimestamp) {
            dataManager.data[dataType] = remoteData.data || [];
            dataManager.save(dataType);
            this.lastSyncTime = new Date().toISOString();
            
            Utils.log(`Synced ${dataType} from remote`, 'success');
            this.notifySyncListeners(dataType, 'updated');
        }
    }

    // Upload data to Firebase
    async uploadData(dataType, data) {
        if (!this.isAuthenticated || !this.syncEnabled) return false;

        try {
            const docRef = doc(db, 'users', this.userId, 'data', dataType);
            await setDoc(docRef, {
                data: data,
                lastModified: Date.now(),
                deviceId: this.getDeviceId()
            });

            Utils.log(`Uploaded ${dataType} to Firebase`, 'success');
            return true;
        } catch (error) {
            Utils.log(`Upload error for ${dataType}: ${error.message}`, 'error');
            return false;
        }
    }

    // Download data from Firebase
    async downloadData(dataType) {
        if (!this.isAuthenticated) return null;

        try {
            const docRef = doc(db, 'users', this.userId, 'data', dataType);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                const remoteData = docSnap.data();
                Utils.log(`Downloaded ${dataType} from Firebase`, 'success');
                return remoteData.data || [];
            }
            return null;
        } catch (error) {
            Utils.log(`Download error for ${dataType}: ${error.message}`, 'error');
            return null;
        }
    }

    // Sync all data
    async syncAllData() {
        if (!this.isAuthenticated || !this.syncEnabled) return false;

        let success = true;
        for (const [key, dataType] of Object.entries(CONFIG.STORAGE_KEYS)) {
            const data = dataManager.get(dataType);
            const uploaded = await this.uploadData(dataType, data);
            if (!uploaded) success = false;
        }

        if (success) {
            this.lastSyncTime = new Date().toISOString();
            Utils.log('All data synced successfully', 'success');
        }

        return success;
    }

    // Get local timestamp for data type
    getLocalTimestamp(dataType) {
        const timestamp = localStorage.getItem(`last_sync_${dataType}`);
        return timestamp ? parseInt(timestamp) : 0;
    }

    // Set local timestamp for data type
    setLocalTimestamp(dataType) {
        localStorage.setItem(`last_sync_${dataType}`, Date.now().toString());
    }

    // Get unique device ID
    getDeviceId() {
        let deviceId = localStorage.getItem('device_id');
        if (!deviceId) {
            deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('device_id', deviceId);
        }
        return deviceId;
    }

    // Remove sync listeners
    removeSyncListeners() {
        this.syncListeners.forEach(unsubscribe => unsubscribe());
        this.syncListeners = [];
    }

    // Notify sync listeners
    notifySyncListeners(dataType, action) {
        // This can be used to notify the UI about sync events
        const event = new CustomEvent('dataSynced', {
            detail: { dataType, action, timestamp: new Date().toISOString() }
        });
        window.dispatchEvent(event);
    }

    // Get sync status
    getSyncStatus() {
        return {
            isAuthenticated: this.isAuthenticated,
            syncEnabled: this.syncEnabled,
            lastSyncTime: this.lastSyncTime,
            userId: this.userId
        };
    }

    // Force sync from remote
    async forceSyncFromRemote() {
        if (!this.isAuthenticated) return false;

        let success = true;
        for (const [key, dataType] of Object.entries(CONFIG.STORAGE_KEYS)) {
            const remoteData = await this.downloadData(dataType);
            if (remoteData !== null) {
                dataManager.data[dataType] = remoteData;
                dataManager.save(dataType);
                this.setLocalTimestamp(dataType);
            } else {
                success = false;
            }
        }

        if (success) {
            this.lastSyncTime = new Date().toISOString();
            Utils.log('Force sync from remote completed', 'success');
        }

        return success;
    }
}

// Initialize sync manager
const firebaseSync = new FirebaseSyncManager();

console.log('✅ Firebase sync manager loaded successfully');
