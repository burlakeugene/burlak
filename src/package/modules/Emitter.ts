type TEvent = {
  name: string;
  callback: (data?) => void;
};

class Emitter {
  events: TEvent[] = [];

  pub = (name: string, data: any) => {
    this.events
      .filter((event) => event.name === name)
      .forEach((event) => {
        event.callback(data);
      });
  };

  sub = (event: TEvent) => {
    this.events.push(event);
  };

  unsub = (event: TEvent) => {
    this.events = this.events.filter(
      (current) =>
        current.name !== event.name && current.callback !== event.callback
    );
  };
}

export default Emitter;
