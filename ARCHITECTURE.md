# Financial Planner - Arquitectura del Proyecto

## 📁 Estructura de Archivos

```
CURSOR PLANNER CSS/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   ├── config.js           # Configuración y constantes
│   ├── data-manager.js     # Gestión de datos y localStorage
│   ├── notification-manager.js # Sistema de notificaciones
│   ├── modal-manager.js    # Gestión de modales
│   ├── tab-manager.js      # Navegación entre pestañas
│   ├── app.js             # Aplicación principal
│   └── init.js            # Inicialización
├── script.js              # Archivo antiguo (backup)
├── script_backup.js       # Backup adicional
└── README.md              # Documentación del proyecto
```

## 🏗️ Arquitectura Modular

### 1. **config.js** - Configuración Central
- **Propósito**: Constantes, configuración y traducciones
- **Contiene**:
  - `CONFIG`: Configuración de la aplicación
  - `TRANSLATIONS`: Textos en español e inglés
  - `Utils`: Funciones utilitarias

### 2. **data-manager.js** - Gestión de Datos
- **Propósito**: Manejo de datos y persistencia
- **Funcionalidades**:
  - CRUD operations (Create, Read, Update, Delete)
  - Persistencia en localStorage
  - Validación de datos
  - Estadísticas

### 3. **notification-manager.js** - Sistema de Notificaciones
- **Propósito**: Mostrar mensajes al usuario
- **Tipos**: Success, Error, Warning, Info
- **Características**:
  - Auto-dismiss configurable
  - Animaciones suaves
  - Stack de notificaciones

### 4. **modal-manager.js** - Gestión de Modales
- **Propósito**: Controlar ventanas modales
- **Funcionalidades**:
  - Abrir/cerrar modales
  - Población automática de formularios
  - Gestión del scroll del body
  - Eventos de teclado (ESC)

### 5. **tab-manager.js** - Navegación
- **Propósito**: Manejo de pestañas y navegación
- **Funcionalidades**:
  - Cambio entre pestañas
  - Inicialización específica por pestaña
  - Actualización de contenido

### 6. **app.js** - Aplicación Principal
- **Propósito**: Coordinación de todos los managers
- **Funcionalidades**:
  - Inicialización de la app
  - Event listeners principales
  - Métodos de guardado
  - API pública

### 7. **init.js** - Inicialización
- **Propósito**: Arranque de la aplicación
- **Funcionalidades**:
  - Inicialización cuando DOM está listo
  - Manejo de errores globales
  - Funciones de debug

## 🔄 Flujo de Datos

```
Usuario Interactúa
       ↓
   Event Listeners (app.js)
       ↓
   Modal Manager / Tab Manager
       ↓
   Data Manager (CRUD)
       ↓
   localStorage
       ↓
   Notification Manager (feedback)
```

## 🎯 Beneficios de la Nueva Arquitectura

### ✅ **Modularidad**
- Cada archivo tiene una responsabilidad específica
- Fácil mantenimiento y debugging
- Código reutilizable

### ✅ **Escalabilidad**
- Fácil agregar nuevas funcionalidades
- Managers independientes
- Estructura clara

### ✅ **Debugging**
- Logs organizados por módulo
- Funciones de debug específicas
- Error handling centralizado

### ✅ **Performance**
- Carga ordenada de dependencias
- Inicialización optimizada
- Gestión eficiente de memoria

## 🛠️ Comandos de Debug

### Consola del Navegador (F12)
```javascript
// Acceder a la aplicación
app

// Ver estadísticas
debugApp()

// Restaurar scroll de emergencia
restoreScroll()

// Exportar datos
app.exportData()

// Limpiar todos los datos
app.clearAllData()

// Ver datos específicos
app.dataManager.get('transactions')
app.dataManager.get('people')

// Ver estado de modales
app.modalManager.getActiveModals()

// Ver pestaña actual
app.tabManager.getCurrentTab()
```

## 📋 Managers y sus Métodos

### DataManager
```javascript
// CRUD Operations
dataManager.add(type, item)
dataManager.update(type, id, updates)
dataManager.delete(type, id)
dataManager.get(type)
dataManager.findById(type, id)

// Utilidades
dataManager.saveAll()
dataManager.clearAll()
dataManager.getStats()
```

### ModalManager
```javascript
// Control básico
modalManager.open(modalId, options)
modalManager.close(modalId)
modalManager.closeAll()

// Modales específicos
modalManager.openTransaction()
modalManager.openPerson()
modalManager.openAccount()
modalManager.openCategory()
modalManager.openTransfer()
```

### TabManager
```javascript
// Navegación
tabManager.showTab(tabName)
tabManager.getCurrentTab()
tabManager.refreshCurrentTab()
```

### NotificationManager
```javascript
// Tipos de notificación
notificationManager.success(message)
notificationManager.error(message)
notificationManager.warning(message)
notificationManager.info(message)
notificationManager.persistent(message)
```

## 🔧 Configuración

### Modificar Configuración
Editar `js/config.js`:
```javascript
const CONFIG = {
    APP_NAME: 'Financial Planner',
    DEFAULT_LANGUAGE: 'es',
    NOTIFICATION_DURATION: 3000,
    DEBUG: true  // Cambiar a false en producción
};
```

### Agregar Traducciones
Editar `TRANSLATIONS` en `js/config.js`:
```javascript
const TRANSLATIONS = {
    es: {
        newKey: 'Nuevo Texto'
    },
    en: {
        newKey: 'New Text'
    }
};
```

## 🚀 Próximos Pasos

1. **Implementar funcionalidades faltantes** en cada manager
2. **Agregar tests unitarios** para cada módulo
3. **Optimizar performance** con lazy loading
4. **Agregar más idiomas** al sistema de traducciones
5. **Implementar PWA** para uso offline

## 📞 Soporte

Para debugging:
1. Abrir consola del navegador (F12)
2. Ejecutar `debugApp()` para ver el estado
3. Usar `restoreScroll()` si hay problemas de scroll
4. Revisar logs con emojis para identificar problemas

La nueva arquitectura es mucho más robusta, mantenible y fácil de debuggear. ¡Cada módulo tiene su propósito específico y trabajan juntos de manera coordinada!
