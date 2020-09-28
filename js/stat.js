'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const PADDING = 20;
const FONT_GAP = 16;
const STAT_HEIGHT = 150;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const COLOR_PLAYER = `rgba(255, 0, 0, 1)`;
const TEXT_HEADLINE = [`Ура, вы победили!`, `Список результатов:`];

let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

let getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

let renderHeadline = function (ctx, headline, x, y, color) {
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillStyle = color;
  ctx.fillText(headline, x, y);
};

let renderTransparancy = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  let textHeight = 0;

  for (let i = 0; i < TEXT_HEADLINE.length; i++) {
    renderHeadline(
        ctx,
        TEXT_HEADLINE[i],
        CLOUD_X + PADDING,
        CLOUD_Y + PADDING + FONT_GAP * i,
        `#000`
    );

    textHeight = textHeight + FONT_GAP;
  }

  const maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    let barHeight = (STAT_HEIGHT * times[i]) / maxTime;

    ctx.fillStyle = `#000`;

    ctx.fillText(
        (times[i]).toFixed(),
        CLOUD_X + PADDING + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + PADDING + textHeight + (STAT_HEIGHT - barHeight)
    );

    ctx.fillText(
        names[i],
        CLOUD_X + PADDING + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + PADDING + textHeight + FONT_GAP + STAT_HEIGHT + FONT_GAP
    );

    if (names[i] === `Вы`) {
      ctx.fillStyle = COLOR_PLAYER;
    } else {
      ctx.fillStyle = `hsl(237, 87%, ` + renderTransparancy(100) + `%)`;
    }

    ctx.fillRect(
        CLOUD_X + PADDING + (BAR_WIDTH + BAR_GAP) * i,
        CLOUD_Y + PADDING + textHeight + FONT_GAP + (STAT_HEIGHT - barHeight),
        BAR_WIDTH,
        barHeight
    );
  }
};
