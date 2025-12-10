/**
 * Test script for contact form API
 * Usage: node test-contact.js
 */

const axios = require('axios');

const API_URL = process.env.API_URL || 'http://localhost:3000/api/contact';

const testData = {
    name: 'Тестовый Клиент',
    phone: '+7 (985) 416-50-11',
    interest: 'dress',
    message: 'Это тестовое сообщение с формы обратной связи. Пожалуйста, игнорируйте.'
};

console.log('═══════════════════════════════════════════');
console.log('Testing Anna Sapon Contact Form API');
console.log('═══════════════════════════════════════════');
console.log(`API URL: ${API_URL}`);
console.log('\nTest Data:');
console.log(JSON.stringify(testData, null, 2));
console.log('\nSending request...\n');

axios.post(API_URL, testData)
    .then(response => {
        console.log('✓ SUCCESS!');
        console.log('\nResponse:');
        console.log(JSON.stringify(response.data, null, 2));
        console.log('\n═══════════════════════════════════════════');
        console.log('Check designabyzova@gmail.com for the email!');
        console.log('═══════════════════════════════════════════');
        process.exit(0);
    })
    .catch(error => {
        console.log('✗ ERROR!');
        console.log('\nError Details:');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.log('Message:', error.message);
            console.log('\nPossible causes:');
            console.log('1. Server is not running (run: npm start)');
            console.log('2. Wrong API URL');
            console.log('3. Network connection issue');
        }
        console.log('\n═══════════════════════════════════════════');
        process.exit(1);
    });
