//this is bisrat's comment

const express = require('express');
const axios = require('axios');
const app = express();

const TELEGRAM_BOT_TOKEN = '7487179085:AAFdZo7dKhrdpGOWLJK8Hrf6BTOlb_Q0ToM';
const TELEGRAM_CHAT_ID = '-1002597705365';

app.use(express.json());

app.post('/github', async (req, res) => {
  const { pusher, repository, commits } = req.body;

  
  const message = `
🔔 *New push to ${repository.full_name}*
👤 *By:* ${pusher.name}
📄 *Commits:*
${commits.map(c => `- ${c.message} (${c.author.name})`).join('\n')}
  `;

  
  try {
    
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    });

    console.log('Message sent to Telegram');
    res.sendStatus(200);
  } catch (err) {
    console.error('Error sending Telegram message:', err.response?.data || err.message);
    res.sendStatus(500);
  }
});



app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});



