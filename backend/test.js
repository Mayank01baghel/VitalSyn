const fetch = require('node-fetch');

(async () => {
  try {
    const res = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query GetDashboardData($userId: ID!) {
            me {
              name
              weight
              height
              bmi
            }
            healthRecords(userId: $userId) {
              metricType
              value
            }
            goals(userId: $userId) {
              metricType
              targetValue
            }
          }
        `,
        variables: { userId: 'mock-user-123' }
      })
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
})();
