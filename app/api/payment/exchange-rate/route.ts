let cachedRate: number | null = null;
let lastUpdated = 0;

const GET = async () => {
  try {
    const now = Date.now();
    
    // Cache lasts for 6 hours
    if (cachedRate && now - lastUpdated < 6 * 60 * 60 * 1000) return Response.json({
      message: 'Exchange rate retrieved!',
      code: 'exchange_rate_retrieved',
      success: true,
      data: {
        rate: cachedRate
      }
    });

    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await response.json();
    cachedRate = data.rates.NGN;
    lastUpdated = now;

    return Response.json({
      message: 'Exchange rate retrieved!',
      code: 'exchange_rate_retrieved',
      success: true,
      data: {
        rate: cachedRate
      }
    });
  } catch (error) {
    console.error('Server Error', error);
    
    return Response.json({
      message: 'Server Error',
      code: 'server_error',
      success: false,
      data: null
    }, { status: 500 });
  }
};

export { GET };