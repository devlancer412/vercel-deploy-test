import { css } from 'styled-components'

import * as convert from '../../lib/convert'

export const bodyCopy = css`
  font-family: 'Editorial New Ultralight';
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0.36px;
  font-weight: 100;
`

export const section = css`
  font-family: 'Adieu Bold';
  font-size: ${convert.viewportUnits(4, { by: 0.625 }).fromRem}; // 4rem
  line-height: 1;
  letter-spacing: ${convert.viewportUnits(-0.05, { by: 0.625 })
    .fromRem}; // -0.05rem
  font-weight: 100;
  text-transform: uppercase;
`

export const heading = css`
  font-family: 'Adieu Light';
  font-size: 60px;
  line-height: 56px;
  letter-spacing: -1.5px;
  font-weight: 100;
  text-transform: uppercase;
`

export const intro = css`
  font-family: 'Editorial New Ultralight';
  font-size: ${convert.viewportUnits(2.8, { by: 0.625 }).fromRem}; // 2.8rem
  line-height: 1.28571; // 3.6rem
  letter-spacing: ${convert.viewportUnits(0.05, { by: 0.625 })
    .fromRem}; // 0.05rem
  font-weight: 100;
`

export const articleTitle = css`
  font-family: 'Adieu Light';
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.36px;
  font-weight: 100;
  text-transform: uppercase;
`

export const detail = css`
  font-family: 'Adieu Light';
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.18px;
  font-weight: 100;
  text-transform: uppercase;
`

export const columnHeader = css`
  font-family: 'Adieu Light';
  font-size: ${convert.viewportUnits(1.4, { by: 0.625 }).fromRem}; // 1.4rem
  line-height: 1.4;
  letter-spacing: ${convert.viewportUnits(0.04, { by: 0.625 })
    .fromRem}; // 0.04rem
  font-weight: 100;
  text-transform: uppercase;
`
