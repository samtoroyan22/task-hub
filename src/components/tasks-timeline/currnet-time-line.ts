"use client";
import { getHours, getMinutes } from "date-fns";

const now = new Date(2025, 6, 29, 16, 0, 0);
export const currentHour = getHours(now);
const currentMinutes = getMinutes(now);
const TIME_LINE_OFFSET = 9;
const PERCENT_PER_HOUR = 12;

export const currentTimeLinePercent =
  (currentHour - TIME_LINE_OFFSET + currentMinutes / 60) * PERCENT_PER_HOUR;
