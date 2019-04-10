import { animate, animation, style } from '@angular/animations';

export const DEFAULT_DURATION = '0.2s ease';

//region Slide
const slideDefaultParams = {
  duration: DEFAULT_DURATION,
  translateY: '50px'
};

const slideStyle = {
  opacity: 0,
  transform: 'translateY({{ translateY }})'
};

export const slideIn = animation([
  style(slideStyle),
  animate('{{ duration }}')
], {
  params: slideDefaultParams
});

export const slideOut = animation([
  animate('{{ duration }}'),
  style(slideStyle)
], {
  params: slideDefaultParams
});
//endregion

//region Pop
const popDefaultParams = {
  duration: DEFAULT_DURATION,
  scale: 0.75
};

const popStyle = {
  opacity: 0,
  transform: 'scale({{ scale }})'
};

export const popIn = animation([
  style(popStyle),
  animate('{{ duration }}')
], {
  params: popDefaultParams
});

export const popOut = animation([
  animate('{{ duration }}'),
  style(popStyle)
], {
  params: popDefaultParams
});
//endregion
