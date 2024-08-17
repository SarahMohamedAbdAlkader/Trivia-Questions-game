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
    annotations: {
      yaxis: [
        {
          y: 0, // Position the line at 0 on the y-axis
          borderColor: "#000", // Color of the line
          strokeDashArray: 1, // Optional: dashed line
          label: {
            borderColor: "#000",
            style: {
              color: "#fff",
              background: "#000",
            },
          },
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
