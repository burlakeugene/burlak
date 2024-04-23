class Emitter {
  events = [];

  pub = (name, data) => {
    this.events
      .filter((event) => event.name === name)
      .forEach((event) => {
        event.callback(data);
      });
  };

  sub = (name, callback) => {
    this.events.push({
      name,
      callback,
    });
  };

  unsub = (name, callback) => {
    this.events = this.events.filter(
      (event) => event.name !== name && event.callback !== callback
    );
  };
}

export default Emitter;
