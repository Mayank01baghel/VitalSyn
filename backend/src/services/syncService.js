/**
 * Wearable Sync Service implementation stubs.
 * Abstracts Fitbit, Apple HealthKit, and Google Fit integrations.
 */
class SyncService {
  async syncProvider(userId, provider) {
    try {
      // 1. Fetch OAuth token from DB for userId
      // 2. Call provider API
      let records = [];
      if (provider === 'FITBIT') {
        records = await this._fetchFitbitData(userId);
      } else if (provider === 'APPLE_HEALTH') {
        records = await this._fetchAppleHealthData(userId);
      } else if (provider === 'GOOGLE_FIT') {
        records = await this._fetchGoogleFitData(userId);
      } else {
        throw new Error('Unsupported provider');
      }

      // 3. Normalize and save records to HealthData DB
      // await db.healthRecords.insertMany(records);

      return {
        status: 'SUCCESS',
        lastSyncedAt: new Date().toISOString(),
        recordsSynced: records.length
      };
    } catch (error) {
      console.error(`Sync failed for ${userId} with ${provider}: `, error);
      return { status: 'FAILED', lastSyncedAt: null, recordsSynced: 0 };
    }
  }

  async _fetchFitbitData(userId) { return new Array(15).fill({}); }
  async _fetchAppleHealthData(userId) { return new Array(25).fill({}); }
  async _fetchGoogleFitData(userId) { return new Array(20).fill({}); }
}

module.exports = new SyncService();
