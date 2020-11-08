export class CError extends Error {
	static isPrintable(error: Error): boolean {
		if (error instanceof Error) return (error as CError).printable ? true : false;
		else return false;
	}
	private _error: unknown;
	private printable: boolean;
	constructor(message: string, error?: unknown) {
		super(message);
		this._error = error;
		this.printable = true;
	}
}
