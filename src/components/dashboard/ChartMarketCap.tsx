import ChartPie from "../charts/ChartPie.tsx";
import {MarketCapDto} from "../../api-models";
import useFetch from "../../hooks/useFetch.ts";
import {useMemo} from "react";


/**
 * Normalize data to group chip tokens with market cap less than 15% of the max market cap
 * into a single chip-group
 *
 * @param data
 * @param accessors
 */
function normalizeData(data: MarketCapDto[], accessors: {
  titleAccessor: (data: MarketCapDto) => string;
  valueAccessor: (data: MarketCapDto) => number;
}): MarketCapDto[] {
  const { titleAccessor, valueAccessor } = accessors;
  const values = data.map((valueAccessor));
  const maxValue = Math.max(...values);
  const percent15 = maxValue * 0.15;

  const result = [];
  const accForPercent15 = data.reduce((acc, d) => {
    if (valueAccessor(d) < percent15) {
      const accItem: MarketCapDto = {
        ...acc,
        tokenName: acc.tokenName + titleAccessor(d) + ", ",
        marketCap: acc.marketCap + valueAccessor(d),
      }
      return accItem;
    } else {
      result.push(d);
    }
    return acc;
  }, { tokenName: "", tokenAddress: "", marketCap: 0 });

  if (accForPercent15.tokenName !== "") {
    accForPercent15.tokenName = accForPercent15.tokenName.replace(/, $/, "");
    result.push(accForPercent15);
  }

  return result.map((d) => ({ ...d, marketCap: Math.max(d.marketCap, percent15) }));
}

export default function ChartMarketCap({ width }: { width: number }) {
  const { data } = useFetch<MarketCapDto>(`${import.meta.env.VITE_API_URL}/market-cap`);
  const accessors = {
    titleAccessor: (data: MarketCapDto) => data.tokenName,
    valueAccessor: (data: MarketCapDto) => data.marketCap,
  }
  const normalizedData = useMemo(() => normalizeData(data, accessors), [data]);

  return <ChartPie<MarketCapDto>
    data={normalizedData}
    title={'Market Cap SPL Tokens'}
    width={width}
    height={width}
    accessors={accessors}
  />
}