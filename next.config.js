/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: 'https://todo-zhr.herokuapp.com/api/v1/',
  },
};

module.exports = nextConfig;
