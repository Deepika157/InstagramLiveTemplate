const axios = require('axios');
const express = require('express');

const app = express();
const port = 3030;

const API_ENDPOINT = 'https://whatsapp.fahdu.in/webhooks?hub.mode=subscribe&hub.challenge=1158201444&hub.verify_token=meatyhamhock.com';
const API_TOKEN = 'meatyhamhock';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`
};


app.post('/submit-temp', async (req, res) => {

    try {
        const templateData = {
            name: 'InstagramLiveReminder',
            language: {
                code: 'en',
                policy: 'deterministic'
            },
            localizable_params: [
                {
                    default: 'an Instagram live event',
                    required: true
                },
                {
                    default: 'Tomorrow, February 15th, 2024 at 2:00 PM',
                    required: true
                },
                {
                    default: 'Join us live on Instagram',
                    required: false
                }
            ],
            category: 'utility',
            content: {
                template: 'Do not forget:  {{1}} is happening {{2}}. {{3}}!'
            }
        };


        axios.post(API_ENDPOINT, templateData, { headers })
        .then(response => {
          
          const { template_id, status, category } = response.data;
          
         
          console.log('Template ID:', template_id);
          console.log('Status:', status);
          console.log('Category:', category);
        })
        .catch(error => {
          console.error('Error creating message template:', error.response.data);
        });

    }

    catch (error) {
        console.error('Error creating message template:', error.response.data);
        res.status(500).json({ error: 'An error occurred while creating the message template.' });
    }

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



