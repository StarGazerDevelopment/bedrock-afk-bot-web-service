const express = require('express');
const { createClient } = require('bedrock-protocol');

const options = {
  host: 'peppapig12321.aternos.me',
  port: 20656,
  username: 'AFK_Bot',
  offline: true,
  version: '1.21.93'
};

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('AFK Bot is running!'));

function connectBot() {
  const client = createClient(options);
  let entityId;

  console.log('Starting bedrock-afk-bot...');

  client.on('connect', () => {
    console.log('✅ Connected to server');
  });

  client.on('join', () => {
    console.log('✅ Bot joined the game');
  });

  client.on('start_game', (packet) => {
    entityId = packet.runtime_entity_id;
    console.log(`✅ Bot received start_game. entityId = ${entityId}`);

    // Convert to BigInt immediately
    entityId = BigInt(entityId);

    setTimeout(() => {
      console.log('✅ Bot fully spawned and ready');

    let forward = true;
let currentX = 0;
let baseY = 70;
let z = 0;

setInterval(() => {
  try {
    if (forward) {
      currentX += 1;
      if (currentX >= 4) forward = false;
    } else {
      currentX -= 1;
      if (currentX <= 0) forward = true;
    }

    console.log(`🚶 Bot walking to x=${currentX}`);
    client.write('move_player', {
      runtime_entity_id: entityId,
      position: { x: currentX, y: baseY, z },
      rotation: { x: 0, y: 0, z: 0 },
      pitch: 0,
      head_yaw: 0,
      yaw: 0,
      mode: 0,
      on_ground: true,
      ridden_runtime_entity_id: BigInt(0),
      teleport_cause: 0,
      teleport_item: 0,
      entity_type: BigInt(1),
      tick: BigInt(0)
    });
    console.log('✅ Move successfully sent to x =', currentX);
  } catch (e) {
    console.error('⚠️ Move send failed:', e.message);
  }
}, 5000); // Move every 5 seconds

    }, 3000);
  });

  client.on('disconnect', (reason) => {
    console.log('❌ Disconnected:', reason);
    setTimeout(connectBot, 5000);
  });

  client.on('error', (err) => {
    console.error('⚠️ Error:', err.message);
  });
}

connectBot();

app.listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});
