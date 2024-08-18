import ReactApexCharts from "react-apexcharts";

export default function PieChart({
  correctAnswers,
  falseAnswers,
  skippedAnswers,
}) {
  const sliceColors = ["#008000", "#FF5733", "gray"];

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
      colors: sliceColors,
      opacity: 1,
    },
    legend: {
      labels: {
        colors: sliceColors,
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
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
