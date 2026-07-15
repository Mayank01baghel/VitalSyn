export const syncWearableData = async (provider) => {
  // Stub for GraphQL mutation: syncWearable(provider: $provider)
  console.log(`Simulating sync with ${provider}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          syncWearable: {
            status: 'SUCCESS',
            lastSyncedAt: new Date().toISOString(),
            recordsSynced: Math.floor(Math.random() * 50) + 10,
          },
        },
      });
    }, 1000);
  });
};

export const fetchDashboardMetrics = async () => {
  // Stub for GraphQL query: healthRecords & goals
  return new Promise((resolve) => {
    setTimeout(() => resolve({
      steps: 8432,
      heartRate: 72,
      sleep: 7.2,
      hydration: 1.5
    }), 500);
  });
};
