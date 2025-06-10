interface IFlyBehavior {
    fly(): void;
}
interface IHunterBehavior {
    hunter(): void;
}

class CanFly implements IFlyBehavior {
    fly(): void {
        console.log("Flying");
    }
}
class CannotFly implements IFlyBehavior {
    fly(): void {
        console.log("I can't fly");
    }
}

class CanHunter implements IHunterBehavior {
    hunter(): void {
        console.log("Huntering");
    }
}
class CannotHunter implements IHunterBehavior {
    hunter(): void {
        console.log("Connot huntering");
    }
}


class Bird {
    constructor(
        protected flyBehavior: IFlyBehavior,
        protected hunterBehavior: IHunterBehavior
    ) { }

    fly(): void {
        this.flyBehavior.fly();
    }

    eat(): void {
        console.log('Eating')
    }

    hunter() {
        this.hunterBehavior.hunter()
    }
}

class Penguin extends Bird {
    constructor(
        protected flyBehavior: IFlyBehavior = new CannotFly(),
        protected hunterBehavior: IHunterBehavior = new CannotHunter()
    ) {
        super(flyBehavior, hunterBehavior)
    }
    eat(): void {
        console.log('Eating')
    }
    fly(): void {
        this.flyBehavior.fly()
    }
    hunter(): void {
        this.hunterBehavior.hunter()
    }
}
class Eagle extends Bird {
    constructor(
        protected flyBehavior: IFlyBehavior = new CanFly(),
        protected hunterBehavior: IHunterBehavior = new CanHunter()
    ) {
        super(flyBehavior, hunterBehavior)
    }
    eat(): void {
        console.log('Eating')
    }
    fly(): void {
        this.flyBehavior.fly()
    }
    hunter(): void {
        this.hunterBehavior.hunter()
    }
}
const penguin = new Penguin()
penguin.eat()
penguin.fly()

const eagle = new Eagle()
penguin.eat()
penguin.fly()