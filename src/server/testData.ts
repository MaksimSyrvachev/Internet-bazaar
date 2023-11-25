import { promises as fs } from 'fs';

import z from 'zod';

// NOTE: You can edit this value while developing
const SLEEP_TIME_MS = 1500;

/**
 * Simulates a slower network or BE processing time
 */
const sleep = () => new Promise(resolve => setTimeout(resolve, SLEEP_TIME_MS));

/**
 * Reads the movie types from the JSON file
 */
export const getCategories = async () => {
	try {
		const data = ["Car", "Toys", "Mobile"]
		await sleep();

		return data;
	} catch (error) {
		return [];
	}
};
