import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { unlink } from 'fs/promises';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());
app.set('etag', false);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const content = {
  "HealthSec": {
    "id": "Health-Stress",
    "section": "Health",
    "sectionHref": "/",
    "title": "What the Middle Ages can teach us about preventing burnout",
    "summary": "Stress and mental exhaustion aren't new – in medieval times, they were prevalent. And the wisdom of the Middle Ages about how to deal with burnout still rings surprisingly true today.",
    "imageUrl": "https://ichef.bbci.co.uk/images/ic/800xn/p0nyjg0k.jpg.webp",
    "href": "/"
  },
  "audioPicks": [
    {
      "id": 1,
      "show": "The Weekly Wrap",
      "title": "Inside this year's biggest sporting comeback",
      "imageUrl": "https://picsum.photos/seed/bbc-audio-1/300/300",
      "href": "/",
      "duration": "27 mins"
    },
    {
      "id": 2,
      "show": "World Report",
      "title": "Overnight strikes escalate regional tensions",
      "imageUrl": "https://picsum.photos/seed/bbc-audio-2/300/300",
      "href": "/",
      "duration": "28 mins"
    },
    {
      "id": 3,
      "show": "Business Unfiltered",
      "title": "The streaming boss reshaping the industry",
      "imageUrl": "https://picsum.photos/seed/bbc-audio-3/300/300",
      "href": "/",
      "duration": "44 mins"
    },
    {
      "id": 4,
      "show": "Sport's Untold Stories",
      "title": "1. The rumour that never was",
      "imageUrl": "https://picsum.photos/seed/bbc-audio-4/300/300",
      "href": "/",
      "duration": "43 mins"
    },
    {
      "id": 5,
      "show": "On Screen",
      "title": "A director on adapting his most personal project yet",
      "imageUrl": "https://picsum.photos/seed/bbc-audio-5/300/300",
      "href": "/",
      "duration": "42 mins"
    },
    {
      "id": 6,
      "show": "Life, Less Ordinary",
      "title": "The stranger who saved a stadium celebration",
      "imageUrl": "https://picsum.photos/seed/bbc-audio-6/300/300",
      "href": "/",
      "duration": "39 mins"
    },
    {
      "id": 7,
      "show": "Culture Now",
      "title": "Why this decades-old accessory won't go out of style",
      "imageUrl": "https://picsum.photos/seed/bbc-audio-7/300/300",
      "href": "/",
      "duration": "31 mins"
    },
    {
      "id": 8,
      "show": "Tech Weekly",
      "title": "The chip shortage nobody saw coming",
      "imageUrl": "https://picsum.photos/seed/bbc-audio-8/300/300",
      "href": "/",
      "duration": "35 mins"
    },
    {
      "id": 9,
      "show": "History Untold",
      "title": "The forgotten expedition that changed the map",
      "imageUrl": "https://picsum.photos/seed/bbc-audio-9/300/300",
      "href": "/",
      "duration": "48 mins"
    },
    {
      "id": 10,
      "show": "Money Matters",
      "title": "How one city quietly became a financial hub",
      "imageUrl": "https://picsum.photos/seed/bbc-audio-10/300/300",
      "href": "/",
      "duration": "33 mins"
    }
  ],
  "bbcLanguages": [
    {
      "id": 1,
      "name": "BBC News Brasil",
      "href": "https://www.bbc.com/portuguese"
    },
    {
      "id": 2,
      "name": "BBC News Mundo (Spanish)",
      "href": "https://www.bbc.com/mundo"
    },
    {
      "id": 3,
      "name": "BBC News မြန်မာ (Burmese)",
      "href": "https://www.bbc.com/burmese"
    },
    {
      "id": 4,
      "name": "BBC News 中文 (Chinese)",
      "href": "https://www.bbc.com/zhongwen/simp"
    },
    {
      "id": 5,
      "name": "BBC News Indonesia",
      "href": "https://www.bbc.com/indonesia"
    },
    {
      "id": 6,
      "name": "BBC News 코리아 (Korean)",
      "href": "https://www.bbc.com/korean"
    },
    {
      "id": 7,
      "name": "BBC News ไทย (Thai)",
      "href": "https://www.bbc.com/thai"
    },
    {
      "id": 8,
      "name": "BBC News Tiếng Việt (Vietnamese)",
      "href": "https://www.bbc.com/vietnamese"
    },
    {
      "id": 9,
      "name": "BBC News Azərbaycanca (Azeri)",
      "href": "https://www.bbc.com/azeri"
    },
    {
      "id": 10,
      "name": "BBC News Magyarul (Hungarian)",
      "href": "https://www.bbc.com/news/topics/c302m85q5llt"
    },
    {
      "id": 11,
      "name": "BBC News Кыргыз Кызматы (Kyrgyz)",
      "href": "https://www.bbc.com/kyrgyz"
    },
    {
      "id": 12,
      "name": "BBC News Polska (Polish)",
      "href": "https://www.bbc.com/polska"
    },
    {
      "id": 13,
      "name": "BBC News România (Romanian)",
      "href": "https://www.bbc.com/romana"
    },
    {
      "id": 14,
      "name": "BBC News Русская служба (Russian)",
      "href": "https://www.bbc.com/russian"
    },
    {
      "id": 15,
      "name": "BBC News na srpskom (Serbian)",
      "href": "https://www.bbc.com/serbian/lat"
    },
    {
      "id": 16,
      "name": "BBC News Україна (Ukrainian)",
      "href": "https://www.bbc.com/ukrainian"
    },
    {
      "id": 17,
      "name": "BBC News O'zbek (Uzbek)",
      "href": "https://www.bbc.com/uzbek"
    },
    {
      "id": 18,
      "name": "BBC News عربي (Arabic)",
      "href": "https://www.bbc.com/arabic"
    },
    {
      "id": 19,
      "name": "BBC News فارسی (Persian)",
      "href": "https://www.bbc.com/persian"
    },
    {
      "id": 20,
      "name": "BBC News Türkçe (Turkish)",
      "href": "https://www.bbc.com/turkce"
    },
    {
      "id": 21,
      "name": "BBC News বাংলা (Bengali)",
      "href": "https://www.bbc.com/bengali"
    },
    {
      "id": 22,
      "name": "BBC News دری (Dari)",
      "href": "https://www.bbc.com/persian/afghanistan"
    },
    {
      "id": 23,
      "name": "BBC News ગુજરાતી (Gujarati)",
      "href": "https://www.bbc.com/gujarati"
    },
    {
      "id": 24,
      "name": "BBC News हिन्दी (Hindi)",
      "href": "https://www.bbc.com/hindi"
    },
    {
      "id": 25,
      "name": "BBC News मराठी (Marathi)",
      "href": "https://www.bbc.com/marathi"
    },
    {
      "id": 26,
      "name": "BBC News नेपाली (Nepali)",
      "href": "https://www.bbc.com/nepali"
    },
    {
      "id": 27,
      "name": "BBC News සිංහල (Sinhala)",
      "href": "https://www.bbc.com/sinhala"
    },
    {
      "id": 28,
      "name": "BBC News ਪੰਜਾਬੀ (Punjabi)",
      "href": "https://www.bbc.com/punjabi"
    },
    {
      "id": 29,
      "name": "BBC News Afaan Oromo",
      "href": "https://www.bbc.com/afaanoromoo"
    },
    {
      "id": 30,
      "name": "BBC News አማርኛ (Amharic)",
      "href": "https://www.bbc.com/amharic"
    },
    {
      "id": 31,
      "name": "BBC News Afrique (French)",
      "href": "https://www.bbc.com/afrique"
    },
    {
      "id": 32,
      "name": "BBC News Hausa",
      "href": "https://www.bbc.com/hausa"
    },
    {
      "id": 33,
      "name": "BBC News Gàidhlig",
      "href": "https://www.bbc.com/naidheachdan"
    },
    {
      "id": 34,
      "name": "BBC News Igbo",
      "href": "https://www.bbc.com/igbo"
    },
    {
      "id": 35,
      "name": "BBC News Japanese 日本語",
      "href": "https://www.bbc.com/japanese"
    },
    {
      "id": 36,
      "name": "BBC News Gahuza",
      "href": "https://www.bbc.com/gahuza"
    },
    {
      "id": 37,
      "name": "BBC News Pidgin",
      "href": "https://www.bbc.com/pidgin"
    },
    {
      "id": 38,
      "name": "BBC News Somali",
      "href": "https://www.bbc.com/somali"
    },
    {
      "id": 39,
      "name": "BBC News Swahili",
      "href": "https://www.bbc.com/swahili"
    },
    {
      "id": 40,
      "name": "BBC News தமிழ் (Tamil)",
      "href": "https://www.bbc.com/tamil"
    },
    {
      "id": 41,
      "name": "BBC News తెలుగు (Telugu)",
      "href": "https://www.bbc.com/telugu"
    },
    {
      "id": 42,
      "name": "BBC News ትግርኛ (Tigrinya)",
      "href": "https://www.bbc.com/tigrinya"
    },
    {
      "id": 43,
      "name": "BBC News اردو (Urdu)",
      "href": "https://www.bbc.com/urdu"
    },
    {
      "id": 44,
      "name": "BBC News Yorùbá",
      "href": "https://www.bbc.com/yoruba"
    },
    {
      "id": 45,
      "name": "BBC News World Service",
      "href": "https://www.bbc.com/ws"
    }
  ],
  "bbcTerms": {
    "navigation_links": [
      {
        "text": "Terms of Use",
        "href": "/terms-of-use"
      },
      {
        "text": "Subscription Terms",
        "href": "/subscription-terms"
      },
      {
        "text": "About the BBC",
        "href": "/about-the-bbc"
      },
      {
        "text": "Privacy Policy",
        "href": "/privacy-policy"
      },
      {
        "text": "Cookies",
        "href": "/cookies"
      },
      {
        "text": "Accessibility Help",
        "href": "/accessibility-help"
      },
      {
        "text": "Contact the BBC",
        "href": "/contact-the-bbc"
      },
      {
        "text": "Advertise with us",
        "href": "/advertise-with-us"
      },
      {
        "text": "Do not share or sell my info",
        "href": "/do-not-share-or-sell-my-info"
      },
      {
        "text": "BBC.com Help & FAQs",
        "href": "/bbc-help-and-faqs"
      },
      {
        "text": "Content Index",
        "href": "/content-index"
      }
    ],
    "preferences": {
      "text": "Set Preferred Source",
      "href": "/set-preferred-source"
    },
    "copyright_and_disclaimer": {
      "text": "Copyright 2026 BBC. All rights reserved. The BBC is not responsible for the content of external sites.",
      "policy_link": {
        "text": "Read about our approach to external linking.",
        "href": "/external-linking-policy"
      }
    }
  },
  "categories": [
    "Home",
    "News",
    "FootBall 2026",
    "Sport",
    "Business",
    "Technology",
    "Health",
    "Culture",
    "Arts",
    "Travel",
    "Earth",
    "Audio",
    "Video",
    "Live"
  ],
  "discoverCards": [
    {
      "id": 1,
      "title": "Royal Watch",
      "summary": "The full story on the British Royal Family, in your inbox every Thursday.",
      "imageUrl": "https://picsum.photos/600/400?random=411",
      "href": "/royal-watch"
    },
    {
      "id": 2,
      "title": "Six Steps to Calm",
      "summary": "Set yourself up for a calmer future with this course of six science-backed techniques.",
      "imageUrl": "https://picsum.photos/600/400?random=412",
      "href": "/six-steps-to-calm"
    },
    {
      "id": 3,
      "title": "Sign up to World of Business",
      "summary": "Gain the leading edge with global insights for the boardroom and beyond, in your inbox every Wednesday.",
      "imageUrl": "https://picsum.photos/600/400?random=413",
      "href": "/world-of-business"
    },
    {
      "id": 4,
      "title": "Get The Essential List",
      "summary": "The week's best stories, handpicked by BBC editors, in your inbox every Tuesday and Friday.",
      "imageUrl": "https://picsum.photos/600/400?random=414",
      "href": "/essential-list"
    },
    {
      "id": 5,
      "title": "Stream the best of British TV",
      "summary": "Endlessly entertaining. Delightfully different. Enjoy worlds of wit, mystery and drama with BritBox.",
      "imageUrl": "https://picsum.photos/600/400?random=415",
      "href": "/britbox"
    },
    {
      "id": 6,
      "title": "Watch Documentaries",
      "summary": "Watch critically acclaimed and award-winning documentaries from the BBC, including History, Nature, True Crime and more.",
      "imageUrl": "https://picsum.photos/600/400?random=416",
      "href": "/documentaries"
    },
    {
      "id": 7,
      "title": "Download the BBC app",
      "summary": "Click here to download the BBC app for Apple and Android devices.",
      "imageUrl": "https://picsum.photos/600/400?random=417",
      "href": "/app"
    },
    {
      "id": 8,
      "title": "Register for a BBC account",
      "summary": "Don't have time to read everything right now? Your BBC account lets you save articles and videos for later.",
      "imageUrl": "https://picsum.photos/600/400?random=418",
      "href": "/account"
    }
  ],
  "discoverHero": {
    "id": 1,
    "topic": "Discover More From the BBC",
    "href": "/discover",
    "title": "The best of the BBC, delivered to you",
    "summary": "Get news and insights with BBC newsletters, sent direct to your inbox. Sign up for free.",
    "imageUrl": "https://picsum.photos/1200/700?random=401",
    "buttonText": "See more"
  },
  "editorsPicks": [
    {
      "id": 1,
      "title": "Could this device change football training?",
      "summary": "How wearable sensor technology is transforming the sport from the ground up.",
      "imageUrl": "https://picsum.photos/seed/bbc-picks-1/500/281",
      "href": "/",
      "source": "TechXplore"
    },
    {
      "id": 2,
      "title": "The robotic assistant featured at this year's tournament",
      "summary": "A look at the cutting-edge robotics on display pitchside this season.",
      "imageUrl": "https://picsum.photos/seed/bbc-picks-2/500/281",
      "href": "/",
      "source": "TechXplore"
    },
    {
      "id": 3,
      "title": "Captain 'never doubted' the squad would go far",
      "summary": "The team’s captain says reaching the final was no accident, despite a tough run of fixtures.",
      "imageUrl": "https://picsum.photos/seed/bbc-picks-3/500/281",
      "href": "/",
      "source": "World Cup",
      "badge": "Reaction"
    },
    {
      "id": 4,
      "title": "Team celebrates progressing to the final",
      "summary": "Players celebrate at full time after securing their spot in the final.",
      "imageUrl": "https://picsum.photos/seed/bbc-picks-4/500/281",
      "href": "/",
      "source": "World Cup",
      "badge": "Full Time Scenes"
    },
    {
      "id": 5,
      "title": "Fans celebrate dramatic late win",
      "summary": "Supporters celebrate a hard-fought victory that sends their side through to the next round.",
      "imageUrl": "https://picsum.photos/seed/bbc-picks-5/500/281",
      "href": "/",
      "source": "Local News"
    },
    {
      "id": 6,
      "title": "Could this machine change football training?",
      "summary": "How technology is transforming football's future from the ground up.",
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYCAwZmhUB5Pj4vSAFb2RRGYzmsy81TQlKqlRH9OHFWQ&s=10",
      "href": "/",
      "source": "TechXplore"
    }
  ],
  "entertainmentNews": [
    {
      "id": "us-canada",
      "topic": "US & Canada News",
      "href": "/us-canada",
      "featured": {
        "id": "us-canada-featured",
        "title": "Heavy smoke prompts air quality warnings across major cities",
        "summary": "Officials in several states say pollution levels have reached their highest point this year as wildfire smoke drifts across the border.",
        "imageUrl": "https://picsum.photos/seed/bbc-vi-us-1/400/250",
        "href": "/us-canada/heavy-smoke-prompts-air-quality-warnings"
      },
      "items": [
        {
          "id": "us-canada-1",
          "title": "Three cities top list of most polluted as wildfire season continues",
          "href": "/us-canada/most-polluted-cities"
        },
        {
          "id": "us-canada-2",
          "title": "Veteran senator announces plans to retire at end of term",
          "href": "/us-canada/senator-retirement"
        },
        {
          "id": "us-canada-3",
          "title": "Court ruling reshapes decades-old immigration policy",
          "href": "/us-canada/immigration-policy-ruling"
        }
      ]
    },
    {
      "id": "world",
      "topic": "More World News",
      "href": "/world",
      "featured": {
        "id": "world-featured",
        "title": "Protest group organizes march demanding education reforms",
        "summary": "Organizers say the demonstration is intended to pressure lawmakers ahead of a key parliamentary vote.",
        "imageUrl": "https://picsum.photos/seed/bbc-vi-world-1/400/250",
        "href": "/world/education-reform-protests"
      },
      "items": [
        {
          "id": "world-1",
          "title": "Veteran actor known for decades of stage work dies aged 90",
          "href": "/world/veteran-actor-dies"
        },
        {
          "id": "world-2",
          "title": "New border system triples wait times at busy crossing points",
          "href": "/world/border-system-delays"
        },
        {
          "id": "world-3",
          "title": "Flooding damages festival preparations in coastal region",
          "href": "/world/flooding-damages-festival"
        }
      ]
    },
    {
      "id": "business",
      "topic": "Business",
      "href": "/business",
      "featured": {
        "id": "business-featured",
        "title": "Utility lenders prepare legal challenge over nationalisation plan",
        "summary": "Creditors say they would pursue full repayment of outstanding debts in the event ownership is transferred to the state.",
        "imageUrl": "https://picsum.photos/seed/bbc-vi-biz-1/400/250",
        "href": "/business/utility-nationalisation"
      },
      "items": [
        {
          "id": "business-1",
          "title": "Is a new era coming for the country's energy sector?",
          "href": "/business/energy-sector"
        },
        {
          "id": "business-2",
          "title": "Why a major steelmaker was brought under state control",
          "href": "/business/steelmaker-state-control"
        },
        {
          "id": "business-3",
          "title": "Foreign firm seeks compensation over nationalisation dispute",
          "href": "/business/nationalisation-dispute"
        }
      ]
    },
    {
      "id": "technology",
      "topic": "Technology",
      "href": "/technology",
      "featured": {
        "id": "technology-featured",
        "title": "How fitness apps may be sharing more data than users realize",
        "summary": "New research examines which popular apps limit third-party data sharing, and which do not.",
        "imageUrl": "https://picsum.photos/seed/bbc-vi-tech-1/400/250",
        "href": "/technology/fitness-app-data-sharing"
      },
      "items": [
        {
          "id": "technology-1",
          "title": "Five ways to help kids build healthier screen habits",
          "href": "/technology/healthy-screen-habits"
        },
        {
          "id": "technology-2",
          "title": "Is a long-awaited game remake worth the wait?",
          "href": "/technology/game-remake"
        },
        {
          "id": "technology-3",
          "title": "One of these faces isn't real. Can you tell which?",
          "href": "/technology/ai-generated-faces"
        }
      ]
    }
  ],
  "exploreLinks": {
    "News": [
      "World",
      "UK",
      "Business",
      "Politics",
      "Health",
      "Education"
    ],
    "Sport": [
      "Football",
      "Cricket",
      "Formula 1",
      "Rugby Union",
      "Tennis",
      "Golf"
    ],
    "Culture": [
      "Film",
      "TV",
      "Music",
      "Art",
      "Books",
      "Style"
    ],
    "More": [
      "Weather",
      "Travel",
      "Future",
      "Earth",
      "Reel",
      "Worklife"
    ]
  },
  "exploreSections": [
    {
      "id": 1,
      "topic": "Arts",
      "href": "/arts",
      "featured": {
        "title": "10 intimate images of a lost decadent 1930s Paris",
        "summary": "Moving from the slums to the exclusive salons, Brassai captured the bohemia and backstreets of Paris.",
        "imageUrl": "https://picsum.photos/600/400?random=201",
        "href": "/arts/paris"
      },
      "items": [
        {
          "id": 11,
          "title": "Hideous: The controversy over Picasso's most shocking painting",
          "href": "/"
        },
        {
          "id": 12,
          "title": "The naked portrait covered up for centuries",
          "href": "/"
        },
        {
          "id": 13,
          "title": "Inside Switzerland's extraordinary medieval library",
          "href": "/"
        }
      ]
    },
    {
      "id": 2,
      "topic": "Earth",
      "href": "/earth",
      "featured": {
        "title": "Greece's prison island was sealed off. Now it's a sanctuary for seals",
        "summary": "For half a century, Gyaros was off-limits to the world as a military prison and naval firing range.",
        "imageUrl": "https://picsum.photos/600/400?random=202",
        "href": "/earth/greece"
      },
      "items": [
        {
          "id": 21,
          "title": "Nine extraordinary things you probably didn't know about sharks",
          "href": "/"
        },
        {
          "id": 22,
          "title": "Life in a heat dome: How do you cool a 100F city?",
          "href": "/"
        },
        {
          "id": 23,
          "title": "Every night trillions of tiny creatures rise from the ocean",
          "href": "/"
        }
      ]
    },
    {
      "id": 3,
      "topic": "Video",
      "href": "/video",
      "featured": {
        "title": "Are wellness supplements worth the hype?",
        "summary": "Tech Now visits the UK's first longevity store to explore the boom in personalised vitamins.",
        "imageUrl": "https://picsum.photos/600/400?random=203",
        "isVideo": true,
        "href": "/video/wellness"
      },
      "items": [
        {
          "id": 31,
          "title": "How the samurai armour became Japan's weakness",
          "isVideo": true,
          "href": "/"
        },
        {
          "id": 32,
          "title": "Marie Antoinette's costly diamond necklace scandal",
          "isVideo": true,
          "href": "/"
        },
        {
          "id": 33,
          "title": "Everything dope about America comes from Chicago?",
          "isVideo": true,
          "href": "/"
        }
      ]
    },
    {
      "id": 4,
      "topic": "World's Table",
      "href": "/food",
      "featured": {
        "title": "How tacos became Norway's national comfort food",
        "summary": "An oil boom and supermarket imports transformed the taco into one of Norway's favourite dishes.",
        "imageUrl": "https://picsum.photos/600/400?random=204",
        "href": "/food/tacos"
      },
      "items": [
        {
          "id": 41,
          "title": "These fruit-filled buns are Poland's summer obsession",
          "href": "/"
        },
        {
          "id": 42,
          "title": "Is the World Cup ranch dressing craze real or hype?",
          "href": "/"
        },
        {
          "id": 43,
          "title": "10 winning pictures from the World Food Photography Awards",
          "href": "/"
        }
      ]
    }
  ],
  "fromBbc": [
    {
      "id": 1,
      "title": "The best way to explore Dublin's spectacular coast is by rail",
      "summary": "Many visitors don't realise Dublin has a coastline. Now, a newly expanded rail trail makes it easy to explore the world's only capital city within a Unesco Biosphere Reserve.",
      "imageUrl": "https://ichef.bbci.co.uk/images/ic/800xn/p0nzby4w.jpg.webp",
      "href": "/"
    },
    {
      "id": 2,
      "title": "For 1,000 years, a cult worshipped the hero of the Odyssey",
      "summary": "The Odyssey was far more than entertainment to ancient Greeks. Archaeologists have unearthed evidence of a cult that revered the Homeric hero on his legendary home island of Ithaca.",
      "imageUrl": "https://ichef.bbci.co.uk/images/ic/800xn/p0nzf7mh.jpg.webp",
      "href": "/"
    }
  ],
  "kattyKay": {
    "section": "NEW NORMAL WITH KATTY KAY",
    "stories": [
      {
        "id": 1,
        "title": "How companies could end up firing their customers",
        "summary": "Researchers modelled AI job losses and found a seemingly unavoidable trap that every company could see coming.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkSguK44jg-xCKyoB6zTFV7GmilYAtN7bsK13-KzlAQ&s=10",
        "href": "/",
        "isVideo": true
      },
      {
        "id": 2,
        "title": "People are paying to get locked out of their phones",
        "summary": "Inside the growing business of paying for inconvenience, and whether you can really buy your way offline.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnvNIa_MmW4pVsk2_aglYw4HJN0_pIdoSXJ35Cus_S5g&s=10",
        "href": "/",
        "isVideo": true
      },
      {
        "id": 3,
        "title": "You slept fine. But then you checked your smartwatch.",
        "summary": "Katty Kay and Dr Kelly Glazer Baron on how chasing a better sleep score can make you more anxious.",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrNtdioFBtvQUk0k222-M6GeWLTD8Za_pDmpT8n7tJ2g&s=10",
        "href": "/",
        "isVideo": true
      }
    ]
  },
  "latestSportAudio": [
    {
      "id": 1,
      "show": "Test Match Special",
      "title": "England seal series with record Lord's ODI total",
      "imageUrl": "https://picsum.photos/400?random=101",
      "duration": "49 mins",
      "href": "/"
    },
    {
      "id": 2,
      "show": "Football Daily",
      "title": "World Cup: What's Next For England?",
      "imageUrl": "https://picsum.photos/400?random=102",
      "duration": "42 mins",
      "href": "/"
    },
    {
      "id": 3,
      "show": "Rugby Union Weekly",
      "title": "Late TMO drama as 13-man England beat Argentina",
      "imageUrl": "https://picsum.photos/400?random=103",
      "duration": "30 mins",
      "href": "/"
    },
    {
      "id": 4,
      "show": "Football Daily",
      "title": "World Cup: Who Stops Messi?",
      "imageUrl": "https://picsum.photos/400?random=104",
      "duration": "38 mins",
      "href": "/"
    },
    {
      "id": 5,
      "show": "More than the Score",
      "title": "Alex Rose: The engineer making athletics history for Samoa",
      "imageUrl": "https://picsum.photos/400?random=105",
      "duration": "25 mins",
      "href": "/"
    },
    {
      "id": 6,
      "show": "Not by the Playbook",
      "title": "World Cup Winners",
      "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjO2g88-6yPjrIyI2QLrqPdm79LvmVpv2QZFN68AsoHg&s=10",
      "duration": "55 mins",
      "href": "/"
    },
    {
      "id": 7,
      "show": "The Wayne Rooney Podcast",
      "title": "Should England Start Tuchel?",
      "imageUrl": "https://picsum.photos/400?random=107",
      "duration": "41 mins",
      "href": "/"
    },
    {
      "id": 8,
      "show": "BBC Sounds",
      "title": "Can Spain Defend Their World Cup Crown?",
      "imageUrl": "https://picsum.photos/400?random=108",
      "duration": "36 mins",
      "href": "/"
    }
  ],
  "moreNewsHero": {
    "section": "MORE NEWS",
    "title": "A quiet wedding, two decades in the making",
    "summary": "A couple who first met twenty years ago exchange vows in a small garden ceremony surrounded by close family.",
    "imageUrl": "https://picsum.photos/seed/bbc-more-featured/700/500",
    "href": "/",
    "category": "Culture",
    "timestamp": "18 hrs ago"
  },
  "moreNewsMiddle": [
    {
      "id": "more-mid-1",
      "title": "Round three tee times: leaders chased as conditions toughen",
      "summary": "Follow live text updates and commentary as the third round of the tournament gets under way.",
      "imageUrl": "https://picsum.photos/seed/bbc-more-mid-1/300/200",
      "href": "/",
      "live": false,
      "category": "Golf",
      "timestamp": "Live now"
    },
    {
      "id": "more-mid-2",
      "title": "Qualifying top-ten shootout comes down to the wire",
      "summary": "Follow live text updates and commentary as qualifying concludes ahead of race day.",
      "imageUrl": "https://picsum.photos/seed/bbc-more-mid-2/300/200",
      "href": "/",
      "live": true,
      "category": "Motorsport",
      "timestamp": "Live now"
    },
    {
      "id": "more-mid-3",
      "title": "Authorities say cause of mass illness at popular resort remains inconclusive",
      "summary": "Officials say testing so far has not identified a single common source among the reported cases.",
      "imageUrl": "https://picsum.photos/seed/bbc-more-left-2/200/150",
      "href": "/",
      "live": true,
      "category": "World",
      "timestamp": "10 hrs ago"
    }
  ],
  "moreNewsRight": [
    {
      "id": "more-right-1",
      "title": "The harrowing reality behind a major tournament exit",
      "summary": "During major tournaments, researchers say some women and girls live in fear, as reported domestic abuse rises around high-profile matches.",
      "imageUrl": "https://picsum.photos/seed/bbc-more-right-1/300/200",
      "href": "/",
      "timestamp": "11 hrs ago",
      "category": "World Cup"
    },
    {
      "id": "more-right-2",
      "title": "What one desert city can teach the world about tackling heat deaths",
      "summary": "A county with some of the hottest recorded temperatures in the country has still reduced its number of heat-related deaths.",
      "href": "/",
      "timestamp": "21 hrs ago",
      "category": "US & Canada"
    },
    {
      "id": "more-right-3",
      "title": "The doomsday group that drew in the young and hopeful",
      "summary": "Led by a figure who claimed extraordinary origins, the group promised an elite following. Now, a former member is telling his story for the first time in a new documentary series on BBC Sounds and BBC iPlayer .",
      "href": "/",
      "timestamp": "2 days ago",
      "category": "Culture"
    }
  ],
  "navItems": [
    {
      "label": "Home",
      "hasChevron": false,
      "active": true
    },
    {
      "label": "News",
      "hasChevron": true
    },
    {
      "label": "Sport",
      "hasChevron": false
    },
    {
      "label": "Business",
      "hasChevron": true
    },
    {
      "label": "Technology",
      "hasChevron": true
    },
    {
      "label": "Health",
      "hasChevron": false
    },
    {
      "label": "Culture",
      "hasChevron": true
    },
    {
      "label": "Arts",
      "hasChevron": true
    },
    {
      "label": "Travel",
      "hasChevron": true
    },
    {
      "label": "Earth",
      "hasChevron": true
    },
    {
      "label": "Audio",
      "hasChevron": true
    },
    {
      "label": "Video",
      "hasChevron": true
    },
    {
      "label": "Live",
      "hasChevron": true
    },
    {
      "label": "Weather",
      "hasChevron": false
    },
    {
      "label": "Newsletters",
      "hasChevron": false
    }
  ],
  "newsFeatured": {
    "id": "featured-1",
    "title": "Trade delegations agree to extend tariff truce as talks continue into new year",
    "summary": "Negotiators drop a 24-hour-old threat to reinstate duties as both sides continue working toward a longer-term settlement.",
    "imageUrl": "https://picsum.photos/seed/bbc-news-featured/900/600",
    "href": "/",
    "category": "World",
    "timestamp": "4 hrs ago"
  },
  "newsLeftColumn": [
    {
      "id": "left-1",
      "title": "Coalition government faces confidence vote after budget dispute",
      "summary": "The standoff marks the latest twist in a disagreement that has now lasted more than four months.",
      "imageUrl": "https://picsum.photos/seed/bbc-news-left-1/500/375",
      "category": "World",
      "timestamp": "49 mins ago",
      "href": "/"
    },
    {
      "id": "left-2",
      "title": "Underdog nation stuns favourites to reach tournament final",
      "summary": "A dominant second-half display sealed a place in the final for the first time in the country’s history.",
      "imageUrl": "https://picsum.photos/seed/bbc-news-left-2/500/375",
      "href": "/",
      "category": "Sport",
      "timestamp": "4 hrs ago"
    }
  ],
  "newsRightColumn": [
    {
      "id": "right-1",
      "title": "What investigators know so far about the warehouse fire",
      "summary": "Officials say the blaze, which broke out overnight, is being treated as unexplained pending further inquiries.",
      "href": "/",
      "category": "UK",
      "timestamp": "4 hrs ago",
      "isVideo": true
    },
    {
      "id": "right-2",
      "title": "Veteran broadcaster reveals health diagnosis in new interview",
      "summary": "The 75-year-old says the condition was caught early and treatment is already under way.",
      "href": "/",
      "category": "Culture",
      "timestamp": "2 hrs ago"
    },
    {
      "id": "right-3",
      "title": "Prominent investor ends decade-long charitable partnership",
      "summary": "The announcement comes weeks after unrelated governance concerns were raised about the receiving foundation.",
      "href": "/",
      "category": "Business",
      "timestamp": "6 hrs ago"
    },
    {
      "id": "right-4",
      "title": "Police reclassify high-profile case as targeted attack",
      "summary": "Investigators say a warrant has been obtained to continue holding a suspect for further questioning.",
      "href": "/",
      "category": "UK",
      "timestamp": "6 hrs ago"
    }
  ],
  "socialLinks": {
    "x": {
      "News": "https://www.x.com/bbcworld",
      "Breaking": "https://www.x.com/bbcbreaking",
      "Sport": "https://www.x.com/bbcsport",
      "Earth": "https://www.x.com/bbcearth",
      "Travel": "https://www.x.com/bbc_travel",
      "Culture": "https://www.x.com/bbc_culture",
      "Audio": "https://x.com/bbcpodcasts?lang=en",
      "Select": "https://www.x.com/bbcselect"
    },
    "facebook": {
      "News": "https://www.facebook.com/bbcnews",
      "Breaking": "https://www.facebook.com/bbcnews",
      "Sport": "https://www.facebook.com/bbcsport",
      "Earth": "https://www.facebook.com/bbcearth",
      "Travel": "https://www.facebook.com/bbctravel",
      "Culture": "https://www.facebook.com/bbcculture",
      "Audio": "https://www.facebook.com/BBCPodcasts",
      "Select": "https://www.facebook.com/bbcselect",
      "BBC Global": "https://www.facebook.com/BBCGlobalFB"
    },
    "instagram": {
      "News": "https://www.instagram.com/bbcnews",
      "Breaking": "https://www.instagram.com/bbcnews",
      "Sport": "https://www.instagram.com/bbcsport",
      "Earth": "https://www.instagram.com/bbcearth",
      "Travel": "https://www.instagram.com/bbc_travel",
      "Culture": "https://www.instagram.com/bbc_culture",
      "Audio": "https://www.instagram.com/bbcpodcasts",
      "Select": "https://www.instagram.com/bbcselect",
      "BBC Global": "https://www.instagram.com/bbcglobal"
    },
    "tiktok": {
      "News": "https://www.tiktok.com/@bbcnews",
      "Breaking": "https://www.tiktok.com/@bbcnews",
      "Sport": "https://www.tiktok.com/@bbcsport",
      "Earth": "https://www.tiktok.com/@bbcearth"
    },
    "linkedin": {
      "News": "https://www.tiktok.com/@bbcnews",
      "Breaking": "https://www.tiktok.com/@bbcnews"
    },
    "youtube": {
      "News": "https://www.youtube.com/bbcnews",
      "Breaking": "https://www.youtube.com/bbcnews",
      "Sport": "https://www.youtube.com/bbcsport",
      "Earth": "https://www.youtube.com/bbcnews",
      "Select": "https://www.youtube.com/bbcselect",
      "BBC Global": "https://www.youtube.com/@bbc_global"
    }
  },
  "travel": [
    {
      "id": "Dubrovnik",
      "section": "Travel",
      "title": "An epic Dubrovnik journey that ditches the crowds",
      "summary": "Dubrovnik has long been one of Europe's most over-touristed destinations. Now, a new Camino footpath is revealing a different side of the city beyond its medieval walls.",
      "imageUrl": "https://ichef.bbci.co.uk/images/ic/800xn/p0ny3w4r.jpg.webp",
      "href": "/"
    }
  ],
  "variousInfo": [
    {
      "id": "us-canada",
      "topic": "US & Canada News",
      "href": "/us-canada",
      "featured": {
        "id": "us-canada-featured",
        "title": "Heavy smoke prompts air quality warnings across major cities",
        "summary": "Officials in several states say pollution levels have reached their highest point this year as wildfire smoke drifts across the border.",
        "imageUrl": "https://picsum.photos/seed/bbc-vi-us-1/400/250",
        "href": "/us-canada/heavy-smoke-prompts-air-quality-warnings"
      },
      "items": [
        {
          "id": "us-canada-1",
          "title": "Three cities top list of most polluted as wildfire season continues",
          "href": "/us-canada/most-polluted-cities"
        },
        {
          "id": "us-canada-2",
          "title": "Veteran senator announces plans to retire at end of term",
          "href": "/us-canada/senator-retirement"
        },
        {
          "id": "us-canada-3",
          "title": "Court ruling reshapes decades-old immigration policy",
          "href": "/us-canada/immigration-policy-ruling"
        }
      ]
    },
    {
      "id": "world",
      "topic": "More World News",
      "href": "/world",
      "featured": {
        "id": "world-featured",
        "title": "Protest group organizes march demanding education reforms",
        "summary": "Organizers say the demonstration is intended to pressure lawmakers ahead of a key parliamentary vote.",
        "imageUrl": "https://picsum.photos/seed/bbc-vi-world-1/400/250",
        "href": "/world/education-reform-protests"
      },
      "items": [
        {
          "id": "world-1",
          "title": "Veteran actor known for decades of stage work dies aged 90",
          "isVideo": true,
          "href": "/world/veteran-actor-dies"
        },
        {
          "id": "world-2",
          "title": "New border system triples wait times at busy crossing points",
          "href": "/world/border-system-delays"
        },
        {
          "id": "world-3",
          "title": "Flooding damages festival preparations in coastal region",
          "isVideo": true,
          "href": "/world/flooding-damages-festival"
        }
      ]
    },
    {
      "id": "business",
      "topic": "Business",
      "href": "/business",
      "featured": {
        "id": "business-featured",
        "title": "Utility lenders prepare legal challenge over nationalisation plan",
        "summary": "Creditors say they would pursue full repayment of outstanding debts in the event ownership is transferred to the state.",
        "imageUrl": "https://picsum.photos/seed/bbc-vi-biz-1/400/250",
        "href": "/business/utility-nationalisation"
      },
      "items": [
        {
          "id": "business-1",
          "title": "Is a new era coming for the country's energy sector?",
          "href": "/business/energy-sector"
        },
        {
          "id": "business-2",
          "title": "Why a major steelmaker was brought under state control",
          "isVideo": true,
          "href": "/business/steelmaker-state-control"
        },
        {
          "id": "business-3",
          "title": "Foreign firm seeks compensation over nationalisation dispute",
          "href": "/business/nationalisation-dispute"
        }
      ]
    },
    {
      "id": "technology",
      "topic": "Technology",
      "href": "/technology",
      "featured": {
        "id": "technology-featured",
        "title": "How fitness apps may be sharing more data than users realize",
        "summary": "New research examines which popular apps limit third-party data sharing, and which do not.",
        "imageUrl": "https://picsum.photos/seed/bbc-vi-tech-1/400/250",
        "href": "/technology/fitness-app-data-sharing"
      },
      "items": [
        {
          "id": "technology-1",
          "title": "Five ways to help kids build healthier screen habits",
          "href": "/technology/healthy-screen-habits"
        },
        {
          "id": "technology-2",
          "title": "Is a long-awaited game remake worth the wait?",
          "href": "/technology/game-remake"
        },
        {
          "id": "technology-3",
          "title": "One of these faces isn't real. Can you tell which?",
          "isVideo": true,
          "href": "/technology/ai-generated-faces"
        }
      ]
    }
  ],
  "watchSection": {
    "topic": "Watch",
    "href": "/watch",
    "featured": {
      "id": 1,
      "title": "Inside Troy, the legendary city of the Trojan War",
      "summary": "The BBC goes behind the scenes to uncover treasures that could point to the conflict immortalised by Homer.",
      "imageUrl": "https://picsum.photos/1200/700?random=300",
      "href": "/watch/troy",
      "buttonText": "See more"
    }
  },
  "worldCupHero": {
    "section": "WORLD CUP",
    "title": "England must improve before knockout stage",
    "summary": "The Lionesses secured qualification, but there are still questions about performances heading into the knockout rounds.",
    "imageUrl": "https://picsum.photos/800/500",
    "href": "/"
  },
  "worldCupStories": [
    {
      "id": 1,
      "title": "The making of a modern great — a tournament retrospective",
      "summary": "A veteran forward chasing a second major title looks back on a career defined by relentless work rate and big-match temperament.",
      "imageUrl": "https://picsum.photos/seed/bbc-related-1/500/375",
      "href": "/"
    },
    {
      "id": 2,
      "title": "Increased security planned for high-profile semi-final tie",
      "summary": "Organizers say additional measures will be in place for Wednesday's high-stakes semi-final between two of the tournament's form sides.",
      "imageUrl": "https://picsum.photos/seed/bbc-related-2/500/375",
      "href": "/"
    },
    {
      "id": 3,
      "title": "Striker says ban controversy added extra edge before big game",
      "summary": "The forward, whose one-match suspension was lifted just before kickoff, said the incident brought added tension to the squad.",
      "imageUrl": "https://picsum.photos/seed/bbc-related-3/500/375",
      "href": "/"
    }
  ]
};

function authenticateToken(req, res, next) {
  const token = req.cookies.token ;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admins only' });
  }
  next();
}


app.get('/api/verify', authenticateToken, (req, res) => {
  res.json({ valid: true,role: req.user.role });
});

app.get('/api/content', (req, res) => {
  res.json(content);
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.cookie('token', token,
     { httpOnly: true, 
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 
    });

  res.json({ success: true,token,role: user.role });
});

app.get('/api/content/:section', (req, res) => {
  const { section } = req.params;
  if (!(section in content)) {
    return res.status(404).json({ error: `Unknown content section: ${section}` });
  }
  res.json(content[section]);
});

app.get('/api/articles', async (req, res) => {
  const result = await pool.query('SELECT * FROM articles ORDER BY id DESC');
  res.json(result.rows);
});

app.get('/api/articles/:id', async (req, res) => {
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [req.params.id]);
    const article = result.rows[0];
    
    if(!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
})

app.post('/api/articles', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { title, summary, content } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const imageUrl = req.file.filename;

    if (!title || !summary || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      'INSERT INTO articles (title, summary, "imageUrl", content) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, summary, imageUrl, content]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});
app.put('/api/articles/:id', authenticateToken, upload.single('image'), async (req, res) => {
  const { title, summary,content } = req.body;

  let imageUrl;
  if (req.file) {
    const existing = await pool.query('SELECT "imageUrl" FROM articles WHERE id = $1', [req.params.id]);
    const oldImage = existing.rows[0]?.imageUrl;
    if (oldImage) {
      await unlink(`uploads/${oldImage}`).catch(() => {});
    }
    imageUrl = req.file.filename;
  } else {
    const existing = await pool.query('SELECT "imageUrl" FROM articles WHERE id = $1', [req.params.id]);
    imageUrl = existing.rows[0].imageUrl;
  }

  const result = await pool.query(
    'UPDATE articles SET title = $1, summary = $2, "imageUrl" = $3,"content" = $4 WHERE id = $5 RETURNING *',
    [title, summary, imageUrl, content, req.params.id]
  );
  res.json(result.rows[0]);
});

app.delete('/api/articles/:id', authenticateToken, async (req, res) => {
  const existing = await pool.query('SELECT "imageUrl" FROM articles WHERE id = $1', [req.params.id]);
  const article = existing.rows[0];

  if (article && article.imageUrl) {
    await unlink(`uploads/${article.imageUrl}`).catch(() => {});
  }

  await pool.query('DELETE FROM articles WHERE id = $1', [req.params.id]);
  res.json({ success: true });
});

app.get('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  const result = await pool.query("SELECT id, email, role FROM users WHERE role = 'writer' ORDER BY id DESC");
  res.json(result.rows);
});

app.post('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(

    'INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id,email,role',
    [email, hashedPassword,'writer']
  );
  res.json(result.rows[0]);
});

app.delete('/api/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  await pool.query("DELETE FROM users WHERE id = $1 AND role = 'writer'", [req.params.id]);
  res.json({ success: true });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Content API running at http://localhost:${PORT}`);
  console.log(`Try: http://localhost:${PORT}/api/content`);
});