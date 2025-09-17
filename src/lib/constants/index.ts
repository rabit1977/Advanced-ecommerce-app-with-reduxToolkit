import { Product } from "@/lib/types";

export const initialProducts: Product[] = [
  { 
    id: "sku-123", 
    title: "Quantum QLED 65\" TV", 
    brand: "AuroVision", 
    price: 1299, 
    rating: 4.6, 
    reviewCount: 287, 
    category: "TVs", 
    stock: 5, 
    description: "Blinding 2,500-nit peaks with 2,000+ local dimming zones, 144Hz VRR, Dolby Vision IQ & Dolby Atmos.", 
    images: ["https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=800&auto=format&fit=crop"],
    options: [
      {
        name: "Color",
        type: "color",
        variants: [
          { name: "Black", value: "#000", image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=800&auto=format&fit=crop" },
          { name: "Silver", value: "#C0C0C0", image: "https://images.unsplash.com/photo-1498661705887-3778d9ecb4ff?q=80&w=800&auto=format&fit=crop" },
        ]
      }
    ],
    reviews: [
      {id: '1', author: "John D.", rating: 5, title: "Stunning Picture", comment: "Absolutely stunning picture quality. The best TV I've ever owned.", helpful: 15, date: '2023-04-12T00:00:00.000Z'}, 
      {id: '2', author: "Jane S.", rating: 4, title: "Great for Gaming", comment: "Great for gaming, but the smart TV interface can be a bit sluggish at times.", helpful: 8, date: '2023-04-10T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-456", 
    title: "NebulaPhone 12 Pro", 
    brand: "Stellar", 
    price: 999, 
    rating: 4.8, 
    reviewCount: 1245, 
    category: "Phones", 
    stock: 12, 
    description: "The next generation of mobile computing with the A19 Bionic chip and a revolutionary triple-camera system.", 
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop"],
    options: [
      {
        name: "Color",
        type: "color",
        variants: [
          { name: "Graphite", value: "#36454F", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop" },
          { name: "Gold", value: "#FFD700", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop" },
        ]
      },
      {
        name: "Storage",
        type: "size",
        variants: [
          { name: "128GB", value: "128GB" },
          { name: "256GB", value: "256GB" },
          { name: "512GB", value: "512GB" },
        ]
      }
    ],
    reviews: [
      {id: '3', author: "Alex G.", rating: 5, title: "Incredible Camera", comment: "Incredible camera and battery life. Worth every penny.", helpful: 22, date: '2023-05-20T00:00:00.000Z'}, 
      {id: '4', author: "Beth C.", rating: 5, title: "Gorgeous Display", comment: "Super fast and the display is gorgeous. Highly recommend!", helpful: 30, date: '2023-05-18T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-789", 
    title: "AeroBook UltraThin", 
    brand: "Zenith", 
    price: 1499, 
    rating: 4.5, 
    reviewCount: 450, 
    category: "Laptops", 
    stock: 0, 
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop"
    ], 
    description: "Unparalleled performance in an impossibly thin design, featuring the powerful M3 Pro chip.", 
    reviews: [
      {id: '5', author: "Chris P.", rating: 4, title: "Almost Perfect", comment: "Powerful and portable, but I wish it had more ports.", helpful: 1, date: '2023-06-01T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-101", 
    title: "SoundScape Pro Headphones", 
    brand: "EchoWave", 
    price: 349, 
    rating: 4.7, 
    reviewCount: 892, 
    category: "Audio", 
    stock: 20, 
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
    ], 
    description: "Immerse yourself in pure sound with industry-leading noise cancellation and high-resolution audio.", 
    reviews: [
      {id: '6', author: "Diana R.", rating: 5, title: "Magic Noise Cancellation", comment: "The noise cancellation is magic. Perfect for flights.", helpful: 45, date: '2023-03-22T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-212", 
    title: "Vortex Gaming Console", 
    brand: "Nexus", 
    price: 499, 
    rating: 4.9, 
    reviewCount: 2150, 
    category: "Gaming", 
    stock: 1, 
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop"
    ], 
    description: "Next-generation gaming with lightning-fast load times, 8K graphics, and an immersive haptic feedback controller.", 
    reviews: [
      {id: '7', author: "Ethan F.", rating: 5, title: "A True Next-Gen Experience", comment: "A true next-gen experience. The graphics are mind-blowing.", helpful: 100, date: '2023-02-15T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-333", 
    title: "Aura Smart Hub", 
    brand: "HomeSphere", 
    price: 129, 
    rating: 4.4, 
    reviewCount: 312, 
    category: "Smart Home", 
    stock: 8, 
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=800&auto=format&fit=crop"
    ], 
    description: "The central nervous system for your smart home. Control lights, thermostats, and security with your voice.", 
    reviews: [] 
  },
  { 
    id: "sku-414", 
    title: "SkyRider Pro Drone", 
    brand: "AeroGlide", 
    price: 799, 
    rating: 4.6, 
    reviewCount: 189, 
    category: "Drones", 
    stock: 3, 
    images: [
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Capture stunning 4K aerial footage with a 3-axis gimbal, 30-minute flight time, and intelligent obstacle avoidance.", 
    reviews: [
      {id: '8', author: "Frank T.", rating: 5, title: "Professional-Grade Video", comment: "Stable, responsive, and the video quality is professional-grade.", helpful: 20, date: '2023-07-05T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-555", 
    title: "ChronoWatch Series 8", 
    brand: "Momentum", 
    price: 429, 
    rating: 4.7, 
    reviewCount: 980, 
    category: "Wearables", 
    stock: 15, 
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
    ],
    description: "The ultimate smartwatch for a healthy life. Track your workouts, monitor your health, and stay connected on the go.", 
    reviews: [] 
  },
  { 
    id: "sku-678", 
    title: "PixelFrame 4K Monitor", 
    brand: "Clarity", 
    price: 649, 
    rating: 4.8, 
    reviewCount: 250, 
    category: "Monitors", 
    stock: 6, 
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop"
    ],
    description: "A stunning 27-inch 4K display with incredible color accuracy, perfect for creative professionals and gamers.", 
    reviews: [] 
  },
  { 
    id: "sku-888", 
    title: "EchoBar+ Soundbar", 
    brand: "EchoWave", 
    price: 279, 
    rating: 4.5, 
    reviewCount: 550, 
    category: "Audio", 
    stock: 0, 
    images: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Cinematic sound for your living room. Dolby Atmos support and a wireless subwoofer deliver immersive audio.", 
    reviews: [] 
  },
  { 
    id: "sku-901", 
    title: "StreamCam Pro", 
    brand: "Logi", 
    price: 169, 
    rating: 4.6, 
    reviewCount: 720, 
    category: "Accessories", 
    stock: 10, 
    images: [
      "https://images.unsplash.com/photo-1598368542132-d63999884045?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Full HD 1080p webcam designed for professional streaming with smart auto-focus and exposure.", 
    reviews: [] 
  },
  { 
    id: "sku-911", 
    title: "ErgoMouse Vertical", 
    brand: "Zenith", 
    price: 99, 
    rating: 4.7, 
    reviewCount: 410, 
    category: "Accessories", 
    stock: 2, 
    images: [
      "https://images.unsplash.com/photo-1615595593922-a7e66f6a7e25?q=80&w=800&auto=format&fit=crop"
    ], 
    description: "A scientific ergonomic design that encourages a natural handshake wrist and arm posture for healthier computing.", 
    reviews: [] 
  },
  { 
    id: "sku-112", 
    title: "Quantum 85\" 8K TV", 
    brand: "AuroVision", 
    price: 2499, 
    rating: 4.9, 
    reviewCount: 156, 
    category: "TVs", 
    stock: 4, 
    images: [
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Experience breathtaking 8K resolution with quantum dot technology and AI-powered upscaling.", 
    reviews: [
      {id: '9', author: "Greg M.", rating: 5, title: "Incredible Picture", comment: "The picture quality is simply incredible. Worth every penny.", helpful: 12, date: '2023-08-01T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-223", 
    title: "NebulaPhone 12 Mini", 
    brand: "Stellar", 
    price: 799, 
    rating: 4.5, 
    reviewCount: 345, 
    category: "Phones", 
    stock: 7, 
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop"
    ],
    description: "All the power of NebulaPhone 12 Pro in a compact, pocket-friendly design.", 
    reviews: [
      {id: '10', author: "Hannah K.", rating: 4, title: "Perfect Size", comment: "Perfect size for small hands, but battery life could be better.", helpful: 8, date: '2023-08-02T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-334", 
    title: "AeroBook Gaming Pro", 
    brand: "Zenith", 
    price: 1899, 
    rating: 4.7, 
    reviewCount: 623, 
    category: "Laptops", 
    stock: 9, 
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Extreme gaming performance with RTX 4070 graphics, 16GB RAM, and 240Hz refresh rate display.", 
    reviews: [
      {id: '11', author: "Ian L.", rating: 5, title: "Gaming Beast", comment: "Runs all the latest games on ultra settings without any issues.", helpful: 25, date: '2023-08-03T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-445", 
    title: "SoundScape Wireless Earbuds", 
    brand: "EchoWave", 
    price: 199, 
    rating: 4.4, 
    reviewCount: 876, 
    category: "Audio", 
    stock: 25, 
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop"
    ],
    description: "True wireless earbuds with active noise cancellation and 24-hour battery life.", 
    reviews: [
      {id: '12', author: "Jessica M.", rating: 4, title: "Great Sound, Bulky Case", comment: "Great sound quality and battery life, but the case is a bit bulky.", helpful: 15, date: '2023-08-04T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-556", 
    title: "Vortex VR Headset", 
    brand: "Nexus", 
    price: 349, 
    rating: 4.3, 
    reviewCount: 432, 
    category: "Gaming", 
    stock: 11, 
    images: [
      "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Immerse yourself in virtual worlds with high-resolution displays and precise motion tracking.", 
    reviews: [
      {id: '13', author: "Kevin N.", rating: 4, title: "Accurate Tracking", comment: "Comfortable to wear for long sessions and the tracking is very accurate.", helpful: 9, date: '2023-08-05T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-667", 
    title: "Aura Smart Thermostat", 
    brand: "HomeSphere", 
    price: 199, 
    rating: 4.6, 
    reviewCount: 765, 
    category: "Smart Home", 
    stock: 18, 
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Learn your schedule and preferences to automatically optimize your home's temperature and save energy.", 
    reviews: [
      {id: '14', author: "Lisa O.", rating: 5, title: "Energy Saver!", comment: "Cut my energy bill by 20% and it's so convenient to control from my phone.", helpful: 32, date: '2023-08-06T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-778", 
    title: "SkyRider Mini Drone", 
    brand: "AeroGlide", 
    price: 299, 
    rating: 4.2, 
    reviewCount: 234, 
    category: "Drones", 
    stock: 14, 
    images: [
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Compact drone with 4K camera, perfect for travel and beginners. Folds to pocket size.", 
    reviews: [
      {id: '15', author: "Mike P.", rating: 4, title: "Great for Beginners", comment: "Great for beginners and the video quality is surprisingly good for the size.", helpful: 7, date: '2023-08-07T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-889", 
    title: "ChronoWatch Fitness Edition", 
    brand: "Momentum", 
    price: 299, 
    rating: 4.5, 
    reviewCount: 567, 
    category: "Wearables", 
    stock: 22, 
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Focus on fitness with advanced workout tracking, GPS, and heart rate monitoring.", 
    reviews: [
      {id: '16', author: "Nancy Q.", rating: 5, title: "Perfect for Runners", comment: "Perfect for tracking my runs and the battery lasts for days.", helpful: 18, date: '2023-08-08T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-990", 
    title: "PixelFrame Ultrawide Monitor", 
    brand: "Clarity", 
    price: 899, 
    rating: 4.7, 
    reviewCount: 189, 
    category: "Monitors", 
    stock: 5, 
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop"
    ],
    description: "49-inch ultrawide curved monitor with 5120x1440 resolution for immersive productivity and gaming.", 
    reviews: [
      {id: '17', author: "Oscar R.", rating: 5, title: "Game-Changer", comment: "Game-changing for multitasking and the curve is perfect for immersion.", helpful: 14, date: '2023-08-09T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-1001", 
    title: "Quantum Sound 7.1 System", 
    brand: "EchoWave", 
    price: 599, 
    rating: 4.8, 
    reviewCount: 321, 
    category: "Audio", 
    stock: 6, 
    images: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800&auto=format&fit=crop"
    ],
    description: "7.1 channel surround sound system with wireless rear speakers and powerful subwoofer.", 
    reviews: [
      {id: '18', author: "Paula S.", rating: 5, title: "Incredible Bass", comment: "Transformed my living room into a home theater. The bass is incredible.", helpful: 21, date: '2023-08-10T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-1112", 
    title: "Vortex Game Controller Pro", 
    brand: "Nexus", 
    price: 89, 
    rating: 4.6, 
    reviewCount: 654, 
    category: "Gaming", 
    stock: 30, 
    images: [
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Professional gaming controller with customizable buttons, triggers, and haptic feedback.", 
    reviews: [
      {id: '19', author: "Quincy T.", rating: 4, title: "Great Build Quality", comment: "Great build quality and the customization options are endless.", helpful: 11, date: '2023-08-11T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-1223", 
    title: "Aura Smart Lighting Kit", 
    brand: "HomeSphere", 
    price: 149, 
    rating: 4.5, 
    reviewCount: 432, 
    category: "Smart Home", 
    stock: 25, 
    images: [
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Color-changing smart bulbs with voice control and millions of colors to set the perfect mood.", 
    reviews: [
      {id: '20', author: "Rachel U.", rating: 4, title: "Fun and Convenient", comment: "Love being able to change the lighting for different occasions with my voice.", helpful: 16, date: '2023-08-12T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-1334", 
    title: "SkyRider Racing Drone", 
    brand: "AeroGlide", 
    price: 899, 
    rating: 4.7, 
    reviewCount: 98, 
    category: "Drones", 
    stock: 2, 
    images: [
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=800&auto=format&fit=crop"
    ],
    description: "High-speed racing drone with FPV capabilities, 120mph top speed, and competition-ready performance.", 
    reviews: [
      {id: '21', author: "Steve V.", rating: 5, title: "Unbelievable Speed", comment: "Unbelievable speed and responsiveness. Worth every penny for serious racers.", helpful: 9, date: '2023-08-13T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-1445", 
    title: "ChronoWatch Luxury Edition", 
    brand: "Momentum", 
    price: 899, 
    rating: 4.9, 
    reviewCount: 76, 
    category: "Wearables", 
    stock: 3, 
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Premium smartwatch with titanium case, sapphire crystal, and exclusive luxury watch faces.", 
    reviews: [
      {id: '22', author: "Tina W.", rating: 5, title: "Elegant and Smart", comment: "Elegant design with all the smart features. Gets compliments everywhere I go.", helpful: 7, date: '2023-08-14T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-1556", 
    title: "PixelFrame Gaming Monitor", 
    brand: "Clarity", 
    price: 799, 
    rating: 4.8, 
    reviewCount: 543, 
    category: "Monitors", 
    stock: 8, 
    images: [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=800&auto=format&fit=crop"
    ],
    description: "27-inch gaming monitor with 240Hz refresh rate, 1ms response time, and NVIDIA G-SYNC technology.", 
    reviews: [
      {id: '23', author: "Ulysses X.", rating: 5, title: "Buttery Smooth", comment: "Buttery smooth gameplay with no tearing or stuttering. Perfect for competitive gaming.", helpful: 28, date: '2023-08-15T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-1667", 
    title: "Quantum Sound Wireless Headphones", 
    brand: "EchoWave", 
    price: 299, 
    rating: 4.6, 
    reviewCount: 876, 
    category: "Audio", 
    stock: 15, 
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Wireless over-ear headphones with 40-hour battery life, premium materials, and exceptional sound quality.", 
    reviews: [
      {id: '24', author: "Victoria Y.", rating: 4, title: "Amazing Sound", comment: "Amazing sound and battery life, very comfortable for long listening sessions.", helpful: 19, date: '2023-08-16T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-1778", 
    title: "Vortex Gaming Keyboard", 
    brand: "Nexus", 
    price: 129, 
    rating: 4.5, 
    reviewCount: 765, 
    category: "Gaming", 
    stock: 20, 
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Mechanical gaming keyboard with RGB lighting, customizable macros, and Cherry MX switches.", 
    reviews: [
      {id: '25', author: "William Z.", rating: 4, title: "Great Tactile Feedback", comment: "Great tactile feedback and the RGB customization is fantastic.", helpful: 13, date: '2023-08-17T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-1889", 
    title: "Aura Security Camera", 
    brand: "HomeSphere", 
    price: 199, 
    rating: 4.4, 
    reviewCount: 432, 
    category: "Smart Home", 
    stock: 12, 
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=800&auto=format&fit=crop"
    ],
    description: "4K security camera with night vision, motion detection, and cloud storage for complete home security.", 
    reviews: [
      {id: '26', author: "Xander A.", rating: 4, title: "Crystal Clear Video", comment: "Crystal clear video quality and the motion alerts work perfectly.", helpful: 17, date: '2023-08-18T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-1990", 
    title: "SkyRider Enterprise Drone", 
    brand: "AeroGlide", 
    price: 2499, 
    rating: 4.9, 
    reviewCount: 45, 
    category: "Drones", 
    stock: 1, 
    images: [
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Professional enterprise drone with thermal imaging, 6K camera, and 45-minute flight time for commercial applications.", 
    reviews: [
      {id: '27', author: "Yvonne B.", rating: 5, title: "Incredible Tool", comment: "Incredible tool for our surveying business. The thermal imaging has been invaluable.", helpful: 6, date: '2023-08-19T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-2001", 
    title: "ChronoWatch Adventure Edition", 
    brand: "Momentum", 
    price: 499, 
    rating: 4.7, 
    reviewCount: 234, 
    category: "Wearables", 
    stock: 7, 
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Rugged smartwatch built for adventure with military-grade durability, built-in GPS, and extreme weather resistance.", 
    reviews: [
      {id: '28', author: "Zachary C.", rating: 5, title: "Built to Last", comment: "Survived hiking, swimming, and everything I've thrown at it. The GPS is super accurate.", helpful: 15, date: '2023-08-20T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-2112", 
    title: "PixelFrame Portable Monitor", 
    brand: "Clarity", 
    price: 299, 
    rating: 4.4, 
    reviewCount: 187, 
    category: "Monitors", 
    stock: 11, 
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop"
    ],
    description: "15.6-inch portable USB-C monitor with 1080p resolution, perfect for mobile professionals and gamers.", 
    reviews: [
      {id: '29', author: "Amanda D.", rating: 4, title: "Game-Changer for Travel", comment: "Game-changer for working on the go. Fits perfectly in my laptop bag.", helpful: 9, date: '2023-08-21T00:00:00.000Z'}
    ] 
  },
  { 
    id: "sku-2223", 
    title: "Quantum Sound Soundbar Mini", 
    brand: "EchoWave", 
    price: 149, 
    rating: 4.3, 
    reviewCount: 321, 
    category: "Audio", 
    stock: 18, 
    images: [
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Compact soundbar with virtual surround sound, Bluetooth connectivity, and easy TV setup.", 
    reviews: [
      {id: '30', author: "Brian E.", rating: 4, title: "Big Sound, Small Package", comment: "Big sound from a small package. Much better than my TV's built-in speakers.", helpful: 12, date: '2023-08-22T00:00:00.000Z'}
    ] 
  }
];
