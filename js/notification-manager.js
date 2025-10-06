// Notification Manager - Handles all notifications and alerts
console.log('🔔 Loading notification manager...');

class NotificationManager {
    constructor() {
        this.notifications = [];
        this.container = null;
        this.createContainer();
        Utils.log('Notification manager initialized', 'success');
    }

    createContainer() {
        // Create notifications container if it doesn't exist
        this.container = document.getElementById('notifications-container');
        
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'notifications-container';
            this.container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
            `;
            document.body.appendChild(this.container);
        }
    }

    show(message, type = 'info', duration = CONFIG.NOTIFICATION_DURATION) {
        const id = Utils.generateId();
        
        const notification = {
            id,
            message,
            type,
            duration,
            element: this.createElement(id, message, type)
        };

        this.notifications.push(notification);
        this.container.appendChild(notification.element);

        // Animate in
        setTimeout(() => {
            notification.element.classList.add('show');
        }, 100);

        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                this.remove(id);
            }, duration);
        }

        Utils.log(`Notification shown: ${type} - ${message}`, 'debug');
        return id;
    }

    createElement(id, message, type) {
        const element = document.createElement('div');
        element.className = `notification notification-${type}`;
        element.setAttribute('data-id', id);
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        element.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${icons[type] || icons.info}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="window.app.notificationManager.remove('${id}')">&times;</button>
            </div>
        `;

        // Styles
        element.style.cssText = `
            background: var(--bg-secondary, #2c2c2e);
            color: var(--text-primary, #ffffff);
            padding: 12px 16px;
            margin-bottom: 8px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            border-left: 4px solid ${this.getTypeColor(type)};
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: auto;
            max-width: 350px;
            word-wrap: break-word;
        `;

        return element;
    }

    getTypeColor(type) {
        const colors = {
            success: '#34c759',
            error: '#ff3b30',
            warning: '#ff9500',
            info: '#007aff'
        };
        return colors[type] || colors.info;
    }

    remove(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (!notification) return;

        // Animate out
        notification.element.style.transform = 'translateX(100%)';
        notification.element.style.opacity = '0';

        setTimeout(() => {
            if (notification.element.parentNode) {
                notification.element.parentNode.removeChild(notification.element);
            }
            this.notifications = this.notifications.filter(n => n.id !== id);
        }, 300);

        Utils.log(`Notification removed: ${id}`, 'debug');
    }

    removeAll() {
        this.notifications.forEach(notification => {
            this.remove(notification.id);
        });
    }

    // Convenience methods
    success(message, duration) {
        return this.show(message, 'success', duration);
    }

    error(message, duration) {
        return this.show(message, 'error', duration);
    }

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    }

    info(message, duration) {
        return this.show(message, 'info', duration);
    }

    // Persistent notification (doesn't auto-remove)
    persistent(message, type = 'info') {
        return this.show(message, type, 0);
    }
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification.show {
        transform: translateX(0) !important;
        opacity: 1 !important;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .notification-icon {
        font-size: 16px;
        flex-shrink: 0;
    }

    .notification-message {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
    }

    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
        flex-shrink: 0;
    }

    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    .notification-success {
        border-left-color: #34c759;
    }

    .notification-error {
        border-left-color: #ff3b30;
    }

    .notification-warning {
        border-left-color: #ff9500;
    }

    .notification-info {
        border-left-color: #007aff;
    }
`;

document.head.appendChild(notificationStyles);

console.log('✅ Notification manager loaded successfully');
