# MoneyControl Frontend

A modern, responsive portfolio management application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📊 **Portfolio Dashboard** - Overview of all your stock investments
- 📈 **Real-time Statistics** - Track total invested, current value, and P&L
- 🔍 **Search & Filter** - Find stocks by name or filter by status (active/sold)
- ➕ **Add Stocks** - Easy form to add new stock positions
- ✏️ **Edit Positions** - Update stock information or mark as sold
- 🗑️ **Delete Stocks** - Remove positions from your portfolio
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean, professional interface with smooth animations

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization (ready for future charts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Integration

The frontend communicates with the Spring Boot backend through REST APIs:

- `GET /stocks` - Fetch all stocks
- `GET /stocks/{id}` - Fetch specific stock
- `POST /stocks` - Create new stock
- `PUT /stocks/{id}` - Update stock (sell)
- `DELETE /stocks/{id}` - Delete stock

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Dashboard page
├── components/         # Reusable UI components
│   ├── StockCard.tsx   # Individual stock display
│   ├── StockForm.tsx   # Add/Edit stock form
│   ├── StatsCard.tsx   # Statistics display
│   └── SearchAndFilter.tsx # Search and filter controls
├── lib/               # Utility functions
│   ├── api.ts         # API client
│   └── utils.ts       # Helper functions
└── types/             # TypeScript type definitions
    └── stock.ts       # Stock-related types
```

## Features in Detail

### Dashboard
- Overview of portfolio performance
- Key metrics at a glance
- Quick actions to add new stocks

### Stock Management
- Add new stock positions with buy price and date
- Mark stocks as sold with sell price and date
- Automatic P&L calculation
- Visual indicators for profit/loss

### Search & Filter
- Real-time search by stock name
- Filter by status (All, Active, Sold)
- Responsive design for all screen sizes

## Future Enhancements

- 📊 Interactive charts and graphs
- 📈 Real-time stock price integration
- 🔔 Price alerts and notifications
- 📱 PWA support for mobile app experience
- 🌙 Dark mode toggle
- 📤 Export portfolio data
- 📊 Advanced analytics and insights

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.