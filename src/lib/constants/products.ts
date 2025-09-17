// src/constants/products.ts

import { Product } from "../types";

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
      {id: 1, name: "John D.", rating: 5, comment: "Absolutely stunning picture quality. The best TV I've ever owned.", helpful: 15}, 
      {id: 2, name: "Jane S.", rating: 4, comment: "Great for gaming, but the smart TV interface can be a bit sluggish at times.", helpful: 8}
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
      {id: 3, name: "Alex G.", rating: 5, comment: "Incredible camera and battery life. Worth every penny.", helpful: 22}, 
      {id: 4, name: "Beth C.", rating: 5, comment: "Super fast and the display is gorgeous. Highly recommend!", helpful: 30}
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
      {id: 5, name: "Chris P.", rating: 4, comment: "Powerful and portable, but I wish it had more ports.", helpful: 1}
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
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1546435770-a3e426bf4022?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop"
    ], 
    description: "Immerse yourself in pure sound with industry-leading noise cancellation and high-resolution audio.", 
    reviews: [
      {id: 6, name: "Diana R.", rating: 5, comment: "The noise cancellation is magic. Perfect for flights.", helpful: 45}
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
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1580327372025-3e6d2d104a3a?q=80&w=800&auto=format&fit=crop"
    ], 
    description: "Next-generation gaming with lightning-fast load times, 8K graphics, and an immersive haptic feedback controller.", 
    reviews: [
      {id: 7, name: "Ethan F.", rating: 5, comment: "A true next-gen experience. The graphics are mind-blowing.", helpful: 100}
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
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1596733353266-83a81d834246?q=80&w=800&auto=format&fit=crop"
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
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1527977966376-94a862543534?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?q=80&w=800&auto=format&fit=crop"
    ], 
    description: "Capture stunning 4K aerial footage with a 3-axis gimbal, 30-minute flight time, and intelligent obstacle avoidance.", 
    reviews: [
      {id: 8, name: "Frank T.", rating: 5, comment: "Stable, responsive, and the video quality is professional-grade.", helpful: 20}
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
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1579586337278-35d9addb018d?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1523182142399-6c3f3a435ae4?q=80&w=800&auto=format&fit=crop"
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
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=800&auto=format&fit=crop"
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
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1623152097460-a2311f58a536?q=80&w=800&auto=format&fit=crop"
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
      "https://images.unsplash.com/photo-1598368542132-d63999884045?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1616701314457-379f6b453347?q=80&w=800&auto=format&fit=crop"
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
      "https://images.unsplash.com/photo-1615595593922-a7e66f6a7e25?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1527814223725-ed2a02258b69?q=80&w=800&auto=format&fit=crop"
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
      {id: 9, name: "Greg M.", rating: 5, comment: "The picture quality is simply incredible. Worth every penny.", helpful: 12}
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
      {id: 10, name: "Hannah K.", rating: 4, comment: "Perfect size for small hands, but battery life could be better.", helpful: 8}
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
      {id: 11, name: "Ian L.", rating: 5, comment: "Runs all the latest games on ultra settings without any issues.", helpful: 25}
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
      {id: 12, name: "Jessica M.", rating: 4, comment: "Great sound quality and battery life, but the case is a bit bulky.", helpful: 15}
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
      {id: 13, name: "Kevin N.", rating: 4, comment: "Comfortable to wear for long sessions and the tracking is very accurate.", helpful: 9}
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
      {id: 14, name: "Lisa O.", rating: 5, comment: "Cut my energy bill by 20% and it's so convenient to control from my phone.", helpful: 32}
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
      {id: 15, name: "Mike P.", rating: 4, comment: "Great for beginners and the video quality is surprisingly good for the size.", helpful: 7}
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
      {id: 16, name: "Nancy Q.", rating: 5, comment: "Perfect for tracking my runs and the battery lasts for days.", helpful: 18}
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
      {id: 17, name: "Oscar R.", rating: 5, comment: "Game-changing for multitasking and the curve is perfect for immersion.", helpful: 14}
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
      {id: 18, name: "Paula S.", rating: 5, comment: "Transformed my living room into a home theater. The bass is incredible.", helpful: 21}
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
      {id: 19, name: "Quincy T.", rating: 4, comment: "Great build quality and the customization options are endless.", helpful: 11}
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
      {id: 20, name: "Rachel U.", rating: 4, comment: "Love being able to change the lighting for different occasions with my voice.", helpful: 16}
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
      {id: 21, name: "Steve V.", rating: 5, comment: "Unbelievable speed and responsiveness. Worth every penny for serious racers.", helpful: 9}
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
      {id: 22, name: "Tina W.", rating: 5, comment: "Elegant design with all the smart features. Gets compliments everywhere I go.", helpful: 7}
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
      {id: 23, name: "Ulysses X.", rating: 5, comment: "Buttery smooth gameplay with no tearing or stuttering. Perfect for competitive gaming.", helpful: 28}
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
      {id: 24, name: "Victoria Y.", rating: 4, comment: "Amazing sound and battery life, very comfortable for long listening sessions.", helpful: 19}
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
      {id: 25, name: "William Z.", rating: 4, comment: "Great tactile feedback and the RGB customization is fantastic.", helpful: 13}
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
      {id: 26, name: "Xander A.", rating: 4, comment: "Crystal clear video quality and the motion alerts work perfectly.", helpful: 17}
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
      {id: 27, name: "Yvonne B.", rating: 5, comment: "Incredible tool for our surveying business. The thermal imaging has been invaluable.", helpful: 6}
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
      {id: 28, name: "Zachary C.", rating: 5, comment: "Survived hiking, swimming, and everything I've thrown at it. The GPS is super accurate.", helpful: 15}
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
      {id: 29, name: "Amanda D.", rating: 4, comment: "Game-changer for working on the go. Fits perfectly in my laptop bag.", helpful: 9}
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
      {id: 30, name: "Brian E.", rating: 4, comment: "Big sound from a small package. Much better than my TV's built-in speakers.", helpful: 12}
    ] 
  }
];