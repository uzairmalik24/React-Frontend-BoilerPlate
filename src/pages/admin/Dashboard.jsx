import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
    FiTrendingUp,
    FiShoppingCart,
    FiUsers,
    FiDollarSign,
    FiPackage,
    FiArrowUp,
    FiArrowDown,
    FiMoreVertical,
    FiEye,
    FiClock,
    FiActivity,
} from 'react-icons/fi';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

const AdminDashboard = () => {
    const cardsRef = useRef([]);
    const [timeRange, setTimeRange] = useState('week');

    // Animate cards on mount
    useEffect(() => {
        gsap.fromTo(
            cardsRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
            }
        );
    }, []);

    // Stats data
    const stats = [
        {
            title: 'Total Revenue',
            value: '$45,231',
            change: '+12.5%',
            trend: 'up',
            icon: FiDollarSign,
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            title: 'Total Orders',
            value: '1,234',
            change: '+8.2%',
            trend: 'up',
            icon: FiShoppingCart,
            color: 'from-purple-500 to-pink-500',
            bgColor: 'bg-purple-500/10',
        },
        {
            title: 'Total Customers',
            value: '892',
            change: '+15.3%',
            trend: 'up',
            icon: FiUsers,
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-500/10',
        },
        {
            title: 'Active Products',
            value: '567',
            change: '-2.4%',
            trend: 'down',
            icon: FiPackage,
            color: 'from-orange-500 to-red-500',
            bgColor: 'bg-orange-500/10',
        },
    ];

    // Revenue chart data
    const revenueData = [
        { name: 'Mon', revenue: 4200, orders: 24 },
        { name: 'Tue', revenue: 5100, orders: 32 },
        { name: 'Wed', revenue: 4800, orders: 28 },
        { name: 'Thu', revenue: 6200, orders: 38 },
        { name: 'Fri', revenue: 7500, orders: 45 },
        { name: 'Sat', revenue: 8900, orders: 52 },
        { name: 'Sun', revenue: 7200, orders: 41 },
    ];

    // Product performance data
    const productData = [
        { name: 'Electronics', value: 4500, color: '#3b82f6' },
        { name: 'Clothing', value: 3200, color: '#8b5cf6' },
        { name: 'Home & Garden', value: 2800, color: '#10b981' },
        { name: 'Sports', value: 2100, color: '#f59e0b' },
        { name: 'Other', value: 1400, color: '#ef4444' },
    ];

    // Recent orders
    const recentOrders = [
        { id: '#ORD-001', customer: 'John Doe', product: 'Wireless Headphones', amount: '$129.99', status: 'completed', time: '5 min ago' },
        { id: '#ORD-002', customer: 'Jane Smith', product: 'Smart Watch', amount: '$299.99', status: 'pending', time: '12 min ago' },
        { id: '#ORD-003', customer: 'Bob Johnson', product: 'Laptop Bag', amount: '$49.99', status: 'processing', time: '25 min ago' },
        { id: '#ORD-004', customer: 'Alice Brown', product: 'USB-C Cable', amount: '$19.99', status: 'completed', time: '1 hour ago' },
        { id: '#ORD-005', customer: 'Charlie Wilson', product: 'Phone Case', amount: '$24.99', status: 'cancelled', time: '2 hours ago' },
    ];

    // Top products
    const topProducts = [
        { name: 'Wireless Earbuds Pro', sales: 245, revenue: '$24,500', trend: '+12%' },
        { name: 'Smart Fitness Watch', sales: 189, revenue: '$18,900', trend: '+8%' },
        { name: 'Portable Charger', sales: 156, revenue: '$7,800', trend: '+15%' },
        { name: 'Bluetooth Speaker', sales: 134, revenue: '$13,400', trend: '-3%' },
    ];

    const getStatusColor = (status) => {
        const colors = {
            completed: 'bg-green-500/10 text-green-600 border-green-500/20',
            pending: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
            processing: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
            cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
        };
        return colors[status] || colors.pending;
    };

    return (
        <div className="p-4 md:p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-2">
                    {['day', 'week', 'month', 'year'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${timeRange === range
                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                                : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                                }`}
                        >
                            {range.charAt(0).toUpperCase() + range.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardsRef.current[index] = el)}
                        className="relative group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
                    >
                        {/* Background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                                    <stat.icon className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} size={24} />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {stat.trend === 'up' ? <FiArrowUp size={16} /> : <FiArrowDown size={16} />}
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart - Large */}
                <div
                    ref={(el) => (cardsRef.current[4] = el)}
                    className="lg:col-span-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-foreground">Revenue Overview</h3>
                            <p className="text-sm text-muted-foreground">Weekly performance</p>
                        </div>
                        <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <FiMoreVertical className="text-muted-foreground" />
                        </button>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px',
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="hsl(var(--primary))"
                                strokeWidth={2}
                                fill="url(#colorRevenue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Product Distribution - Medium */}
                <div
                    ref={(el) => (cardsRef.current[5] = el)}
                    className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-foreground">Sales by Category</h3>
                            <p className="text-sm text-muted-foreground">Distribution</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={productData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {productData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 space-y-2">
                        {productData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-muted-foreground">{item.name}</span>
                                </div>
                                <span className="font-semibold text-foreground">${item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Orders - Full width */}
                <div
                    ref={(el) => (cardsRef.current[6] = el)}
                    className="lg:col-span-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-foreground">Recent Orders</h3>
                            <p className="text-sm text-muted-foreground">Latest transactions</p>
                        </div>
                        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                            View All
                        </button>
                    </div>
                    <div className="space-y-3">
                        {recentOrders.map((order, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-all duration-200 group"
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                                        <FiShoppingCart className="text-primary" size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-foreground text-sm">{order.id}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground truncate">{order.customer} • {order.product}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right hidden sm:block">
                                        <p className="font-semibold text-foreground">{order.amount}</p>
                                        <p className="text-xs text-muted-foreground">{order.time}</p>
                                    </div>
                                    <button className="p-2 rounded-lg hover:bg-muted/50 opacity-0 group-hover:opacity-100 transition-all">
                                        <FiEye className="text-muted-foreground" size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Products */}
                <div
                    ref={(el) => (cardsRef.current[7] = el)}
                    className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-foreground">Top Products</h3>
                            <p className="text-sm text-muted-foreground">Best sellers</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {topProducts.map((product, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-foreground truncate flex-1">
                                        {product.name}
                                    </p>
                                    <span className={`text-xs font-semibold ${product.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {product.trend}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{product.sales} sales</span>
                                    <span className="font-semibold text-foreground">{product.revenue}</span>
                                </div>
                                <div className="w-full h-1.5 bg-muted/30 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-1000"
                                        style={{ width: `${(product.sales / 250) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: FiActivity, label: 'Active Now', value: '234', color: 'text-blue-500' },
                    { icon: FiClock, label: 'Avg. Response', value: '2.4h', color: 'text-purple-500' },
                    { icon: FiTrendingUp, label: 'Conversion', value: '3.2%', color: 'text-green-500' },
                    { icon: FiEye, label: 'Page Views', value: '12.5k', color: 'text-orange-500' },
                ].map((item, index) => (
                    <div
                        key={index}
                        ref={(el) => (cardsRef.current[8 + index] = el)}
                        className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center">
                                <item.icon className={item.color} size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">{item.label}</p>
                                <p className="text-lg font-bold text-foreground">{item.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;