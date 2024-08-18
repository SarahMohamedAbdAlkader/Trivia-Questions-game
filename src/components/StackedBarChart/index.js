import ReactApexChart from "react-apexcharts";

const StackedBarChart = ({ gameQuestion }) => {
  const labels = gameQuestion.map((question) => question.category);

  const series = [
    {
      name: "Correct",
      data: gameQuestion.map((question) => question.correct),
    },
    {
      name: "Skipped",
      data: gameQuestion.map((question) =>
        question.skipped ? -question.skipped : 0
      ),
    },
    {
      name: "False",
      data: gameQuestion.map((question) =>
        question.false ? -question.false : 0
      ),
    },
  ];

  const options = {
    chart: {
      type: "bar",
      stacked: true,
    },
    yaxis: {
      min: -5,
      max: 5,
    },
    annotations: {
      yaxis: [
        {
          y: 0,
          borderColor: "#000",
          strokeDashArray: 0,
        },
      ],
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: labels, // X-axis categories
    },
    legend: {
      show: true,
      position: "top",
    },
    fill: {
      colors: ["#008000", "gray", "#FF5733"],
      opacity: 1,
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default StackedBarChart;
