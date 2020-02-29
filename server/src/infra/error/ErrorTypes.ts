class NotFound extends Error {
  constructor(resource: string, id: string | number) {
    if (!id) {
      super(`${resource} not found`);
    } else {
      super(`${resource} with id ${id} not found`);
    }
    this.name = "NotFound";
  }
}

export default {
  NotFound
};
