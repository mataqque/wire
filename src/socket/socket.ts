import { Server } from 'socket.io';

export class SocketManager {
	private static instance: SocketManager;
	public io!: Server;

	private constructor() {}

	public static getInstance(): SocketManager {
		if (!SocketManager.instance) {
			SocketManager.instance = new SocketManager();
		}
		return SocketManager.instance;
	}

	public setIo(io: Server) {
		this.io = io;
	}
}
