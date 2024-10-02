/**
 * Data API
*/

import {request, authRequest} from './HTTPClient';
import Errors from './Errors';
import config from '../config';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// Generates an analysis from user input.
export const createUserAnalysis = async (input) => {
    const response = await (await authRequest(config.api.host + '/data/create_analysis', {
        method: 'post',
        json: {
            prompt: input
        }
    })).json();
    
    return response;
};

// Fetches analysis data for a time range.
export const fetchAnalysesTimeRange = async (start, end) => {
    const response = await (await authRequest(config.api.host + '/data/fetch_time_range', {
        method: 'post',
        json: {
            time_start: start,
            time_end: end
        }
    })).json();
    
    return response;
};

// Fetches analysis data for today.
export const fetchTodayAnalyses = async () => {
    return await fetchAnalysesTimeRange(dayjs().startOf('day').valueOf(), dayjs().endOf('day').valueOf());
};

// Fetches day analysis.
export const getDayAnalysis = async (start, end) => {
    dayjs.extend(utc);

    const response = await (await authRequest(config.api.host + '/data/get_day_analysis', {
        method: 'post',
        json: {
            day_start: start,
            day_end: end,
            utc_offset: dayjs().utcOffset()
        }
    })).json();
    
    return response;
};

// Fetches day analysis for today.
export const getTodayDayAnalysis = async () => {
    return await getDayAnalysis(dayjs().startOf('day').valueOf(), dayjs().endOf('day').valueOf());
};