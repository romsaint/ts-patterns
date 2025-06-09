
// ==================== SOLUTION ====================

// ==================== Interfaces ====================
interface Order {
    customer: string;
    items: number[];
    total: number;
    details: string;
}

type ProductType = 'food' | 'drink';

interface MenuProduct {
    id: number;
    name: string;
    type: ProductType;
    price: number;
    prepare(): void;
}

type Menu = MenuProduct[];

// ==================== Data Base (Strategy Pattern) ====================
interface IDataBase {
    getMenu(): Menu;
    saveOrder(order: Order): void;
    getOrders(): Order[];
}

class MongoDBRealization implements IDataBase {
    private orders: Order[] = [];

    getMenu(): Menu {
        return [
            { id: 1, name: "Pizza", type: "food", price: 10, prepare: () => console.log("Preparing pizza...") },
            { id: 2, name: "Burger", type: "food", price: 7, prepare: () => console.log("Preparing burger...") },
            { id: 3, name: "Cola", type: "drink", price: 2, prepare: () => console.log("Pouring cola...") }
        ];
    }

    saveOrder(order: Order): void {
        this.orders.push(order);
        console.log(`Order saved to MongoDB: ${order.customer}`);
    }

    getOrders(): Order[] {
        return [...this.orders]; // Return a copy for encapsulation
    }
}

class PostgresDBRealization implements IDataBase {
    private orders: Order[] = [];

    getMenu(): Menu {
        return [
            { id: 1, name: "Pizza", type: "food", price: 10, prepare: () => console.log("Preparing pizza...") },
            { id: 2, name: "Burger", type: "food", price: 7, prepare: () => console.log("Preparing burger...") },
            { id: 3, name: "Cola", type: "drink", price: 2, prepare: () => console.log("Pouring cola...") }
        ];
    }

    saveOrder(order: Order): void {
        this.orders.push(order);
        console.log(`Order saved to Postgres: ${order.customer}`);
    }

    getOrders(): Order[] {
        return [...this.orders];
    }
}

// ==================== Kitchen (Observer Pattern) ====================
interface IKitchen {
    prepareItems(itemIds: number[]): void;
}

class Kitchen implements IKitchen {
    constructor(private menu: Menu) { }

    prepareItems(itemIds: number[]): void {
        console.log("Sending to kitchen: ", itemIds);

        itemIds.forEach(id => {
            const item = this.menu.find(i => i.id === id);
            if (item) {
                item.prepare();
            }
        });
    }
}

// ==================== Reports (Strategy Pattern) ====================
interface IReportGenerator {
    generate(orders: Order[]): void;
}

class DailyReportGenerator implements IReportGenerator {
    generate(orders: Order[]): void {
        console.log("=== Daily Report ===");
        console.log(`Total orders: ${orders.length}`);
        console.log(`Total revenue: $${orders.reduce((sum, order) => sum + order.total, 0)}`);
    }
}

class DetailedReportGenerator implements IReportGenerator {
    generate(orders: Order[]): void {
        console.log("=== Detailed Report ===");
        orders.forEach(order => {
            console.log(`Customer: ${order.customer}, Items: ${order.details}, Total: $${order.total}`);
        });
    }
}

// ==================== Restaurant System ====================
class RestaurantSystem {
    constructor(
        private database: IDataBase,
        private kitchen: IKitchen,
        private menu: Menu = database.getMenu()
    ) { }

    public getMenu(): Menu {
        return this.menu;
    }

    public takeOrder(customerName: string, items: number[]): void {
        let total = 0;
        let orderDetails = "";
        const validItems: number[] = [];

        for (const itemId of items) {
            const menuItem = this.menu.find(item => item.id === itemId);
            if (menuItem) {
                total += menuItem.price;
                orderDetails += `${menuItem.name}, `;
                validItems.push(itemId);
            }
        }

        if (validItems.length === 0) {
            console.log(`No valid items for ${customerName}`);
            return;
        }

        const order: Order = {
            customer: customerName,
            items: validItems,
            total: total,
            details: orderDetails.slice(0, -2)
        };

        this.database.saveOrder(order);
        console.log(`Order for ${customerName}: $${total}`);
        this.kitchen.prepareItems(validItems);
    }

    public generateReport(reportGenerator: IReportGenerator): void {
        const orders = this.database.getOrders();
        reportGenerator.generate(orders);
    }
}

// ==================== Usage ====================
const mongoDB = new MongoDBRealization();
const kitchen = new Kitchen(mongoDB.getMenu());
const restaurant = new RestaurantSystem(mongoDB, kitchen);

restaurant.takeOrder("John", [1, 3]);
restaurant.takeOrder("Alice", [2, 3]);
restaurant.takeOrder("Bob", [4]);

console.log("\n=== Daily Report ===");
restaurant.generateReport(new DailyReportGenerator());

console.log("\n=== Detailed Report ===");
restaurant.generateReport(new DetailedReportGenerator());

console.log("\n=== Switching to Postgres ===");
const postgresDB = new PostgresDBRealization();
const postgresKitchen = new Kitchen(postgresDB.getMenu());
const postgresRestaurant = new RestaurantSystem(postgresDB, postgresKitchen);

postgresRestaurant.takeOrder("Emma", [1, 2]);
postgresRestaurant.generateReport(new DetailedReportGenerator());