/** @type {import('next').NextConfig} */
const nextConfig = {
    // next.config.js


    async headers() {
        return [
            {
                // Set CORS headers
                source: '/api/parse-srt',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
                ],
            },
            // Add more headers as needed
        ];
    },


};

export default nextConfig;
