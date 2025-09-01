class SSEManager {
  #activeConnections: Map<number, Set<ReadableStreamDefaultController<any>>>;

  constructor() {
    this.#activeConnections = new Map();

    setInterval(() => this.cleanup(), 30000)
  }

  addConnection(eventId: number, controller: ReadableStreamDefaultController<any>) {
    if (!this.#activeConnections.has(eventId)) {
      this.#activeConnections.set(eventId, new Set())
    }

    this.#activeConnections.get(eventId)!.add(controller);
  }

  removeConnection(eventId: number) {
    this.#activeConnections.delete(eventId);
  }

  broadcastToEvent(eventId: number, data: any) {
    if (this.#activeConnections.has(eventId)) {
      console.log('notifying', eventId, data)
      const message = `data: ${JSON.stringify(data)}\n\n`;

      this.#activeConnections?.get(eventId)?.forEach(controller => {
        try {
          controller.enqueue(message)
        } catch (error) {
          // Connection is probably closed, remove it
          this.removeConnection(eventId);
        }
      })
    }
  }

  cleanup() {
    const deadConnections: { controller: ReadableStreamDefaultController<any>, eventId: number }[] = [];

    this.#activeConnections.forEach((controllers, eventId) => {
      controllers.forEach(controller => {
        try {
          // Send a heartbeat to test the connection
          controller.enqueue(`: heartbeat\n\n`)
        } catch (error) {
          deadConnections.push({ controller, eventId })
        }
      })
    })

    deadConnections.forEach(({ eventId }) => {
      this.removeConnection(eventId)
    })

    console.log(`Cleaned up ${deadConnections.length} dead connections`)
  }
}

export const sseManager = new SSEManager();
