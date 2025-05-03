"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  FileText, 
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Youtube,
  Newspaper,
  ChevronDown,
  Loader2,
  AlertCircle,
  RefreshCw,
  Globe,
  ExternalLink
} from "lucide-react";
import debounce from 'lodash/debounce';

// API Keys from environment variables
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || '';

// Types
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  viewCount?: string;
}

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  likes: number;
  comments: number;
  type?: string;
}

const KrishiGyanHub = () => {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"content" | "videos" | "news">("content");
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [newsPage, setNewsPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [hasMoreNews, setHasMoreNews] = useState(true);
  const [useFallbackData, setUseFallbackData] = useState(() => 
    typeof localStorage !== 'undefined' && localStorage.getItem('use_fallback_news') === 'true'
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Knowledge categories
  const categories = [
    { id: "all", name: "All Content", icon: "📚" },
    { id: "crop-techniques", name: "Crop Techniques", icon: "🌱" },
    { id: "pest-management", name: "Pest Management", icon: "🐛" },
    { id: "soil-health", name: "Soil Health", icon: "🌍" },
    { id: "water-management", name: "Water Management", icon: "💧" },
    { id: "market-trends", name: "Market Trends", icon: "📈" },
    { id: "equipment", name: "Farm Equipment", icon: "🚜" },
    { id: "government-schemes", name: "Govt. Schemes", icon: "🏛️" },
  ];

  // Language options
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "mr", name: "Marathi" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "bn", name: "Bengali" },
    { code: "all", name: "All Languages" },
  ];

  // Featured articles
  const featuredArticles: Article[] = [
    {
      id: "1",
      title: "Modern Irrigation Techniques for Small Farms",
      category: "water-management",
      date: "2025-04-20",
      likes: 150,
      comments: 25
    },
    {
      id: "2",
      title: "Organic Pest Control Methods",
      category: "pest-management",
      date: "2025-04-18",
      likes: 120,
      comments: 30
    }
  ];

  // Latest articles
  const latestArticles: Article[] = [
    {
      id: "3",
      title: "Soil Testing for Better Yields",
      category: "soil-health",
      date: "2025-04-15",
      likes: 100,
      comments: 15
    },
    {
      id: "4",
      title: "Government Subsidies for Farm Equipment",
      category: "government-schemes",
      date: "2025-04-12",
      likes: 80,
      comments: 20
    }
  ];

  // Expert advice
  const expertAdvice = [
    {
      id: "1",
      title: "Crop Rotation Strategies",
      expert: "Dr. Anil Sharma",
      date: "2025-04-25",
      category: "crop-techniques"
    },
    {
      id: "2",
      title: "Water Conservation Techniques",
      expert: "Dr. Priya Patel",
      date: "2025-04-22",
      category: "water-management"
    }
  ];

  // All articles combined
  const allArticles = [...featuredArticles, ...latestArticles];

  // Fetch YouTube videos
  const fetchYouTubeVideos = useCallback(async (query: string) => {
    if (!query) {
      query = "farming techniques india";
    }
    
    const categoryTerms: Record<string, string> = {
      "crop-techniques": "crop farming techniques india",
      "pest-management": "pest management farming india",
      "soil-health": "soil health agriculture india",
      "water-management": "water management farming india",
      "market-trends": "agriculture market trends india",
      "equipment": "modern farm equipment india",
      "government-schemes": "government schemes farmers india",
    };
    
    const searchTerm = activeCategory !== "all" 
      ? categoryTerms[activeCategory] 
      : `${query} farming india`;
    
    setIsLoadingVideos(true);
    
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${encodeURIComponent(searchTerm)}&type=video&key=${YOUTUBE_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('YouTube API request failed');
      }
      
      const data = await response.json();
      
      const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
      
      const statsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
      );
      
      if (!statsResponse.ok) {
        throw new Error('YouTube statistics API request failed');
      }
      
      const statsData = await statsResponse.json();
      
      const videosWithStats = data.items.map((item: any, index: number) => {
        const stats = statsData.items[index]?.statistics || {};
        const viewCount = stats.viewCount ? parseInt(stats.viewCount).toLocaleString() : "0";
        
        return {
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.channelTitle,
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
          viewCount
        };
      });
      
      setVideos(videosWithStats);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
    } finally {
      setIsLoadingVideos(false);
    }
  }, [activeCategory]);

  // Fetch news articles with improved error handling and debugging
  const fetchNewsArticles = useCallback(async (nextPage = false) => {
    setIsLoadingNews(true);
    setNewsError(null);
    
    try {
      console.log(`Fetching news: Page ${nextPage ? newsPage + 1 : 1}, Language: ${selectedLanguage}, Category: ${activeCategory}`);
      
      let query = searchQuery || "agriculture farming india";
      
      if (activeCategory !== "all") {
        const categoryQueries: Record<string, string> = {
          "crop-techniques": "crop farming techniques",
          "pest-management": "pest management agriculture",
          "soil-health": "soil health agriculture",
          "water-management": "water conservation agriculture",
          "market-trends": "agriculture market prices MSP",
          "equipment": "farm equipment technology",
          "government-schemes": "government schemes farmers subsidies",
        };
        
        query = categoryQueries[activeCategory] || query;
      }
      
      console.log(`News query: "${query}"`);
      
      const pageSize = 20;
      const currentPage = nextPage ? newsPage + 1 : 1;
      
      // Use a proxy or alternative API if needed
      const apiUrl = `https://newsapi.org/v2/everything?` + 
        `q=${encodeURIComponent(query)}` + 
        `&apiKey=${NEWS_API_KEY}` + 
        `&pageSize=${pageSize}` + 
        `&page=${currentPage}` + 
        `&language=${selectedLanguage !== 'all' ? selectedLanguage : 'en'}` + 
        `&sortBy=publishedAt` + 
        `&domains=indiatoday.in,indianexpress.com,timesofindia.indiatimes.com,livemint.com,businesstoday.in,ndtv.com,hindustantimes.com`;
      
      console.log(`Fetching from: ${apiUrl.replace(NEWS_API_KEY, 'API_KEY_HIDDEN')}`);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('News API error:', errorData);
        throw new Error(`News API request failed: ${errorData.message || response.statusText}`);
      }
      
      const data = await response.json();
      console.log(`Received ${data.articles?.length || 0} articles out of ${data.totalResults || 0} total results`);
      
      if (!data.articles || data.articles.length === 0) {
        setHasMoreNews(false);
        if (nextPage) {
          console.log('No more news articles available');
          return;
        } else {
          throw new Error('No news articles found for the current search criteria');
        }
      }
      
      const articles = data.articles.map((article: any, index: number) => ({
        id: `news-${nextPage ? (newsPage * pageSize) + index : index}`,
        title: article.title || 'No title available',
        description: article.description || 'No description available',
        url: article.url,
        urlToImage: article.urlToImage || '/images/news-placeholder.jpg',
        publishedAt: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Unknown date',
        source: article.source || { name: 'Unknown source' }
      }));
      
      // Check if we've reached the end of available articles
      setHasMoreNews(articles.length === pageSize && data.totalResults > (currentPage * pageSize));
      
      if (nextPage) {
        console.log(`Adding ${articles.length} more articles to existing ${newsArticles.length}`);
        setNewsArticles(prev => [...prev, ...articles]);
        setNewsPage(prev => prev + 1);
      } else {
        console.log(`Setting ${articles.length} new articles`);
        setNewsArticles(articles);
        setNewsPage(1);
      }
    } catch (error: any) {
      console.error('Error fetching news:', error);
      setNewsError(error.message || 'Failed to load news articles');
      if (!nextPage) {
        setNewsArticles([]);
      }
    } finally {
      setIsLoadingNews(false);
    }
  }, [searchQuery, activeCategory, selectedLanguage, newsPage, newsArticles.length]);

  // Debounced search with improved implementation
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      console.log(`Debounced search triggered with query: "${query}"`);
      if (activeTab === "videos") {
        fetchYouTubeVideos(query);
      } else if (activeTab === "news") {
        fetchNewsArticles(false);
      }
    }, 800),
    [activeTab, fetchYouTubeVideos, fetchNewsArticles]
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    console.log(`Search query changed to: "${query}"`);
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle tab change
  const handleTabChange = (tab: "content" | "videos" | "news") => {
    console.log(`Tab changed to: ${tab}`);
    setActiveTab(tab);
    if (tab === "videos" && videos.length === 0) {
      fetchYouTubeVideos(searchQuery);
    } else if (tab === "news" && newsArticles.length === 0) {
      fetchNewsArticles(false);
    }
  };

  // Handle language change
  const handleLanguageChange = (code: string) => {
    console.log(`Language changed to: ${code}`);
    setSelectedLanguage(code);
    setShowLanguageDropdown(false);
    fetchNewsArticles(false);
  };
  
  // Toggle fallback data for testing
  const toggleFallbackData = () => {
    const newValue = !useFallbackData;
    setUseFallbackData(newValue);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('use_fallback_news', newValue.toString());
    }
    fetchNewsArticles(false);
  };

  // Filter articles based on category and search
  const filteredArticles = allArticles.filter(article => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Toggle saved article
  const toggleSaveArticle = (articleId: string) => {
    if (savedArticles.includes(articleId)) {
      setSavedArticles(savedArticles.filter(id => id !== articleId));
    } else {
      setSavedArticles([...savedArticles, articleId]);
    }
  };

  // Format view count
  const formatViewCount = (count: string) => {
    const num = parseInt(count.replace(/,/g, ''));
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  // Load initial data
  useEffect(() => {
    console.log(`Initial data load for tab: ${activeTab}`);
    if (activeTab === "videos") {
      fetchYouTubeVideos(searchQuery);
    } else if (activeTab === "news") {
      fetchNewsArticles(false);
    }
  }, [activeTab, fetchYouTubeVideos, fetchNewsArticles, searchQuery]);

  // Update data when category changes
  useEffect(() => {
    console.log(`Category changed to: ${activeCategory}`);
    if (activeTab === "videos") {
      fetchYouTubeVideos(searchQuery);
    } else if (activeTab === "news") {
      fetchNewsArticles(false);
    }
  }, [activeCategory, fetchYouTubeVideos, fetchNewsArticles, activeTab, searchQuery]);

  // Handle "Load More" for news
  const handleLoadMoreNews = () => {
    console.log('Loading more news articles');
    fetchNewsArticles(true);
  };

  // Retry news fetch on error
  const handleRetryNewsLoad = () => {
    console.log('Retrying news fetch');
    fetchNewsArticles(false);
  };

  return (
    <div className="space-y-8">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Krishi Gyan Hub</h2>
          <p className="text-gray-600">Expert knowledge and resources for better farming</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search for topics..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => handleTabChange("content")}
          className={`px-4 py-2 font-medium text-sm flex items-center ${
            activeTab === "content"
              ? "text-green-600 border-b-2 border-green-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FileText className="h-4 w-4 mr-2" />
          Articles
        </button>
        <button
          onClick={() => handleTabChange("videos")}
          className={`px-4 py-2 font-medium text-sm flex items-center ${
            activeTab === "videos"
              ? "text-green-600 border-b-2 border-green-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Youtube className="h-4 w-4 mr-2" />
          Videos
        </button>
        <button
          onClick={() => handleTabChange("news")}
          className={`px-4 py-2 font-medium text-sm flex items-center ${
            activeTab === "news"
              ? "text-green-600 border-b-2 border-green-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Newspaper className="h-4 w-4 mr-2" />
          News
        </button>
      </div>

      {/* Categories */}
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "content" && (
        <>
          {/* Featured Articles */}
          {activeCategory === "all" && searchQuery === "" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-800">Featured Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    variants={itemVariants}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-40 bg-gray-200">
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <span className="text-4xl">{
                          article.category === "crop-techniques" ? "🌱" :
                          article.category === "pest-management" ? "🐛" :
                          article.category === "water-management" ? "💧" :
                          article.category === "soil-health" ? "🌍" :
                          article.category === "market-trends" ? "📈" :
                          article.category === "equipment" ? "🚜" : "📚"
                        }</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <span className="bg-green-50 text-green-700 rounded-full px-2 py-1">
                          {categories.find(c => c.id === article.category)?.name}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{article.date}</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{article.title}</h4>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center text-gray-500 text-xs">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            <span>{article.likes}</span>
                          </button>
                          <button className="flex items-center text-gray-500 text-xs">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            <span>{article.comments}</span>
                          </button>
                        </div>
                        <button 
                          onClick={() => toggleSaveArticle(article.id)}
                          className={savedArticles.includes(article.id) ? "text-amber-500" : "text-gray-400 hover:text-gray-600"}
                        >
                          <Bookmark className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Filtered Articles */}
          {(activeCategory !== "all" || searchQuery !== "") && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {activeCategory !== "all" 
                  ? `${categories.find(c => c.id === activeCategory)?.name} Articles` 
                  : `Search Results for "${searchQuery}"`}
              </h3>
              
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      variants={itemVariants}
                      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-40 bg-gray-200">
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <span className="text-4xl">{
                            article.category === "crop-techniques" ? "🌱" :
                            article.category === "pest-management" ? "🐛" :
                            article.category === "water-management" ? "💧" :
                            article.category === "soil-health" ? "🌍" :
                            article.category === "market-trends" ? "📈" :
                            article.category === "equipment" ? "🚜" : "📚"
                          }</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <span className="bg-green-50 text-green-700 rounded-full px-2 py-1">
                            {categories.find(c => c.id === article.category)?.name}
                          </span>
                          <span className="mx-2">•</span>
                          <span>{article.date}</span>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">{article.title}</h4>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center text-gray-500 text-xs">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              <span>{article.likes}</span>
                            </button>
                            <button className="flex items-center text-gray-500 text-xs">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              <span>{article.comments}</span>
                            </button>
                          </div>
                          <button 
                            onClick={() => toggleSaveArticle(article.id)}
                            className={savedArticles.includes(article.id) ? "text-amber-500" : "text-gray-400 hover:text-gray-600"}
                          >
                            <Bookmark className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <FileText className="h-12 w-12 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-800">No articles found</h4>
                      <p className="text-sm text-gray-600 mt-1">Try changing your search query or category</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </>
      )}

      {/* Videos Tab */}
      {activeTab === "videos" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {isLoadingVideos && videos.length === 0 ? (
            <div className="flex justify-center my-8">
              <div className="flex items-center space-x-2 text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading videos...</span>
              </div>
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {formatViewCount(video.viewCount || "0")} views
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-gray-800 line-clamp-2 mb-2">{video.title}</h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{video.channelTitle}</span>
                      <span>{video.publishedAt}</span>
                    </div>
                    <a 
                      href={`https://www.youtube.com/watch?v=${video.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center text-green-600 text-sm font-medium hover:text-green-700"
                    >
                      Watch Video <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center space-y-3">
                <Youtube className="h-12 w-12 text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-800">No videos found</h4>
                  <p className="text-sm text-gray-600 mt-1">Try changing your search query or category</p>
                </div>
              </div>
            </div>
          )}
          
          {isLoadingVideos && videos.length > 0 && (
            <div className="flex justify-center my-8">
              <div className="flex items-center space-x-2 text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading videos...</span>
              </div>
            </div>
          )}
        </motion.div>
      )}
      {/* News Tab */}
      {activeTab === "news" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Language Selector */}
          <div className="flex justify-between items-center">
            <div>
              {/* Fallback data toggle (visible for testing) */}
              <button
                onClick={toggleFallbackData}
                className="text-xs text-gray-500 underline"
              >
                {useFallbackData 
                  ? 'Using mock data (click to try API)' 
                  : 'Using real API (click for mock data)'}
              </button>
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
              >
                <Globe className="h-4 w-4" />
                <span>{languages.find(l => l.code === selectedLanguage)?.name || "Language"}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showLanguageDropdown && (
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {languages.map(language => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        selectedLanguage === language.code ? "bg-green-50 text-green-700" : "text-gray-700"
                      }`}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* News Error State with Suggestions */}
          {newsError && !isLoadingNews && newsArticles.length === 0 && (
            <div className="bg-red-50 border border-red-100 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center space-y-4">
                <AlertCircle className="h-10 w-10 text-red-500" />
                <div>
                  <h4 className="font-medium text-red-800 text-lg">Failed to load news</h4>
                  <p className="text-sm text-red-600 mt-2">{newsError}</p>
                  
                  <div className="mt-4 text-sm text-gray-700">
                    <p className="font-medium">Suggestions:</p>
                    <ul className="mt-2 space-y-1 text-left max-w-md mx-auto">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Try selecting "All Languages" if you've filtered by language</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Choose "All Content" category for broader results</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Use simpler search terms or clear your search</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>The News API has limitations on free tier usage</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => {
                      setSelectedLanguage('all');
                      setActiveCategory('all');
                      setSearchQuery('');
                      handleRetryNewsLoad();
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-green-200 rounded-full text-sm text-green-700 hover:bg-green-50"
                  >
                    <span>Reset Filters & Retry</span>
                  </button>
                  <button 
                    onClick={handleRetryNewsLoad}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-red-200 rounded-full text-sm text-red-700 hover:bg-red-50"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Retry</span>
                  </button>
                </div>
                

              </div>
            </div>
          )}
          
          {/* News Articles */}
          {!isLoadingNews && newsArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsArticles.map((article) => (
                <motion.div
                  key={article.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 bg-gray-200">
                    {article.urlToImage ? (
                      <img 
                        src={article.urlToImage} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/images/news-placeholder.jpg';
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <Newspaper className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-white bg-opacity-90 text-xs px-2 py-1 rounded-full">
                      {article.source.name}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-2">
                      {article.publishedAt}
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{article.title}</h4>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{article.description}</p>
                    <div className="flex items-center justify-between">
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-600 text-sm font-medium hover:text-green-700"
                      >
                        Read Full Article <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                      <button 
                        onClick={() => toggleSaveArticle(article.id)}
                        className={savedArticles.includes(article.id) ? "text-amber-500" : "text-gray-400 hover:text-gray-600"}
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* News Loading State */}
          {isLoadingNews && newsArticles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-green-500 animate-spin mb-4" />
              <p className="text-gray-600">Loading news articles...</p>
            </div>
          )}
          
          {/* Loading more news indicator */}
          {isLoadingNews && newsArticles.length > 0 && (
            <div className="flex justify-center my-8">
              <div className="flex items-center space-x-2 text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading more articles...</span>
              </div>
            </div>
          )}
          
          {/* Load More News Button */}
          {!isLoadingNews && newsArticles.length > 0 && hasMoreNews && (
            <div className="flex justify-center mt-8">
              <button 
                onClick={handleLoadMoreNews}
                className="flex items-center space-x-2 px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span>Load More Articles</span>
                {isLoadingNews && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
              </button>
            </div>
          )}
          
          {/* No More News */}
          {!isLoadingNews && !hasMoreNews && newsArticles.length > 0 && (
            <div className="text-center text-gray-500 text-sm mt-8">
              No more news articles available
            </div>
          )}
          
          {/* No Results State */}
          {!isLoadingNews && newsArticles.length === 0 && !newsError && (
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center space-y-3">
                <Newspaper className="h-12 w-12 text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-800">No news articles found</h4>
                  <p className="text-sm text-gray-600 mt-1">Try changing your search query or category</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
      
      {/* Videos Tab */}
      {activeTab === "videos" && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {formatViewCount(video.viewCount || "0")} views
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-800 line-clamp-2 mb-2">{video.title}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{video.channelTitle}</span>
                    <span>{video.publishedAt}</span>
                  </div>
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center text-green-600 text-sm font-medium hover:text-green-700"
                  >
                    Watch Video <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Videos Loading State */}
          {isLoadingVideos && (
            <div className="flex justify-center my-8">
              <div className="flex items-center space-x-2 text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading videos...</span>
              </div>
            </div>
          )}
          
          {/* No Videos State */}
          {!isLoadingVideos && videos.length === 0 && (
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center space-y-3">
                <Youtube className="h-12 w-12 text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-800">No videos found</h4>
                  <p className="text-sm text-gray-600 mt-1">Try changing your search query or category</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default KrishiGyanHub;