// models/index.js
// Define DB schemas/entities here

class User {
  constructor({ id, name, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

class HealthRecord {
  constructor({ id, userId, metricType, value, source, timestamp }) {
    this.id = id;
    this.userId = userId;
    this.metricType = metricType;
    this.value = value;
    this.source = source;
    this.timestamp = timestamp;
  }
}

class Goal {
  constructor({ id, userId, metricType, targetValue, period, status }) {
    this.id = id;
    this.userId = userId;
    this.metricType = metricType;
    this.targetValue = targetValue;
    this.period = period;
    this.status = status;
  }
}

module.exports = {
  User,
  HealthRecord,
  Goal
};
