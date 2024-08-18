import ReactApexChart from "react-apexcharts";

const StackedBarChart = ({ gameQuestion }) => {
  const labels = [];
  const series = gameQuestion.map((question) => {
    labels.push(question.category);
    return {
      name: question.category,
      data: [question?.correct, -question?.skipped || 0, -question?.false || 0],
    };
  });

  const options = {
    chart: {
      type: "bar",
      stacked: true,
    },
    yaxis: {
      min: -5,
      max: 5,
    },
    ...(gameQuestion.length && {
      annotations: {
        yaxis: [
          {
            y: 0,
            borderColor: "#000",
            strokeDashArray: 0,
          },
        ],
      },
    }),
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: labels, // X-axis categories
    },
    legend: {
      show: false,
      position: "bottom",
    },
    fill: {
      colors: ["#FF5733", "gray", "#008000"],
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
