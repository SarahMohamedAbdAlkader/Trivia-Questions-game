import ReactApexCharts from "react-apexcharts";

export default function PieChart({
  correctAnswers,
  falseAnswers,
  skippedAnswers,
}) {
  const options = {
    labels: ["Correct", "False", "Skipped"],
    chart: {
      width: 380,
      type: "pie",
    },
    dataLabels: {
      enabled: true,
      formatter: function (_, opts) {
        return opts.w.globals.series[opts.seriesIndex];
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    fill: {
      colors: ["#008000", "#FF5733", "gray"],
      opacity: 1,
    },
  };

  return (
    <ReactApexCharts
      options={options}
      series={[correctAnswers, falseAnswers, skippedAnswers]}
      type="pie"
      width={380}
    />
  );
}
