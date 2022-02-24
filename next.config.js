/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: 'http://192.168.43.227:8081/api/v1/',
  },
};

module.exports = nextConfig;
