// Firebase Sync Manager - Handles data synchronization with Firebase
console.log('🔄 Loading Firebase sync manager...');

// Import Firebase modules
import { signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { doc, setDoc, getDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { auth, db } from './firebase-config.js';

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
                    console.log('User authenticated: ' + user.uid);
                    this.setupRealtimeSync();
                } else {
                    this.isAuthenticated = false;
                    this.userId = null;
                    console.log('User not authenticated');
                }
            });

            // Try to sign in anonymously
            await signInAnonymously(auth);
        } catch (error) {
            console.error('Firebase auth error: ' + error.message);
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
        
        console.log(`Sync ${enabled ? 'enabled' : 'disabled'}`);
    }

    // Check if sync is enabled
    isSyncEnabled() {
        return localStorage.getItem('firebase_sync_enabled') === 'true';
    }

    // Setup real-time sync
    setupRealtimeSync() {
        if (!this.isAuthenticated || !this.syncEnabled) return;

        // Sync each data type
        const dataTypes = ['transactions', 'transfers', 'people', 'accounts', 'categories', 'budgets', 'filters'];
        
        dataTypes.forEach(dataType => {
            const docRef = doc(db, 'users', this.userId, 'data', dataType);
            
            // Listen for changes from other devices
            const unsubscribe = onSnapshot(docRef, (doc) => {
                if (doc.exists()) {
                    const remoteData = doc.data();
                    this.handleRemoteData(dataType, remoteData);
                }
            }, (error) => {
                console.error(`Sync error for ${dataType}: ${error.message}`);
            });

            this.syncListeners.push(unsubscribe);
        });

        console.log('Real-time sync setup complete');
    }

    // Handle data received from remote
    handleRemoteData(dataType, remoteData) {
        const localData = this.getLocalData(dataType);
        const remoteTimestamp = remoteData.lastModified || 0;
        const localTimestamp = this.getLocalTimestamp(dataType);

        // Only update if remote data is newer
        if (remoteTimestamp > localTimestamp) {
            this.setLocalData(dataType, remoteData.data || []);
            this.lastSyncTime = new Date().toISOString();
            
            console.log(`Synced ${dataType} from remote`);
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

            console.log(`Uploaded ${dataType} to Firebase`);
            return true;
        } catch (error) {
            console.error(`Upload error for ${dataType}: ${error.message}`);
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
                console.log(`Downloaded ${dataType} from Firebase`);
                return remoteData.data || [];
            }
            return null;
        } catch (error) {
            console.error(`Download error for ${dataType}: ${error.message}`);
            return null;
        }
    }

    // Sync all data
    async syncAllData() {
        if (!this.isAuthenticated || !this.syncEnabled) return false;

        let success = true;
        const dataTypes = ['transactions', 'transfers', 'people', 'accounts', 'categories', 'budgets', 'filters'];
        
        for (const dataType of dataTypes) {
            const data = this.getLocalData(dataType);
            const uploaded = await this.uploadData(dataType, data);
            if (!uploaded) success = false;
        }

        if (success) {
            this.lastSyncTime = new Date().toISOString();
            console.log('All data synced successfully');
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

    // Helper methods for local data
    getLocalData(dataType) {
        const storageKey = this.getStorageKey(dataType);
        const data = localStorage.getItem(storageKey);
        return data ? JSON.parse(data) : [];
    }

    setLocalData(dataType, data) {
        const storageKey = this.getStorageKey(dataType);
        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    getStorageKey(dataType) {
        const keys = {
            'transactions': 'transactions',
            'transfers': 'transfers',
            'people': 'people',
            'accounts': 'accounts',
            'categories': 'categories',
            'budgets': 'budgets',
            'filters': 'savedFilters'
        };
        return keys[dataType] || dataType;
    }

    // Force sync from remote
    async forceSyncFromRemote() {
        if (!this.isAuthenticated) return false;

        let success = true;
        const dataTypes = ['transactions', 'transfers', 'people', 'accounts', 'categories', 'budgets', 'filters'];
        
        for (const dataType of dataTypes) {
            const remoteData = await this.downloadData(dataType);
            if (remoteData !== null) {
                this.setLocalData(dataType, remoteData);
                this.setLocalTimestamp(dataType);
            } else {
                success = false;
            }
        }

        if (success) {
            this.lastSyncTime = new Date().toISOString();
            console.log('Force sync from remote completed');
        }

        return success;
    }
}

// Initialize sync manager
const firebaseSync = new FirebaseSyncManager();

// Make it globally available
window.firebaseSync = firebaseSync;

console.log('✅ Firebase sync manager loaded successfully');
