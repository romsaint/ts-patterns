interface ISubscriber {
    notify(news: string): void;
}

class NewsPublisher {
    private subscribers: ISubscriber[] = [];

    addSubscriber(sub: ISubscriber): void {
        this.subscribers.push(sub);
    }

    removeSubscriber(sub: ISubscriber): void {
        this.subscribers = this.subscribers.filter(s => s !== sub);
    }

    publishNews(news: string): void {
        console.log(`Breaking news: ${news}`);
        this.subscribers.forEach(sub => sub.notify(news));
    }
}

class EmailSubscriber implements ISubscriber {
    constructor(private email: string) {}

    notify(news: string): void {
        console.log(`Email to ${this.email}: ${news}`);
    }
}

class SMSSubscriber implements ISubscriber {
    constructor(private phone: string) {}

    notify(news: string): void {
        console.log(`SMS to ${this.phone}: ${news}`);
    }
}

// Пример использования
const publisher = new NewsPublisher();

const emailSub = new EmailSubscriber("user@example.com");
const smsSub = new SMSSubscriber("+1234567890");

publisher.addSubscriber(emailSub);
publisher.addSubscriber(smsSub);

publisher.publishNews("New observer pattern implemented!");

publisher.removeSubscriber(emailSub);

publisher.publishNews("Second news update!");
