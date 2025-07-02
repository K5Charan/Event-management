require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/event_platform')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Define Event Schema
const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    time: String,
    location: String,
    category: String,
    price: Number,
    capacity: Number,
    availableTickets: Number,
    images: [String],
    heroImage: String,
    tags: [String],
    status: String,
    coordinates: {
        lat: Number,
        lng: Number
    },
    ticketTypes: [{
        id: String,
        name: String,
        price: Number,
        description: String
    }]
});

const Event = mongoose.model('Event', eventSchema);

// Define events directly
const events = [
    {
        title: 'Urban Jungle Marathon',
        description: 'Experience the thrill of running through the urban landscape of Hyderabad.',
        date: new Date('2024-06-15'),
        time: '07:00 AM',
        location: 'Hyderabad',
        category: 'Sports',
        price: 4500,
        capacity: 4,
        availableTickets: 4,
        images: ['marathon.jpg'],
        heroImage: 'marathon.jpg',
        tags: ['sports', 'marathon', 'running'],
        status: 'upcoming',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 4500 },
            { id: 'vip', name: 'VIP Entry', price: 8000 },
            { id: 'early', name: 'Early Bird', price: 3500 }
        ]
    },
    {
        title: 'Rockin\' the Stage',
        description: 'Get ready for an electrifying evening of rock music.',
        date: new Date('2024-06-20'),
        time: '04:00 PM',
        location: 'Hyderabad',
        category: 'Music',
        price: 6500,
        capacity: 4,
        availableTickets: 4,
        images: ['rock.jpg'],
        heroImage: 'rock.jpg',
        tags: ['music', 'rock', 'concert'],
        status: 'upcoming',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 6500 },
            { id: 'vip', name: 'VIP Access', price: 12000 },
            { id: 'backstage', name: 'Backstage Pass', price: 15000 }
        ]
    },
    {
        title: 'Melody Mania',
        description: 'Join us for an evening of soulful melodies and enchanting music.',
        date: new Date('2024-06-25'),
        time: '07:00 PM',
        location: 'Hyderabad',
        category: 'Music',
        price: 0,
        capacity: 2,
        availableTickets: 2,
        images: ['melody.jpg'],
        heroImage: 'melody.jpg',
        tags: ['music', 'melody', 'concert'],
        status: 'upcoming',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        ticketTypes: [
            { id: 'regular', name: 'Free Entry', price: 0 },
            { id: 'premium', name: 'Premium Seating', price: 2000 }
        ]
    },
    {
        title: 'Musical Fusion Festival',
        description: 'Experience the unique blend of traditional and modern music.',
        date: new Date('2024-07-01'),
        time: '06:00 PM',
        location: 'Madhapur, Hyderabad',
        category: 'Music',
        price: 1500,
        capacity: 6,
        availableTickets: 6,
        images: ['fusion.jpg'],
        heroImage: 'fusion.jpg',
        tags: ['music', 'fusion', 'festival'],
        status: 'upcoming',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 1500 },
            { id: 'vip', name: 'VIP Experience', price: 3000 }
        ]
    },
    {
        title: 'Metropolis Marathon',
        description: 'Challenge yourself in this urban marathon through Hi-Tech city.',
        date: new Date('2024-07-07'),
        time: '06:00 AM',
        location: 'Hi-Tech city, Hyderabad',
        category: 'Sports',
        price: 500,
        capacity: 8,
        availableTickets: 8,
        images: ['metropolis.jpg'],
        heroImage: 'metropolis.jpg',
        tags: ['sports', 'marathon', 'running'],
        status: 'upcoming',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 500 },
            { id: 'premium', name: 'Premium Kit', price: 1000 }
        ]
    },
    {
        title: 'Rock Fest',
        description: 'A celebration of rock music with top artists.',
        date: new Date('2024-07-15'),
        time: '05:00 PM',
        location: 'Hyderabad',
        category: 'Music',
        price: 3500,
        capacity: 4,
        availableTickets: 4,
        images: ['rock-fest.jpg'],
        heroImage: 'rock-fest.jpg',
        tags: ['music', 'rock', 'festival'],
        status: 'upcoming',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 3500 },
            { id: 'vip', name: 'VIP Access', price: 6000 }
        ]
    },
    {
        title: 'Rock Icons',
        description: 'Witness legendary rock artists perform live.',
        date: new Date('2024-07-22'),
        time: '06:00 PM',
        location: 'Hyderabad',
        category: 'Music',
        price: 4000,
        capacity: 4,
        availableTickets: 4,
        images: ['rock-icons.jpg'],
        heroImage: 'rock-icons.jpg',
        tags: ['music', 'rock', 'concert'],
        status: 'upcoming',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 4000 },
            { id: 'vip', name: 'VIP Experience', price: 8000 }
        ]
    },
    {
        title: 'Rock Revolt',
        description: 'Experience the revolution of rock music.',
        date: new Date('2024-07-10'),
        time: '07:00 PM',
        location: 'Hyderabad',
        category: 'Music',
        price: 3000,
        capacity: 4,
        availableTickets: 4,
        images: ['rock-revolt.jpg'],
        heroImage: 'rock-revolt.jpg',
        tags: ['music', 'rock', 'concert'],
        status: 'upcoming',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 3000 },
            { id: 'vip', name: 'VIP Access', price: 5000 }
        ]
    },
    {
        title: 'Classic Rock Night',
        description: 'Relive the golden era of rock music.',
        date: new Date('2024-07-05'),
        time: '08:00 PM',
        location: 'Hyderabad',
        category: 'Music',
        price: 2500,
        capacity: 4,
        availableTickets: 4,
        images: ['classic-rock.jpg'],
        heroImage: 'classic-rock.jpg',
        tags: ['music', 'rock', 'classic'],
        status: 'upcoming',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 2500 },
            { id: 'vip', name: 'VIP Experience', price: 4500 }
        ]
    },
    {
        title: 'Brushstrokes & Beyond: An Oil Painting Odyssey',
        description: 'Immerse yourself in the world of oil painting with this unique artistic journey. Experience live demonstrations, interactive sessions, and witness the creation of masterpieces.',
        date: new Date('2024-06-15'),
        time: '10:00 AM',
        location: 'Hyderabad',
        category: 'Art',
        price: 2000,
        capacity: 30,
        availableTickets: 30,
        images: ['art.jpg'],
        heroImage: 'art.jpg',
        tags: ['art', 'painting', 'workshop'],
        status: 'upcoming',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 2000 },
            { id: 'vip', name: 'VIP Access (Includes Art Kit)', price: 3500 },
            { id: 'workshop', name: 'Workshop Pass', price: 5000 }
        ]
    },
    {
        title: 'Global Business Summit 2024',
        description: 'Join us for the Global Business Summit 2024, where industry leaders, entrepreneurs, and innovators come together to shape the future of business.',
        date: new Date('2024-07-20'),
        time: '09:00 AM',
        location: 'HICC, Hyderabad',
        category: 'Business',
        price: 7500,
        capacity: 2,
        availableTickets: 2,
        images: ['business.jpg'],
        heroImage: 'business.jpg',
        tags: ['business', 'summit', 'networking'],
        status: 'upcoming',
        coordinates: { lat: 17.4725, lng: 78.3725 },
        ticketTypes: [
            { id: 'regular', name: 'Regular', price: 7500, description: 'Access to all keynote sessions and panel discussions' },
            { id: 'vip', name: 'VIP', price: 15000, description: 'Premium seating, exclusive networking dinner, and workshop access' }
        ]
    },
    {
        title: 'Laugh Out Loud Comedy Night',
        description: 'Get ready for a night of non-stop laughter with India\'s top comedians!',
        date: new Date('2024-07-15'),
        time: '08:00 PM',
        location: 'Shilpakala Vedika, Hyderabad',
        category: 'Stand-up Comedy',
        price: 999,
        capacity: 4,
        availableTickets: 4,
        images: ['comedy.jpg'],
        heroImage: 'comedy.jpg',
        tags: ['comedy', 'entertainment', 'stand-up'],
        status: 'upcoming',
        coordinates: { lat: 17.4275, lng: 78.3425 },
        ticketTypes: [
            { id: 'regular', name: 'Regular', price: 999, description: 'Standard seating with full show access' },
            { id: 'premium', name: 'Premium', price: 1499, description: 'Front row seating with meet & greet pass' },
            { id: 'group', name: 'Group', price: 3499, description: 'Package for 4 people with complimentary snacks' }
        ]
    },
    {
        title: 'Rhythmic Fusion Dance Festival',
        description: 'Experience the magic of dance at the Rhythmic Fusion Dance Festival!',
        date: new Date('2024-07-05'),
        time: '06:30 PM',
        location: 'Ravindra Bharathi, Hyderabad',
        category: 'Dance',
        price: 1200,
        capacity: 3,
        availableTickets: 3,
        images: ['dance.jpg'],
        heroImage: 'dance.jpg',
        tags: ['dance', 'fusion', 'festival'],
        status: 'upcoming',
        coordinates: { lat: 17.4075, lng: 78.4725 },
        ticketTypes: [
            { id: 'standard', name: 'Standard', price: 1200, description: 'Regular seating with show access' },
            { id: 'workshop', name: 'Workshop Pass', price: 2000, description: 'Show access plus interactive dance workshop participation' },
            { id: 'family', name: 'Family Package', price: 3000, description: 'Package for 3 people with premium seating' }
        ]
    },
    {
        title: 'Passion Power: Dance & Motivation',
        description: 'Transform your life through the power of dance at Passion Power!',
        date: new Date('2024-07-30'),
        time: '10:00 AM',
        location: 'JRC Convention, Hyderabad',
        category: 'Dance',
        price: 2500,
        capacity: 2,
        availableTickets: 2,
        images: ['passion.jpg'],
        heroImage: 'passion.jpg',
        tags: ['dance', 'motivation', 'workshop'],
        status: 'upcoming',
        coordinates: { lat: 17.4525, lng: 78.3825 },
        ticketTypes: [
            { id: 'regular', name: 'Regular', price: 2500, description: 'Full access to all dance workshops and sessions' },
            { id: 'vip', name: 'VIP', price: 5000, description: 'Premium access, one-on-one coaching, and exclusive dance merchandise' },
            { id: 'early', name: 'Early Bird', price: 1999, description: 'Limited time offer - Full access at a special price' }
        ]
    },
    {
        title: 'Neon Nights: Summer Beach Party',
        description: 'Get ready for the hottest party of the summer!',
        date: new Date('2024-07-25'),
        time: '08:00 PM',
        location: 'Novotel HICC, Hyderabad',
        category: 'Party',
        price: 1500,
        capacity: 6,
        availableTickets: 6,
        images: ['party.jpg'],
        heroImage: 'party.jpg',
        tags: ['party', 'summer', 'beach'],
        status: 'upcoming',
        coordinates: { lat: 17.4725, lng: 78.3825 },
        ticketTypes: [
            { id: 'early', name: 'Early Bird', price: 1500, description: 'General entry with welcome drink' },
            { id: 'vip', name: 'VIP', price: 3000, description: 'Premium bar access, VIP lounge, and complimentary snacks' },
            { id: 'group', name: 'Group Package', price: 7500, description: 'Entry for 6 people with reserved table and bottle service' }
        ]
    },
    {
        title: 'Musical Ravage',
        description: 'Experience an electrifying night of music with top artists from around the world.',
        date: new Date('2024-07-20'),
        time: '07:00 PM',
        location: 'Hyderabad',
        category: 'Music',
        price: 5000,
        capacity: 4,
        availableTickets: 4,
        images: ['music.jpg'],
        heroImage: 'music.jpg',
        tags: ['music', 'concert', 'international'],
        status: 'upcoming',
        coordinates: { lat: 17.3850, lng: 78.4867 },
        ticketTypes: [
            { id: 'regular', name: 'Regular Entry', price: 5000 },
            { id: 'vip', name: 'VIP Experience', price: 10000 },
            { id: 'backstage', name: 'Backstage Pass', price: 15000 }
        ]
    },
    {
        title: 'Natu Dance Festival',
        description: 'Experience the vibrant and energetic Natu Dance Festival!',
        date: new Date('2024-07-15'),
        time: '06:00 PM',
        location: 'Shilparamam, Hyderabad',
        category: 'Dance',
        price: 1500,
        capacity: 4,
        availableTickets: 4,
        images: ['natu.jpg'],
        heroImage: 'natu.jpg',
        tags: ['dance', 'folk', 'festival'],
        status: 'upcoming',
        coordinates: { lat: 17.4525, lng: 78.3825 },
        ticketTypes: [
            { id: 'standard', name: 'Standard', price: 1500, description: 'Regular seating with show access' },
            { id: 'workshop', name: 'Workshop Pass', price: 2500, description: 'Show access plus interactive dance workshop participation' },
            { id: 'family', name: 'Family Package', price: 4000, description: 'Package for 4 people with premium seating' }
        ]
    }
];

// Function to populate events
const populateEvents = async () => {
    try {
        // Clear existing events
        console.log('Clearing existing events...');
        await Event.deleteMany({});
        console.log('Existing events cleared');

        // Insert events
        console.log('Inserting events...');
        const result = await Event.insertMany(events);
        console.log(`Successfully inserted ${result.length} events`);

        // Verify total count
        const totalEvents = await Event.countDocuments();
        console.log(`Total events in database: ${totalEvents}`);

    } catch (error) {
        console.error('Error populating events:', error);
        process.exit(1);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};

// Run the population script
populateEvents(); 