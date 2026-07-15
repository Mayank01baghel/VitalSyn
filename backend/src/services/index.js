// Stub services for business logic
module.exports = {
  auth: {
    signup: async (email, password, name) => ({ token: 'stub-token', user: { id: '1', name, email } }),
    login: async (email, password) => ({ token: 'stub-token', user: { id: '1', name: 'User', email } })
  },
  health: {
    getRecords: async (userId, metricType, range) => ([]),
    logRecord: async (userId, input) => ({ id: '1', ...input, source: 'MANUAL', timestamp: new Date().toISOString() })
  },
  sync: {
    syncProvider: async (userId, provider) => ({ status: 'SUCCESS', lastSyncedAt: new Date().toISOString(), recordsSynced: 10 })
  },
  goals: {
    getGoals: async (userId) => ([]),
    createGoal: async (userId, input) => ({ id: '1', ...input, status: 'ACTIVE' }),
    updateGoal: async (userId, id, input) => ({ id, ...input, status: 'ACTIVE' }),
    deleteGoal: async (userId, id) => ({ success: true })
  },
  notifications: {
    getNotifications: async (userId) => ([])
  },
  analytics: {
    getMetrics: async (range) => ({ dailyActiveUsers: 0, retention30Day: 0, syncSuccessRate: 0, avgSessionLength: 0 })
  }
};
