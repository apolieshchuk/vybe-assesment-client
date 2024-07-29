import {
    AnimatedAxis,
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip
} from "@visx/xychart";
import ChartLayout from "./ChartLayout.tsx";
import ChartLoading from "./ChartLoading.tsx";

export type ChartLineProps<T> = {
  width: number;
  height: number;
  title: string;
  data: T[];
  accessors: {
    xAccessor: (data: T) => string;
    yAccessor: (data: T) => number;
  }
};

export default function ChartLine<T extends object>({ width, height, accessors, title, data }: ChartLineProps<T>) {
  const { xAccessor, yAccessor } = accessors;

  if (width < 300) return null;

  const valuesArray = data.map(yAccessor);
  const max = Math.max(...valuesArray);
  const min = Math.min(...valuesArray);

  return (
      <ChartLayout title={title}>
        {
          !data.length
            ? <ChartLoading height={height}/>
            : (
              <XYChart width={width} height={height} xScale={{ type: "band" }} yScale={{ type: "linear", domain: [min / 1.025, max * 1.025], zero: false }}>
                <AnimatedAxis orientation="bottom" />
                <AnimatedAxis orientation="left" numTicks={5}/>
                <AnimatedGrid columns={false} numTicks={3} />
                <AnimatedLineSeries
                  dataKey="TPS"
                  data={data}
                  xAccessor={xAccessor}
                  yAccessor={yAccessor}
                />
                <Tooltip
                  snapTooltipToDatumX
                  snapTooltipToDatumY
                  showVerticalCrosshair
                  showSeriesGlyphs
                  renderTooltip={({ tooltipData, colorScale }) => {
                    const data = tooltipData
                    console.log(data);
                    if (!data?.nearestDatum || !colorScale) return null;
                    return (
                      <div>
                        <div style={{color: colorScale(data.nearestDatum.key)}}>
                          {tooltipData?.nearestDatum?.key}
                        </div>
                        {accessors.xAccessor(data.nearestDatum.datum as T)}
                        {", "}
                        {accessors.yAccessor(data.nearestDatum.datum as T)}
                      </div>
                    )
                  }}
                />
              </XYChart>
            )
        }
      </ChartLayout>
  );
}