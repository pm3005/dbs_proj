const {
    getSummary,
    getAreaChartData,
    getPieChartData,
  } = require('../models/dashboardModel');
  
  async function fetchSummary(req, res) {
    try {
      const data = await getSummary(req.params.userId);
      res.json(data);
    } catch (err) {
      console.error("Summary error", err);
      res.status(500).json({ message: "Failed to load dashboard summary" });
    }
  }
  
  async function fetchAreaChart(req, res) {
    try {
      const data = await getAreaChartData(req.params.userId);
      res.json(data);
    } catch (err) {
      console.error("Area chart error", err);
      res.status(500).json({ message: "Failed to load chart data" });
    }
  }
  
  async function fetchPieChart(req, res) {
    try {
      const data = await getPieChartData(req.params.userId);
      res.json(data);
    } catch (err) {
      console.error("Pie chart error", err);
      res.status(500).json({ message: "Failed to load pie chart" });
    }
  }
  
  module.exports = {
    fetchSummary,
    fetchAreaChart,
    fetchPieChart,
  };
  