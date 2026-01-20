import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3, AlertCircle, Search, Calendar } from 'lucide-react';

export default function TradingCoPilot() {
  const [selectedStock, setSelectedStock] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [prediction, setPrediction] = useState(null);
  const [indicators, setIndicators] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [backtest, setBacktest] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeStock = async () => {
    if (!selectedStock) return;
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock data - replace with actual API calls
    setPrediction({
      direction: Math.random() > 0.5 ? 'up' : 'down',
      confidence: (Math.random() * 30 + 60).toFixed(1),
      predictedChange: (Math.random() * 6 - 2).toFixed(2),
      timeframe: '24 hours'
    });
    
    setIndicators({
      ma20: (Math.random() * 200 + 100).toFixed(2),
      ma50: (Math.random() * 200 + 100).toFixed(2),
      rsi: (Math.random() * 100).toFixed(1),
      signal: Math.random() > 0.5 ? 'overbought' : Math.random() > 0.5 ? 'oversold' : 'neutral'
    });
    
    setSentiment({
      score: Math.random() > 0.5 ? 'Positive' : Math.random() > 0.5 ? 'Negative' : 'Neutral',
      percentage: (Math.random() * 40 + 30).toFixed(0),
      headlines: 3,
      lastUpdated: 'Just now'
    });
    
    setBacktest({
      profit: (Math.random() * 30 - 10).toFixed(2),
      trades: Math.floor(Math.random() * 20 + 5),
      winRate: (Math.random() * 40 + 40).toFixed(1),
      period: '30 days'
    });
    
    setLoading(false);
  };

  const getRecommendation = () => {
    if (!prediction) return null;
    
    const isUptrend = prediction.direction === 'up';
    const confidence = parseFloat(prediction.confidence);
    
    if (confidence > 75) {
      return {
        action: isUptrend ? 'BUY' : 'SELL',
        strength: 'Strong',
        color: isUptrend ? 'bg-green-500' : 'bg-red-500'
      };
    } else if (confidence > 60) {
      return {
        action: isUptrend ? 'BUY' : 'SELL',
        strength: 'Moderate',
        color: isUptrend ? 'bg-green-400' : 'bg-red-400'
      };
    } else {
      return {
        action: 'HOLD',
        strength: 'Weak Signal',
        color: 'bg-yellow-500'
      };
    }
  };

  const getRiskReward = () => {
    if (!prediction) return null;
    
    const change = parseFloat(prediction.predictedChange);
    const risk = Math.abs(change * 0.7).toFixed(2);
    const reward = Math.abs(change * 1.5).toFixed(2);
    
    return { risk, reward, ratio: (reward / risk).toFixed(2) };
  };

  const popularStocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'NVDA', 'META', 'NFLX'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            AI ML
          </h1>
          <p className="text-xl text-blue-200">AI Co-Pilot for Smarter, Stress-Free Investing</p>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-blue-500/20">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Enter stock ticker (e.g., AAPL, GOOGL, TSLA)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && setSelectedStock(searchQuery)}
                className="w-full bg-slate-700/50 text-white pl-12 pr-4 py-4 rounded-xl border border-blue-500/30 focus:border-blue-400 focus:outline-none text-lg"
              />
            </div>
            <button
              onClick={() => {
                setSelectedStock(searchQuery);
                analyzeStock();
              }}
              disabled={!searchQuery || loading}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
          
          {/* Popular Stocks */}
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Quick Select:</p>
            <div className="flex flex-wrap gap-2">
              {popularStocks.map(stock => (
                <button
                  key={stock}
                  onClick={() => {
                    setSearchQuery(stock);
                    setSelectedStock(stock);
                    analyzeStock();
                  }}
                  className="bg-slate-700/50 hover:bg-slate-600/50 px-4 py-2 rounded-lg text-sm transition-all border border-blue-500/20 hover:border-blue-400/40"
                >
                  {stock}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        {selectedStock && !loading && prediction && (
          <div className="space-y-6">
            {/* Stock Header */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{selectedStock}</h2>
                  <p className="text-gray-400">Real-time AI Analysis</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl ${getRecommendation()?.color} font-bold text-lg`}>
                    {getRecommendation()?.action}
                    {getRecommendation()?.action === 'BUY' && <TrendingUp size={24} />}
                    {getRecommendation()?.action === 'SELL' && <TrendingDown size={24} />}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{getRecommendation()?.strength} Signal</p>
                </div>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Trend Prediction */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl">
                    <TrendingUp className="text-blue-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Trend Prediction</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Direction:</span>
                    <span className={`font-semibold ${prediction.direction === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {prediction.direction === 'up' ? '↑ Upward' : '↓ Downward'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confidence:</span>
                    <span className="font-semibold text-cyan-400">{prediction.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Predicted Change:</span>
                    <span className={`font-semibold ${parseFloat(prediction.predictedChange) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {prediction.predictedChange}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timeframe:</span>
                    <span className="font-semibold">{prediction.timeframe}</span>
                  </div>
                </div>
              </div>

              {/* Auto-Calculated Indicators */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-500/20 p-3 rounded-xl">
                    <Activity className="text-purple-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Technical Indicators</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">MA 20:</span>
                    <span className="font-semibold">${indicators.ma20}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">MA 50:</span>
                    <span className="font-semibold">${indicators.ma50}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RSI:</span>
                    <span className="font-semibold text-yellow-400">{indicators.rsi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Signal:</span>
                    <span className={`font-semibold capitalize ${
                      indicators.signal === 'overbought' ? 'text-red-400' : 
                      indicators.signal === 'oversold' ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {indicators.signal}
                    </span>
                  </div>
                </div>
              </div>

              {/* Market Mood Detector */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-500/20 p-3 rounded-xl">
                    <BarChart3 className="text-green-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Market Sentiment</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mood:</span>
                    <span className={`font-semibold ${
                      sentiment.score === 'Positive' ? 'text-green-400' : 
                      sentiment.score === 'Negative' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {sentiment.score}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Confidence:</span>
                    <span className="font-semibold">{sentiment.percentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Headlines Analyzed:</span>
                    <span className="font-semibold">{sentiment.headlines}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Updated:</span>
                    <span className="font-semibold text-sm">{sentiment.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Backtest Results */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-orange-500/20 p-3 rounded-xl">
                    <Calendar className="text-orange-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Backtest Simulator</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hypothetical Profit:</span>
                    <span className={`font-semibold ${parseFloat(backtest.profit) > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {backtest.profit}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Trades:</span>
                    <span className="font-semibold">{backtest.trades}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win Rate:</span>
                    <span className="font-semibold text-cyan-400">{backtest.winRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Period:</span>
                    <span className="font-semibold">{backtest.period}</span>
                  </div>
                </div>
              </div>

              {/* Risk-Reward Calculator */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-red-500/20 p-3 rounded-xl">
                    <AlertCircle className="text-red-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Risk-Reward</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Potential Risk:</span>
                    <span className="font-semibold text-red-400">{getRiskReward()?.risk}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Potential Reward:</span>
                    <span className="font-semibold text-green-400">{getRiskReward()?.reward}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">R/R Ratio:</span>
                    <span className="font-semibold text-cyan-400">1:{getRiskReward()?.ratio}</span>
                  </div>
                  <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
                    <p className="text-xs text-gray-400">
                      {parseFloat(getRiskReward()?.ratio) > 2 ? 
                        '✓ Favorable risk-reward ratio' : 
                        '⚠ Consider the risk carefully'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Smart Alert */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-yellow-500/20 p-3 rounded-xl">
                    <DollarSign className="text-yellow-400" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold">Smart Alert</h3>
                </div>
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl ${getRecommendation()?.color} bg-opacity-20 border border-current`}>
                    <p className="font-bold text-lg mb-2">
                      Recommendation: {getRecommendation()?.action}
                    </p>
                    <p className="text-sm opacity-90">
                      {getRecommendation()?.action === 'BUY' && 'AI suggests buying based on positive indicators and trend prediction.'}
                      {getRecommendation()?.action === 'SELL' && 'AI suggests selling based on negative indicators and trend prediction.'}
                      {getRecommendation()?.action === 'HOLD' && 'Signal strength is weak. Consider waiting for clearer indicators.'}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">
                    This is AI-generated guidance for educational purposes. Always do your own research before investing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-blue-500/20 text-center">
            <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-xl text-gray-300">Analyzing {selectedStock}...</p>
            <p className="text-sm text-gray-500 mt-2">Processing market data and AI predictions</p>
          </div>
        )}

        {/* Empty State */}
        {!selectedStock && !loading && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-12 border border-blue-500/20 text-center">
            <div className="bg-blue-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="text-blue-400" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Start Your Analysis</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Enter a stock ticker above to get AI-powered predictions, technical indicators, sentiment analysis, and smart buy/sell recommendations.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>⚠️ This tool is for educational purposes only. Not financial advice. Always consult with a financial advisor before making investment decisions.</p>
        </div>
      </div>
    </div>
  );
}