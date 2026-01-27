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
  ctx: any,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
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
  const ctx = canvas.getContext('2d');


  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, COLORS.bgTop);
  bg.addColorStop(1, COLORS.bgBottom);

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, WIDTH, height);


  const trophyIcon = await loadImage(
    'src/assets/images/icons/trophy.png'
  );

  ctx.drawImage(trophyIcon, PADDING, 24, 40, 40);

  ctx.fillStyle = COLORS.title;
  ctx.font = 'bold 36px Sans';
  ctx.fillText(
    'Baleh Bucks Leaderboard',
    PADDING + 56,
    56
  );

  ctx.fillStyle = COLORS.subtitle;
  ctx.font = '16px Sans';
  ctx.fillText(
    'Top earners in the Metaverse',
    PADDING,
    86
  );

  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.beginPath();
  ctx.moveTo(PADDING, HEADER_HEIGHT - 16);
  ctx.lineTo(WIDTH - PADDING, HEADER_HEIGHT - 16);
  ctx.stroke();

  const coinIcon = await loadImage(
    'src/assets/images/icons/coin.png'
  );

  let y = HEADER_HEIGHT + 20;

  for (const entry of leaderboard) {
    const rowX = PADDING;
    const rowY = y - 36;
    const rowW = WIDTH - PADDING * 2;
    const rowH = ROW_HEIGHT - 10;

    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 5;

    ctx.fillStyle = COLORS.card;
    drawRoundedRect(ctx, rowX, rowY, rowW, rowH, 18);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = getRankColor(entry.rank);
    ctx.font = 'bold 24px Sans';
    ctx.fillText(`#${entry.rank}`, rowX + 20, y);

    const avatar = await loadImage(entry.avatarUrl);
    const avatarX = rowX + 90;
    const avatarY = y - AVATAR_SIZE / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(
      avatarX + AVATAR_SIZE / 2,
      avatarY + AVATAR_SIZE / 2,
      AVATAR_SIZE / 2,
      0,
      Math.PI * 2
    );
    ctx.clip();
    ctx.drawImage(
      avatar,
      avatarX,
      avatarY,
      AVATAR_SIZE,
      AVATAR_SIZE
    );
    ctx.restore();

    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 20px Sans';
    ctx.fillText(
      entry.username,
      avatarX + AVATAR_SIZE + 20,
      y + 6
    );

    const valueText = entry.balehBucks.toLocaleString();

    ctx.font = 'bold 18px Sans';
    const textW = ctx.measureText(valueText).width;

    const pillW = textW + 54;
    const pillH = 36;
    const pillX = WIDTH - PADDING - pillW - 16;
    const pillY = y - pillH / 2;

    ctx.fillStyle = COLORS.greenBg;
    drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 20);
    ctx.fill();

    ctx.drawImage(
      coinIcon,
      pillX + 12,
      pillY + 8,
      20,
      20
    );

    ctx.fillStyle = COLORS.green;
    ctx.fillText(
      valueText,
      pillX + 40,
      y + 6
    );

    y += ROW_HEIGHT;
  }

  return canvas.toBuffer('image/png');
}