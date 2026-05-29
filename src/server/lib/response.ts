import { NextResponse } from 'next/server';

export const ok = (data: unknown, status = 200) =>
  NextResponse.json(data, { status });

export const created = (data: unknown) =>
  NextResponse.json(data, { status: 201 });

export const badRequest = (error: string) =>
  NextResponse.json({ error }, { status: 400 });

export const unauthorized = (error: string) =>
  NextResponse.json({ error }, { status: 401 });

export const notFound = (error: string) =>
  NextResponse.json({ error }, { status: 404 });

export const conflict = (error: string) =>
  NextResponse.json({ error }, { status: 409 });

export const serverError = (error: string, tag?: string) => {
  if (tag) console.error(`[${tag}]`, error);
  return NextResponse.json({ error }, { status: 500 });
};
