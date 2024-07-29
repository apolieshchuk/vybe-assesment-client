import { Pie} from "@visx/shape";
import { Group } from "@visx/group";
import { scaleOrdinal } from "@visx/scale";
import ChartLayout from "./ChartLayout.tsx";
import ChartLoading from "./ChartLoading.tsx";

// accessors
// const getMarketCap = (data: MarketCapDto) => data.marketCap;

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export type PieProps<T> = {
  width: number;
  height: number;
  title: string;
  data: T[];
  accessors: {
    titleAccessor: (data: T) => string;
    valueAccessor: (data: T) => number;
  }
};

export default function ChartPie<T extends object>({
  width,
  height,
  accessors,
  data,
  title,
}: PieProps<T>) {
  const { titleAccessor, valueAccessor } = accessors;
  // const { data } = useFetch<T>(url);
  // const normalizedData = useMemo(() => normalizeData<T>(data, accessors), [data]);

  const getTokenColor = scaleOrdinal({
    domain: data.map(titleAccessor),
    range: [
      "rgb(228,184,41)",
      "rgba(34,93,30,0.8)",
      "rgba(207,28,34,0.77)",
      "rgba(51,79,149,0.8)",
      "rgba(194,0,250,0.58)"
    ]
  });
  const innerWidth = width - defaultMargin.left - defaultMargin.right;
  const innerHeight = height - defaultMargin.top - defaultMargin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const top = centerY + defaultMargin.top;
  const left = centerX + defaultMargin.left;
  const pieSortValues = (a: number, b: number) => b - a;

  if (width < 50) return null;

  return (
    <ChartLayout title={title}>
      {
        !data.length
          ? <ChartLoading height={height} width={width}/>
          : (
            <svg width={width} height={height}>
              <Group top={top} left={left}>
                <Pie
                  data={data}
                  pieValue={valueAccessor}
                  pieSortValues={pieSortValues}
                  outerRadius={radius}
                >
                  {(pie) => {
                    return pie.arcs.map((arc, index) => {
                      const title = titleAccessor(arc.data);
                      const [centroidX, centroidY] = pie.path.centroid(arc);
                      const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                      const arcPath = pie.path(arc);
                      const arcFill = getTokenColor(title);
                      return (
                        <g key={`arc-${title}-${index}`}>
                          <path d={arcPath || ''} fill={arcFill}/>
                          {hasSpaceForLabel && (
                            <text
                              x={centroidX}
                              y={centroidY}
                              fill="#ffffff"
                              fontSize={12}
                              textAnchor="middle"
                              pointerEvents="none"
                              transform={`rotate(${25}, ${centroidX}, ${centroidY})`}
                            >
                              {title}
                            </text>
                          )}
                        </g>
                      );
                    });
                  }}
                </Pie>
              </Group>
            </svg>
          )
      }
    </ChartLayout>
  );
}