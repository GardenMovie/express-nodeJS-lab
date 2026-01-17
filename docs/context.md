# Server Metrics Backend - Project Context

**Project Name:** Server Metrics Backend  
**Type:** REST API for Home Server Monitoring  
**Stack:** Node.js + Express + TypeScript  
**Purpose:** Learning project to master backend development while building a practical monitoring solution

---

## 🎯 Project Goal

Build a RESTful API that collects, stores, and serves metrics about a home server. The API will be consumed by a frontend dashboard to visualize server health and performance over time.

---

## 📊 Core Concept

### Metrics Collection Strategy

The system uses a **hierarchical time-series aggregation** approach with three granularity levels:

1. **Hourly Metrics** (Most Granular)
   - 24 entries (last 24 hours)
   - Data points collected every hour
   - Shows recent detailed activity

2. **Daily Metrics** (Medium Granularity)
   - 30 entries (last 30 days)
   - Each entry aggregates 24 hourly metrics
   - Shows weekly/monthly trends

3. **Monthly Metrics** (Least Granular)
   - N entries (unlimited history)
   - Each entry aggregates ~30 daily metrics
   - Shows long-term historical trends

### Data Aggregation Flow
```
Hourly Data → Daily Aggregation → Monthly Aggregation
   (24h)           (30 days)          (indefinite)
```

---

## 📈 Metrics to Track

### System Metrics
- **CPU Usage** (%)
- **Memory Usage** (%, MB/GB)
- **Disk Usage** (%, GB used/total)
- **Network Traffic** (upload/download in MB/s)
- **System Load** (1min, 5min, 15min averages)
- **Uptime** (seconds/hours)

### Process Metrics
- **Active Processes** count
- **Running Services** list
- **Docker Containers** (if applicable)

### Temperature & Health
- **CPU Temperature** (°C)
- **System Temperature** (°C)
- **Fan Speed** (RPM)

### Custom Application Metrics (Optional)
- **API Response Times**
- **Database Query Performance**
- **Error Rates**

---

## 🏗️ Architecture

### Data Flow
```
Home Server (OS) 
    ↓
System Monitoring Script (Node.js/Shell)
    ↓
POST /api/metrics (Hourly)
    ↓
Express API Backend
    ↓
Database (Time-series optimized)
    ↓
GET /api/metrics/{hourly|daily|monthly}
    ↓
Frontend Dashboard (Future)
```

### Database Schema Design

#### Hourly Metrics Table
```typescript
interface HourlyMetric {
  id: string;
  timestamp: Date;
  cpuUsage: number;
  memoryUsage: number;
  memoryTotal: number;
  diskUsage: number;
  diskTotal: number;
  networkUpload: number;
  networkDownload: number;
  systemLoad: {
    oneMinute: number;
    fiveMinute: number;
    fifteenMinute: number;
  };
  uptime: number;
  temperature?: {
    cpu: number;
    system: number;
  };
  processCount: number;
}
```

#### Daily Metrics Table
```typescript
interface DailyMetric {
  id: string;
  date: Date; // Start of day
  cpuUsageAvg: number;
  cpuUsageMax: number;
  cpuUsageMin: number;
  memoryUsageAvg: number;
  memoryUsageMax: number;
  diskUsageAvg: number;
  networkUploadTotal: number;
  networkDownloadTotal: number;
  uptimeTotal: number;
  temperatureAvg?: number;
  temperatureMax?: number;
}
```

#### Monthly Metrics Table
```typescript
interface MonthlyMetric {
  id: string;
  month: Date; // Start of month
  cpuUsageAvg: number;
  memoryUsageAvg: number;
  diskUsageAvg: number;
  networkUploadTotal: number;
  networkDownloadTotal: number;
  uptimePercentage: number;
  incidentCount: number; // High usage events
}
```

---

## 🔌 API Endpoints

### Metrics Collection
```
POST   /api/metrics              - Record new hourly metric
```

### Metrics Retrieval
```
GET    /api/metrics/hourly       - Get last 24 hourly metrics
GET    /api/metrics/daily        - Get last 30 daily metrics
GET    /api/metrics/monthly      - Get all monthly metrics
GET    /api/metrics/current      - Get current/latest metric
GET    /api/metrics/summary      - Get aggregated summary
```

### Query Parameters (Optional)
```
?from=2026-01-01&to=2026-01-31  - Date range filtering
?limit=50                        - Limit results
?fields=cpu,memory              - Select specific fields
```

### Aggregation Management
```
POST   /api/metrics/aggregate/daily    - Manually trigger daily aggregation
POST   /api/metrics/aggregate/monthly  - Manually trigger monthly aggregation
```

### System & Health
```
GET    /api/health               - API health check
GET    /api/stats                - Database statistics
```

---

## 🔄 Data Lifecycle Management

### Retention Policy
- **Hourly**: Keep last 24 entries (rolling window)
- **Daily**: Keep last 30 entries (rolling window)
- **Monthly**: Keep all entries (unlimited)

### Cleanup Jobs (Cron)
```typescript
// Runs every hour at :05
// Delete hourly metrics older than 24 hours
scheduledJob: '5 * * * *'

// Runs daily at 00:15
// Delete daily metrics older than 30 days
scheduledJob: '15 0 * * *'
```

### Aggregation Jobs (Cron)
```typescript
// Runs daily at 00:05
// Aggregate previous day's hourly data into daily metric
scheduledJob: '5 0 * * *'

// Runs monthly at 00:10 on 1st day
// Aggregate previous month's daily data into monthly metric
scheduledJob: '10 0 1 * *'
```

---

## 🛠️ Technology Stack

### Backend Framework
- **Runtime**: Node.js 20+
- **Framework**: Express.js 5+
- **Language**: TypeScript (strict mode)

### Database Options
1. **PostgreSQL** (Recommended)
   - Native time-series support with TimescaleDB
   - JSONB for flexible metrics
   - Excellent TypeScript ORM support (Prisma/TypeORM)

2. **SQLite** (Development/Learning)
   - Simple setup, single file
   - Good for learning SQL concepts
   - Easy backup and migration

3. **MongoDB** (Alternative)
   - Document-based, flexible schema
   - Native time-series collections
   - Mongoose for TypeScript

### Supporting Libraries
```json
{
  "database": "pg / prisma / typeorm",
  "validation": "zod / joi",
  "scheduling": "node-cron / node-schedule",
  "logging": "winston / pino",
  "security": "helmet, cors, express-rate-limit",
  "monitoring": "systeminformation (for collecting metrics)",
  "testing": "jest, supertest",
  "documentation": "swagger-jsdoc, swagger-ui-express"
}
```

---

## 📚 Learning Objectives

### Backend Development Skills
- [x] RESTful API design principles
- [ ] Database schema design for time-series data
- [ ] Data aggregation and ETL processes
- [ ] Cron job scheduling and automation
- [ ] Input validation and error handling
- [ ] Authentication/Authorization (future)
- [ ] API documentation with Swagger
- [ ] Unit and integration testing

### TypeScript Mastery
- [ ] Advanced type definitions
- [ ] Generic types for reusable code
- [ ] Type guards and discriminated unions
- [ ] Utility types for DTOs

### DevOps & Deployment
- [ ] Environment management
- [ ] Database migrations
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Production monitoring
- [ ] Log aggregation

### System Programming
- [ ] OS-level metrics collection
- [ ] Process management
- [ ] File system operations
- [ ] Background job processing

---

## 🚀 Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [x] Basic Express + TypeScript setup
- [ ] Database selection and setup
- [ ] Basic CRUD for metrics
- [ ] Input validation
- [ ] Error handling

### Phase 2: Core Features (Weeks 3-4)
- [ ] Hourly metrics collection endpoint
- [ ] Time-series data storage
- [ ] Retrieval endpoints (hourly, daily, monthly)
- [ ] Data aggregation logic
- [ ] Automated cleanup jobs

### Phase 3: Automation (Weeks 5-6)
- [ ] Cron job setup for aggregation
- [ ] Automated data collection script
- [ ] Data retention policies
- [ ] Background job monitoring

### Phase 4: Enhancement (Weeks 7-8)
- [ ] Advanced querying (date ranges, filters)
- [ ] Data export functionality
- [ ] API documentation (Swagger)
- [ ] Performance optimization
- [ ] Caching layer (Redis optional)

### Phase 5: Production Ready (Weeks 9-10)
- [ ] Comprehensive testing suite
- [ ] Security hardening
- [ ] Logging and monitoring
- [ ] Docker deployment
- [ ] CI/CD setup
- [ ] Frontend integration prep

---

## 🔐 Security Considerations

### Authentication Strategy (Phase 5)
- API key authentication for metrics collection
- JWT tokens for dashboard access
- Rate limiting per endpoint
- IP whitelisting for collection endpoints

### Data Protection
- Input sanitization
- SQL injection prevention (use ORM/parameterized queries)
- Secrets management (.env, vault)
- HTTPS in production

---

## 📊 Success Metrics

### Technical Goals
- API response time < 100ms (95th percentile)
- Data collection reliability > 99%
- Zero data loss during aggregation
- Database query optimization (indexed properly)

### Learning Goals
- Complete understanding of Express middleware
- Confidence in TypeScript type system
- Ability to design and implement time-series database
- Experience with production deployment

### Future Extensions
- Real-time WebSocket updates
- Alert system for threshold breaches
- Multi-server support
- Historical data comparison
- Machine learning for anomaly detection

---

## 🤝 Frontend Integration (Future)

### Expected Frontend Features
- Real-time dashboard with charts
- Historical data visualization
- Alert notifications
- System health status
- Custom metric widgets

### Frontend Stack (Proposed)
- React/Next.js with TypeScript
- Chart.js or Recharts for visualization
- TanStack Query for API calls
- Tailwind CSS for styling

---

## 📝 Notes

- This is primarily a **learning project** - focus on best practices over rapid development
- Document all architectural decisions
- Write tests as you build features
- Refactor regularly to maintain code quality
- Keep the scope manageable - it's okay to implement features incrementally

---

## 🔗 References

- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TimescaleDB Time-Series Guide](https://docs.timescale.com/)
- [RESTful API Design Guidelines](https://restfulapi.net/)
- [Node.js System Information](https://www.npmjs.com/package/systeminformation)

---

**Last Updated:** January 17, 2026  
**Status:** Planning & Initial Development
