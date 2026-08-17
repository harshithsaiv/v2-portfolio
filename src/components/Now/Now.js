import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NowPage from './MapView';  // Import the default export which is NowPage
// Import new components
import CodingStats from './CodingStats';
import KnowledgeGraph from './KnowledgeGraph';
import DeskSetup from './DeskSetup';
import PhotoGallery from '../PhotoGallery/PhotoGallery';

// Star rating component
const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-600"}`}>★</span>
      ))}
    </div>
  );
};

// Progress bar component
const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div 
        className="bg-secondary h-2.5 rounded-full" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

// GitHub contribution component
const GitHubContribution = ({ contribution }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-green-500';
      case 'closed': return 'bg-red-500';
      case 'merged': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type) => {
    if (type === 'issue') {
      return (
        <svg className="w-4 h-4 mr-1" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
          <path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path>
          <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
        </svg>
      );
    } else {
      return (
        <svg className="w-4 h-4 mr-1" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
          <path fillRule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"></path>
        </svg>
      );
    }
  };

  return (
    <div className="bg-gray-800/40 p-4 rounded mb-3">
      <div className="flex items-center mb-2">
        <span className="text-xs font-medium px-2 py-0.5 rounded mr-2 text-white bg-gray-700">
          {contribution.repo}
        </span>
        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(contribution.status)}`}></span>
        <span className="text-xs text-gray-400">#{contribution.number}</span>
      </div>
      <div className="flex items-center">
        <span className="text-secondary">
          {getTypeIcon(contribution.type)}
        </span>
        <a 
          href={contribution.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white hover:text-secondary transition-colors"
        >
          {contribution.title}
        </a>
      </div>
    </div>
  );
};

// Strava stat component
const StravaStat = ({ label, value, unit }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-400 text-xs uppercase tracking-wide">{label}</span>
      <div className="flex items-baseline">
        <span className="text-white text-2xl font-bold">{value}</span>
        {unit && <span className="text-gray-400 text-sm ml-1">{unit}</span>}
      </div>
    </div>
  );
};

const Now = () => {
  // Book data with covers and progress
  const books = [
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      cover: "https://m.media-amazon.com/images/I/51ZSpMl1-LL._SY445_SX342_.jpg",
      progress: 35,
      link: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/"
    },
    {
      title: "Clean Architecture",
      author: "Robert C. Martin",
      cover: "https://m.media-amazon.com/images/I/41-sN-mzwKL._SY445_SX342_.jpg",
      progress: 20,
      link: "https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164"
    },
    {
      title: "OCP JAVA SE 21 Developer",
      author: "",
      cover: "https://m.media-amazon.com/images/I/71KfoSCe1iL._SL1500_.jpg",
      progress: 10,
      link: "https://www.amazon.com/Oracle-Certified-Professional-Developer-Study/dp/1394286619/ref=asc_df_1394286619?mcid=2fd025495b6935bf8ce26e49ad79cbe2&hvocijid=4432510572302599608-1394286619-&hvexpln=73&tag=hyprod-20&linkCode=df0&hvadid=721245378154&hvpos=&hvnetw=g&hvrand=4432510572302599608&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9032535&hvtargid=pla-2281435178298&psc=1"
    }
  ];

  // Learning resources with links
  const learningResources = [
    {
      title: "Meta Heuristic Algorithm for Distributed Systems Architecture",
      url: "https://www.youtube.com/watch?v=cQP8WApzIQQ&list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB",
      image: "https://proxy-na.hosted.exlibrisgroup.com/exl_rewrite/syndetics.com/index.php?client=primo&isbn=1-394-18809-9/lc.jpg",
      description: "Exploring concepts in distributed systems, consensus algorithms, and fault tolerance"
    },
    {
      title: "Garbage Collections Algorithms",
      url: "http://dmitrysoshnikov.com/courses/essentials-of-garbage-collectors/",
      image: "http://dmitrysoshnikov.com/wp-content/uploads/2020/01/GC-class-intro-demo.gif",
      description: "Learning how garbage collection works in programming languages and its impact on performance"
    },
    {
      title: "Phonetic Matching Function",
      url: "https://www.ibm.com/docs/en/netezza?topic=functions-phonetic-matching",
      image: "https://sdmntprwestus.oaiusercontent.com/files/00000000-2dec-5230-b2fc-d6493814993d/raw?se=2025-04-04T04%3A44%3A27Z&sp=r&sv=2024-08-04&sr=b&scid=77c4bd28-5300-5d67-8e85-7cc56f8b8506&skoid=4ae7b564-2531-470e-8ddb-6913f4bee2ee&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-03T20%3A38%3A31Z&ske=2025-04-04T20%3A38%3A31Z&sks=b&skv=2024-08-04&sig=yrfLIGF4ZYV8q2w7YQocPdzX%2B/ugbMPhrix09XosE5I%3D",
      description: "Understanding phonetic algorithms and their applications in data processing"
    }
  ];

  // Using direct image URL from Apple Music API
  const appleMusicImageUrl = 'https://github-profile-apple-music.web.app/api/v1/users/gAezo1vegn0jAo3Yk1oK/recent/played/tracks?template=template_1_1';
  
  // Music currently listening to - fallback data
  const [currentMusic, setCurrentMusic] = useState({
    album: "Currently Playing",
    artist: "Apple Music",
    song: "Loading...",
    link: "https://music.apple.com/"
  });

  // Movies and shows watched recently
  const mediaWatched = {
    movies: [
      { title: "Dune: Part Two", year: 2024, rating: 5 },
      { title: "Oppenheimer", year: 2023, rating: 5 },
      { title: "Poor Things", year: 2023, rating: 4 }
    ],
    shows: [
      { title: "Severance", season: "Season 1", rating: 5 },
      { title: "The Bear", season: "Season 2", rating: 5 },
      { title: "Shogun", season: "Season 1", rating: 4 }
    ]
  };

  // Places visited in USA 
  const visitedPlaces = [
    { name: "San Francisco, CA", coords: [37.7749, -122.4194], description: "Tech hub with great food" },
    { name: "Austin, TX", coords: [30.2672, -97.7431], description: "Live music capital" },
    { name: "Chicago, IL", coords: [41.8781, -87.6298], description: "Windy city adventures" },
    { name: "Houston, TX", coords: [29.7604, -95.3698], description: "Space City with diverse culture" },
    { name: "San Antonio, TX", coords: [29.4241, -98.4936], description: "Home of the Alamo and River Walk" },
    { name: "Las Vegas, NV", coords: [36.1699, -115.1398], description: "Entertainment capital of the world" },
    { name: "Niagara Falls, NY", coords: [43.0962, -79.0377], description: "Breathtaking waterfalls and scenery" },
    { name: "Buffalo, NY", coords: [42.8864, -78.8784], description: "City of good neighbors" },
    { name: "Washington, DC", coords: [38.9072, -77.0369], description: "Nation's capital with iconic monuments" },
    { name: "Death Valley, CA", coords: [36.5323, -116.9325], description: "Lowest, hottest, and driest national park" },
    { name: "Lake Tahoe, CA/NV", coords: [39.0968, -120.0324], description: "Crystal clear alpine lake" },
    { name: "Reno, NV", coords: [39.5296, -119.8138], description: "The Biggest Little City in the World" },
    { name: "Lassen Volcanic NP, CA", coords: [40.4977, -121.4207], description: "Hydrothermal wonders and volcanic landscapes" }
  ];
  // Mechanical keyboards
  const keyboards = [
    {
      name: "Custom GMMK Pro",
      switches: "Lubed Gateron Ink Blacks",
      keycaps: "GMK Laser",
      image: "https://cdn.shopify.com/s/files/1/0054/0878/4458/files/GMMK_PRO_WHITE_SIDE_2000x2000_crop_center.png?v=1623077302"
    },
    {
      name: "Keychron Q1",
      switches: "Boba U4T",
      keycaps: "MT3 Susuwatari",
      image: "https://cdn.shopify.com/s/files/1/0059/0630/1017/t/5/assets/keychronq1qmkviamacosandwindowscustomizablemechanicalkeyboard--edited-1633493238234.jpg?v=1633493247"
    }
  ];

  // GitHub contributions
  const [githubContributions, setGithubContributions] = useState([]);
  const [showAllContributions, setShowAllContributions] = useState(false);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch('https://api.github.com/users/harshithsaiv/repos');
        const repos = await response.json();

        const contributions = repos.map((repo) => ({
          repo: repo.full_name,
          title: repo.description || 'No description provided',
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
        }));

        setGithubContributions(contributions);
      } catch (error) {
        console.error('Error fetching GitHub contributions:', error);
      }
    };

    fetchContributions();
  }, []);

  const displayedContributions = showAllContributions
    ? githubContributions
    : githubContributions.slice(0, 3);

  // Strava running data
  const stravaData = {
    recentRun: {
      title: "Morning Trail Run",
      date: "March 1, 2024",
      distance: 5.3,
      duration: "70:22",
      pace: "5:46",
      elevation: 356,
      mapImageUrl: "Strava.jpg",
      stravaLink: "https://strava.app.link/flXgMBUaCRb",
    },
    monthlyStats: {
      distance: 10.6,
      runs: 3,
      hours: 5.5,
      elevation: 1843,
    },
    yearToDate: {
      distance: 50,
      runs: 12,
      achievements: 20,
    }
  };

  // Add new Hot Wheels collection data
  const hotWheelsCollection = [
    {
      name: "Punk Rod",
      series: "HW Exotics 2023",
      image: "car1.jpg",
      special: "Limited Edition",
      acquired: "Decemeber 2024"
    },
    {
      name: "Mad Mike Drift Attack",
      series: "HW Exotics",
      image: "Car2.jpg",
      special: "New Model Introduction",
      acquired: "October 2024"
    },
    {
      name: "McLaren P1",
      series: "HW Exotics 2023",
      image: "Car3.jpg",
      special: "Supercar with hybrid technology",
      acquired: "March 2025"
    },
    {
      name: "Batman v Superman Batmobile",
      series: "DC Batman",
      image: "Car4.jpg",
      special: "Batman Edition",
      acquired: "OCtober 2024"
    },
    {
      name: "Czinger 21C",
      series: "HW Green Speed",
      image: "Car5.jpg",
      special: "",
      acquired: "January 2025"
    },
    {
      name: "Celero GT",
      series: "HW Exotics",
      image: "Car6.jpg",
      special: "",
      acquired: "October 2024"
    }
  ];

  return (
    <div className="flex justify-center min-h-screen py-12">
      <div className="max-w-4xl w-full animate-fade-in px-4 lg:px-0">
        <nav className="mb-12 flex flex-wrap gap-4">
          <Link to="/" className="text-secondary hover:text-white transition-colors text-sm">
            ← Back home
          </Link>
          <Link to="/knowledge-base" className="text-secondary hover:text-white transition-colors text-sm">
            Knowledge Base
          </Link>
          <Link to="/now" className="text-secondary hover:text-white transition-colors text-sm font-medium">
            Now
          </Link>
          <Link to="/blog" className="text-secondary hover:text-white transition-colors text-sm">
            Blog
          </Link>
        </nav>
        
        <header className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">Now</h1>
          <p className="text-text-secondary">
            Last updated: {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <div className="h-px bg-gray-800 w-16 mt-6"></div>
        </header>
        
        <div className="space-y-16 text-base text-text-secondary leading-relaxed">
          <section>
            <p>
              This is a <a href="https://nownownow.com/about" className="text-secondary hover:text-white underline" target="_blank" rel="noopener noreferrer">/now page</a>. 
              It's a snapshot of what I'm currently focused on and interested in at this point in my life.
            </p>
          </section>
          
          {/* Reading Section with Book Covers and Progress */}
          <section className="space-y-6">
            <h2 className="text-xl font-medium text-white mb-6">What I'm reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <div key={index} className="flex flex-col">
                  <a 
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="group transition-all duration-300"
                  >
                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg transform group-hover:scale-105 transition-all">
                      <div className="relative pb-5">
                        <div className="flex justify-center mb-4 h-48 overflow-hidden rounded">
                          <img src={book.cover} alt={book.title} className="object-contain" />
                        </div>
                        <h3 className="font-medium text-white">{book.title}</h3>
                        <p className="text-gray-400 text-sm">{book.author}</p>
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span>{book.progress}%</span>
                          </div>
                          <ProgressBar progress={book.progress} />
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </section>
          
          {/* Learning Section with Resource Cards */}
          <section className="space-y-6">
            <h2 className="text-xl font-medium text-white mb-6">What I'm learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningResources.map((resource, index) => (
                <a 
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/80 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded overflow-hidden">
                      <img src={resource.image} alt={resource.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{resource.title}</h3>
                      <p className="text-sm text-gray-400">{resource.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
          
          {/* Knowledge Graph - ADDED
          <section className="space-y-6">
            <h2 className="text-xl font-medium text-white mb-6">My Knowledge Graph</h2>
            <KnowledgeGraph />
          </section> */}
          
          {/* Working On Section - Updated with GitHub contributions */}
          <section className="space-y-6">
            <h2 className="text-xl font-medium text-white mb-6">What I'm working on</h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-secondary mb-3">Personal Projects</h3>
              <ul className="list-disc list-inside space-y-2 pl-1">
                <li>Optimizing machine learning models for real-time applications using CUDA</li>
                <li>Building a personal AI assistant that integrates with my home automation</li>
                <li>Contributing to an open-source project focused on container security</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-secondary mb-3">Open Source Contributions</h3>
              <div className="space-y-2">
                {githubContributions.length > 0 ? (
                  displayedContributions.map((contribution, index) => (
                    <div key={index} className="bg-gray-800/40 p-4 rounded">
                      <div className="flex justify-between items-center">
                        <a
                          href={contribution.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-secondary transition-colors"
                        >
                          {contribution.repo}
                        </a>
                        <div className="text-sm text-gray-400">
                          ⭐ {contribution.stars} | 🍴 {contribution.forks}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mt-2">{contribution.title}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">Loading contributions...</p>
                )}
              </div>
              {githubContributions.length > 3 && (
                <button
                  onClick={() => setShowAllContributions(!showAllContributions)}
                  className="mt-4 text-secondary hover:text-white transition-colors text-sm"
                >
                  {showAllContributions ? 'Show Less ↑' : 'Show More ↓'}
                </button>
              )}
            </div>
          </section>

          {/* Photo Gallery Section */}
          <PhotoGallery 
            photos={[
              'photo1.jpg',
              'photo2.jpg',
              'photo3.jpg',
              'photo4.jpg',
              'photo5.jpg',
              'photo6.jpg',
              'photo7.jpg',
              'photo8.jpg',
              'photo9.jpg',
              'photo10.jpg',
            ]} 
          />
          
          {/* Coding Stats Dashboard - ADDED */}
          {/* <section className="space-y-6">
            <h2 className="text-xl font-medium text-white mb-6">My Coding Activity</h2>
            <CodingStats />
          </section> */}
          
          {/* Currently Listening Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-medium text-white mb-6">What I'm listening to</h2>
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 p-5 rounded-xl">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-48 h-48 flex-shrink-0">
                  <img
                    src={appleMusicImageUrl}
                    alt="Currently playing on Apple Music"
                    className="w-full h-full object-cover rounded shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300"
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-sm uppercase tracking-wider text-gray-400">Recently Played</p>
                  {/* <h3 className="text-2xl font-bold text-white mt-2">{currentMusic.song}</h3>
                  <p className="text-lg text-gray-300">{currentMusic.artist}</p>
                  <p className="text-sm text-gray-400">{currentMusic.album}</p> */}
                  <a
                    href="https://music.apple.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 px-4 py-2 bg-[#fa2f55] text-white rounded-full text-sm font-medium hover:bg-opacity-90 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Open Apple Music
                  </a>
                </div>
              </div>
            </div>
          </section>
          
          {/* Movies and TV Shows Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-medium text-white mb-6">What I'm watching</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-secondary mb-3">Movies</h3>
                <ul className="space-y-3">
                  {mediaWatched.movies.map((movie, index) => (
                    <li key={index} className="bg-gray-800/40 p-3 rounded">
                      <div className="flex justify-between">
                        <span className="text-white">{movie.title}</span>
                        <span className="text-gray-400 text-sm">{movie.year}</span>
                      </div>
                      <StarRating rating={movie.rating} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-secondary mb-3">TV Shows</h3>
                <ul className="space-y-3">
                  {mediaWatched.shows.map((show, index) => (
                    <li key={index} className="bg-gray-800/40 p-3 rounded">
                      <div className="flex justify-between">
                        <span className="text-white">{show.title}</span>
                        <span className="text-gray-400 text-sm">{show.season}</span>
                      </div>
                      <StarRating rating={show.rating} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          
          {/* Places Visited Section with Map */}
          <section className="space-y-6">
            <h2 className="text-xl font-medium text-white mb-6">Places I've visited</h2>
            <NowPage visitedPlaces={visitedPlaces} />
          </section>
          
          {/* Strava Running Section - NEW */}
          <section className="space-y-6">
            <h2 className="text-xl font-medium text-white mb-6">Running Adventures</h2>
            
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl overflow-hidden">
              {/* Recent Run with Map */}
              <div className="flex flex-col lg:flex-row">
                {/* Map side */}
                <div className="lg:w-2/3 relative">
                  <img 
                    src={stravaData.recentRun.mapImageUrl} 
                    alt="Run map visualization"
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 rounded px-3 py-1 text-xs text-white">
                    Latest Run
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-sm rounded p-2 text-white">
                    <div className="text-sm font-medium">{stravaData.recentRun.title}</div>
                    <div className="text-xs text-gray-300">{stravaData.recentRun.date}</div>
                  </div>
                  <a 
                    href={stravaData.recentRun.stravaLink}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="absolute top-3 right-3 bg-[#FC4C02] rounded-full p-2 hover:bg-opacity-80 transition-colors"
                    aria-label="View on Strava"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                    </svg>
                  </a>
                </div>
                
                {/* Stats side */}
                <div className="lg:w-1/3 p-6 flex flex-col justify-between">
                  {/* Run stats */}
                  <div className="grid grid-cols-3 gap-4 pb-4">
                    <StravaStat label="Distance" value={stravaData.recentRun.distance} unit="km" />
                    <StravaStat label="Duration" value={stravaData.recentRun.duration} />
                    <StravaStat label="Pace" value={stravaData.recentRun.pace} unit="min/km" />
                  </div>
                  
                  {/* Elevation */}
                  <div className="flex items-center justify-center pb-4">
                    <div className="flex flex-col items-center">
                      <svg className="w-5 h-5 text-secondary mb-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 5.28l-2.54 3.82c-.7-.21-1.4-.42-2.1-.63l-1.28-.39c-.53-.16-1.11-.23-1.69-.23-.07 0-.15.01-.23.01l-1.38 2.09c-.24.35-.12.8.23 1.04.19.13.41.2.63.2.16 0 .33-.05.47-.15l1.31-.97c.32-.24.67-.35 1.03-.35.35 0 .7.12 1.03.35l1.31.97c.15.1.31.15.47.15.22 0 .44-.07.63-.2.35-.24.47-.69.23-1.04l-1.5-2.14 1.65-.49 2.54 3.42v-6.07zM13.5 9c-.99 0-1.91.4-2.58 1.14L8.95 12.3c-1.1.93-1.7 2.28-1.7 3.75v7.45h11.5v-7.45c0-1.47-.6-2.82-1.7-3.75l-1.97-2.16C14.41 9.4 13.49 9 12.5 9z"></path>
                      </svg>
                      <span className="text-gray-400 text-xs uppercase tracking-wide">Elevation</span>
                      <div className="flex items-baseline">
                        <span className="text-white text-xl font-bold">{stravaData.recentRun.elevation}</span>
                        <span className="text-gray-400 text-sm ml-1">m</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Monthly stats */}
                  <div className="border-t border-gray-700 pt-4">
                    <h3 className="text-white font-medium text-center mb-3">This Month</h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-white font-bold">{stravaData.monthlyStats.distance}</p>
                        <p className="text-xs text-gray-400">km</p>
                      </div>
                      <div>
                        <p className="text-white font-bold">{stravaData.monthlyStats.runs}</p>
                        <p className="text-xs text-gray-400">runs</p>
                      </div>
                      <div>
                        <p className="text-white font-bold">{stravaData.monthlyStats.hours}</p>
                        <p className="text-xs text-gray-400">hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Year stats - as a footer */}
              <div className="bg-black/30 backdrop-blur-sm px-6 py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm mr-2">Year to date:</span>
                  <span className="text-white font-medium">{stravaData.yearToDate.distance}km</span>
                  <span className="mx-2 text-gray-600">•</span>
                  <span className="text-white font-medium">{stravaData.yearToDate.runs} activities</span>
                </div>
                <a 
                  href="https://strava.app.link/flXgMBUaCRb" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#FC4C02] hover:text-white transition-colors text-sm flex items-center"
                >
                  View on Strava
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
          
          {/* Desk Setup Evolution - ADDED */}
          {/* <section className="space-y-6">
            <h2 className="text-xl font-medium text-white mb-6">My Workspace Evolution</h2>
            <DeskSetup />
          </section> */}
          
          {/* Mechanical Keyboards Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-medium text-white mb-6">My mechanical keyboards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyboards.map((keyboard, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg overflow-hidden"
                >
                  <img 
                    src={keyboard.image} 
                    alt={keyboard.name} 
                    className="w-full h-48 object-cover object-center hover:opacity-90 transition-opacity"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-white">{keyboard.name}</h3>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li><span className="text-gray-400">Switches:</span> {keyboard.switches}</li>
                      <li><span className="text-gray-400">Keycaps:</span> {keyboard.keycaps}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Hot Wheels Collection Section - NEW */}
          <section className="space-y-6">
            <h2 className="text-xl font-medium text-white mb-6">My Hot Wheels Collection</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hotWheelsCollection.map((car, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800/40 p-4 rounded-lg transition-all hover:bg-gray-800/60"
                >
                  <div className="relative h-48 mb-3 overflow-hidden rounded-md bg-gradient-to-b from-gray-700/50 to-gray-900/50">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-full h-full object-contain p-2 transform hover:scale-105 transition-transform duration-300"
                    />
                    {car.special && (
                      <span className="absolute top-2 right-2 bg-secondary/80 text-black text-xs px-2 py-1 rounded-full font-medium">
                        {car.special}
                      </span>
                    )}
                  </div>
                  <h3 className="text-white font-medium">{car.name}</h3>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-gray-400">{car.series}</span>
                    <span className="text-gray-500">Added {car.acquired}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center mt-4 p-4 bg-gray-800/30 rounded-lg">
              <div>
                <span className="text-white font-medium">Total collection:</span>
                <span className="text-gray-300 ml-2">{hotWheelsCollection.length} of 100 cars</span>
              </div>
              <div className="text-secondary text-sm">
                Started collecting in 2024
              </div>
            </div>
          </section>
          
          {/* Footer Attribution */}
          <section className="pt-8 border-t border-gray-800">
            <p className="text-sm">
              Inspired by <a href="https://nownownow.com/about" className="text-secondary hover:text-white underline" target="_blank" rel="noopener noreferrer">the /now movement</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Now;
