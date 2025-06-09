interface PaymentStrategy {
    processPayment(amount: number): void
}
// LOGIC
class PayPal implements PaymentStrategy {
    processPayment(amount: number): void {
        console.log(`Paid $${amount} via PayPal`);
    }
}
class CreditCard implements PaymentStrategy {
    processPayment(amount: number): void {
        console.log(`Paid $${amount} via Credit Card`);
    }
}
class CryptoPay implements PaymentStrategy {
    processPayment(amount: number): void {
        console.log(`Paid $${amount} via Crypto`);
    }
}
class ApplePay implements PaymentStrategy {
    processPayment(amount: number): void {
        console.log(`Paid $${amount} via ApplePay`);
    }
}
// PAYMENT
class PaymentProcessor {
    private strategies: Record<string, PaymentStrategy> = {}
    
    constructor() {
        this.registerStrategy('paypal', new PayPal())
        this.registerStrategy('credit', new CreditCard())
        this.registerStrategy('crypto', new CryptoPay())
    }

    registerStrategy(type: string, strategy: PaymentStrategy) {
        this.strategies[type] = strategy
    }

    processPayment(amount: number, type: string) {
        const strategy = this.strategies[type]
        if(!strategy) {
            throw new Error('Not found')
        }

        return strategy.processPayment(amount)
    }
}

const payment = new PaymentProcessor()
payment.registerStrategy('applepay', new ApplePay())
payment.processPayment(230, 'applepay')