// -------------------- SINGLETON --------------------
// class DataBase {
//     static instance: DataBase
//     private constructor() {}

//     static getInstance(): DataBase {
//         if(!DataBase.instance) {
//             DataBase.instance = new DataBase()
//         }
//         return DataBase.instance
//     }
//     public hello() {
//         return 'Hello'
//     }
// }
// const db = DataBase.getInstance()
// console.log(db.hello())

// -------------------- STRATEGY --------------------
// interface Strategy {
//     reverseArr(arr: number[]): number[]
// }

// class Context implements Strategy{
//     constructor(
//         private strategy: Strategy
//     ) {}

//     setStrategy(newStrategy: Strategy) {
//         this.strategy = newStrategy
//     }

//     reverseArr(arr: number[]): number[] {
//         return this.strategy.reverseArr(arr)
//     }
// }

// class ConcreteStrategyA implements Strategy {
//     reverseArr(arr: number[]): number[] {
//         return arr.reverse()
//     }
// }
// class ConcreteStrategyB implements Strategy {
//     reverseArr(arr: number[]): number[] {
//         const res: number[] = []
//         arr.map((val: number) => res.unshift(val))

//         return res
//     }
// }

// const context = new Context(new ConcreteStrategyA());
// console.log('Client: StrategyA');
// console.log(context.reverseArr([1, 2, 3]))

// console.log('Client: StrategyB');
// context.setStrategy(new ConcreteStrategyB());
// console.log(context.reverseArr([1, 2, 3]))

// -------------------- ADAPTER, FACTORY METHOD --------------------
// abstract class Fermented {
//     public readonly price: number = 100
//     constructor(public shelfLife: Date) { }
// }
// abstract class Fruits {
//     public readonly price: number = 10
// }
// interface ITrasport {
//     deliver(): any
// }
// type SlowCarDeliverType = { product: Fermented | Fruits, fuelBill: number }

// class ProductMilk extends Fermented {
//     public readonly price: number = 100
//     constructor(public shelfLife: Date) {
//         super(shelfLife)
//     }
// }
// class ProductApple extends Fruits {
//     public readonly price: number = 100
// }
// // CREATOR
// abstract class Creator {
//     abstract useFactory(): ITrasport
// }

// // DELIVER
// class ShipDeliverFermented implements ITrasport {
//     deliver(): Fermented {
//         return new ProductMilk(new Date())
//     }
// }
// class ShipDeliverFruits implements ITrasport {
//     deliver(): Fruits {
//         return new ProductApple()
//     }
// }
// class SlowCarDeliver {
//     slowDeliver(): SlowCarDeliverType {
//         return { product: new ProductApple(), fuelBill: 100 }
//     }
// }
// // CONCRETE STRATEGY

// class ConcreteShipFermentedStrategy extends Creator {
//     useFactory() {
//         return new ShipDeliverFermented()
//     }
// }
// class ConcreteShipFruitsStrategy extends Creator {
//     useFactory() {
//         return new ShipDeliverFruits()
//     }
// }
// // The adapter should work with the service not the fabric
// class ConcreteCarStrategy extends Creator {
//     useFactory(): ITrasport {
//         return new SlowCarAdapter(new SlowCarDeliver())
//     }
// }
// // ADAPTER
// class SlowCarAdapter implements ITrasport {
//     constructor(
//         public car: SlowCarDeliver
//     ) { }

//     deliver(): any {
//         return this.car.slowDeliver()
//     }
// }
// // USAGE
// const carStrat = new ConcreteCarStrategy()
// const car = carStrat.useFactory()
// console.log(car.deliver())


// -------------------- OBSERVER --------------------
// interface IObserver {
//     update(notification: string): void;
// }
// interface NotificationSysteme {
//     attach(observer: IObserver): void;
//     detach(observer: IObserver): void;
//     notify(notification: string): void;
// }

// class ConcreteNotificationSysteme implements NotificationSysteme {
//     private observers: IObserver[] = [];

//     attach(observer: IObserver): void {
//         this.observers.push(observer);
//     }

//     detach(observer: IObserver): void {
//         const index = this.observers.indexOf(observer);
//         if (index !== -1) this.observers.splice(index, 1);
//     }

//     notify(notification: string): void {
//         for (const observer of this.observers) {
//             observer.update(notification); // Вызываем метод наблюдателя
//         }
//     }
// }

// class User implements IObserver {
//     constructor(
//         public id: number,
//         public username: string,
//         public notifications: string[] = []
//     ) { }

//     update(notification: string): void {
//         this.notifications.push(notification);
//     }
// }

// // USAGE
// const system = new ConcreteNotificationSysteme();
// const user1 = new User(1, "Hulli");
// const user2 = new User(2, "Joe");

// system.attach(user1);
// system.attach(user2);

// system.notify("New message!");


// -------------------- ABSTRACT FACTORY --------------------
// enum Sizes {
//     'small',
//     'medium',
//     'big'
// }
// interface Cars {
//     isCar: true
// }
// interface SuperCar extends Cars {
//     highSpeed: number
//     avgSpeed: number
//     size: Sizes.small
// }
// interface FamilyCar extends Cars {
//     avgSpeed: number
//     convenient: boolean
//     size: Sizes.medium
// }
// interface SUVCar extends Cars {
//     avgSpeed: number
//     bigWheel: boolean
//     size: Sizes.big
// }
// // Family of products
// interface CarFactory {
//   createSuperCar(): SuperCar;
//   createFamilyCar(): FamilyCar; // Several types of products!
//   createSUV(): SUVCar;
// }

// // Specific factories for different families
// class FerrariFactory implements CarFactory {
//   createSuperCar(): SuperCar {
//     return new FerrariCalifornia();
//   }

//   createFamilyCar(): FamilyCar {
//     return new FerrariGTC4Lusso();
//   }

//   createSUV(): SUVCar {
//     return new FerrariPurosangue();
//   }
// }

// class FordFactory implements CarFactory {
//   createSuperCar(): SuperCar {
//     return new FordGT();
//   }

//   createFamilyCar(): FamilyCar {
//     return new FordMondeo();
//   }

//   createSUV(): SUVCar {
//     return new FordExplorer();
//   }
// }

// // USAGE
// const ferrariFactory = new FerrariFactory();
// const familyCar = ferrariFactory.createFamilyCar();


//  Task1: You need to fix this code by applying different design patterns, solution - task1.ts
// class BadRestaurantSystem {
//     private orders: any[] = [];
//     private menu: any[] = [
//         { id: 1, name: "Pizza", type: "food", price: 10 },
//         { id: 2, name: "Burger", type: "food", price: 7 },
//         { id: 3, name: "Cola", type: "drink", price: 2 }
//     ];

//     public takeOrder(customerName: string, items: number[]): void {
//         let total = 0;
//         let orderDetails = "";

//         for (const itemId of items) {
//             const menuItem = this.menu.find(item => item.id === itemId);
//             if (menuItem) {
//                 total += menuItem.price;
//                 orderDetails += `${menuItem.name}, `;
//             }
//         }

//         this.orders.push({
//             customer: customerName,
//             items: items,
//             total: total,
//             details: orderDetails.slice(0, -2)
//         });

//         console.log(`Order for ${customerName}: $${total}`);
//         this.sendToKitchen(items);
//         this.saveToDatabase();
//     }

//     private sendToKitchen(items: number[]): void {
//         console.log("Sending to kitchen: ", items);
//         if (items.includes(1)) {
//             this.preparePizza();
//         }
//     }

//     private preparePizza(): void {
//         console.log("Preparing pizza...");
//     }

//     private saveToDatabase(): void {
//         console.log("Saving to SQL database...");
//     }

//     public generateReport(type: string): void {
//         if (type === "daily") {
//             console.log("Daily report:", this.orders);
//         } else if (type === "monthly") {
//             console.log("Monthly report:", this.orders);
//         }
//     }
// }

//  Task2: You need to fix this code by applying strategy patterns and OCP, also add new strategy for ApplePay solution - task2.ts
// class PaymentProcessor {
//     processPayment(amount: number, type: string) {
//         if (type === "paypal") {
//             // Логика PayPal
//             console.log(`Paid $${amount} via PayPal`);
//         } else if (type === "credit") {
//             // Логика кредитной карты
//             console.log(`Paid $${amount} via Credit Card`);
//         } else if (type === "crypto") {
//             // Логика криптовалюты
//             console.log(`Paid $${amount} via Crypto`);
//         }
//     }
// }
