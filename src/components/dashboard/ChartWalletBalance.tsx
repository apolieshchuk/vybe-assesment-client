import ChartBars from "../charts/ChartBars.tsx";
import {WalletBalanceDto} from "../../api-models";
import useFetch from "../../hooks/useFetch.ts";

export default function ChartWalletBalance({ width }: { width: number }) {
  const { data } = useFetch<WalletBalanceDto>(`${import.meta.env.VITE_API_URL}/wallet-balance`);
  return <ChartBars<WalletBalanceDto>
    data={data}
    width={width}
    height={350}
    title={'SOL balances of 10 random wallets'}
    accessors={
      {
        titleAccessor: (data: WalletBalanceDto) => data.wallet,
        valueAccessor: (data: WalletBalanceDto) => Math.max(Number(data.balance), 1e4),
      }
    }
  />
}