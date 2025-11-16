import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  try {
    const apiUrl = new URL('http://localhost:8080/apps/search');

    if (searchParams.get('q')) {
      apiUrl.searchParams.append('q', searchParams.get('q')!);
    }
    if (searchParams.get('limit')) {
      apiUrl.searchParams.append('limit', searchParams.get('limit')!);
    }
    if (searchParams.get('type')) {
      apiUrl.searchParams.append('type', searchParams.get('type')!);
    }

    const response = await fetch(apiUrl.toString());

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to search apps' },
      { status: 500 }
    );
  }
}
