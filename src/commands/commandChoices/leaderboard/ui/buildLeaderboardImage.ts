import { createCanvas, loadImage } from '@napi-rs/canvas';

import type { LeaderboardData } from '../interfaces/LeaderboardData.js';

const WIDTH = 900;
const ROW_HEIGHT = 72;
const PADDING = 40;
const AVATAR_SIZE = 48;
const HEADER_HEIGHT = 140;

const COLORS = {
  bgTop: '#0f172a',
  bgBottom: '#020617',

  card: '#020617',

  title: '#fde047',
  subtitle: '#94a3b8',

  text: '#e5e7eb',
  muted: '#94a3b8',

  green: '#22c55e',
  greenBg: '#052e16',
};

function drawRoundedRect(
  context: any,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + w, y, x + w, y + h, r);
  context.arcTo(x + w, y + h, x, y + h, r);
  context.arcTo(x, y + h, x, y, r);
  context.arcTo(x, y, x + w, y, r);
  context.closePath();
}

function getRankColor(rank: number) {
  if (rank === 1) return '#fde047';
  if (rank === 2) return '#e5e7eb';
  if (rank === 3) return '#f59e0b';
  return '#94a3b8';
}


export async function buildLeaderboardImage(
  leaderboard: LeaderboardData[]
): Promise<Buffer> {
  const height =
    HEADER_HEIGHT +
    leaderboard.length * ROW_HEIGHT +
    PADDING;

  const canvas = createCanvas(WIDTH, height);
  const context = canvas.getContext('2d');


  const bg = context.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, COLORS.bgTop);
  bg.addColorStop(1, COLORS.bgBottom);

  context.fillStyle = bg;
  context.fillRect(0, 0, WIDTH, height);


  const trophyIcon = await loadImage(
    'src/assets/images/icons/trophy.png'
  );

  context.drawImage(trophyIcon, PADDING, 24, 40, 40);

  context.fillStyle = COLORS.title;
  context.font = 'bold 36px "DejaVu Sans"';
  context.fillText(
    'Baleh Bucks Leaderboard',
    PADDING + 56,
    56
  );

  context.fillStyle = COLORS.subtitle;
  context.font = '16px "DejaVu Sans"';
  context.fillText(
    'Top earners in the Metaverse',
    PADDING,
    86
  );

  context.strokeStyle = 'rgba(255,255,255,0.06)';
  context.beginPath();
  context.moveTo(PADDING, HEADER_HEIGHT - 16);
  context.lineTo(WIDTH - PADDING, HEADER_HEIGHT - 16);
  context.stroke();

  const coinIcon = await loadImage(
    'src/assets/images/icons/coin.png'
  );

  let y = HEADER_HEIGHT + 20;

  for (const entry of leaderboard) {
    const rowX = PADDING;
    const rowY = y - 36;
    const rowW = WIDTH - PADDING * 2;
    const rowH = ROW_HEIGHT - 10;

    context.save();
    context.shadowColor = 'rgba(0,0,0,0.45)';
    context.shadowBlur = 12;
    context.shadowOffsetY = 5;

    context.fillStyle = COLORS.card;
    drawRoundedRect(context, rowX, rowY, rowW, rowH, 18);
    context.fill();
    context.restore();

    context.fillStyle = getRankColor(entry.rank);
    context.font = 'bold 24px "DejaVu Sans"';
    context.fillText(`#${entry.rank}`, rowX + 20, y);

    const avatar = await loadImage(entry.avatarUrl);
    const avatarX = rowX + 90;
    const avatarY = y - AVATAR_SIZE / 2;

    context.save();
    context.beginPath();
    context.arc(
      avatarX + AVATAR_SIZE / 2,
      avatarY + AVATAR_SIZE / 2,
      AVATAR_SIZE / 2,
      0,
      Math.PI * 2
    );
    context.clip();
    context.drawImage(
      avatar,
      avatarX,
      avatarY,
      AVATAR_SIZE,
      AVATAR_SIZE
    );
    context.restore();

    context.fillStyle = COLORS.text;
    context.font = 'bold 20px "DejaVu Sans"';
    context.fillText(
      entry.username,
      avatarX + AVATAR_SIZE + 20,
      y + 6
    );

    const valueText = entry.balehBucks.toLocaleString();

    context.font = 'bold 18px "DejaVu Sans"';
    const textW = context.measureText(valueText).width;

    const pillW = textW + 54;
    const pillH = 36;
    const pillX = WIDTH - PADDING - pillW - 16;
    const pillY = y - pillH / 2;

    context.fillStyle = COLORS.greenBg;
    drawRoundedRect(context, pillX, pillY, pillW, pillH, 20);
    context.fill();

    context.drawImage(
      coinIcon,
      pillX + 12,
      pillY + 8,
      20,
      20
    );

    context.fillStyle = COLORS.green;
    context.fillText(
      valueText,
      pillX + 40,
      y + 6
    );

    y += ROW_HEIGHT;
  }

  return canvas.toBuffer('image/png');
}