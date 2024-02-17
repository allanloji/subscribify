import { css } from "@emotion/react";

const backgrounds = [
  css`
    background: conic-gradient(at 10% 50%, #0000 75%, #88d18a 0),
      conic-gradient(at 10% 50%, #0000 75%, #88d18a 0) calc(1 * 32px)
        calc(3 * 32px),
      conic-gradient(at 10% 50%, #0000 75%, #88d18a 0) calc(2 * 32px)
        calc(1 * 32px),
      conic-gradient(at 10% 50%, #0000 75%, #88d18a 0) calc(3 * 32px)
        calc(4 * 32px),
      conic-gradient(at 10% 50%, #0000 75%, #88d18a 0) calc(4 * 32px)
        calc(2 * 32px),
      conic-gradient(at 50% 10%, #0000 75%, #88d18a 0) 0 calc(4 * 32px),
      conic-gradient(at 50% 10%, #0000 75%, #88d18a 0) calc(1 * 32px)
        calc(2 * 32px),
      conic-gradient(at 50% 10%, #0000 75%, #88d18a 0) calc(2 * 32px) 0,
      conic-gradient(at 50% 10%, #0000 75%, #88d18a 0) calc(3 * 32px)
        calc(3 * 32px),
      conic-gradient(at 50% 10%, #0000 75%, #88d18a 0) calc(4 * 32px)
        calc(1 * 32px),
      #ccddb7;
    background-size: 160px 160px;
  `,
  css`
    background: linear-gradient(
        45deg,
        #0000 calc(25% / 3),
        #fdcd9b 0 calc(50% / 3),
        #0000 0 calc(250% / 3),
        #fdcd9b 0 calc(275% / 3),
        #0000 0
      ),
      linear-gradient(
        45deg,
        #fdcd9b calc(25% / 3),
        #0000 0 calc(50% / 3),
        #fdcd9b 0 25%,
        #0000 0 75%,
        #fdcd9b 0 calc(250% / 3),
        #0000 0 calc(275% / 3),
        #fdcd9b 0
      ),
      linear-gradient(
        -45deg,
        #0000 calc(25% / 3),
        #fdcd9b 0 calc(50% / 3),
        #0000 0 calc(250% / 3),
        #fdcd9b 0 calc(275% / 3),
        #0000 0
      ),
      linear-gradient(
          -45deg,
          #fdcd9b calc(25% / 3),
          #0000 0 calc(50% / 3),
          #fdcd9b 0 25%,
          #0000 0 75%,
          #fdcd9b 0 calc(250% / 3),
          #0000 0 calc(275% / 3),
          #fdcd9b 0
        )
        #4e6b6c;
    background-size: 64px 64px;
    background-position: 0 0, 32px 32px;
  `,
  css`
    background: linear-gradient(135deg, #0000 20.5%, #c7e7de 0 29.5%, #0000 0) 0
        16px,
      linear-gradient(45deg, #0000 8%, #c7e7de 0 17%, #0000 0 58%) 32px 0,
      linear-gradient(
        135deg,
        #0000 8%,
        #c7e7de 0 17%,
        #0000 0 58%,
        #c7e7de 0 67%,
        #0000 0
      ),
      linear-gradient(
        45deg,
        #0000 8%,
        #c7e7de 0 17%,
        #0000 0 58%,
        #c7e7de 0 67%,
        #0000 0 83%,
        #c7e7de 0 92%,
        #0000 0
      ),
      #e79006;
    background-size: 64px 64px;
  `,
  css`
    background: radial-gradient(
          farthest-side at -33.33% 50%,
          #0000 52%,
          #f7e3e8 54% 57%,
          #0000 59%
        )
        0 calc(128px / 2),
      radial-gradient(
          farthest-side at 50% 133.33%,
          #0000 52%,
          #f7e3e8 54% 57%,
          #0000 59%
        )
        calc(128px / 2) 0,
      radial-gradient(
        farthest-side at 133.33% 50%,
        #0000 52%,
        #f7e3e8 54% 57%,
        #0000 59%
      ),
      radial-gradient(
        farthest-side at 50% -33.33%,
        #0000 52%,
        #f7e3e8 54% 57%,
        #0000 59%
      ),
      #26a548;
    background-size: calc(128px / 4.667) 128px, 128px calc(128px / 4.667);
  `,
  css`
    background: conic-gradient(
        from -45deg at calc(100% / 3) calc(100% / 3),
        #5667cf 90deg,
        #0000 0
      ),
      conic-gradient(
        from -135deg at calc(100% / 3) calc(2 * 100% / 3),
        #5667cf 90deg,
        #30599e 0 135deg,
        #0000 0
      ),
      conic-gradient(
        from 135deg at calc(2 * 100% / 3) calc(2 * 100% / 3),
        #5667cf 90deg,
        #30599e 0 135deg,
        #0000 0
      ),
      conic-gradient(
        from 45deg at calc(2 * 100% / 3) calc(100% / 3),
        #5667cf 90deg,
        #30599e 0 135deg,
        #0000 0,
        #5667cf 0 225deg,
        #30599e 0
      );
    background-size: 64px 64px;
  `,
  css`
    background: radial-gradient(
        50% 50% at 100% 0,
        #e6e6b9 0% 5%,
        #d0ac54 6% 15%,
        #e6e6b9 16% 25%,
        #d0ac54 26% 35%,
        #e6e6b9 36% 45%,
        #d0ac54 46% 55%,
        #e6e6b9 56% 65%,
        #d0ac54 66% 75%,
        #e6e6b9 76% 85%,
        #d0ac54 86% 95%,
        #0000 96%
      ),
      radial-gradient(
        50% 50% at 0 100%,
        #e6e6b9 0% 5%,
        #d0ac54 6% 15%,
        #e6e6b9 16% 25%,
        #d0ac54 26% 35%,
        #e6e6b9 36% 45%,
        #d0ac54 46% 55%,
        #e6e6b9 56% 65%,
        #d0ac54 66% 75%,
        #e6e6b9 76% 85%,
        #d0ac54 86% 95%,
        #0000 96%
      ),
      radial-gradient(
        50% 50%,
        #e6e6b9 0% 5%,
        #d0ac54 6% 15%,
        #e6e6b9 16% 25%,
        #d0ac54 26% 35%,
        #e6e6b9 36% 45%,
        #d0ac54 46% 55%,
        #e6e6b9 56% 65%,
        #d0ac54 66% 75%,
        #e6e6b9 76% 85%,
        #d0ac54 86% 95%,
        #0000 96%
      ),
      radial-gradient(
          50% 50%,
          #e6e6b9 0% 5%,
          #d0ac54 6% 15%,
          #e6e6b9 16% 25%,
          #d0ac54 26% 35%,
          #e6e6b9 36% 45%,
          #d0ac54 46% 55%,
          #e6e6b9 56% 65%,
          #d0ac54 66% 75%,
          #e6e6b9 76% 85%,
          #d0ac54 86% 95%,
          #0000 96%
        )
        32px 32px;
    background-size: 64px 64px;
    background-color: #e6e6b9;
  `,
  css`
    background-image: linear-gradient(
        30deg,
        #ef8189 12%,
        transparent 12.5%,
        transparent 87%,
        #ef8189 87.5%,
        #ef8189
      ),
      linear-gradient(
        150deg,
        #ef8189 12%,
        transparent 12.5%,
        transparent 87%,
        #ef8189 87.5%,
        #ef8189
      ),
      linear-gradient(
        30deg,
        #ef8189 12%,
        transparent 12.5%,
        transparent 87%,
        #ef8189 87.5%,
        #ef8189
      ),
      linear-gradient(
        150deg,
        #ef8189 12%,
        transparent 12.5%,
        transparent 87%,
        #ef8189 87.5%,
        #ef8189
      ),
      linear-gradient(
        60deg,
        rgba(239, 129, 137, 0.5) 25%,
        transparent 25.5%,
        transparent 75%,
        rgba(239, 129, 137, 0.5) 75%,
        rgba(239, 129, 137, 0.5)
      ),
      linear-gradient(
        60deg,
        rgba(239, 129, 137, 0.5) 25%,
        transparent 25.5%,
        transparent 75%,
        rgba(239, 129, 137, 0.5) 75%,
        rgba(239, 129, 137, 0.5)
      );
    background-size: 64px 112px;
    background-position: 0 0, 0 0, 32px 56px, 32px 56px, 0 0, 32px 56px;
    background-color: #3d574a;
  `,
  css`
    background: linear-gradient(315deg, transparent 75%, #2470e5 0)-16px 0,
      linear-gradient(45deg, transparent 75%, #2470e5 0) 16px 0,
      linear-gradient(135deg, #7facf0 50%, transparent 0) 0 0,
      linear-gradient(45deg, #adc9f5 50%, #dae7fb 0) 0 0 #dae7fb;
    background-size: 32px 32px;
  `,
  css`
    background: conic-gradient(at 62.5% 12.5%, #9c7920 25%, #0000 0)
        calc(32px / -8) calc(32px / 2),
      conic-gradient(at 62.5% 12.5%, #9c7920 25%, #0000 0) calc(-3 * 32px / 8)
        calc(32px / 4),
      conic-gradient(at 87.5% 62.5%, #9c7920 25%, #0000 0) calc(3 * 32px / 8)
        calc(32px / 4),
      conic-gradient(at 87.5% 62.5%, #9c7920 25%, #0000 0) calc(32px / -8) 0,
      conic-gradient(at 25% 12.5%, #9c7920 25%, #0000 0) 0 calc(32px / -4),
      conic-gradient(at 25% 12.5%, #9c7920 25%, #0000 0) calc(32px / -4) 0,
      conic-gradient(at 87.5% 87.5%, #9c7920 25%, #0000 0) calc(32px / 8) 0
        #f399a1;
    background-size: 32px 32px;
  `,
  css`
    background: conic-gradient(from 135deg, #56809d 90deg, #0000 0) 32px
        calc(32px / 2),
      conic-gradient(from 135deg, #f1f8b6 90deg, #0000 0),
      conic-gradient(from 135deg at 50% 0, #56809d 90deg, #0000 0) #f1f8b6;
    background-size: 64px 32px;
  `,
];

export const getBackground = (id: string) => {
  const sanitizedUuid = id.replace(/-/g, "");

  const uuidNumber = parseInt(sanitizedUuid, 16);

  const index = (uuidNumber * 10) % 10;

  return backgrounds[index];
};
