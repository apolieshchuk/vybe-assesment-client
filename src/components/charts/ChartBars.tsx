import { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { GradientTealBlue } from '@visx/gradient';
import { scaleBand, scaleLinear } from '@visx/scale';
import ChartLayout from "./ChartLayout.tsx";
import ChartLoading from "./ChartLoading.tsx";

const verticalMargin = 120;

export type BarsProps<T> = {
  width: number;
  height: number;
  title: string;
  data: T[];
  accessors: {
    titleAccessor: (data: T) => string;
    valueAccessor: (data: T) => number;
  }
};

export default function ChartBars<T extends object>({ width, height, title, accessors, data }: BarsProps<T>) {
  const { titleAccessor, valueAccessor } = accessors;

  // bounds
  const xMax = width;
  const yMax = height - verticalMargin;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(titleAccessor),
        padding: 0.3,
      }),
    [xMax, data],
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(valueAccessor))],
      }),
    [yMax, data],
  );

  if (width < 300) return null;

  return (
    <ChartLayout title={title}>
      {
        !data.length
          ? <ChartLoading height={height}/>
          : (
            <svg width={width} height={height}>
              <GradientTealBlue id="teal"/>
              <rect width={width} height={height} fill="url(#teal)" rx={14}/>
              <Group top={verticalMargin / 2}>
                {data.map((dto, i) => {
                  const xTitle = titleAccessor(dto);
                  const value = valueAccessor(dto);

                  const barWidth = xScale.bandwidth();
                  const barHeight = yMax - (yScale(value) ?? 0);

                  const barX = xScale(xTitle);
                  const barY = yMax - barHeight;
                  return (
                    <g key={`bar-${xTitle}-${i}`}>
                      <Bar
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={barHeight}
                        fill="rgba(23, 233, 217, .5)"
                      />
                      <text
                        x={(barX || 0) + barWidth / 2}
                        y={(yMax || 0) + verticalMargin / 4}
                        textAnchor="middle"
                        fill="black"
                        fontSize={10}
                        transform={`rotate(30, ${(barX || 0) + barWidth / 2}, ${(yMax || 0) + verticalMargin / 4})`}
                      >
                        {xTitle}
                      </text>
                      <text
                        x={(barX || 0) + barWidth / 2}
                        y={barY - 5} // Adjust this value to position the value above or below the bar as needed
                        textAnchor="middle"
                        fill="black"
                        fontSize={10}
                      >
                        {
                          Math.round(value / 1000) <= 10
                            ? '<10'
                            : Math.round(value / 1000)
                        }k
                      </text>
                    </g>
                  );
                })}
              </Group>
            </svg>
          )
      }
    </ChartLayout>
  );
}