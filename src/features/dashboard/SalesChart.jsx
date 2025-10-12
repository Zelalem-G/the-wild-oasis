import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkmode } from "../../context/DarkmodeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkmode } = useDarkmode();

  const allDays = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  // a hash map (date -> sales data)
  const salesMap = {};

  for (const booking of bookings) {
    const dayKey = format(new Date(booking.created_at), "MMM dd");

    if (!salesMap[dayKey]) {
      salesMap[dayKey] = { totalSales: 0, extrasSales: 0 };
    }

    salesMap[dayKey].totalSales += booking.totalPrice;
    salesMap[dayKey].extrasSales += booking.extrasPrice;
  }

  const data = allDays.map((day) => {
    const label = format(day, "MMM dd");
    const daySales = salesMap[label] || { totalSales: 0, extrasSales: 0 };

    return { label, ...daySales };
  });

  const colors = isDarkmode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDays.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDays.at(-1), "MMM dd yyyy")}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data} height={300} width={700}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            fill={colors.totalSales.fill}
            stroke={colors.totalSales.stroke}
            name="Total sales"
            unit="$"
            strokeWidth={2}
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            fill={colors.extrasSales.fill}
            stroke={colors.extrasSales.stroke}
            name="Extra sales"
            unit="$"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
