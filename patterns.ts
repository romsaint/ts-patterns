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

// -------------------- ADAPTER, ABSTRACT FACTORY -------------------- 
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
interface IObserver {
    update(notification: string): void;
}
interface NotificationSysteme {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(notification: string): void;
}

class ConcreteNotificationSysteme implements NotificationSysteme {
    private observers: IObserver[] = [];

    attach(observer: IObserver): void {
        this.observers.push(observer);
    }

    detach(observer: IObserver): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) this.observers.splice(index, 1);
    }

    notify(notification: string): void {
        for (const observer of this.observers) {
            observer.update(notification); // Вызываем метод наблюдателя
        }
    }
}

class User implements IObserver {
    constructor(
        public id: number,
        public username: string,
        public notifications: string[] = []
    ) { }

    update(notification: string): void {
        this.notifications.push(notification);
    }
}

// USAGE
const system = new ConcreteNotificationSysteme();
const user1 = new User(1, "Hulli");
const user2 = new User(2, "Joe");

system.attach(user1);
system.attach(user2);

system.notify("New message!");