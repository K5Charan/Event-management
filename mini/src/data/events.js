import marathonImg from '../Images/marathon.jpg';
import rockImg from '../Images/rock.jpg';
import melodyImg from '../Images/melody.jpg';
import fusionImg from '../Images/fusion.jpg';
import metropolisImg from '../Images/metropolis.jpg';
import rockFestImg from '../Images/rock-fest.jpg';
import rockIconsImg from '../Images/rock-icons.jpg';
import rockRevoltImg from '../Images/rock-revolt.jpg';
import classicRockImg from '../Images/classic-rock.jpg';
import artImg from '../Images/art.jpg';
import album1 from '../Images/album/album1.jpg';
import album2 from '../Images/album/album2.jpg';
import album3 from '../Images/album/album3.jpg';
import album4 from '../Images/album/album4.jpg';
import album5 from '../Images/album/album5.jpg';
import businessImg from '../Images/business.jpeg';
import comedyImg from '../Images/comedy.jpeg';
import danceImg from '../Images/dance.jpeg';
import passionImg from '../Images/passion.jpg';
import partyImg from '../Images/party.jpeg';
import musicImg from '../Images/Music.jpg';
import natuImg from '../Images/natu.jpeg';

export const eventData = {
    'urban-jungle-marathon': {
        title: 'Urban Jungle Marathon',
        date: '2025-04-15',
        description: 'Experience the thrill of running through the urban landscape of Hyderabad.',
        location: 'Hyderabad',
        startTime: '07:00 AM',
        duration: '4 hours',
        price: 4500,
        maxTickets: 4,
        category: 'Sports',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        images: [marathonImg, rockImg, melodyImg, fusionImg, metropolisImg, rockFestImg],
        heroImage: marathonImg,
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 4500 },
            { id: 'vip', name: 'VIP Entry', price: 8000 },
            { id: 'early', name: 'Early Bird', price: 3500 }
        ]
    },
    'rockin-stage': {
        title: 'Rockin\' the Stage',
        date: '2025-04-20',
        description: 'Get ready for an electrifying evening of rock music.',
        location: 'Hyderabad',
        startTime: '04:00 PM',
        duration: '5 hours',
        price: 6500,
        maxTickets: 4,
        category: 'Music',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        images: [rockImg, marathonImg, melodyImg, fusionImg, metropolisImg, rockFestImg],
        heroImage: rockImg,
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 6500 },
            { id: 'vip', name: 'VIP Access', price: 12000 },
            { id: 'backstage', name: 'Backstage Pass', price: 15000 }
        ]
    },
    'melody-mania': {
        title: 'Melody Mania',
        date: '2025-04-25',
        description: 'Join us for an evening of soulful melodies and enchanting music.',
        location: 'Hyderabad',
        startTime: '07:00 PM',
        duration: '4 hours',
        price: 0,
        maxTickets: 2,
        category: 'Music',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        images: [melodyImg, marathonImg, rockImg, fusionImg, metropolisImg, rockFestImg],
        heroImage: melodyImg,
        ticketTypes: [
            { id: 'regular', name: 'Free Entry', price: 0 },
            { id: 'premium', name: 'Premium Seating', price: 2000 }
        ]
    },
    'musical-fusion': {
        title: 'Musical Fusion Festival',
        date: '2025-05-01',
        description: 'Experience the unique blend of traditional and modern music.',
        location: 'Madhapur, Hyderabad',
        startTime: '06:00 PM',
        duration: '6 hours',
        price: 1500,
        maxTickets: 6,
        category: 'Music',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        images: [fusionImg, marathonImg, rockImg, melodyImg, metropolisImg, rockFestImg],
        heroImage: fusionImg,
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 1500 },
            { id: 'vip', name: 'VIP Experience', price: 3000 }
        ]
    },
    'metropolis-marathon': {
        title: 'Metropolis Marathon',
        date: '2025-05-07',
        description: 'Challenge yourself in this urban marathon through Hi-Tech city.',
        location: 'Hi-Tech city, Hyderabad',
        startTime: '06:00 AM',
        duration: '5 hours',
        price: 500,
        maxTickets: 8,
        category: 'Sports',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        images: [metropolisImg, marathonImg, rockImg, melodyImg, fusionImg, rockFestImg],
        heroImage: metropolisImg,
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 500 },
            { id: 'premium', name: 'Premium Kit', price: 1000 }
        ]
    },
    'rock-fest': {
        title: 'Rock Fest',
        date: '2025-05-15',
        description: 'A celebration of rock music with top artists.',
        location: 'Hyderabad',
        startTime: '05:00 PM',
        duration: '6 hours',
        price: 3500,
        maxTickets: 4,
        category: 'Music',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        images: [rockFestImg, marathonImg, rockImg, melodyImg, fusionImg, metropolisImg],
        heroImage: rockFestImg,
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 3500 },
            { id: 'vip', name: 'VIP Access', price: 6000 }
        ]
    },
    'rock-icons': {
        title: 'Rock Icons',
        date: '2025-05-22',
        description: 'Witness legendary rock artists perform live.',
        location: 'Hyderabad',
        startTime: '06:00 PM',
        duration: '5 hours',
        price: 4000,
        maxTickets: 4,
        category: 'Music',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        images: [rockIconsImg, marathonImg, rockImg, melodyImg, fusionImg, metropolisImg],
        heroImage: rockIconsImg,
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 4000 },
            { id: 'vip', name: 'VIP Experience', price: 8000 }
        ]
    },
    'rock-revolt': {
        title: 'Rock Revolt',
        date: '2025-05-10',
        description: 'Experience the revolution of rock music.',
        location: 'Hyderabad',
        startTime: '07:00 PM',
        duration: '5 hours',
        price: 3000,
        maxTickets: 4,
        category: 'Music',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        images: [rockRevoltImg, marathonImg, rockImg, melodyImg, fusionImg, metropolisImg],
        heroImage: rockRevoltImg,
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 3000 },
            { id: 'vip', name: 'VIP Access', price: 5000 }
        ]
    },
    'classic-rock': {
        title: 'Classic Rock Night',
        date: '2025-05-05',
        description: 'Relive the golden era of rock music.',
        location: 'Hyderabad',
        startTime: '08:00 PM',
        duration: '4 hours',
        price: 2500,
        maxTickets: 4,
        category: 'Music',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        images: [classicRockImg, marathonImg, rockImg, melodyImg, fusionImg, metropolisImg],
        heroImage: classicRockImg,
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 2500 },
            { id: 'vip', name: 'VIP Experience', price: 4500 }
        ]
    },
    'brushstrokes-beyond': {
        title: 'Brushstrokes & Beyond: An Oil Painting Odyssey',
        date: '2025-04-15',
        description: 'Immerse yourself in the world of oil painting with this unique artistic journey. Experience live demonstrations, interactive sessions, and witness the creation of masterpieces.',
        location: 'Hyderabad',
        startTime: '10:00 AM',
        duration: '6 hours',
        price: 2000,
        maxTickets: 30,
        category: 'Art',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        images: [artImg, album1, album2, album3, album4, album5],
        heroImage: artImg,
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 2000 },
            { id: 'vip', name: 'VIP Access (Includes Art Kit)', price: 3500 },
            { id: 'workshop', name: 'Workshop Pass', price: 5000 }
        ]
    },
    'business-summit': {
        id: 'business-summit',
        title: 'Global Business Summit 2025',
        date: '2025-05-20',
        startTime: '09:00 AM',
        duration: '8 hours',
        location: 'HICC, Hyderabad',
        price: 7500,
        maxTickets: 2,
        category: 'Business',
        coordinates: {
            lat: 17.4725,
            lng: 78.3725
        },
        description: "Join us for the Global Business Summit 2025, where industry leaders, entrepreneurs, and innovators come together to shape the future of business. This premier event features keynote speeches, panel discussions, and networking opportunities with some of the most influential figures in the global business community.",
        highlights: [
            "Keynote speeches from Fortune 500 CEOs",
            "Interactive panel discussions on emerging markets",
            "Networking sessions with industry leaders",
            "Exhibition area featuring latest business technologies",
            "Exclusive workshops on digital transformation"
        ],
        image: businessImg,
        heroImage: businessImg,
        albumImages: [album1, album2, album3, album4, album5],
        ticketTypes: [
            {
                name: "Regular",
                price: 7500,
                description: "Access to all keynote sessions and panel discussions"
            },
            {
                name: "VIP",
                price: 15000,
                description: "Premium seating, exclusive networking dinner, and workshop access"
            }
        ]
    },
    'comedy-night': {
        id: 'comedy-night',
        title: 'Laugh Out Loud Comedy Night',
        date: '2025-05-15',
        startTime: '08:00 PM',
        duration: '2.5 hours',
        location: 'Shilpakala Vedika, Hyderabad',
        price: 999,
        maxTickets: 4,
        category: 'Stand-up Comedy',
        coordinates: {
            lat: 17.4275,
            lng: 78.3425
        },
        description: "Get ready for a night of non-stop laughter with India's top comedians! Laugh Out Loud Comedy Night brings together the best stand-up talent for an evening of hilarious observations, witty commentary, and endless entertainment. Perfect for a fun night out with friends or family.",
        highlights: [
            "Performances by 4 top-rated comedians",
            "Mix of English and Hindi comedy",
            "Interactive crowd segments",
            "Pre-show meet and greet",
            "Exclusive merchandise available"
        ],
        image: comedyImg,
        heroImage: comedyImg,
        albumImages: [album1, album2, album3, album4, album5],
        ticketTypes: [
            {
                name: "Regular",
                price: 999,
                description: "Standard seating with full show access"
            },
            {
                name: "Premium",
                price: 1499,
                description: "Front row seating with meet & greet pass"
            },
            {
                name: "Group",
                price: 3499,
                description: "Package for 4 people with complimentary snacks"
            }
        ]
    },
    'dance-fusion': {
        id: 'dance-fusion',
        title: 'Rhythmic Fusion Dance Festival',
        date: '2025-05-05',
        startTime: '06:30 PM',
        duration: '3 hours',
        location: 'Ravindra Bharathi, Hyderabad',
        price: 1200,
        maxTickets: 3,
        category: 'Dance',
        coordinates: {
            lat: 17.4075,
            lng: 78.4725
        },
        description: "Experience the magic of dance at the Rhythmic Fusion Dance Festival! This spectacular event showcases a beautiful blend of classical and contemporary dance forms from across India and around the world. Witness stunning performances that push the boundaries of artistic expression through movement and music.",
        highlights: [
            "Fusion performances by renowned dance troupes",
            "Classical Indian dance showcases",
            "Contemporary international performances",
            "Live musical accompaniment",
            "Interactive dance workshop session"
        ],
        image: danceImg,
        heroImage: danceImg,
        albumImages: [album1, album2, album3, album4, album5],
        ticketTypes: [
            {
                name: "Standard",
                price: 1200,
                description: "Regular seating with show access"
            },
            {
                name: "Workshop Pass",
                price: 2000,
                description: "Show access plus interactive dance workshop participation"
            },
            {
                name: "Family Package",
                price: 3000,
                description: "Package for 3 people with premium seating"
            }
        ]
    },
    'passion-power': {
        id: 'passion-power',
        title: 'Passion Power: Dance & Motivation',
        date: '2025-05-30',
        startTime: '10:00 AM',
        duration: '6 hours',
        location: 'JRC Convention, Hyderabad',
        price: 2500,
        maxTickets: 2,
        category: 'Dance',
        coordinates: {
            lat: 17.4525,
            lng: 78.3825
        },
        description: "Transform your life through the power of dance at Passion Power! This electrifying event combines dance workshops with motivational sessions. Join professional dancers and choreographers for a day of movement, expression, and personal growth. Learn various dance styles while building confidence and unlocking your creative potential.",
        highlights: [
            "Dance workshops in multiple styles",
            "Choreography masterclasses",
            "Body movement and expression sessions",
            "Dance therapy workshops",
            "Performance opportunity at the end"
        ],
        image: passionImg,
        heroImage: passionImg,
        albumImages: [album1, album2, album3, album4, album5],
        ticketTypes: [
            {
                name: "Regular",
                price: 2500,
                description: "Full access to all dance workshops and sessions"
            },
            {
                name: "VIP",
                price: 5000,
                description: "Premium access, one-on-one coaching, and exclusive dance merchandise"
            },
            {
                name: "Early Bird",
                price: 1999,
                description: "Limited time offer - Full access at a special price"
            }
        ]
    },
    'neon-nights': {
        id: 'neon-nights',
        title: 'Neon Nights: Summer Beach Party',
        date: '2025-05-25',
        startTime: '08:00 PM',
        duration: '6 hours',
        location: 'Novotel HICC, Hyderabad',
        price: 1500,
        maxTickets: 6,
        category: 'Party',
        coordinates: {
            lat: 17.4725,
            lng: 78.3825
        },
        description: "Get ready for the hottest party of the summer! Neon Nights transforms Novotel HICC into a vibrant beach paradise with neon lights, summer vibes, and non-stop entertainment. Experience an unforgettable night with top DJs, live performances, and amazing beach-themed decorations.",
        highlights: [
            "International & local DJ lineup",
            "Neon-themed photo zones",
            "Beachside cocktail bar",
            "Live percussion performances",
            "Summer dress code with neon accessories"
        ],
        image: partyImg,
        heroImage: partyImg,
        albumImages: [album1, album2, album3, album4, album5],
        ticketTypes: [
            {
                name: "Early Bird",
                price: 1500,
                description: "General entry with welcome drink"
            },
            {
                name: "VIP",
                price: 3000,
                description: "Premium bar access, VIP lounge, and complimentary snacks"
            },
            {
                name: "Group Package",
                price: 7500,
                description: "Entry for 6 people with reserved table and bottle service"
            }
        ]
    },
    'musical-ravage': {
        title: 'Musical Ravage',
        date: '2025-05-20',
        description: 'Experience an electrifying night of music with top artists from around the world.',
        location: 'Hyderabad',
        startTime: '07:00 PM',
        duration: '5 hours',
        price: 5000,
        maxTickets: 4,
        category: 'Music',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        images: [musicImg, rockImg, melodyImg, fusionImg, metropolisImg, rockFestImg],
        heroImage: musicImg,
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 5000 },
            { id: 'vip', name: 'VIP Experience', price: 10000 },
            { id: 'backstage', name: 'Backstage Pass', price: 15000 }
        ]
    },
    'natu-dance': {
        id: 'natu-dance',
        title: 'Natu Dance Festival',
        date: '2025-06-15',
        startTime: '06:00 PM',
        duration: '4 hours',
        location: 'Shilparamam, Hyderabad',
        price: 1500,
        maxTickets: 4,
        category: 'Dance',
        coordinates: {
            lat: 17.4525,
            lng: 78.3825
        },
        description: "Experience the vibrant and energetic Natu Dance Festival! This event celebrates the rich cultural heritage of folk dance with modern interpretations. Join us for an evening of traditional performances, contemporary fusion, and interactive dance sessions.",
        highlights: [
            "Traditional folk dance performances",
            "Contemporary dance fusion shows",
            "Interactive dance workshops",
            "Live traditional music",
            "Cultural exhibition"
        ],
        image: natuImg,
        heroImage: natuImg,
        albumImages: [album1, album2, album3, album4, album5],
        ticketTypes: [
            {
                name: "Standard",
                price: 1500,
                description: "Regular seating with show access"
            },
            {
                name: "Workshop Pass",
                price: 2500,
                description: "Show access plus interactive dance workshop participation"
            },
            {
                name: "Family Package",
                price: 4000,
                description: "Package for 4 people with premium seating"
            }
        ]
    }
}; 