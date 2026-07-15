const typeDefs = `#graphql
  type User {
    id: ID!
    name: String
    email: String!
    authProvider: String
    createdAt: String
    weight: Float
    height: Float
    bmi: Float
    targetPhysique: String
  }

  type HealthRecord {
    id: ID!
    userId: ID!
    metricType: String!
    value: Float!
    source: String!
    timestamp: String!
  }

  type Goal {
    id: ID!
    userId: ID!
    metricType: String!
    targetValue: Float!
    period: String!
    status: String!
  }

  type AdminUser {
    id: ID!
    name: String!
    email: String!
    role: String!
    status: String!
    joined: String!
  }

  type AdminContent {
    id: ID!
    user: String!
    type: String!
    content: String!
    status: String!
    date: String!
  }

  type AdminNotification {
    id: ID!
    type: String!
    message: String!
    time: String!
    status: String!
  }

  type AdminAuditLog {
    id: ID!
    admin: String!
    action: String!
    ip: String!
    time: String!
    severity: String!
  }

  type Query {
    me: User
    healthRecords(userId: ID!, metricType: String): [HealthRecord]
    goals(userId: ID!): [Goal]
    adminUsers: [AdminUser]
    adminContentList: [AdminContent]
    adminNotifications: [AdminNotification]
    adminAuditLogs: [AdminAuditLog]
  }

  input HealthRecordInput {
    metricType: String!
    value: Float!
    source: String!
  }

  type Mutation {
    logHealthRecord(input: HealthRecordInput!): HealthRecord
    syncWearable(provider: String!): String
    updateUserProfile(name: String, weight: Float!, height: Float!, targetPhysique: String): User
    updateAdminUserStatus(id: ID!, status: String!): AdminUser
    moderateContent(id: ID!, status: String!): AdminContent
    sendNotification(audience: String!, title: String!, message: String!): AdminNotification
  }
`;

module.exports = typeDefs;
