import ChartLine from "../charts/ChartLine.tsx";
import {TpsDto} from "../../api-models";
import useFetch from "../../hooks/useFetch.ts";

export default function ChartTps({ width }: { width: number }) {
  const { data } = useFetch<TpsDto>(`${import.meta.env.VITE_API_URL}/tps`);
  return <ChartLine<TpsDto>
    data={data}
    width={width}
    height={350}
    title={'Solana transactions per second (TPS)'}
    accessors={
      {
        xAccessor: (d: TpsDto) => new Date(d.ts).toISOString().split('T')[1].split(':').slice(0, 2).join(':'),
        yAccessor: (d: TpsDto) => d.tps,
      }
    }
  />
}