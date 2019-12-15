import { css } from 'styled-components'

import * as convert from '../../lib/convert'

export const bodyCopy = css`
  font-family: 'Editorial New Ultralight';
  font-size: ${convert.viewportUnits(2, { by: 0.7 }).fromRem}; // 2rem
  line-height: 1.3; // 2.6rem
  letter-spacing: ${convert.viewportUnits(0.036, { by: 0.7 })
    .fromRem}; // 0.036rem
  font-weight: 100;
  tab-size: 2.8rem;
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
  font-size: ${convert.viewportUnits(6, { by: 0.2 }).fromRem}; // 6rem
  line-height: 0.933; // 5.6rem
  letter-spacing: ${convert.viewportUnits(-0.15, { by: 0.625 })
    .fromRem}; // -0.15rem
  text-transform: uppercase;
  font-weight: 100;
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
  // font-size: 2rem;
  font-size: ${convert.viewportUnits(2, { by: 0.625 }).fromRem}; // 2rem
  line-height: 1; // 2rem
  // letter-spacing: 0.036rem;
  letter-spacing: ${convert.viewportUnits(0.036, { by: 0.625 })
    .fromRem}; // 0.036rem
  font-weight: 100;
  text-transform: uppercase;
`

export const detail = css`
  font-family: 'Adieu Light';
  font-size: 1rem;
  line-height: 1.2; // 1.2rem
  letter-spacing: 0.018rem;
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

export const editorialDetail = css`
  font-family: 'Editorial New Ultralight';
  font-size: 1rem;
  line-height: 1.4; // 1.4rem
  letter-spacing: 0.018rem;
  text-transform: uppercase;
`

export const subHeading = css`
  font-family: 'Editorial New Ultralight';
  font-size: ${convert.viewportUnits(4, { by: 0.4 }).fromRem}; // 4rem
  line-height: 1.25; // 5rem
  letter-spacing: ${convert.viewportUnits(0.1, { by: 0.625 })
    .fromRem}; // 0.1rem
  font-weight: 100;
  text-transform: uppercase;
`
