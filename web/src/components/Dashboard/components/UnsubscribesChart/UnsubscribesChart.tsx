import { Spacer } from "@/components/ui";
import { API_URL } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import * as S from "./UnsubscribesChart.styles";
import UnsubscribesChartPlaceholder from "./UnsubscribesChart.placeholder";
import UnsubscribesChartError from "./UnsubscribesChart.error";

function UnsubscribesChart() {
  const {
    data: unsubscribesData,
    isLoading: isLoadingUnsubscribesData,
    isError: isErrorUnsubscribesData,
  } = useQuery({
    queryKey: ["unsubscribes"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/unsubscribes`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
    select: (data) => {
      return data.map((d: any) => ({
        name: d.date,
        count: d.count,
      }));
    },
  });

  if (isLoadingUnsubscribesData) {
    return <UnsubscribesChartPlaceholder />;
  }

  if (isErrorUnsubscribesData) {
    return <UnsubscribesChartError />;
  }

  return (
    <S.Container>
      <h2>Last 30 days unsubscribes</h2>
      <Spacer />
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={unsubscribesData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" padding={{ right: 20 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorCount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </S.Container>
  );
}

export default UnsubscribesChart;
