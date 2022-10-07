const EventBus = {
  subscriberMap: new Map(),
  subscribe: function (eventType, eventHandler) {
    const handlers = this.subscriberMap.get(eventType) || [];
    if (!handlers.includes(eventHandler)) {
      handlers.push(eventHandler);
    }
    this.subscriberMap.set(eventType, handlers);
    return () =>
      this.subscriberMap.set(
        eventType,
        handlers.filter((e) => e !== eventHandler)
      );
  },
  publish: function (event) {
    const eventType = event.type;
    const subscribers = this.subscriberMap.get(eventType);
    if (subscribers && subscribers.length > 0) {
      subscribers.forEach((subscriber) => {
        subscriber(event);
      });
    }
  },
};

EventBus.subscribe("a", () => console.log("a"));
const unsubscribe = EventBus.subscribe("a", () => console.log("a1"));
unsubscribe();
EventBus.subscribe("a", () => console.log("a2"));
EventBus.publish({ type: "a" });
