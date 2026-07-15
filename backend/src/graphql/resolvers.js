const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../data/db.json');

function readDB() {
  if (!fs.existsSync(dbPath)) return { users: {} };
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch(e) {
    return { users: {} };
  }
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

const resolvers = {
  Query: {
    me: (_, __, context) => {
      const uid = context.user?.uid || 'mock-user-123';
      const db = readDB();
      const profile = db.users[uid] || { name: 'Mock User', weight: null, height: null, bmi: null };

      return {
        id: uid,
        name: profile.name,
        email: 'mock@example.com',
        authProvider: 'FIREBASE',
        createdAt: new Date().toISOString(),
        weight: profile.weight,
        height: profile.height,
        bmi: profile.bmi,
        targetPhysique: profile.targetPhysique || 'Maintenance'
      };
    },
    healthRecords: (_, { userId, metricType }) => {
      const db = readDB();
      let records = db.healthRecords || [];
      records = records.filter(r => r.userId === userId);
      if (metricType) {
        records = records.filter(r => r.metricType === metricType);
      }
      return records;
    },
    goals: (_, { userId }) => {
      const db = readDB();
      const profile = db.users[userId] || { weight: null, height: null, bmi: null };
      
      const generatedGoals = [];
      let stepTarget = 10000;
      
      if (profile.weight && profile.bmi) {
         if (profile.bmi > 25) {
             stepTarget = 12000;
             generatedGoals.push({ id: 'g2', userId, metricType: 'weight', targetValue: profile.weight - 2, period: 'MONTHLY', status: 'IN_PROGRESS' });
         } else if (profile.bmi < 18.5) {
             stepTarget = 8000;
             generatedGoals.push({ id: 'g2', userId, metricType: 'weight', targetValue: profile.weight + 2, period: 'MONTHLY', status: 'IN_PROGRESS' });
         } else {
             generatedGoals.push({ id: 'g2', userId, metricType: 'weight', targetValue: profile.weight, period: 'MONTHLY', status: 'IN_PROGRESS' });
         }
      }
      
      generatedGoals.push({ id: 'g1', userId, metricType: 'steps', targetValue: stepTarget, period: 'DAILY', status: 'IN_PROGRESS' });
      return generatedGoals;
    },
    adminUsers: () => {
      const db = readDB();
      const usersObj = db.users || {};
      
      return Object.keys(usersObj).map(id => {
        const u = usersObj[id];
        let email = "unknown@example.com";
        if (id.startsWith('mock-user-') && id !== 'mock-user-123') {
          try {
            email = Buffer.from(id.replace('mock-user-', ''), 'base64').toString('utf8');
          } catch(e) {}
        } else if (id === 'mock-user-YWRtaW5AYWRtaW4uY29t') {
          email = 'admin@admin.com';
        }
        
        return {
          id: id,
          name: u.name || 'Unknown',
          email: email,
          role: u.role || (email === 'admin@admin.com' ? 'Super Admin' : 'User'),
          status: u.status || 'Active',
          joined: u.joined || 'Unknown'
        };
      });
    },
    adminContentList: () => {
      const db = readDB();
      return db.adminContentList || []; // Empty if real data is missing
    },
    adminNotifications: () => {
      const db = readDB();
      return db.adminNotifications || []; // Empty if real data is missing
    },
    adminAuditLogs: () => {
      const db = readDB();
      return db.adminAuditLogs || []; // Empty if real data is missing
    }
  },
  Mutation: {
    logHealthRecord: (_, { input }, context) => {
      const uid = context.user?.uid || 'mock-user-123';
      const db = readDB();
      if (!db.healthRecords) db.healthRecords = [];
      
      const newRecord = {
        id: Math.random().toString(36).substr(2, 9),
        userId: uid,
        ...input,
        timestamp: new Date().toISOString()
      };
      
      db.healthRecords.push(newRecord);
      writeDB(db);
      
      return newRecord;
    },
    syncWearable: (_, { provider }) => {
      return `Successfully synced with ${provider}`;
    },
    updateUserProfile: (_, { name, weight, height, targetPhysique }, context) => {
      const uid = context.user?.uid || 'mock-user-123';
      
      const safeWeight = parseFloat(weight) || 0;
      const safeHeight = parseFloat(height) || 0;
      let bmi = 0;
      if (safeHeight > 0) {
        const heightInMeters = safeHeight / 100;
        bmi = safeWeight / (heightInMeters * heightInMeters);
      }
      
      const db = readDB();
      const existingProfile = db.users[uid] || { name: 'Mock User' };
      
      const updatedProfile = {
        name: name || existingProfile.name,
        weight: safeWeight,
        height: safeHeight,
        bmi: parseFloat(bmi.toFixed(1)),
        targetPhysique: targetPhysique || existingProfile.targetPhysique || 'Maintenance',
        role: existingProfile.role,
        status: existingProfile.status,
        joined: existingProfile.joined
      };
      
      if (!db.users) db.users = {};
      db.users[uid] = updatedProfile;
      writeDB(db);

      return {
        id: uid,
        name: updatedProfile.name,
        email: 'mock@example.com',
        authProvider: 'FIREBASE',
        createdAt: new Date().toISOString(),
        ...updatedProfile
      };
    },
    updateAdminUserStatus: (_, { id, status }) => {
      const db = readDB();
      if (!db.users) db.users = {};
      const user = db.users[id];
      if (user) {
        user.status = status;
        writeDB(db);
        
        let email = "unknown@example.com";
        if (id.startsWith('mock-user-') && id !== 'mock-user-123') {
          try {
            email = Buffer.from(id.replace('mock-user-', ''), 'base64').toString('utf8');
          } catch(e) {}
        }
        
        return {
          id: id,
          name: user.name || 'Unknown',
          email: email,
          role: user.role || 'User',
          status: user.status,
          joined: user.joined || 'Unknown'
        };
      }
      return null;
    },
    moderateContent: (_, { id, status }) => {
      const db = readDB();
      if(!db.adminContentList) return null;
      const content = db.adminContentList.find(c => c.id === id);
      if (content) {
        content.status = status;
        writeDB(db);
      }
      return content;
    },
    sendNotification: (_, { audience, title, message }) => {
      const db = readDB();
      const newNotif = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'Push Notification',
        message: `${title}: ${message}`,
        time: 'Just now',
        status: 'Sent'
      };
      if(!db.adminNotifications) db.adminNotifications = [];
      db.adminNotifications.unshift(newNotif);
      writeDB(db);
      return newNotif;
    }
  }
};

module.exports = resolvers;
