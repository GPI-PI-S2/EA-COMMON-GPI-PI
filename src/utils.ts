/**
 * Make a left outer join operation between two arrays (** only ** mode)
 *
 * @param array1 "left" array
 * @param array2 "right" array
 * @param  key common key to make the join
 * @returns array
 */
export function arrayLeftOuterJoin<T extends unknown>(
	array1: T[],
	array2: T[],
	key?: keyof T,
): T[] {
	const map: Record<string, unknown> = {};
	for (const elem of array2) {
		const _e = (key ? elem[key] : elem) as string | number;
		map[_e] = 1;
	}
	const result: T[] = [];
	for (let i = 0; i < array1.length; i++) {
		const _e = key ? array1[i][key] : array1[i];
		if (!((_e as string | number) in map)) {
			result.push(array1[i]);
		}
	}
	return result;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
	let cTimeout: NodeJS.Timeout;
	return (...args: Parameters<F>): Promise<ReturnType<F>> =>
		new Promise((resolve) => {
			if (cTimeout) {
				clearTimeout(cTimeout);
			}

			cTimeout = setTimeout(() => resolve(func(...args)), waitFor);
		});
};
export function deepObjectCompare<T extends Record<string, unknown>>(...o: T[]): boolean {
	function arraysIdentical(a: unknown[], b: unknown[]) {
		let i = a.length;
		if (i !== b.length) return false;
		while (i--) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	}
	function iter(cO: unknown, array: T[keyof T][]) {
		Object.keys(cO).forEach((k) => {
			if (cO[k] !== null && typeof cO[k] === 'object') {
				iter(cO[k], array);
				return;
			}
			array.push(cO[k]);
		});
	}
	let state = true;
	o.reduce((prev, obj) => {
		const a: T[keyof T][] = [];
		const b: T[keyof T][] = [];
		iter(prev, a);
		iter(obj, b);
		if (!arraysIdentical(a, b)) state = false;
		return prev;
	});
	return state;
}
export function isObject(obj: unknown): boolean {
	return obj && typeof obj === 'object';
}
export function objAssignDeep<T extends unknown>(...objs: T[]): T {
	return objs.reduce((prev, obj) => {
		Object.keys(obj).forEach((key) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const pVal = prev[key];
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const oVal = obj[key];
			if (Array.isArray(pVal) && Array.isArray(oVal)) {
				prev[key] = pVal.concat(...oVal);
			} else if (isObject(pVal) && isObject(oVal)) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				prev[key] = objAssignDeep(pVal, oVal);
			} else {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				prev[key] = oVal;
			}
		});
		return prev;
	}, {} as T);
}
export function objAssignDeepClearArray<T extends unknown>(...objs: T[]): T {
	return objs.reduce((prev, obj) => {
		Object.keys(obj).forEach((key) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const pVal = prev[key];
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const oVal = obj[key];
			if (Array.isArray(pVal) && Array.isArray(oVal)) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				prev[key] = [...oVal];
			} else if (isObject(pVal) && isObject(oVal)) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				prev[key] = objAssignDeepClearArray(pVal, oVal);
			} else {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				prev[key] = oVal;
			}
		});
		return prev;
	}, {} as T);
}
/**
 * Clone object without observers
 * @param obj
 * @returns obj
 */
export function objClone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}
export function objMap<O extends Record<string, unknown>>(
	obj: O,
	fn: <T extends unknown>(arg0: T, arg1: string, arg2: number) => T,
) {
	return Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));
}
export function queryNormalize(query: { [key: string]: string }) {
	return (
		'?' +
		Object.entries(query)
			.filter((q) => q[1])
			.map((q) => `${q[0]}=${encodeURI(q[1])}`)
			.join('&')
	);
}
/**
 * @param {number} min from (include)
 * @param {number} max to (exclude)
 * @param {boolean} [include=false] Include max
 */
export function random(min: number, max: number, include = false): number {
	return include
		? Math.floor(Math.random() * (max - min + 1)) + min
		: Math.floor(Math.random() * (max - min)) + min;
}
export function timeout(miliseconds: number): Promise<void> {
	return new Promise((r) => {
		setTimeout(() => r(), miliseconds);
	});
}
